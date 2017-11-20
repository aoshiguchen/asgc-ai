var log = require('../../common/log');
var Nature = require('./nature');

/********************************************************/
/*遗传算法引擎                                          */
/*负责与客户端进行交互，协调大自然、个体的正常运转      */
/********************************************************/

		

/**
*函数名：Engine
*功能概要：构造函数
*param@1popSize:种群大小
*param@2mutationRate:基因突变的概率
*param@3maxPerturbation:最大的变异步长
*param@4generationCount:种群繁衍的代数
*param@5leftInterval:左区间
*param@6rightInterval:右区间
*param@7assessmentFunction:个体适应度评估函数
*返回值：无
**/
function Engine(popSize,mutationRate,generationCount,leftInterval,rightInterval,assessmentFunction){
	if(!(this instanceof Engine)){
		throw new Error('调用方式有误!');
	}

	log.out('Engine Constructor Invoketion!');

	//大自然
	this.nature = new Nature(popSize,mutationRate,(rightInterval-leftInterval)/4000,leftInterval,rightInterval,assessmentFunction);
	//种群进化代数
	this.generationCount = generationCount;
}

/**
*函数名：OnStart
*功能概要：让种群开始进化
*params无
*返回值：无
**/
Engine.prototype.OnStart = function(){
	log.out("Engine OnStart Method Invoketion!\n");
	log.out("-------------------------------------------------\n");
	log.out("第0代种群：\n");
	log.out("适应度总和：%f\n",this.nature.totalFitness);
	log.out("最优适应度：%f\n",this.nature.bestFitness);
	log.out("平均适应度：%f\n",this.nature.averageFitness);
	log.out("最差适应度：%f\n",this.nature.worstFitness);

	for(var i = 0;i < this.generationCount;i++){
		this.nature.Reproduction();
		log.out("-------------------------------------------------\n");
		log.out("第%d代种群：\n",i+1);
		log.out("适应度总和：%f\n",this.nature.totalFitness);
		log.out("最优适应度：%f\n",this.nature.bestFitness);
		log.out("平均适应度：%f\n",this.nature.averageFitness);
		log.out("最差适应度：%f\n",this.nature.worstFitness);
	}

	log.out("最优个体首次出现于于第%d代\n",this.nature.first);
}

/**
*函数名：GetBeseFitness
*功能概要：获取环境中最优个体的适应度
*params无
*返回值：最优个体的适应度
**/
Engine.prototype.GetBeseFitness = function(){
	return this.nature.bestIndividual.fitness;
}

/**
*函数名：GetBestChromosome
*功能概要：获取环境中最优个体的基因型
*params无
*返回值：最优个体的基因型
**/
Engine.prototype.GetBestChromosome = function(){
	return this.nature.bestIndividual.vecChromosome[0];
}

module.exports = Engine;