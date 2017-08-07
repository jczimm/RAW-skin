#!/bin/env node
// This can be used to create a starting-point skin map for the dark variation of RAW skin
// 

const path = require('path');

const rawSkinMap = require(path.join('..', process.argv[2]));
const invertSpecialKeys = [
	'SurfaceHighlight',
	'MeterBackground',
];

Object.keys(rawSkinMap).forEach((key) => {
	if (/\(0,/.test(rawSkinMap[key]) || invertSpecialKeys.includes(key)) softInvertLightness(rawSkinMap, key);
});
process.stdout.write(JSON.stringify(rawSkinMap));

function softInvertLightness(skinMap, key) {
	const lightness = skinMap[key].match(/(?:hsla?\(\d+,\s?\d+%,\s?)(\d+)%/)[1];
	const inverted = skinMap[key].replace(/(hsla?\(\d+,\s?\d+%,\s?)(\d+)%/, '$1' + Math.min(100, (100 - lightness) + 10) + '%');
	skinMap[key] = inverted;
}
