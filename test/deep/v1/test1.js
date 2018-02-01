var deep = require('../../../').deep;

//开启日志
deep.setLog(true);

//初始化神经网络的基本配置
var bp = deep.BpDeep([2,10,2],0.15,0.8);

//初始化样本数据
var data = [[1,2],[2,2],[1,1],[2,1]];

//初始化目标数据
var tar = [[1,0],[0,1],[0,1],[1,0]];

//迭代训练
bp.iterTrain(data,tar,1000);

console.log('训练结果：');
for(var j = 0; j < data.length; j++){
	var result = bp.computeOut(data[j]);
	console.log(data[j] + ":" + result);
}

console.log('计算：');
var x = [3,1]
var result = bp.computeOut(x);
console.log(x + ":" + result);

