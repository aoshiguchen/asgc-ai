/**
 * 生成一个整数随机数，左闭右开区间
 * @param  {[int]} l [左区间]
 * @param  {[int]} r [右区间]
 * @return {[int]}   [随机数]
 */
function randomIntLCRO(l,r){
	return parseInt(l + (r - l) * Math.random());
}

/**
 * 生成一个整数随机数，左开右闭区间
 * @param  {[int]} l [左区间]
 * @param  {[int]} r [右区间]
 * @return {[int]}   [随机数]
 */
function randomIntLORC(l,r){
	return Math.floor(1 + l + (r - l) * Math.random());
}

/**
 * 生成一个整数随机数，左开右开区间
 * @param  {[int]} l [左区间]
 * @param  {[int]} r [右区间]
 * @return {[int]}   [随机数]
 */
function randomIntLORO(l,r){
	return Math.round(1 + l + (r - l - 2) * Math.random());
}

/**
 * 生成一个整数随机数，左闭右闭区间
 * @param  {[int]} l [左区间]
 * @param  {[int]} r [右区间]
 * @return {[int]}   [随机数]
 */
function randomIntLCRC(l,r){
	return Math.round(l + (r - l) * Math.random());
}


module.exports = {
	random: Math.random,
	randomIntLCRO: randomIntLCRO,
	randomIntLORC: randomIntLORC,
	randomIntLORO: randomIntLORO,
	randomIntLCRC: randomIntLCRC
}

