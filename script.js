// =================================================================================
// CESSNA 414A PERFORMANCE CALCULATOR - V5 (STABLE & 100% COMPLETE)
// Project: Alan and Gemini
//
// This file is a complete rewrite to fix previous stability and completeness issues.
// It features a simplified data structure and a robust, generic interpolation
// algorithm. All data and logic for Modules 1, 2, and 3 are 100% complete
// and functional. It loads the database from database.json.
// =================================================================================

const C414ACalculator = {
    data: {}, // Será preenchido ao carregar o database.json

    // =============================================================================
    // 2. UTILITY FUNCTIONS
    // =============================================================================
    utils: {
        interpolate(target, p1, v1, p2, v2) {
            if (p1 === p2) return v1;
            if (typeof v1 !== 'number' || typeof v2 !== 'number') return v1;
            return v1 + (v2 - v1) * (target - p1) / (p2 - p1);
        },

        interpolateRecursive(inputs, data, axes, outputProps) {
            const axis = axes[0];
            const remainingAxes = axes.slice(1);
            const x = inputs[axis];

            const uniquePoints = [...new Set(data.map(p => p[axis]))].sort((a, b) => a - b);
            
            let p1_val = -Infinity, p2_val = Infinity;
            uniquePoints.forEach(p => {
                if (p <= x) p1_val = p;
                if (p >= x && p < p2_val) p2_val = p;
            });
            
            if (p1_val === -Infinity) p1_val = uniquePoints[0];
            if (p2_val === Infinity) p2_val = uniquePoints[uniquePoints.length - 1];

            const getResultForPlane = (val) => {
                const planeData = data.filter(p => p[axis] === val);
                if (remainingAxes.length > 0) {
                    return this.interpolateRecursive(inputs, planeData, remainingAxes, outputProps);
                }
                return planeData.length > 0 ? planeData[0] : outputProps.reduce((acc, prop) => ({ ...acc, [prop]: NaN }), {});
            };

            const res1 = getResultForPlane(p1_val);
            if (p1_val === p2_val) {
                 return outputProps.reduce((acc, prop) => ({...acc, [prop]: res1?.[prop] ?? NaN}), {});
            }
            const res2 = getResultForPlane(p2_val);

            const finalResult = {};
            outputProps.forEach(prop => {
                if (res1 === undefined || res2 === undefined || res1[prop] === undefined || res2[prop] === undefined || isNaN(res1[prop]) || isNaN(res2[prop])) {
                    if (typeof res1[prop] === 'boolean') { // Handle boolean interpolation
                         const factor = (x - p1_val) / (p2_val - p1_val);
                         finalResult[prop] = factor > 0.5 ? res2[prop] : res1[prop];
                    } else {
                        finalResult[prop] = NaN;
                    }
                    return;
                }
                if (typeof res1[prop] === 'boolean') {
                    const factor = (x - p1_val) / (p2_val - p1_val);
                    finalResult[prop] = factor > 0.5 ? res2[prop] : res1[prop];
                } else {
                    finalResult[prop] = this.interpolate(x, p1_val, res1[prop], p2_val, res2[prop]);
                }
            });
            return finalResult;
        }
    },
    
    // =============================================================================
    // MODULES IMPLEMENTATION
    // =============================================================================
    module1: {
        getPressureAltitude(fieldElevation, altimeterSetting) { if (isNaN(fieldElevation) || isNaN(altimeterSetting)) return NaN; return fieldElevation - ((altimeterSetting - 29.92) / 0.1 * 100); },
        getKCAS(kias, config, source) { if (isNaN(kias) || !config || !source) return NaN; const table = C414ACalculator.data.airspeedCalibration[source][config]; return C414ACalculator.utils.interpolateRecursive({kias}, table, ['kias'], ['kcas']).kcas; },
        getAltimeterCorrection(kias, pa, config, source) { const sourceData = C414ACalculator.data.altimeterCorrection[source]; const altData = [...sourceData.seaLevel[config].map(p => ({...p, pa: 0})), ...sourceData.tenThousand[config].map(p => ({...p, pa: 10000})), ...sourceData.twentyThousand[config].map(p => ({...p, pa: 20000}))]; return C414ACalculator.utils.interpolateRecursive({kias, pa}, altData, ['pa', 'kias'], ['corr']).corr; },
        getRamRise(kias, pa) { if (isNaN(kias) || isNaN(pa)) return NaN; const ramRiseData = C414ACalculator.data.ramRise.flatMap(row => row.points.map(point => ({ pa: row.pa, kias: point.kias, rise: point.rise }))); return C414ACalculator.utils.interpolateRecursive({kias, pa}, ramRiseData, ['pa', 'kias'], ['rise']).rise; },
        getTrueOAT(indicatedOAT, ramRise){ if (isNaN(indicatedOAT) || isNaN(ramRise)) return NaN; return indicatedOAT - ramRise; },
        getWindComponents(runwayHdg, windDir, windSpeed) { if (isNaN(runwayHdg) || isNaN(windDir) || isNaN(windSpeed)) return { headwind: NaN, crosswind: NaN }; let angleDiff = windDir - runwayHdg; if (angleDiff > 180) angleDiff -= 360; if (angleDiff < -180) angleDiff += 360; const angleInRadians = angleDiff * (Math.PI / 180); return { headwind: windSpeed * Math.cos(angleInRadians), crosswind: windSpeed * Math.sin(angleInRadians) }; }
    },
    module2: {
        calculateNormalTakeoff(weight, pa, temp, windComponent) { const base = C414ACalculator.utils.interpolateRecursive({weight, pa, t: temp}, C414ACalculator.data.normalTakeoff, ['weight', 'pa', 't'], ['gr', 'd50']); if(isNaN(base.gr)) return { groundRoll: NaN, distance50ft: NaN }; let { gr: groundRoll, d50: distance50ft } = base; if (windComponent >= 0) { const c = (windComponent / 10) * 0.07; groundRoll *= (1 - c); distance50ft *= (1 - c); } else { const t = Math.abs(windComponent); if (t > 0) { const c = (t / 2) * 0.05; groundRoll *= (1 + c); distance50ft *= (1 + c); } } return { groundRoll, distance50ft }; },
        calculateAccelStop(weight, pa, temp, windComponent) { const base = C414ACalculator.utils.interpolateRecursive({weight, pa, t: temp}, C414ACalculator.data.accelStop, ['weight', 'pa', 't'], ['d']); if(isNaN(base.d)) return { distance: NaN }; let d = base.d; if (windComponent >= 0) { d *= (1 - (windComponent / 4) * 0.03); } else { const t = Math.abs(windComponent); if (t > 0) d *= (1 + (t / 2) * 0.05); } return { distance: d }; },
        calculateAccelGo(weight, pa, temp, windComponent) { const base = C414ACalculator.utils.interpolateRecursive({weight, pa, t: temp}, C414ACalculator.data.accelGo, ['weight', 'pa', 't'], ['d', 'm']); if(isNaN(base.d)) return { distance: NaN, isMarginal: false }; let { d: distance, m: isMarginal } = base; if (windComponent >= 0) { distance *= (1 - (windComponent / 10) * 0.06); } else { const t = Math.abs(windComponent); if (t > 0) distance *= (1 + t * 0.02); } return { distance, isMarginal }; }
    },
    module3: {
        calculateRateOfClimb(profile, oat, pa, weight, seConfig) {
            const profileInfo = C414ACalculator.data.rateOfClimb[profile];
            const baseRoc = C414ACalculator.utils.interpolateRecursive({pa, weight, temp: oat}, profileInfo.data, ['pa', 'weight', 'temp'], ['roc']).roc;
            
            let finalRoc = baseRoc;
            let climbSpeed = NaN;

            if (profile === 'singleEngine') {
                if (seConfig.isWindmilling) finalRoc -= profileInfo.penalties.windmilling;
                if (seConfig.isGearDown) finalRoc -= profileInfo.penalties.gear;
                if (seConfig.flaps > 0) finalRoc -= profileInfo.penalties[`flaps${seConfig.flaps}`];
                
                const speedData2D = profileInfo.speeds.flatMap(w => w.alts.map(a => ({weight: w.weight, alt: a.alt, kias: a.kias})));
                climbSpeed = C414ACalculator.utils.interpolateRecursive({weight, alt: pa}, speedData2D, ['weight', 'alt'], ['kias']).kias;

            } else if (profile === 'maximum') {
                climbSpeed = C414ACalculator.utils.interpolateRecursive({alt: pa}, profileInfo.speeds, ['alt'], ['kias']).kias;
            } else {
                climbSpeed = profileInfo.speed;
            }
            return { roc: finalRoc, speed: climbSpeed };
        },
        calculateTFD(profile, oat, weight, startPa, endPa) {
            const fixedFuel = 32;
            const data = C414ACalculator.data.timeFuelDistClimb[profile];
            const getIsaTemp = (pa) => 15 - (pa / 1000) * 1.98;
            const temp = isNaN(oat) ? getIsaTemp((startPa + endPa) / 2) : oat;
            
            const startValues = C414ACalculator.utils.interpolateRecursive({alt: startPa, w: weight, t: temp}, data, ['alt', 'w', 't'], ['time', 'fuel', 'dist']);
            const endValues = C414ACalculator.utils.interpolateRecursive({alt: endPa, w: weight, t: temp}, data, ['alt', 'w', 't'], ['time', 'fuel', 'dist']);
            
            if(isNaN(startValues.time) || isNaN(endValues.time)) return { time: NaN, fuel: NaN, dist: NaN };

            return {
                time: endValues.time - startValues.time,
                fuel: (endValues.fuel - startValues.fuel) + fixedFuel,
                dist: endValues.dist - startValues.dist
            };
        }
    },

    // =============================================================================
    // UI INTERACTIVITY
    // =============================================================================
    async init() {
        try {
            const response = await fetch('database.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.data = await response.json();
            this.attachEventListeners();
        } catch (e) {
            console.error("Fatal Error: Could not load performance database.", e);
            alert("ERRO FATAL: Não foi possível carregar a base de dados 'database.json'. A calculadora não pode funcionar. Verifique se o arquivo está na mesma pasta que o index.html e se o conteúdo é um JSON válido.");
        }
    },

    attachEventListeners() {
        // Tab switching logic
        const moduleNav = document.querySelector('.module-nav');
        const modulePanes = document.querySelectorAll('.module-pane');
        moduleNav.addEventListener('click', (event) => {
            const navButton = event.target.closest('.nav-button');
            if (navButton && !navButton.disabled) {
                event.preventDefault();
                const targetPaneId = navButton.getAttribute('data-tab');
                
                moduleNav.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
                navButton.classList.add('active');

                modulePanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === targetPaneId) pane.classList.add('active');
                });
            }
        });

        // Calculator buttons logic
        document.querySelectorAll('button[data-calc]').forEach(button => {
            button.addEventListener('click', (event) => {
                const calcType = event.target.getAttribute('data-calc');
                this.runCalculation(calcType, event.target.closest('.calculator-card'));
            });
        });

        // Event listener for Module 3 Rate of Climb profile selection
        const rocProfileSelect = document.getElementById('m3-roc-profile');
        if (rocProfileSelect) {
            rocProfileSelect.addEventListener('change', (event) => {
                const seOptions = document.getElementById('m3-roc-se-options');
                seOptions.classList.toggle('hidden', event.target.value !== 'singleEngine');
            });
        }
    },
    
    runCalculation(calcType, cardElement) {
        try {
            const displayResult = (id, value, unit = '', prefix = '', dec = 0) => {
                const el = cardElement.querySelector(`#${id}`);
                if (el) el.textContent = isNaN(value) ? "---" : `${prefix}${value.toFixed(dec)} ${unit}`;
            };

            // Module 1
            if (calcType === 'pressure-altitude') {
                const elev = parseFloat(cardElement.querySelector('#m1-fieldelevation').value);
                const setting = parseFloat(cardElement.querySelector('#m1-altsetting').value);
                if(isNaN(elev) || isNaN(setting)) return;
                const result = this.module1.getPressureAltitude(elev, setting);
                displayResult('pressure-altitude-result', result, 'ft');
            } else if (calcType === 'airspeed-cal') {
                const kias = parseFloat(cardElement.querySelector('#m1-kias-cal').value);
                const config = cardElement.querySelector('#m1-config-cal').value;
                const source = cardElement.querySelector('#m1-staticsource-cal').value;
                if(isNaN(kias)) return;
                const result = this.module1.getKCAS(kias, config, source);
                displayResult('airspeed-cal-result', result, 'KCAS', '', 1);
            } else if (calcType === 'altimeter-corr') {
                const kias = parseFloat(cardElement.querySelector('#m1-kias-alt').value);
                const pa = parseFloat(cardElement.querySelector('#m1-pa-alt').value);
                const config = cardElement.querySelector('#m1-config-alt').value;
                const source = cardElement.querySelector('#m1-staticsource-alt').value;
                if(isNaN(kias) || isNaN(pa)) return;
                const correction = this.module1.getAltimeterCorrection(kias, pa, config, source);
                displayResult('altimeter-corr-result', correction, 'ft', correction >= 0 ? '+' : '');
            } else if (calcType === 'ram-rise') {
                const kias = parseFloat(cardElement.querySelector('#m1-kias-temp').value);
                const pa = parseFloat(cardElement.querySelector('#m1-pa-temp').value);
                const indicatedOAT = parseFloat(cardElement.querySelector('#m1-indicated-oat').value);
                if(isNaN(kias) || isNaN(pa) || isNaN(indicatedOAT)) return;
                const ramRise = this.module1.getRamRise(kias, pa);
                const trueOAT = this.module1.getTrueOAT(indicatedOAT, ramRise);
                displayResult('ram-rise-result', ramRise, '°C', '', 1);
                displayResult('true-oat-result', trueOAT, '°C', '', 1);
            } else if (calcType === 'wind-comp') {
                const runway = parseFloat(cardElement.querySelector('#m1-runway-hdg').value);
                const dir = parseFloat(cardElement.querySelector('#m1-wind-dir').value);
                const speed = parseFloat(cardElement.querySelector('#m1-wind-speed').value);
                if(isNaN(runway) || isNaN(dir) || isNaN(speed)) return;
                const result = this.module1.getWindComponents(runway, dir, speed);
                cardElement.querySelector('#headwind-result').textContent = isNaN(result.headwind) ? "---" : `${result.headwind >= 0 ? 'Headwind' : 'Tailwind'}: ${Math.abs(result.headwind).toFixed(1)} kts`;
                cardElement.querySelector('#crosswind-result').textContent = isNaN(result.crosswind) ? "---" : `${Math.abs(result.crosswind).toFixed(1)} kts (from ${result.crosswind >= 0 ? 'Right' : 'Left'})`;
            }
            // Module 2
            else if (calcType === 'normal-takeoff') {
                const weight = parseFloat(cardElement.querySelector('#m2-normal-weight').value);
                const pa = parseFloat(cardElement.querySelector('#m2-normal-pa').value);
                const temp = parseFloat(cardElement.querySelector('#m2-normal-temp').value);
                const wind = parseFloat(cardElement.querySelector('#m2-normal-wind').value) || 0;
                if(isNaN(weight) || isNaN(pa) || isNaN(temp)) return;
                const result = this.module2.calculateNormalTakeoff(weight, pa, temp, wind);
                displayResult('normal-takeoff-ground-roll-result', result.groundRoll, 'ft');
                displayResult('normal-takeoff-50ft-result', result.distance50ft, 'ft');
            } else if (calcType === 'accel-stop') {
                const weight = parseFloat(cardElement.querySelector('#m2-accelstop-weight').value);
                const pa = parseFloat(cardElement.querySelector('#m2-accelstop-pa').value);
                const temp = parseFloat(cardElement.querySelector('#m2-accelstop-temp').value);
                const wind = parseFloat(cardElement.querySelector('#m2-accelstop-wind').value) || 0;
                if(isNaN(weight) || isNaN(pa) || isNaN(temp)) return;
                const result = this.module2.calculateAccelStop(weight, pa, temp, wind);
                displayResult('accel-stop-result', result.distance, 'ft');
            } else if (calcType === 'accel-go') {
                const weight = parseFloat(cardElement.querySelector('#m2-accelgo-weight').value);
                const pa = parseFloat(cardElement.querySelector('#m2-accelgo-pa').value);
                const temp = parseFloat(cardElement.querySelector('#m2-accelgo-temp').value);
                const wind = parseFloat(cardElement.querySelector('#m2-accelgo-wind').value) || 0;
                if(isNaN(weight) || isNaN(pa) || isNaN(temp)) return;
                const result = this.module2.calculateAccelGo(weight, pa, temp, wind);
                displayResult('accel-go-result', result.distance, 'ft');
                cardElement.querySelector('#accel-go-warning').textContent = result.isMarginal ? "WARNING: Marginal climb performance (<50 ft/min)." : "";
            }
            // Module 3
            else if (calcType === 'rate-of-climb') {
                const profile = cardElement.querySelector('#m3-roc-profile').value;
                const weight = parseFloat(cardElement.querySelector('#m3-roc-weight').value);
                const pa = parseFloat(cardElement.querySelector('#m3-roc-pa').value);
                const temp = parseFloat(cardElement.querySelector('#m3-roc-temp').value);
                let seConfig = {};
                if (profile === 'singleEngine') {
                    seConfig.isWindmilling = cardElement.querySelector('#m3-roc-se-windmilling').checked;
                    seConfig.isGearDown = cardElement.querySelector('#m3-roc-se-gear').checked;
                    seConfig.flaps = parseInt(cardElement.querySelector('#m3-roc-se-flaps').value, 10);
                }
                if(isNaN(weight) || isNaN(pa) || isNaN(temp)) return;
                const result = this.module3.calculateRateOfClimb(profile, temp, pa, weight, seConfig);
                displayResult('roc-result', result.roc, 'ft/min');
                displayResult('roc-speed-result', result.speed, 'KIAS');
            } else if (calcType === 'tfd-climb') {
                const profile = cardElement.querySelector('#m3-tfd-profile').value;
                const weight = parseFloat(cardElement.querySelector('#m3-tfd-weight').value);
                const temp = parseFloat(cardElement.querySelector('#m3-tfd-temp').value);
                const startPa = parseFloat(cardElement.querySelector('#m3-tfd-start-pa').value);
                const endPa = parseFloat(cardElement.querySelector('#m3-tfd-end-pa').value);
                if(isNaN(weight) || isNaN(startPa) || isNaN(endPa)) return;
                const result = this.module3.calculateTFD(profile, temp, weight, startPa, endPa);
                displayResult('tfd-time-result', result.time, 'min', '', 1);
                displayResult('tfd-fuel-result', result.fuel, 'lbs', '', 1);
                displayResult('tfd-dist-result', result.dist, 'NM', '', 1);
            }

        } catch (e) {
            console.error(`Error during calculation for ${calcType}:`, e);
            alert("An error occurred. Check input values and console for details.");
        }
    }
};

// Initialize the application after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    C414ACalculator.init();
});
