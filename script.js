// =================================================================================
// CESSNA 414A PERFORMANCE CALCULATOR - MODULE 1
// Project: Alan Fernandes
//
// This file contains:
// 1. The main project namespace (C414ACalculator).
// 2. The digitized database from the performance manuals (data).
// 3. Utility functions, such as interpolation (utils).
// 4. The implementation of Module 1 functions (module1).
// 5. Event listeners for the HTML interface interactivity.
// =================================================================================

const C414ACalculator = {
    // =============================================================================
    // 1. DATABASE
    // Digitized data from the provided performance tables.
    // =============================================================================
    data: {
        // Figure 5-1 & 5-2: Airspeed Calibration
        airspeedCalibration: {
            normal: {
                clean: [
                    { kias: 70, kcas: 70 }, { kias: 80, kcas: 80 }, { kias: 90, kcas: 90 },
                    { kias: 100, kcas: 100 }, { kias: 110, kcas: 110 }, { kias: 120, kcas: 119 },
                    { kias: 140, kcas: 139 }, { kias: 160, kcas: 158 }, { kias: 180, kcas: 178 },
                    { kias: 200, kcas: 197 }, { kias: 220, kcas: 216 }, { kias: 230, kcas: 226 },
                    { kias: 237, kcas: 232 }
                ],
                approach: [
                    { kias: 70, kcas: 71 }, { kias: 80, kcas: 81 }, { kias: 90, kcas: 91 },
                    { kias: 100, kcas: 100 }, { kias: 110, kcas: 109 }, { kias: 120, kcas: 119 },
                    { kias: 130, kcas: 128 }, { kias: 140, kcas: 138 }, { kias: 150, kcas: 147 },
                    { kias: 160, kcas: 157 }, { kias: 170, kcas: 166 }, { kias: 179, kcas: 175 }
                ],
                landing: [
                    { kias: 70, kcas: 71 }, { kias: 80, kcas: 80 }, { kias: 90, kcas: 93 },
                    { kias: 100, kcas: 99 }, { kias: 110, kcas: 109 }, { kias: 120, kcas: 117 },
                    { kias: 130, kcas: 127 }, { kias: 140, kcas: 136 }, { kias: 145, kcas: 140 }
                ]
            },
            alternate: {
                clean: [
                    { kias: 80, kcas: 89 }, { kias: 90, kcas: 98 }, { kias: 100, kcas: 108 },
                    { kias: 110, kcas: 111 }, { kias: 120, kcas: 120 }, { kias: 130, kcas: 129 },
                    { kias: 140, kcas: 144 }, { kias: 160, kcas: 163 }, { kias: 180, kcas: 181 },
                    { kias: 200, kcas: 199 }, { kias: 220, kcas: 218 }, { kias: 240, kcas: 236 }
                ],
                approach: [
                    { kias: 80, kcas: 85 }, { kias: 90, kcas: 94 }, { kias: 100, kcas: 102 },
                    { kias: 110, kcas: 111 }, { kias: 120, kcas: 119 }, { kias: 130, kcas: 128 },
                    { kias: 140, kcas: 136 }, { kias: 150, kcas: 145 }, { kias: 160, kcas: 153 },
                    { kias: 180, kcas: 170 }
                ],
                landing: [
                    { kias: 70, kcas: 75 }, { kias: 80, kcas: 83 }, { kias: 90, kcas: 92 },
                    { kias: 100, kcas: 100 }, { kias: 110, kcas: 109 }, { kias: 120, kcas: 117 },
                    { kias: 130, kcas: 126 }, { kias: 140, kcas: 134 }, { kias: 150, kcas: 143 }
                ]
            }
        },
        // Figure 5-3 & 5-4: Altimeter Correction
        altimeterCorrection: {
             normal: {
                seaLevel: {
                    clean:    [{kias: 70, corr: 3}, {kias: 80, corr: 1}, {kias: 90, corr: 0}, {kias: 100, corr: -1}, {kias: 110, corr: -2}, {kias: 120, corr: -8}, {kias: 140, corr: -20}, {kias: 160, corr: -21}, {kias: 180, corr: -31}, {kias: 200, corr: -55}, {kias: 220, corr: -73}, {kias: 230, corr: -87}, {kias: 237, corr: -100}],
                    approach: [{kias: 70, corr: 8}, {kias: 80, corr: 6}, {kias: 90, corr: 4}, {kias: 100, corr: 0}, {kias: 110, corr: -5}, {kias: 120, corr: -25}, {kias: 140, corr: -39}, {kias: 160, corr: -58}],
                    landing:  [{kias: 70, corr: 5}, {kias: 80, corr: 0}, {kias: 94, corr: -8}, {kias: 100, corr: -10}, {kias: 110, corr: -19}, {kias: 120, corr: -30}, {kias: 140, corr: -50}]
                },
                tenThousand: {
                    clean:    [{kias: 70, corr: 3}, {kias: 80, corr: 1}, {kias: 90, corr: 0}, {kias: 100, corr: -2}, {kias: 110, corr: -2}, {kias: 120, corr: -6}, {kias: 140, corr: -20}, {kias: 160, corr: -24}, {kias: 180, corr: -39}, {kias: 200, corr: -69}, {kias: 220, corr: -90}, {kias: 230, corr: -111}, {kias: 237, corr: -132}],
                    approach: [{kias: 70, corr: 10}, {kias: 80, corr: 7}, {kias: 90, corr: 5}, {kias: 100, corr: 0}, {kias: 110, corr: -6}, {kias: 120, corr: -22}, {kias: 140, corr: -29}, {kias: 160, corr: -49}, {kias: 180, corr: -78}],
                    landing:  [{kias: 70, corr: 6}, {kias: 80, corr: 0}, {kias: 94, corr: -9}, {kias: 100, corr: -12}, {kias: 110, corr: -22}, {kias: 120, corr: -29}, {kias: 140, corr: -63}]
                },
                 twentyThousand: {
                    clean:    [{kias: 70, corr: 5}, {kias: 80, corr: 2}, {kias: 90, corr: 0}, {kias: 100, corr: -3}, {kias: 110, corr: -3}, {kias: 120, corr: -4}, {kias: 140, corr: -14}, {kias: 160, corr: -28}, {kias: 180, corr: -55}, {kias: 200, corr: -100}, {kias: 220, corr: -130}, {kias: 230, corr: -157}, {kias: 237, corr: -183}],
                    approach: [{kias: 70, corr: 14}, {kias: 80, corr: 11}, {kias: 90, corr: 7}, {kias: 100, corr: 0}, {kias: 110, corr: -9}, {kias: 120, corr: -25}, {kias: 140, corr: -36}, {kias: 160, corr: -68}, {kias: 180, corr: -110}],
                    landing:  [{kias: 70, corr: 9}, {kias: 80, corr: 0}, {kias: 94, corr: -14}, {kias: 100, corr: -17}, {kias: 110, corr: -33}, {kias: 120, corr: -43}, {kias: 140, corr: -90}]
                }
            },
            alternate: {
                 seaLevel: {
                    clean:    [{kias: 80, corr: 64}, {kias: 90, corr: 68}, {kias: 100, corr: 68}, {kias: 110, corr: 63}, {kias: 120, corr: 51}, {kias: 140, corr: 36}, {kias: 160, corr: 12}, {kias: 180, corr: -13}, {kias: 200, corr: -13}, {kias: 220, corr: -51}, {kias: 240, corr: -90}],
                    approach: [{kias: 80, corr: 36}, {kias: 90, corr: 28}, {kias: 100, corr: 18}, {kias: 120, corr: -11}, {kias: 140, corr: -48}, {kias: 160, corr: -102}, {kias: 180, corr: -174}],
                    landing:  [{kias: 80, corr: 24}, {kias: 90, corr: 16}, {kias: 92, corr: 14}, {kias: 100, corr: 5}, {kias: 120, corr: -30}, {kias: 140, corr: -76}]
                },
                tenThousand: {
                    clean:    [{kias: 80, corr: 87}, {kias: 90, corr: 91}, {kias: 100, corr: 92}, {kias: 110, corr: 85}, {kias: 120, corr: 69}, {kias: 140, corr: 49}, {kias: 160, corr: 18}, {kias: 180, corr: -18}, {kias: 200, corr: -18}, {kias: 220, corr: -70}, {kias: 240, corr: -123}],
                    approach: [{kias: 80, corr: 48}, {kias: 90, corr: 38}, {kias: 100, corr: 24}, {kias: 120, corr: -15}, {kias: 140, corr: -65}, {kias: 160, corr: -138}, {kias: 180, corr: -235}],
                    landing:  [{kias: 80, corr: 32}, {kias: 90, corr: 22}, {kias: 92, corr: 19}, {kias: 100, corr: 6}, {kias: 120, corr: -41}, {kias: 140, corr: -103}]
                },
                 twentyThousand: {
                    clean:    [{kias: 80, corr: 120}, {kias: 90, corr: 127}, {kias: 100, corr: 128}, {kias: 110, corr: 122}, {kias: 120, corr: 95}, {kias: 140, corr: 68}, {kias: 160, corr: 22}, {kias: 180, corr: -24}, {kias: 200, corr: -24}, {kias: 220, corr: -96}, {kias: 240, corr: -170}],
                    approach: [{kias: 80, corr: 67}, {kias: 90, corr: 53}, {kias: 100, corr: 34}, {kias: 120, corr: -20}, {kias: 140, corr: -90}, {kias: 160, corr: -191}, {kias: 180, corr: -326}],
                    landing:  [{kias: 80, corr: 44}, {kias: 90, corr: 30}, {kias: 92, corr: 26}, {kias: 100, corr: 8}, {kias: 120, corr: -57}, {kias: 140, corr: -143}]
                }
            }
        },
        // Figure 5-5: Temperature Rise (Ram Rise)
        ramRise: [
            { pa: 0, points: [{kias: 80, rise: 1}, {kias: 120, rise: 2.5}, {kias: 160, rise: 4}, {kias: 200, rise: 6.5}, {kias: 220, rise: 8}] },
            { pa: 5000, points: [{kias: 80, rise: 1}, {kias: 120, rise: 2.5}, {kias: 160, rise: 5}, {kias: 200, rise: 7.5}, {kias: 220, rise: 9}] },
            { pa: 10000, points: [{kias: 80, rise: 1.5}, {kias: 120, rise: 3}, {kias: 160, rise: 5.5}, {kias: 200, rise: 8.5}, {kias: 220, rise: 10}] },
            { pa: 15000, points: [{kias: 80, rise: 1.5}, {kias: 120, rise: 3.5}, {kias: 160, rise: 6}, {kias: 200, rise: 9.5}, {kias: 220, rise: 11.5}] },
            { pa: 20000, points: [{kias: 80, rise: 2}, {kias: 120, rise: 4}, {kias: 160, rise: 7}, {kias: 200, rise: 10.5}, {kias: 220, rise: 12.5}] },
            { pa: 25000, points: [{kias: 80, rise: 2}, {kias: 120, rise: 4.5}, {kias: 160, rise: 8}, {kias: 200, rise: 12}, {kias: 220, rise: 14.5}] },
            { pa: 30000, points: [{kias: 80, rise: 2.5}, {kias: 120, rise: 5}, {kias: 160, rise: 9}, {kias: 200, rise: 13.5}, {kias: 220, rise: 16}] }
        ]
    },

    // =============================================================================
    // 2. UTILITY FUNCTIONS
    // Generic helper functions for calculations, like interpolation.
    // =============================================================================
    utils: {
        // 1D Linear Interpolation
        interpolate1D(x, points, xProp = 'kias', yProp = 'kcas') {
            let p1 = null, p2 = null;
            for (const point of points) {
                if (point[xProp] <= x) p1 = point;
                if (point[xProp] >= x && !p2) p2 = point;
            }
            if (!p1 || !p2) return p1 ? p1[yProp] : p2 ? p2[yProp] : NaN;
            if (p1[xProp] === p2[xProp]) return p1[yProp];
            const factor = (x - p1[xProp]) / (p2[xProp] - p1[xProp]);
            return p1[yProp] + factor * (p2[yProp] - p1[yProp]);
        },
        // 2D Linear Interpolation
        interpolate2D(x, y, dataGrid, xProp = 'kias', yProp = 'pa', zProp = 'rise') {
            let p1 = null, p2 = null;
            for (const row of dataGrid) {
                if (row[yProp] <= y) p1 = row;
                if (row[yProp] >= y && !p2) p2 = row;
            }
            if (!p1 || !p2) return this.interpolate1D(x, (p1 || p2).points, xProp, zProp);
            if (p1[yProp] === p2[yProp]) return this.interpolate1D(x, p1.points, xProp, zProp);
            
            const val1 = this.interpolate1D(x, p1.points, xProp, zProp);
            const val2 = this.interpolate1D(x, p2.points, xProp, zProp);
            
            const factor = (y - p1[yProp]) / (p2[yProp] - p1[yProp]);
            return val1 + factor * (val2 - val1);
        },
        // 3D Linear Interpolation (for Altimeter Correction)
        interpolateAltimeter(kias, pa, config, source) {
            const sourceData = C414ACalculator.data.altimeterCorrection[source];
            let altP1 = null, altP2 = null;
            const altLevels = [{key: 'seaLevel', val: 0}, {key: 'tenThousand', val: 10000}, {key: 'twentyThousand', val: 20000}];
            
            for(const level of altLevels){
                if(level.val <= pa) altP1 = level;
                if(level.val >= pa && !altP2) altP2 = level;
            }

            if (!altP1 || !altP2) {
                const data = sourceData[(altP1 || altP2).key][config];
                return this.interpolate1D(kias, data, 'kias', 'corr');
            }
            
            if (altP1.val === altP2.val) {
                 const data = sourceData[altP1.key][config];
                 return this.interpolate1D(kias, data, 'kias', 'corr');
            }

            const val1 = this.interpolate1D(kias, sourceData[altP1.key][config], 'kias', 'corr');
            const val2 = this.interpolate1D(kias, sourceData[altP2.key][config], 'kias', 'corr');

            const factor = (pa - altP1.val) / (altP2.val - altP1.val);
            return val1 + factor * (val2 - val1);
        }
    },

    // =============================================================================
    // 3. MODULE 1: FUNCTION IMPLEMENTATION
    // =============================================================================
    module1: {
        getPressureAltitude(fieldElevation, altimeterSetting) {
            if (isNaN(fieldElevation) || isNaN(altimeterSetting)) return NaN;
            const pressureDiff = altimeterSetting - 29.92;
            const correction = (pressureDiff / 0.1) * 100;
            return fieldElevation - correction;
        },

        getKCAS(kias, configuration, staticSource) {
             if (isNaN(kias) || !configuration || !staticSource) return NaN;
             const table = C414ACalculator.data.airspeedCalibration[staticSource][configuration];
             return C414ACalculator.utils.interpolate1D(kias, table, 'kias', 'kcas');
        },

        getAltimeterCorrection(kias, pa, config, source) {
            if (isNaN(kias) || isNaN(pa) || !config || !source) return NaN;
            return C414ACalculator.utils.interpolateAltimeter(kias, pa, config, source);
        },
        
        getIndicatedAltitudeToFly(desiredAltitude, altimeterCorrection){
             if (isNaN(desiredAltitude) || isNaN(altimeterCorrection)) return NaN;
             return desiredAltitude - altimeterCorrection;
        },

        getRamRise(kias, pa) {
            if (isNaN(kias) || isNaN(pa)) return NaN;
            return C414ACalculator.utils.interpolate2D(kias, pa, C414ACalculator.data.ramRise, 'kias', 'pa', 'rise');
        },

        getTrueOAT(indicatedOAT, ramRise){
            if (isNaN(indicatedOAT) || isNaN(ramRise)) return NaN;
            return indicatedOAT - ramRise;
        },
        
        getWindComponents(runwayHdg, windDir, windSpeed) {
            if (isNaN(runwayHdg) || isNaN(windDir) || isNaN(windSpeed)) return { headwind: NaN, crosswind: NaN };
            
            let angleDiff = windDir - runwayHdg;
            if (angleDiff > 180) angleDiff -= 360;
            if (angleDiff < -180) angleDiff += 360;

            const angleInRadians = angleDiff * (Math.PI / 180);
            
            const headwind = windSpeed * Math.cos(angleInRadians);
            const crosswind = windSpeed * Math.sin(angleInRadians);

            return { headwind: headwind, crosswind: crosswind };
        }
    },

    // =============================================================================
    // 4. EVENT LISTENERS
    // Connects the UI buttons with the Module 1 functions.
    // =============================================================================
    init() {
        document.querySelectorAll('button[data-calc]').forEach(button => {
            button.addEventListener('click', (event) => {
                const calcType = event.target.getAttribute('data-calc');
                this.runCalculation(calcType);
            });
        });
    },
    
    runCalculation(calcType) {
        switch(calcType) {
            case 'pressure-altitude': {
                const elev = parseFloat(document.getElementById('field-elevation').value);
                const setting = parseFloat(document.getElementById('altimeter-setting').value);
                const result = this.module1.getPressureAltitude(elev, setting);
                document.getElementById('pressure-altitude-result').textContent = isNaN(result) ? "---" : result.toFixed(0);
                break;
            }
            case 'airspeed-cal': {
                const kias = parseFloat(document.getElementById('kias-cal').value);
                const config = document.getElementById('config-cal').value;
                const source = document.getElementById('static-source-cal').value;
                const result = this.module1.getKCAS(kias, config, source);
                document.getElementById('airspeed-cal-result').textContent = isNaN(result) ? "---" : result.toFixed(1);
                break;
            }
            case 'altimeter-corr': {
                const kias = parseFloat(document.getElementById('kias-alt').value);
                const pa = parseFloat(document.getElementById('pa-alt').value);
                const config = document.getElementById('config-alt').value;
                const source = document.getElementById('static-source-alt').value;
                const correction = this.module1.getAltimeterCorrection(kias, pa, config, source);
                const indicatedToFly = this.module1.getIndicatedAltitudeToFly(pa, correction);
                
                document.getElementById('altimeter-corr-result').textContent = isNaN(correction) ? "---" : `${correction >= 0 ? '+' : ''}${correction.toFixed(0)}`;
                document.getElementById('indicated-alt-to-fly-result').textContent = isNaN(indicatedToFly) ? "---" : indicatedToFly.toFixed(0);
                break;
            }
            case 'ram-rise': {
                 const kias = parseFloat(document.getElementById('kias-temp').value);
                 const pa = parseFloat(document.getElementById('pa-temp').value);
                 const indicatedOAT = parseFloat(document.getElementById('indicated-oat').value);
                 const ramRise = this.module1.getRamRise(kias, pa);
                 const trueOAT = this.module1.getTrueOAT(indicatedOAT, ramRise);

                 document.getElementById('ram-rise-result').textContent = isNaN(ramRise) ? "---" : ramRise.toFixed(1);
                 document.getElementById('true-oat-result').textContent = isNaN(trueOAT) ? "---" : trueOAT.toFixed(1);
                 break;
            }
            case 'wind-comp': {
                const runway = parseFloat(document.getElementById('runway-hdg').value);
                const dir = parseFloat(document.getElementById('wind-dir').value);
                const speed = parseFloat(document.getElementById('wind-speed').value);
                const result = this.module1.getWindComponents(runway, dir, speed);
                
                const headwindText = isNaN(result.headwind) ? "---" : `${result.headwind >= 0 ? 'Headwind' : 'Tailwind'}: ${Math.abs(result.headwind).toFixed(1)}`;
                const crosswindText = isNaN(result.crosswind) ? "---" : `${Math.abs(result.crosswind).toFixed(1)} (from ${result.crosswind >= 0 ? 'Right' : 'Left'})`;

                document.getElementById('headwind-result').textContent = headwindText;
                document.getElementById('crosswind-result').textContent = crosswindText;
                break;
            }
        }
    }
};

// Initialize the script when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    C414ACalculator.init();
});
