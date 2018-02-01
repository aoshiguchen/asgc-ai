var math = require('../../common/math');
var log = require('../../common/log');

var random = math.random.random;

function createArray(len){
	if(!len)return [];

	var res = [];

	for(var i = 0; i < len; i++){
		res[i] = 0;
	}

	return res;
}

function create2dArray(m,n){
	if(!m) return [];
	var res = [];

	for(var i = 0; i < m; i++){
		res[i] = createArray(n);
	}

	return res;
}

function create3dArray(m,n,l){
	if(!m) return [];
	var res = [];

	for(var i = 0; i < m; i++){
		res[i] = create2dArray(n,l);
	}

	return res;
}

function BpDeep(layernum,rate,mobp){

	var mobp = mobp;//动量系数
	var rate = rate;//学习系数
	var layer = C= create2dArray(layernum.lengt);//神经网络各层节点
	var layerErr = create2dArray(layernum.lengt);//神经网络各节点误差
	var layer_weight = create3dArray(layernum.lengt);;//各层节点权重
	var layer_weight_delta = create3dArray(layernum.lengt);;//各层节点权重动量 

	function init(){
		for(var l = 0; l < layernum.length; l++){

			layer[l] = createArray(layernum[l]);
			layerErr[l] = createArray(layernum[l]);

			if(l + 1 < layernum.length){

				layer_weight[l] = create2dArray(layernum[l]+1,layernum[l+1]);
				layer_weight_delta[l] = create2dArray(layernum[l]+1,layernum[l+1]);

				for(var j = 0; j < layernum[l]+1; j++){
					layer_weight[l][j] = [];
					for(var i = 0; i < layernum[l+1]; i++){
						layer_weight[l][j][i] = random();//随机初始化权重
					}
				}
			}	
		}
	}
	
	//逐层向前计算输出
	function computeOut(input){
		for(var l = 1; l < layer.length; l++){
			for(var j = 0; j < layer[l].length; j++){
				var z = layer_weight[l-1][layer[l-1].length][j];
				for(var i = 0; i < layer[l-1].length; i++){
					layer[l-1][i] = l==1? input[i] : layer[l-1][i];
					z += layer_weight[l-1][i][j] * layer[l-1][i];
				}
				layer[l][j] = 1/(1+Math.exp(-z));
			}
		}
		return layer[layer.length-1];
	}

	//逐层反向计算误差并修改权重
	function updateWeight(tar){
		var l = layer.length - 1;
		for(var j = 0; j < layerErr[l].length; j++)
			layerErr[l][j] = layer[l][j] * (1-layer[l][j]) * (tar[j]-layer[l][j]);
			
		while(l-- > 0){
			for(var j = 0; j < layerErr[l].length; j++){
				var z = 0.0;
				for(var i = 0; i < layerErr[l+1].length; i++){
					z = z+l > 0? layerErr[l+1][i] * layer_weight[l][j][i] : 0;
					layer_weight_delta[l][j][i] = mobp * layer_weight_delta[l][j][i] + rate * layerErr[l+1][i] * layer[l][j];//隐含层动量调整
					layer_weight[l][j][i]+=layer_weight_delta[l][j][i];//隐含层权重调整
					if(j == layerErr[l].length-1){
						layer_weight_delta[l][j+1][i]= mobp*layer_weight_delta[l][j+1][i]+rate*layerErr[l+1][i];//截距动量调整
						layer_weight[l][j+1][i]+=layer_weight_delta[l][j+1][i];//截距权重调整
					}
				}
				layerErr[l][j] = z*layer[l][j]*(1-layer[l][j]);//记录误差
			}
		}
	}

	//单次训练
	function train(input,tar){
		var out = computeOut(input);
		updateWeight(tar);
	}

	//迭代训练
	function iterTrain(data,tar,count){			
		for(var i = 0; i < count; i++){
			for(var j = 0; j < data.length; j++){
				train(data[j],tar[j]);
			}
		}
	}

	init();

	return {
		train: train,
		computeOut: computeOut,
		iterTrain: iterTrain
	};
}

module.exports = BpDeep;