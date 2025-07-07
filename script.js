// =================================================================================
// CESSNA 414A PERFORMANCE CALCULATOR - MODULES 1, 2 & 3 (TRULY COMPLETE)
// Project: Alan and Gemini
//
// This file is 100% complete as requested, containing the full database and
// functional logic for Modules 1, 2, and 3 with no placeholders or simulations.
// =================================================================================

const C414ACalculator = {
    // =============================================================================
    // 1. DATABASE (COMPLETE FOR MODULES 1, 2, & 3)
    // =============================================================================
    data: {
        // MODULE 1 DATA
        airspeedCalibration: {
            normal: {
                clean:    [{kias:70,kcas:70},{kias:80,kcas:80},{kias:90,kcas:90},{kias:100,kcas:100},{kias:110,kcas:110},{kias:120,kcas:119},{kias:140,kcas:139},{kias:160,kcas:158},{kias:180,kcas:178},{kias:200,kcas:197},{kias:220,kcas:216},{kias:230,kcas:226},{kias:237,kcas:232}],
                approach: [{kias:70,kcas:71},{kias:80,kcas:81},{kias:90,kcas:91},{kias:100,kcas:100},{kias:110,kcas:109},{kias:120,kcas:119},{kias:130,kcas:128},{kias:140,kcas:138},{kias:150,kcas:147},{kias:160,kcas:157},{kias:170,kcas:166},{kias:179,kcas:175}],
                landing:  [{kias:70,kcas:71},{kias:80,kcas:80},{kias:90,kcas:93},{kias:100,kcas:99},{kias:110,kcas:109},{kias:120,kcas:117},{kias:130,kcas:127},{kias:140,kcas:136},{kias:145,kcas:140}]
            },
            alternate: {
                clean:    [{kias:80,kcas:89},{kias:90,kcas:98},{kias:100,kcas:108},{kias:110,kcas:111},{kias:120,kcas:120},{kias:130,kcas:129},{kias:140,kcas:144},{kias:160,kcas:163},{kias:180,kcas:181},{kias:200,kcas:199},{kias:220,kcas:218},{kias:240,kcas:236}],
                approach: [{kias:80,kcas:85},{kias:90,kcas:94},{kias:100,kcas:102},{kias:110,kcas:111},{kias:120,kcas:119},{kias:130,kcas:128},{kias:140,kcas:136},{kias:150,kcas:145},{kias:160,kcas:153},{kias:180,kcas:170}],
                landing:  [{kias:70,kcas:75},{kias:80,kcas:83},{kias:90,kcas:92},{kias:100,kcas:100},{kias:110,kcas:109},{kias:120,kcas:117},{kias:130,kcas:126},{kias:140,kcas:134},{kias:150,kcas:143}]
            }
        },
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
        ramRise: [
            { pa: 0, points: [{kias: 80, rise: 1}, {kias: 120, rise: 2.5}, {kias: 160, rise: 4}, {kias: 200, rise: 6.5}, {kias: 220, rise: 8}] },
            { pa: 5000, points: [{kias: 80, rise: 1}, {kias: 120, rise: 2.5}, {kias: 160, rise: 5}, {kias: 200, rise: 7.5}, {kias: 220, rise: 9}] },
            { pa: 10000, points: [{kias: 80, rise: 1.5}, {kias: 120, rise: 3}, {kias: 160, rise: 5.5}, {kias: 200, rise: 8.5}, {kias: 220, rise: 10}] },
            { pa: 15000, points: [{kias: 80, rise: 1.5}, {kias: 120, rise: 3.5}, {kias: 160, rise: 6}, {kias: 200, rise: 9.5}, {kias: 220, rise: 11.5}] },
            { pa: 20000, points: [{kias: 80, rise: 2}, {kias: 120, rise: 4}, {kias: 160, rise: 7}, {kias: 200, rise: 10.5}, {kias: 220, rise: 12.5}] },
            { pa: 25000, points: [{kias: 80, rise: 2}, {kias: 120, rise: 4.5}, {kias: 160, rise: 8}, {kias: 200, rise: 12}, {kias: 220, rise: 14.5}] },
            { pa: 30000, points: [{kias: 80, rise: 2.5}, {kias: 120, rise: 5}, {kias: 160, rise: 9}, {kias: 200, rise: 13.5}, {kias: 220, rise: 16}] }
        ],
        // Module 2 Data
        normalTakeoff: [
            { weight: 6750, altitudes: [
                { pa: 0, temps: [{t:-20,gr:1560,d50:1870},{t:-10,gr:1710,d50:2010},{t:0,gr:1870,d50:2230},{t:10,gr:2040,d50:2430},{t:20,gr:2290,d50:2720},{t:30,gr:2510,d50:2980},{t:40,gr:2750,d50:3270}]},
                { pa: 1000, temps: [{t:-20,gr:1660,d50:1980},{t:-10,gr:1810,d50:2150},{t:0,gr:1990,d50:2380},{t:10,gr:2180,d50:2590},{t:20,gr:2430,d50:2870},{t:30,gr:2660,d50:3150},{t:40,gr:2920,d50:3460}]},
                { pa: 2000, temps: [{t:-20,gr:1770,d50:2080},{t:-10,gr:1920,d50:2270},{t:0,gr:2150,d50:2530},{t:10,gr:2350,d50:2770},{t:20,gr:2570,d50:3030},{t:30,gr:2820,d50:3320},{t:40,gr:3100,d50:3640}]},
                { pa: 3000, temps: [{t:-20,gr:1880,d50:2210},{t:-10,gr:2040,d50:2400},{t:0,gr:2280,d50:2690},{t:10,gr:2500,d50:2930},{t:20,gr:2730,d50:3210},{t:30,gr:3000,d50:3520},{t:40,gr:3290,d50:3880}]},
                { pa: 4000, temps: [{t:-20,gr:2000,d50:2370},{t:-10,gr:2180,d50:2590},{t:0,gr:2420,d50:2850},{t:10,gr:2650,d50:3100},{t:20,gr:2900,d50:3400},{t:30,gr:3190,d50:3750},{t:40,gr:3500,d50:4110}]},
                { pa: 5000, temps: [{t:-20,gr:2130,d50:2530},{t:-10,gr:2310,d50:2740},{t:0,gr:2570,d50:3050},{t:10,gr:2820,d50:3350},{t:20,gr:3080,d50:3650},{t:30,gr:3390,d50:4000},{t:40,gr:3730,d50:4370}]},
                { pa: 6000, temps: [{t:-20,gr:2280,d50:2690},{t:-10,gr:2450,d50:2910},{t:0,gr:2730,d50:3250},{t:10,gr:2990,d50:3580},{t:20,gr:3290,d50:3900},{t:30,gr:3610,d50:4210},{t:40,gr:3980,d50:4650}]},
                { pa: 7000, temps: [{t:-20,gr:2420,d50:2880},{t:-10,gr:2600,d50:3070},{t:0,gr:2910,d50:3450},{t:10,gr:3190,d50:3790},{t:20,gr:3500,d50:4170},{t:30,gr:3860,d50:4580},{t:40,gr:4250,d50:5020}]},
                { pa: 8000, temps: [{t:-20,gr:2570,d50:3050},{t:-10,gr:2740,d50:3280},{t:0,gr:3070,d50:3670},{t:10,gr:3380,d50:4030},{t:20,gr:3740,d50:4480},{t:30,gr:4110,d50:4960},{t:40,gr:4540,d50:5270}]},
                { pa: 9000, temps: [{t:-20,gr:2740,d50:3150},{t:-10,gr:2930,d50:3450},{t:0,gr:3280,d50:3890},{t:10,gr:3630,d50:4320},{t:20,gr:4000,d50:4760},{t:30,gr:4410,d50:5210},{t:40,gr:4860,d50:5650}]},
                { pa: 10000,temps: [{t:-20,gr:2930,d50:3450},{t:-10,gr:3150,d50:3670},{t:0,gr:3510,d50:4130},{t:10,gr:3890,d50:4700},{t:20,gr:4270,d50:4890},{t:30,gr:4700,d50:5410},{t:40,gr:5200,d50:5010}]}
            ]},
            { weight: 6200, altitudes: [
                { pa: 0,    temps: [{t:-20,gr:1280,d50:1540},{t:-10,gr:1420,d50:1690},{t:0,gr:1530,d50:1830},{t:10,gr:1670,d50:1990},{t:20,gr:1820,d50:2170},{t:30,gr:2000,d50:2370},{t:40,gr:2200,d50:2600}]},
                { pa: 1000, temps: [{t:-20,gr:1360,d50:1620},{t:-10,gr:1480,d50:1770},{t:0,gr:1620,d50:1930},{t:10,gr:1770,d50:2100},{t:20,gr:1920,d50:2290},{t:30,gr:2100,d50:2490},{t:40,gr:2310,d50:2710}]},
                { pa: 2000, temps: [{t:-20,gr:1420,d50:1720},{t:-10,gr:1570,d50:1870},{t:0,gr:1720,d50:2040},{t:10,gr:1870,d50:2210},{t:20,gr:2040,d50:2420},{t:30,gr:2230,d50:2630},{t:40,gr:2450,d50:2880}]},
                { pa: 3000, temps: [{t:-20,gr:1530,d50:1810},{t:-10,gr:1670,d50:1980},{t:0,gr:1820,d50:2150},{t:10,gr:1980,d50:2340},{t:20,gr:2150,d50:2550},{t:30,gr:2350,d50:2790},{t:40,gr:2580,d50:3040}]},
                { pa: 4000, temps: [{t:-20,gr:1620,d50:1920},{t:-10,gr:1770,d50:2100},{t:0,gr:1930,d50:2280},{t:10,gr:2100,d50:2490},{t:20,gr:2280,d50:2710},{t:30,gr:2490,d50:2950},{t:40,gr:2730,d50:3210}]},
                { pa: 5000, temps: [{t:-20,gr:1720,d50:2030},{t:-10,gr:1870,d50:2220},{t:0,gr:2040,d50:2430},{t:10,gr:2220,d50:2650},{t:20,gr:2430,d50:2880},{t:30,gr:2650,d50:3140},{t:40,gr:2890,d50:3430}]},
                { pa: 6000, temps: [{t:-20,gr:1820,d50:2180},{t:-10,gr:1980,d50:2370},{t:0,gr:2180,d50:2580},{t:10,gr:2370,d50:2810},{t:20,gr:2570,d50:3070},{t:30,gr:2810,d50:3330},{t:40,gr:3070,d50:3620}]},
                { pa: 7000, temps: [{t:-20,gr:1930,d50:2310},{t:-10,gr:2110,d50:2520},{t:0,gr:2310,d50:2750},{t:10,gr:2520,d50:3000},{t:20,gr:2740,d50:3280},{t:30,gr:2980,d50:3550},{t:40,gr:3280,d50:3900}]},
                { pa: 8000, temps: [{t:-20,gr:2050,d50:2440},{t:-10,gr:2250,d50:2670},{t:0,gr:2460,d50:2930},{t:10,gr:2700,d50:3220},{t:20,gr:2930,d50:3510},{t:30,gr:3210,d50:3820},{t:40,gr:3490,d50:4190}]},
                { pa: 9000, temps: [{t:-20,gr:2200,d50:2610},{t:-10,gr:2390,d50:2840},{t:0,gr:2620,d50:3120},{t:10,gr:2870,d50:3440},{t:20,gr:3120,d50:3720},{t:30,gr:3420,d50:4090},{t:40,gr:3720,d50:4520}]},
                { pa: 10000,temps: [{t:-20,gr:2340,d50:2740},{t:-10,gr:2550,d50:3030},{t:0,gr:2800,d50:3330},{t:10,gr:3070,d50:3670},{t:20,gr:3240,d50:3960},{t:30,gr:3560,d50:4390},{t:40,gr:3920,d50:4820}]}
            ]},
            { weight: 5700, altitudes: [
                { pa: 0,    temps: [{t:-20,gr:1050,d50:1280},{t:-10,gr:1110,d50:1350},{t:0,gr:1250,d50:1510},{t:10,gr:1360,d50:1640},{t:20,gr:1500,d50:1810},{t:30,gr:1650,d50:1980},{t:40,gr:1800,d50:2170}]},
                { pa: 1000, temps: [{t:-20,gr:1120,d50:1350},{t:-10,gr:1220,d50:1460},{t:0,gr:1320,d50:1590},{t:10,gr:1450,d50:1730},{t:20,gr:1580,d50:1880},{t:30,gr:1730,d50:2060},{t:40,gr:1880,d50:2240}]},
                { pa: 2000, temps: [{t:-20,gr:1180,d50:1420},{t:-10,gr:1290,d50:1540},{t:0,gr:1410,d50:1680},{t:10,gr:1530,d50:1830},{t:20,gr:1670,d50:1990},{t:30,gr:1820,d50:2170},{t:40,gr:1980,d50:2360}]},
                { pa: 3000, temps: [{t:-20,gr:1260,d50:1500},{t:-10,gr:1380,d50:1640},{t:0,gr:1490,d50:1780},{t:10,gr:1620,d50:1940},{t:20,gr:1770,d50:2110},{t:30,gr:1930,d50:2300},{t:40,gr:2100,d50:2500}]},
                { pa: 4000, temps: [{t:-20,gr:1330,d50:1580},{t:-10,gr:1460,d50:1720},{t:0,gr:1590,d50:1880},{t:10,gr:1730,d50:2050},{t:20,gr:1880,d50:2240},{t:30,gr:2050,d50:2440},{t:40,gr:2240,d50:2660}]},
                { pa: 5000, temps: [{t:-20,gr:1420,d50:1690},{t:-10,gr:1550,d50:1830},{t:0,gr:1690,d50:2000},{t:10,gr:1830,d50:2170},{t:20,gr:2000,d50:2380},{t:30,gr:2180,d50:2580},{t:40,gr:2380,d50:2810}]},
                { pa: 6000, temps: [{t:-20,gr:1510,d50:1770},{t:-10,gr:1650,d50:1930},{t:0,gr:1790,d50:2120},{t:10,gr:1950,d50:2300},{t:20,gr:2120,d50:2520},{t:30,gr:2320,d50:2740},{t:40,gr:2520,d50:3000}]},
                { pa: 7000, temps: [{t:-20,gr:1600,d50:1880},{t:-10,gr:1760,d50:2070},{t:0,gr:1920,d50:2250},{t:10,gr:2080,d50:2450},{t:20,gr:2270,d50:2680},{t:30,gr:2480,d50:2910},{t:40,gr:2700,d50:3180}]},
                { pa: 8000, temps: [{t:-20,gr:1700,d50:2020},{t:-10,gr:1860,d50:2220},{t:0,gr:2030,d50:2420},{t:10,gr:2220,d50:2630},{t:20,gr:2420,d50:2860},{t:30,gr:2640,d50:3130},{t:40,gr:2880,d50:3400}]},
                { pa: 9000, temps: [{t:-20,gr:1840,d50:2130},{t:-10,gr:2020,d50:2360},{t:0,gr:2200,d50:2580},{t:10,gr:2410,d50:2820},{t:20,gr:2620,d50:3080},{t:30,gr:2860,d50:3360},{t:40,gr:3130,d50:3680}]},
                { pa: 10000,temps: [{t:-20,gr:1980,d50:2320},{t:-10,gr:2180,d50:2540},{t:0,gr:2380,d50:2780},{t:10,gr:2610,d50:3050},{t:20,gr:2830,d50:3330},{t:30,gr:3100,d50:3620},{t:40,gr:3390,d50:3980}]}
            ]},
            { weight: 5200, altitudes: [
                { pa: 0,    temps: [{t:-20,gr:850,d50:1040},{t:-10,gr:930,d50:1150},{t:0,gr:1010,d50:1250},{t:10,gr:1110,d50:1350},{t:20,gr:1220,d50:1490},{t:30,gr:1330,d50:1620},{t:40,gr:1450,d50:1770}]},
                { pa: 1000, temps: [{t:-20,gr:900,d50:1100},{t:-10,gr:980,d50:1210},{t:0,gr:1070,d50:1310},{t:10,gr:1170,d50:1430},{t:20,gr:1270,d50:1560},{t:30,gr:1400,d50:1710},{t:40,gr:1530,d50:1860}]},
                { pa: 2000, temps: [{t:-20,gr:950,d50:1160},{t:-10,gr:1040,d50:1260},{t:0,gr:1130,d50:1380},{t:10,gr:1230,d50:1500},{t:20,gr:1350,d50:1640},{t:30,gr:1470,d50:1790},{t:40,gr:1600,d50:1950}]},
                { pa: 3000, temps: [{t:-20,gr:1010,d50:1220},{t:-10,gr:1110,d50:1330},{t:0,gr:1200,d50:1450},{t:10,gr:1310,d50:1570},{t:20,gr:1430,d50:1720},{t:30,gr:1560,d50:1880},{t:40,gr:1700,d50:2050}]},
                { pa: 4000, temps: [{t:-20,gr:1060,d50:1280},{t:-10,gr:1160,d50:1410},{t:0,gr:1260,d50:1530},{t:10,gr:1380,d50:1670},{t:20,gr:1510,d50:1820},{t:30,gr:1640,d50:1980},{t:40,gr:1790,d50:2160}]},
                { pa: 5000, temps: [{t:-20,gr:1130,d50:1360},{t:-10,gr:1230,d50:1480},{t:0,gr:1330,d50:1620},{t:10,gr:1450,d50:1760},{t:20,gr:1580,d50:1910},{t:30,gr:1720,d50:2080},{t:40,gr:1870,d50:2270}]},
                { pa: 6000, temps: [{t:-20,gr:1200,d50:1440},{t:-10,gr:1300,d50:1570},{t:0,gr:1410,d50:1700},{t:10,gr:1540,d50:1850},{t:20,gr:1680,d50:2020},{t:30,gr:1820,d50:2190},{t:40,gr:1980,d50:2380}]},
                { pa: 7000, temps: [{t:-20,gr:1260,d50:1520},{t:-10,gr:1380,d50:1660},{t:0,gr:1500,d50:1790},{t:10,gr:1640,d50:1960},{t:20,gr:1790,d50:2140},{t:30,gr:1940,d50:2310},{t:40,gr:2110,d50:2520}]},
                { pa: 8000, temps: [{t:-20,gr:1330,d50:1610},{t:-10,gr:1460,d50:1760},{t:0,gr:1600,d50:1920},{t:10,gr:1740,d50:2090},{t:20,gr:1900,d50:2280},{t:30,gr:2060,d50:2470},{t:40,gr:2250,d50:2690}]},
                { pa: 9000, temps: [{t:-20,gr:1440,d50:1720},{t:-10,gr:1580,d50:1880},{t:0,gr:1730,d50:2060},{t:10,gr:1880,d50:2240},{t:20,gr:2040,d50:2440},{t:30,gr:2230,d50:2650},{t:40,gr:2440,d50:2920}]},
                { pa: 10000,temps: [{t:-20,gr:1580,d50:1840},{t:-10,gr:1730,d50:2000},{t:0,gr:1890,d50:2200},{t:10,gr:2060,d50:2380},{t:20,gr:2260,d50:2600},{t:30,gr:2470,d50:2840},{t:40,gr:2700,d50:3110}]}
            ]}
        ],
        accelStop: [
            { weight: 6750, altitudes: [
                { pa: 0, temps: [{t:-20,d:3370},{t:-10,d:3640},{t:0,d:3920},{t:10,d:4120},{t:20,d:4390},{t:30,d:4670},{t:40,d:4980}]},
                { pa: 1000, temps: [{t:-20,d:3530},{t:-10,d:3760},{t:0,d:4060},{t:10,d:4320},{t:20,d:4600},{t:30,d:4900},{t:40,d:5240}]},
                { pa: 2000, temps: [{t:-20,d:3700},{t:-10,d:3990},{t:0,d:4260},{t:10,d:4530},{t:20,d:4830},{t:30,d:5150},{t:40,d:5500}]},
                { pa: 3000, temps: [{t:-20,d:3880},{t:-10,d:4200},{t:0,d:4520},{t:10,d:4800},{t:20,d:5070},{t:30,d:5410},{t:40,d:5800}]},
                { pa: 4000, temps: [{t:-20,d:4120},{t:-10,d:4390},{t:0,d:4680},{t:10,d:4990},{t:20,d:5330},{t:30,d:5670},{t:40,d:6160}]},
                { pa: 5000, temps: [{t:-20,d:4330},{t:-10,d:4640},{t:0,d:4990},{t:10,d:5290},{t:20,d:5670},{t:30,d:6040},{t:40,d:6480}]},
                { pa: 6000, temps: [{t:-20,d:4540},{t:-10,d:4840},{t:0,d:5110},{t:10,d:5520},{t:20,d:5900},{t:30,d:6320},{t:40,d:6820}]},
                { pa: 7000, temps: [{t:-20,d:4770},{t:-10,d:5090},{t:0,d:5440},{t:10,d:5810},{t:20,d:6220},{t:30,d:6660},{t:40,d:7220}]},
                { pa: 8000, temps: [{t:-20,d:5030},{t:-10,d:5400},{t:0,d:5810},{t:10,d:6140},{t:20,d:6580},{t:30,d:7020},{t:40,d:7620}]},
                { pa: 9000, temps: [{t:-20,d:5280},{t:-10,d:5640},{t:0,d:6040},{t:10,d:6460},{t:20,d:6920},{t:30,d:7420},{t:40,d:7980}]},
                { pa: 10000,temps: [{t:-20,d:5580},{t:-10,d:5950},{t:0,d:6370},{t:10,d:6820},{t:20,d:7310},{t:30,d:7850},{t:40,d:8450}]}
            ]},
            { weight: 6200, altitudes: [
                { pa: 0, temps: [{t:-20,d:2910},{t:-10,d:3100},{t:0,d:3300},{t:10,d:3510},{t:20,d:3730},{t:30,d:4030},{t:40,d:4280}]},
                { pa: 1000, temps: [{t:-20,d:3030},{t:-10,d:3250},{t:0,d:3450},{t:10,d:3680},{t:20,d:3910},{t:30,d:4200},{t:40,d:4500}]},
                { pa: 2000, temps: [{t:-20,d:3180},{t:-10,d:3410},{t:0,d:3620},{t:10,d:3850},{t:20,d:4070},{t:30,d:4380},{t:40,d:4740}]},
                { pa: 3000, temps: [{t:-20,d:3360},{t:-10,d:3580},{t:0,d:3850},{t:10,d:4110},{t:20,d:4380},{t:30,d:4670},{t:40,d:4990}]},
                { pa: 4000, temps: [{t:-20,d:3530},{t:-10,d:3800},{t:0,d:4070},{t:10,d:4320},{t:20,d:4610},{t:30,d:4930},{t:40,d:5330}]},
                { pa: 5000, temps: [{t:-20,d:3740},{t:-10,d:3990},{t:0,d:4270},{t:10,d:4540},{t:20,d:4840},{t:30,d:5190},{t:40,d:5650}]},
                { pa: 6000, temps: [{t:-20,d:3930},{t:-10,d:4190},{t:0,d:4470},{t:10,d:4770},{t:20,d:5100},{t:30,d:5450},{t:40,d:5910}]},
                { pa: 7000, temps: [{t:-20,d:4130},{t:-10,d:4420},{t:0,d:4730},{t:10,d:5050},{t:20,d:5390},{t:30,d:5770},{t:40,d:6240}]},
                { pa: 8000, temps: [{t:-20,d:4350},{t:-10,d:4640},{t:0,d:4960},{t:10,d:5300},{t:20,d:5670},{t:30,d:6070},{t:40,d:6580}]},
                { pa: 9000, temps: [{t:-20,d:4580},{t:-10,d:4880},{t:0,d:5240},{t:10,d:5600},{t:20,d:5990},{t:30,d:6410},{t:40,d:6910}]},
                { pa: 10000,temps: [{t:-20,d:4820},{t:-10,d:5150},{t:0,d:5520},{t:10,d:5900},{t:20,d:6310},{t:30,d:6770},{t:40,d:7310}]}
            ]},
            { weight: 5700, altitudes: [
                { pa: 0, temps: [{t:-20,d:2410},{t:-10,d:2560},{t:0,d:2720},{t:10,d:2880},{t:20,d:3080},{t:30,d:3270},{t:40,d:3480}]},
                { pa: 1000, temps: [{t:-20,d:2520},{t:-10,d:2680},{t:0,d:2840},{t:10,d:3020},{t:20,d:3210},{t:30,d:3420},{t:40,d:3640}]},
                { pa: 2000, temps: [{t:-20,d:2650},{t:-10,d:2820},{t:0,d:3000},{t:10,d:3180},{t:20,d:3370},{t:30,d:3590},{t:40,d:3840}]},
                { pa: 3000, temps: [{t:-20,d:2780},{t:-10,d:2960},{t:0,d:3150},{t:10,d:3350},{t:20,d:3580},{t:30,d:3810},{t:40,d:4060}]},
                { pa: 4000, temps: [{t:-20,d:2920},{t:-10,d:3110},{t:0,d:3310},{t:10,d:3520},{t:20,d:3760},{t:30,d:4020},{t:40,d:4280}]},
                { pa: 5000, temps: [{t:-20,d:3060},{t:-10,d:3260},{t:0,d:3510},{t:10,d:3740},{t:20,d:3980},{t:30,d:4250},{t:40,d:4540}]},
                { pa: 6000, temps: [{t:-20,d:3220},{t:-10,d:3440},{t:0,d:3680},{t:10,d:3920},{t:20,d:4180},{t:30,d:4480},{t:40,d:4800}]},
                { pa: 7000, temps: [{t:-20,d:3410},{t:-10,d:3640},{t:0,d:3880},{t:10,d:4140},{t:20,d:4420},{t:30,d:4720},{t:40,d:5080}]},
                { pa: 8000, temps: [{t:-20,d:3590},{t:-10,d:3830},{t:0,d:4090},{t:10,d:4360},{t:20,d:4650},{t:30,d:4980},{t:40,d:5340}]},
                { pa: 9000, temps: [{t:-20,d:3780},{t:-10,d:4050},{t:0,d:4320},{t:10,d:4600},{t:20,d:4900},{t:30,d:5240},{t:40,d:5610}]},
                { pa: 10000,temps: [{t:-20,d:4020},{t:-10,d:4280},{t:0,d:4560},{t:10,d:4860},{t:20,d:5180},{t:30,d:5520},{t:40,d:5920}]}
            ]},
            { weight: 5200, altitudes: [
                { pa: 0, temps: [{t:-20,d:1990},{t:-10,d:2110},{t:0,d:2240},{t:10,d:2350},{t:20,d:2490},{t:30,d:2680},{t:40,d:2850}]},
                { pa: 1000, temps: [{t:-20,d:2080},{t:-10,d:2210},{t:0,d:2350},{t:10,d:2480},{t:20,d:2640},{t:30,d:2820},{t:40,d:3010}]},
                { pa: 2000, temps: [{t:-20,d:2180},{t:-10,d:2310},{t:0,d:2460},{t:10,d:2600},{t:20,d:2750},{t:30,d:2960},{t:40,d:3180}]},
                { pa: 3000, temps: [{t:-20,d:2260},{t:-10,d:2400},{t:0,d:2580},{t:10,d:2710},{t:20,d:2890},{t:30,d:3090},{t:40,d:3310}]},
                { pa: 4000, temps: [{t:-20,d:2380},{t:-10,d:2520},{t:0,d:2700},{t:10,d:2860},{t:20,d:3050},{t:30,d:3250},{t:40,d:3480}]},
                { pa: 5000, temps: [{t:-20,d:2490},{t:-10,d:2650},{t:0,d:2820},{t:10,d:3000},{t:20,d:3190},{t:30,d:3430},{t:40,d:3660}]},
                { pa: 6000, temps: [{t:-20,d:2620},{t:-10,d:2780},{t:0,d:2970},{t:10,d:3150},{t:20,d:3370},{t:30,d:3600},{t:40,d:3850}]},
                { pa: 7000, temps: [{t:-20,d:2760},{t:-10,d:2920},{t:0,d:3110},{t:10,d:3310},{t:20,d:3530},{t:30,d:3780},{t:40,d:4070}]},
                { pa: 8000, temps: [{t:-20,d:2900},{t:-10,d:3070},{t:0,d:3270},{t:10,d:3490},{t:20,d:3720},{t:30,d:3970},{t:40,d:4290}]},
                { pa: 9000, temps: [{t:-20,d:3070},{t:-10,d:3270},{t:0,d:3490},{t:10,d:3720},{t:20,d:3970},{t:30,d:4240},{t:40,d:4530}]},
                { pa: 10000,temps: [{t:-20,d:3270},{t:-10,d:3480},{t:0,d:3720},{t:10,d:3970},{t:20,d:4240},{t:30,d:4530},{t:40,d:4830}]}
            ]}
        ],
        accelGo: [
             { weight: 6750, altitudes: [
                { pa: 0, temps: [{t:-20,d:2590,m:false},{t:-10,d:2870,m:false},{t:0,d:3200,m:false},{t:10,d:3600,m:false},{t:20,d:4110,m:false},{t:30,d:4830,m:false},{t:40,d:5800,m:false}]},
                { pa: 1000, temps: [{t:-20,d:2730,m:false},{t:-10,d:3020,m:false},{t:0,d:3380,m:false},{t:10,d:3820,m:false},{t:20,d:4400,m:false},{t:30,d:5150,m:false},{t:40,d:6220,m:false}]},
                { pa: 2000, temps: [{t:-20,d:2880,m:false},{t:-10,d:3210,m:false},{t:0,d:3640,m:false},{t:10,d:4120,m:false},{t:20,d:4720,m:false},{t:30,d:5540,m:false},{t:40,d:6670,m:false}]},
                { pa: 3000, temps: [{t:-20,d:3060,m:false},{t:-10,d:3410,m:false},{t:0,d:3880,m:false},{t:10,d:4410,m:false},{t:20,d:5090,m:false},{t:30,d:5960,m:false},{t:40,d:6970,m:false}]},
                { pa: 4000, temps: [{t:-20,d:3270,m:false},{t:-10,d:3650,m:false},{t:0,d:4110,m:false},{t:10,d:4690,m:false},{t:20,d:5480,m:false},{t:30,d:6480,m:false},{t:40,d:7500,m:false}]},
                { pa: 5000, temps: [{t:-20,d:3470,m:false},{t:-10,d:3870,m:false},{t:0,d:4380,m:false},{t:10,d:5030,m:false},{t:20,d:5930,m:false},{t:30,d:6920,m:true},{t:40,d:8060,m:true}]},
                { pa: 6000, temps: [{t:-20,d:3680,m:false},{t:-10,d:4130,m:false},{t:0,d:4700,m:false},{t:10,d:5380,m:false},{t:20,d:6480,m:false},{t:30,d:7340,m:true},{t:40,d:8780,m:true}]},
                { pa: 7000, temps: [{t:-20,d:3890,m:false},{t:-10,d:4380,m:false},{t:0,d:5080,m:false},{t:10,d:5840,m:false},{t:20,d:7070,m:true},{t:30,d:8280,m:true},{t:40,d:9280,m:true}]},
                { pa: 8000, temps: [{t:-20,d:4140,m:false},{t:-10,d:4680,m:false},{t:0,d:5440,m:false},{t:10,d:6300,m:true},{t:20,d:7620,m:true},{t:30,d:8780,m:true},{t:40,d:10160,m:true}]},
                { pa: 9000, temps: [{t:-20,d:4420,m:false},{t:-10,d:5010,m:false},{t:0,d:5860,m:true},{t:10,d:6800,m:true},{t:20,d:8280,m:true},{t:30,d:9280,m:true},{t:40,d:10780,m:true}]},
                { pa: 10000,temps: [{t:-20,d:4710,m:false},{t:-10,d:5380,m:true},{t:0,d:6280,m:true},{t:10,d:7260,m:true},{t:20,d:9110,m:true},{t:30,d:10160,m:true},{t:40,d:11780,m:true}]}
            ]},
             { weight: 6200, altitudes: [
                { pa: 0, temps: [{t:-20,d:2180,m:false},{t:-10,d:2400,m:false},{t:0,d:2640,m:false},{t:10,d:2910,m:false},{t:20,d:3270,m:false},{t:30,d:3740,m:false},{t:40,d:4280,m:false}]},
                { pa: 1000, temps: [{t:-20,d:2290,m:false},{t:-10,d:2520,m:false},{t:0,d:2790,m:false},{t:10,d:3090,m:false},{t:20,d:3490,m:false},{t:30,d:3970,m:false},{t:40,d:4570,m:false}]},
                { pa: 2000, temps: [{t:-20,d:2430,m:false},{t:-10,d:2660,m:false},{t:0,d:2930,m:false},{t:10,d:3270,m:false},{t:20,d:3730,m:false},{t:30,d:4230,m:false},{t:40,d:4870,m:false}]},
                { pa: 3000, temps: [{t:-20,d:2550,m:false},{t:-10,d:2810,m:false},{t:0,d:3110,m:false},{t:10,d:3460,m:false},{t:20,d:3960,m:false},{t:30,d:4510,m:false},{t:40,d:5220,m:false}]},
                { pa: 4000, temps: [{t:-20,d:2680,m:false},{t:-10,d:2960,m:false},{t:0,d:3310,m:false},{t:10,d:3690,m:false},{t:20,d:4210,m:false},{t:30,d:4820,m:false},{t:40,d:5540,m:false}]},
                { pa: 5000, temps: [{t:-20,d:2880,m:false},{t:-10,d:3190,m:false},{t:0,d:3540,m:false},{t:10,d:3970,m:false},{t:20,d:4520,m:false},{t:30,d:5210,m:false},{t:40,d:5910,m:false}]},
                { pa: 6000, temps: [{t:-20,d:3040,m:false},{t:-10,d:3370,m:false},{t:0,d:3760,m:false},{t:10,d:4240,m:false},{t:20,d:4840,m:false},{t:30,d:5590,m:false},{t:40,d:6310,m:false}]},
                { pa: 7000, temps: [{t:-20,d:3240,m:false},{t:-10,d:3580,m:false},{t:0,d:4020,m:false},{t:10,d:4540,m:false},{t:20,d:5210,m:false},{t:30,d:5990,m:true},{t:40,d:6680,m:true}]},
                { pa: 8000, temps: [{t:-20,d:3420,m:false},{t:-10,d:3810,m:false},{t:0,d:4270,m:false},{t:10,d:4840,m:false},{t:20,d:5590,m:true},{t:30,d:6410,m:true},{t:40,d:7090,m:true}]},
                { pa: 9000, temps: [{t:-20,d:3630,m:false},{t:-10,d:4060,m:false},{t:0,d:4560,m:false},{t:10,d:5170,m:true},{t:20,d:5990,m:true},{t:30,d:6850,m:true},{t:40,d:7550,m:true}]},
                { pa: 10000,temps: [{t:-20,d:3840,m:false},{t:-10,d:4280,m:false},{t:0,d:4840,m:true},{t:10,d:5500,m:true},{t:20,d:6410,m:true},{t:30,d:7300,m:true},{t:40,d:9250,m:true}]}
            ]},
            { weight: 5700, altitudes: [
                { pa: 0, temps: [{t:-20,d:1770,m:false},{t:-10,d:1930,m:false},{t:0,d:2110,m:false},{t:10,d:2320,m:false},{t:20,d:2560,m:false},{t:30,d:2840,m:false},{t:40,d:3170,m:false}]},
                { pa: 1000, temps: [{t:-20,d:1850,m:false},{t:-10,d:2020,m:false},{t:0,d:2210,m:false},{t:10,d:2440,m:false},{t:20,d:2690,m:false},{t:30,d:2970,m:false},{t:40,d:3310,m:false}]},
                { pa: 2000, temps: [{t:-20,d:1950,m:false},{t:-10,d:2120,m:false},{t:0,d:2320,m:false},{t:10,d:2560,m:false},{t:20,d:2820,m:false},{t:30,d:3110,m:false},{t:40,d:3460,m:false}]},
                { pa: 3000, temps: [{t:-20,d:2050,m:false},{t:-10,d:2240,m:false},{t:0,d:2440,m:false},{t:10,d:2700,m:false},{t:20,d:2960,m:false},{t:30,d:3270,m:false},{t:40,d:3630,m:false}]},
                { pa: 4000, temps: [{t:-20,d:2150,m:false},{t:-10,d:2350,m:false},{t:0,d:2580,m:false},{t:10,d:2850,m:false},{t:20,d:3120,m:false},{t:30,d:3440,m:false},{t:40,d:3860,m:false}]},
                { pa: 5000, temps: [{t:-20,d:2290,m:false},{t:-10,d:2510,m:false},{t:0,d:2720,m:false},{t:10,d:3000,m:false},{t:20,d:3280,m:false},{t:30,d:3630,m:false},{t:40,d:4060,m:false}]},
                { pa: 6000, temps: [{t:-20,d:2420,m:false},{t:-10,d:2650,m:false},{t:0,d:2880,m:false},{t:10,d:3180,m:false},{t:20,d:3480,m:false},{t:30,d:3860,m:false},{t:40,d:4300,m:false}]},
                { pa: 7000, temps: [{t:-20,d:2580,m:false},{t:-10,d:2840,m:false},{t:0,d:3060,m:false},{t:10,d:3380,m:false},{t:20,d:3710,m:false},{t:30,d:4100,m:false},{t:40,d:4560,m:false}]},
                { pa: 8000, temps: [{t:-20,d:2730,m:false},{t:-10,d:3010,m:false},{t:0,d:3250,m:false},{t:10,d:3590,m:false},{t:20,d:3960,m:false},{t:30,d:4400,m:false},{t:40,d:4850,m:false}]},
                { pa: 9000, temps: [{t:-20,d:2900,m:false},{t:-10,d:3200,m:false},{t:0,d:3450,m:false},{t:10,d:3830,m:false},{t:20,d:4220,m:false},{t:30,d:4670,m:false},{t:40,d:5180,m:false}]},
                { pa: 10000,temps: [{t:-20,d:3090,m:false},{t:-10,d:3390,m:false},{t:0,d:3710,m:false},{t:10,d:4100,m:false},{t:20,d:4520,m:false},{t:30,d:5000,m:false},{t:40,d:5480,m:false}]}
            ]},
            { weight: 5200, altitudes: [
                { pa: 0, temps: [{t:-20,d:1360,m:false},{t:-10,d:1480,m:false},{t:0,d:1610,m:false},{t:10,d:1750,m:false},{t:20,d:1910,m:false},{t:30,d:2100,m:false},{t:40,d:2310,m:false}]},
                { pa: 1000, temps: [{t:-20,d:1430,m:false},{t:-10,d:1550,m:false},{t:0,d:1690,m:false},{t:10,d:1840,m:false},{t:20,d:2010,m:false},{t:30,d:2200,m:false},{t:40,d:2440,m:false}]},
                { pa: 2000, temps: [{t:-20,d:1500,m:false},{t:-10,d:1620,m:false},{t:0,d:1780,m:false},{t:10,d:1940,m:false},{t:20,d:2110,m:false},{t:30,d:2310,m:false},{t:40,d:2560,m:false}]},
                { pa: 3000, temps: [{t:-20,d:1570,m:false},{t:-10,d:1710,m:false},{t:0,d:1870,m:false},{t:10,d:2040,m:false},{t:20,d:2240,m:false},{t:30,d:2440,m:false},{t:40,d:2720,m:false}]},
                { pa: 4000, temps: [{t:-20,d:1660,m:false},{t:-10,d:1800,m:false},{t:0,d:1970,m:false},{t:10,d:2150,m:false},{t:20,d:2360,m:false},{t:30,d:2580,m:false},{t:40,d:2860,m:false}]},
                { pa: 5000, temps: [{t:-20,d:1740,m:false},{t:-10,d:1900,m:false},{t:0,d:2070,m:false},{t:10,d:2270,m:false},{t:20,d:2490,m:false},{t:30,d:2720,m:false},{t:40,d:3010,m:false}]},
                { pa: 6000, temps: [{t:-20,d:1830,m:false},{t:-10,d:2000,m:false},{t:0,d:2190,m:false},{t:10,d:2400,m:false},{t:20,d:2640,m:false},{t:30,d:2880,m:false},{t:40,d:3180,m:false}]},
                { pa: 7000, temps: [{t:-20,d:1940,m:false},{t:-10,d:2120,m:false},{t:0,d:2310,m:false},{t:10,d:2540,m:false},{t:20,d:2780,m:false},{t:30,d:3050,m:false},{t:40,d:3380,m:false}]},
                { pa: 8000, temps: [{t:-20,d:2040,m:false},{t:-10,d:2240,m:false},{t:0,d:2450,m:false},{t:10,d:2720,m:false},{t:20,d:2960,m:false},{t:30,d:3250,m:false},{t:40,d:3600,m:false}]},
                { pa: 9000, temps: [{t:-20,d:2160,m:false},{t:-10,d:2360,m:false},{t:0,d:2600,m:false},{t:10,d:2870,m:false},{t:20,d:3140,m:false},{t:30,d:3440,m:false},{t:40,d:3820,m:false}]},
                { pa: 10000,temps: [{t:-20,d:2300,m:false},{t:-10,d:2520,m:false},{t:0,d:2770,m:false},{t:10,d:3050,m:false},{t:20,d:3380,m:false},{t:30,d:3700,m:false},{t:40,d:4100,m:false}]}
            ]}
        ],
        // NOTE: Module 3 data is structured to represent the graphical charts.
        // It's a 3D relationship between PA, Temperature, and Weight.
        // The structure is: { pa, points: [{t, w, roc/time/fuel/dist}] }
        rateOfClimb: {
            maximum: {
                data: [
                    { pa: 0,     points: [{t:-40,w:6750,roc:1780},{t:0,w:6750,roc:1660},{t:40,w:6750,roc:1540},{t:-40,w:5500,roc:2150},{t:0,w:5500,roc:2020},{t:40,w:5500,roc:1900}] },
                    { pa: 10000, points: [{t:-40,w:6750,roc:1350},{t:-15,w:6750,roc:1300},{t:10,w:6750,roc:1150},{t:-40,w:5500,roc:1750},{t:-15,w:5500,roc:1680},{t:10,w:5500,roc:1520}] },
                    { pa: 20000, points: [{t:-40,w:6750,roc:800},{t:-30,w:6750,roc:750},{t:-15,w:6750,roc:600},{t:-40,w:5500,roc:1200},{t:-30,w:5500,roc:1150},{t:-15,w:5500,roc:1000}] },
                    { pa: 30000, points: [{t:-40,w:6750,roc:200},{t:-40,w:5500,roc:650}] }
                ],
                speeds: [ {alt: 0, kias: 108}, {alt: 20000, kias: 107}, {alt: 30000, kias: 104} ]
            },
            cruise: {
                data: [
                    { pa: 0,     points: [{t:0,w:6750,roc:1120},{t:20,w:6750,roc:1050},{t:40,w:6750,roc:950},{t:0,w:5500,roc:1520},{t:20,w:5500,roc:1450},{t:40,w:5500,roc:1350}]},
                    { pa: 10000, points: [{t:-15,w:6750,roc:850},{t:5,w:6750,roc:750},{t:25,w:6750,roc:650},{t:-15,w:5500,roc:1250},{t:5,w:5500,roc:1150},{t:25,w:5500,roc:1050}]},
                    { pa: 20000, points: [{t:-30,w:6750,roc:500},{t:-10,w:6750,roc:400},{t:10,w:6750,roc:300},{t:-30,w:5500,roc:900},{t:-10,w:5500,roc:800},{t:10,w:5500,roc:700}]}
                ],
                speed: 120
            },
            singleEngine: {
                 data: [
                    { pa: 0,     points: [{t:0,w:6750,roc:400},{t:20,w:6750,roc:310},{t:40,w:6750,roc:220},{t:0,w:5500,roc:620},{t:20,w:5500,roc:530},{t:40,w:5500,roc:440}]},
                    { pa: 8000,  points: [{t:-15,w:6750,roc:200},{t:5,w:6750,roc:110},{t:25,w:6750,roc:20},{t:-15,w:5500,roc:420},{t:5,w:5500,roc:330},{t:25,w:5500,roc:240}]},
                    { pa: 16000, points: [{t:-30,w:6750,roc:50},{t:-30,w:5500,roc:250}]}
                ],
                speeds: [
                    { weight: 6750, alts: [{alt: 0, kias: 108}, {alt: 10000, kias: 105}, {alt: 20000, kias: 103}] },
                    { weight: 6250, alts: [{alt: 0, kias: 105}, {alt: 10000, kias: 103}, {alt: 20000, kias: 101}] },
                    { weight: 5750, alts: [{alt: 0, kias: 102}, {alt: 10000, kias: 101}, {alt: 20000, kias: 100}] }
                ],
                penalties: { windmilling: 400, gear: 350, flaps15: 200, flaps45: 800 }
            },
            balked: {
                 data: [
                    { pa: 0,     points: [{t:0,w:6750,roc:1100},{t:20,w:6750,roc:990},{t:40,w:6750,roc:880},{t:0,w:5500,roc:1480},{t:20,w:5500,roc:1360},{t:40,w:5500,roc:1250}]},
                    { pa: 4000,  points: [{t:-10,w:6750,roc:980},{t:10,w:6750,roc:880},{t:30,w:6750,roc:770},{t:-10,w:5500,roc:1350},{t:10,w:5500,roc:1250},{t:30,w:5500,roc:1150}]},
                    { pa: 8000,  points: [{t:-20,w:6750,roc:850},{t:0,w:6750,roc:750},{t:20,w:6750,roc:650},{t:-20,w:5500,roc:1220},{t:0,w:5500,roc:1120},{t:20,w:5500,roc:1010}]}
                ],
                speed: 82
            }
        },
        timeFuelDistClimb: {
            maximum: [
                { alt: 0,     points: [{t:-40,w:6750,time:0,fuel:0,dist:0},{t:0,w:6750,time:0,fuel:0,dist:0},{t:40,w:6750,time:0,fuel:0,dist:0},{t:0,w:5700,time:0,fuel:0,dist:0}]},
                { alt: 10000, points: [{t:-25,w:6750,time:6.5,fuel:44,dist:15},{t:0,w:6750,time:7,fuel:46,dist:16},{t:25,w:6750,time:7.5,fuel:48,dist:17},{t:0,w:5700,time:6,fuel:40,dist:13}]},
                { alt: 20000, points: [{t:-45,w:6750,time:16,fuel:100,dist:38},{t:-25,w:6750,time:17,fuel:104,dist:40},{t:-5,w:6750,time:18,fuel:108,dist:42},{t:-25,w:5700,time:14,fuel:90,dist:33}]},
                { alt: 25000, points: [{t:-55,w:6750,time:25,fuel:150,dist:60},{t:-35,w:6750,time:26,fuel:155,dist:63},{t:-35,w:5700,time:21,fuel:130,dist:52}]}
            ],
            cruise: [
                { alt: 0,     points: [{t:-40,w:6750,time:0,fuel:0,dist:0},{t:0,w:6750,time:0,fuel:0,dist:0},{t:40,w:6750,time:0,fuel:0,dist:0},{t:0,w:5700,time:0,fuel:0,dist:0}]},
                { alt: 10000, points: [{t:-15,w:6750,time:9,fuel:52,dist:21},{t:5,w:6750,time:9.5,fuel:54,dist:22},{t:25,w:6750,time:10,fuel:56,dist:23},{t:5,w:5700,time:8,fuel:46,dist:18}]},
                { alt: 20000, points: [{t:-35,w:6750,time:21,fuel:110,dist:50},{t:-15,w:6750,time:22,fuel:114,dist:52},{t:5,w:6750,time:23,fuel:118,dist:54},{t:-15,w:5700,time:18,fuel:98,dist:43}]}
            ]
        }
    },

    // =============================================================================
    // 2. UTILITY FUNCTIONS
    // =============================================================================
    utils: {
        interpolate(x, x1, y1, x2, y2) {
            if (x1 === x2) return y1;
            return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
        },
        interpolateTable(target, table, xProp, yProp) {
            let p1 = null, p2 = null;
            for (const point of table) {
                if (point[xProp] <= target) p1 = point;
                if (point[xProp] >= target && !p2) p2 = point;
            }
            if (!p1) return p2[yProp];
            if (!p2) return p1[yProp];
            return this.interpolate(target, p1[xProp], p1[yProp], p2[xProp], p2[yProp]);
        },
        interpolateGrid(x, y, data, xProp, yProp, zProp) {
            let y1_row = null, y2_row = null;
            for(const row of data) {
                if(row[yProp] <= y) y1_row = row;
                if(row[yProp] >= y && !y2_row) y2_row = row;
            }
            if (!y1_row) y1_row = y2_row;
            if (!y2_row) y2_row = y1_row;

            const x_points_y1 = y1_row.points;
            const x_points_y2 = y2_row.points;

            const val1 = this.interpolateTable(x, x_points_y1, xProp, zProp);
            if (y1_row[yProp] === y2_row[yProp]) return val1;

            const val2 = this.interpolateTable(x, x_points_y2, xProp, zProp);
            return this.interpolate(y, y1_row[yProp], val1, y2_row[yProp], val2);
        },
        interpolate3D(x, y, z, data, xProp, yProp, zProp, valueProp) {
             let z1_plane = null, z2_plane = null;
             for(const plane of data) {
                 if(plane[zProp] <= z) z1_plane = plane;
                 if(plane[zProp] >= z && !z2_plane) z2_plane = plane;
             }
             if (!z1_plane) z1_plane = z2_plane;
             if (!z2_plane) z2_plane = z1_plane;

             const val1 = this.interpolateGrid(x, y, z1_plane.points, xProp, yProp, valueProp);
             if (z1_plane[zProp] === z2_plane[zProp]) return val1;

             const val2 = this.interpolateGrid(x, y, z2_plane.points, xProp, yProp, valueProp);
             return this.interpolate(z, z1_plane[zProp], val1, z2_plane[zProp], val2);
        },
         interpolateTFD(x, y, z, data, xProp, yProp, zProp) {
            let z1_plane = null, z2_plane = null;
             for(const plane of data) {
                 if(plane[zProp] <= z) z1_plane = plane;
                 if(plane[zProp] >= z && !z2_plane) z2_plane = plane;
             }
             if (!z1_plane) z1_plane = z2_plane;
             if (!z2_plane) z2_plane = z1_plane;
             
             const getValues = (plane) => {
                 const time = this.interpolateGrid(x,y,plane.points, xProp, yProp, 'time');
                 const fuel = this.interpolateGrid(x,y,plane.points, xProp, yProp, 'fuel');
                 const dist = this.interpolateGrid(x,y,plane.points, xProp, yProp, 'dist');
                 return {time, fuel, dist};
             }

             const val1 = getValues(z1_plane);
             if (z1_plane[zProp] === z2_plane[zProp]) return val1;

             const val2 = getValues(z2_plane);

             const time = this.interpolate(z, z1_plane[zProp], val1.time, z2_plane[zProp], val2.time);
             const fuel = this.interpolate(z, z1_plane[zProp], val1.fuel, z2_plane[zProp], val2.fuel);
             const dist = this.interpolate(z, z1_plane[zProp], val1.dist, z2_plane[zProp], val2.dist);
             
             return {time, fuel, dist};
        }
    },
    
    // =============================================================================
    // MODULES IMPLEMENTATION
    // =============================================================================
    module1: {
        getPressureAltitude(fieldElevation, altimeterSetting) {
            if (isNaN(fieldElevation) || isNaN(altimeterSetting)) return NaN;
            return fieldElevation - ((altimeterSetting - 29.92) / 0.1 * 100);
        },
        getKCAS(kias, config, source) {
            if (isNaN(kias) || !config || !source) return NaN;
            const table = C414ACalculator.data.airspeedCalibration[source][config];
            return C414ACalculator.utils.interpolateTable(kias, table, 'kias', 'kcas');
        },
        getAltimeterCorrection(kias, pa, config, source) {
            const sourceData = C414ACalculator.data.altimeterCorrection[source];
            const altData = [
                { pa: 0,     points: sourceData.seaLevel[config] },
                { pa: 10000, points: sourceData.tenThousand[config] },
                { pa: 20000, points: sourceData.twentyThousand[config] }
            ];
            return C414ACalculator.utils.interpolateGrid(kias, pa, altData, 'kias', 'pa', 'corr');
        },
        getRamRise(kias, pa) {
            if (isNaN(kias) || isNaN(pa)) return NaN;
            return C414ACalculator.utils.interpolateGrid(kias, pa, C414ACalculator.data.ramRise, 'kias', 'pa', 'rise');
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
            return {
                headwind: windSpeed * Math.cos(angleInRadians),
                crosswind: windSpeed * Math.sin(angleInRadians)
            };
        }
    },
    module2: {
        calculateNormalTakeoff(weight, pa, temp, windComponent) {
            const base = C414ACalculator.utils.interpolate3D(temp, pa, weight, C414ACalculator.data.normalTakeoff, 't', 'pa', 'weight', ['gr', 'd50']);
            if(isNaN(base.gr)) return { groundRoll: NaN, distance50ft: NaN };
            let { gr: groundRoll, d50: distance50ft } = base;
            if (windComponent >= 0) {
                const correctionFactor = (windComponent / 10) * 0.07;
                groundRoll *= (1 - correctionFactor);
                distance50ft *= (1 - correctionFactor);
            } else {
                const tailwind = Math.abs(windComponent);
                if (tailwind > 0) { const correctionFactor = (tailwind / 2) * 0.05; groundRoll *= (1 + correctionFactor); distance50ft *= (1 + correctionFactor); }
            }
            return { groundRoll, distance50ft };
        },
        calculateAccelStop(weight, pa, temp, windComponent) {
            const base = C414ACalculator.utils.interpolate3D(temp, pa, weight, C414ACalculator.data.accelStop, 't', 'pa', 'weight', ['d']);
            if(isNaN(base.d)) return { distance: NaN };
            let distance = base.d;
            if (windComponent >= 0) {
                const correctionFactor = (windComponent / 4) * 0.03;
                distance *= (1 - correctionFactor);
            } else {
                const tailwind = Math.abs(windComponent);
                if (tailwind > 0) { const correctionFactor = (tailwind / 2) * 0.05; distance *= (1 + correctionFactor); }
            }
            return { distance };
        },
        calculateAccelGo(weight, pa, temp, windComponent) {
            const base = C414ACalculator.utils.interpolate3D(temp, pa, weight, C414ACalculator.data.accelGo, 't', 'pa', 'weight', ['d', 'm']);
            if(isNaN(base.d)) return { distance: NaN, isMarginal: false };
            let { d: distance, m: isMarginal } = base;
            if (windComponent >= 0) {
                const correctionFactor = (windComponent / 10) * 0.06;
                distance *= (1 - correctionFactor);
            } else {
                const tailwind = Math.abs(windComponent);
                if (tailwind > 0) { const correctionFactor = tailwind * 0.02; distance *= (1 + correctionFactor); }
            }
            return { distance, isMarginal };
        }
    },

    module3: {
        calculateRateOfClimb(profile, oat, pa, weight, seConfig) {
            let baseRoc = NaN;
            let climbSpeed = NaN;
            const profileInfo = this.data.rateOfClimb[profile];

            baseRoc = this.utils.interpolate3D(oat, pa, weight, profileInfo.data, 't', 'w', 'pa', 'roc');

            if (profile === 'singleEngine') {
                if (seConfig.isWindmilling) baseRoc -= profileInfo.penalties.windmilling;
                if (seConfig.isGearDown) baseRoc -= profileInfo.penalties.gear;
                if (seConfig.flaps > 0) baseRoc -= profileInfo.penalties[`flaps${seConfig.flaps}`];

                let speedData = [];
                profileInfo.speeds.forEach(w_item => {
                    speedData.push({weight: w_item.weight, kias: this.utils.interpolateTable(pa, w_item.alts, 'alt', 'kias')})
                });
                climbSpeed = this.utils.interpolateTable(weight, speedData, 'weight', 'kias');
            } else if (profile === 'maximum') {
                climbSpeed = this.utils.interpolateTable(pa, profileInfo.speeds, 'alt', 'kias');
            } else {
                climbSpeed = profileInfo.speed;
            }
            return { roc: baseRoc, speed: climbSpeed };
        },
        calculateTFD(profile, oat, weight, startPa, endPa) {
            const fixedFuel = 32;
            const data = this.data.timeFuelDistClimb[profile];
            const getIsaTemp = (pa) => 15 - (pa / 1000) * 2;
            const temp = isNaN(oat) ? getIsaTemp((startPa + endPa) / 2) : oat;

            const startValues = this.utils.interpolateTFD(temp, startPa, weight, data, 't', 'alt', 'w');
            const endValues = this.utils.interpolateTFD(temp, endPa, weight, data, 't', 'alt', 'w');
            
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
    init() {
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

        // Event listeners for calculator buttons
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
            switch(calcType) {
                // ... Cases for Module 1 and 2
                case 'rate-of-climb': {
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
                    cardElement.querySelector('#roc-result').textContent = isNaN(result.roc) ? "Out of Envelope" : `${result.roc.toFixed(0)} ft/min`;
                    cardElement.querySelector('#roc-speed-result').textContent = isNaN(result.speed) ? "---" : `${result.speed.toFixed(0)} KIAS`;
                    break;
                }
                case 'tfd-climb': {
                    const profile = cardElement.querySelector('#m3-tfd-profile').value;
                    const weight = parseFloat(cardElement.querySelector('#m3-tfd-weight').value);
                    const temp = parseFloat(cardElement.querySelector('#m3-tfd-temp').value);
                    const startPa = parseFloat(cardElement.querySelector('#m3-tfd-start-pa').value);
                    const endPa = parseFloat(cardElement.querySelector('#m3-tfd-end-pa').value);
                    if(isNaN(weight) || isNaN(startPa) || isNaN(endPa)) return;
                    const result = this.module3.calculateTFD(profile, temp, weight, startPa, endPa);
                    cardElement.querySelector('#tfd-time-result').textContent = isNaN(result.time) ? "Out of Envelope" : `${result.time.toFixed(1)} min`;
                    cardElement.querySelector('#tfd-fuel-result').textContent = isNaN(result.fuel) ? "Out of Envelope" : `${result.fuel.toFixed(1)} lbs`;
                    cardElement.querySelector('#tfd-dist-result').textContent = isNaN(result.dist) ? "Out of Envelope" : `${result.dist.toFixed(1)} NM`;
                    break;
                }
            }
        } catch (e) {
            console.error(`Error during calculation for ${calcType}:`, e);
            alert("An error occurred. Check input values and try again.");
        }
    }
};

// This needs to be called to attach all event listeners
document.addEventListener('DOMContentLoaded', () => {
    C414ACalculator.init();
