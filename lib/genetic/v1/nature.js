var log = require('../../common/log');
var math = require('../../common/math');
var Individual = require('./individual');

var random = math.random;
var DOUBLE_MIN_VALUE = math.consts.DOUBLE_MIN_VALUE;
var DOUBLE_MAX_VALUE = math.consts.DOUBLE_MAX_VALUE;

/**************************************************************************/
/*大自然                                                                  */
/*引导种群的进化方向                                                      */
/**************************************************************************/


/**
*函数名：Nature
*功能概要：构造函数
*param@1popSize:种群大小
*param@2mutationRate:基因突变的概率
*param@3maxPerturbation:最大的变异步长
*param@4leftInterval:左区间
*param@5rightInterval:右区间
*param@6assessmentFunction:个体适应度评估函数
*返回值：无
**/	
function Nature(popSize,mutationRate,maxPerturbation,leftInterval,rightInterval,assessmentFunction){
	if(!(this instanceof Nature)){
		throw new Error('调用方式有误!');
	}

	//种群大小
	this.popSize = popSize;
	//基因突变概率
	this.mutationRate = mutationRate;
	//最大变异步长
	this.maxPerturbation = maxPerturbation;
	//左区间
	this.leftInterval = leftInterval;
	//右区间
	this.rightInterval = rightInterval;
	//评估函数
	this.assessmentFunction = assessmentFunction;

	//种群适应度综合
	this.totalFitness = 0.0;
	//种群最优个体适应度
	this.bestFitness  = DOUBLE_MIN_VALUE;
	//种群平均适应度
	this.averageFitness = 0.0;
	//种群最低适应度
	this.worstFitness = DOUBLE_MAX_VALUE;
	//当前种群的代数
	this.generation = 0;
	//种群
	this.population = [];

	for(var i=0;i<popSize;i++){
		var individual = new Individual();
		individual.vecChromosome.push(random.randomIntLCRC(leftInterval,rightInterval));
		individual.fitness = assessmentFunction(individual.vecChromosome[0]);
		this.population.push(individual);
	}

	this.CalculateFitness();
}

/**
*函数名：CalculateFitness
*功能概要： 统计整个种群的进化数据
*params无
*返回值：无
**/
Nature.prototype.CalculateFitness = function(){
	this.population.sort((a,b) => a.fitness - b.fitness);
	this.totalFitness = 0.0;
	this.averageFitness = 0.0;
	this.worstFitness = DOUBLE_MAX_VALUE;

	for(var i=0;i < this.popSize;i++){
		this.totalFitness += this.population[i].fitness;

		if(this.population[i].fitness > this.bestFitness){
			this.bestFitness = this.population[i].fitness;
			this.bestIndividual = this.population[i];
			this.first = this.generation;
		}

		if(this.population[i].fitness < this.worstFitness){
			this.worstFitness = this.population[i].fitness;
		}
	}

	this.averageFitness = this.totalFitness / this.popSize;
}

/**
*函数名：GetChromoRoulette
*功能概要： 轮盘赌选择
*params无
*返回值：无
**/
Nature.prototype.GetChromoRoulette = function(pop){
	var individual = new Individual();
	var temp = 0.0;
	var slice;

	if(this.worstFitness >= 0){
		slice = random.random() * this.totalFitness;
		for(var i = 0;i < this.popSize;i++){
			temp += pop[i].fitness;
			if(temp >= slice){
				individual = pop[i];
				break;
			}
		}
	}else{
		var pseudoTotalFitness = this.totalFitness + (-1)*this.popSize*this.worstFitness;
		slice = random.random()*pseudoTotalFitness;

		for(var i = 0;i < this.popSize;i++){
			temp += pop[i].fitness + (-1)*this.worstFitness;
			if(temp >= slice){
				individual = pop[i];
				break;
			}
		}
	}
	//避免因浮点数的精度误差造成错误
	if(individual.fitness == 0){
		individual = pop[this.popSize-1];
	}

	return individual;
}

/**
*函数名：Mutate
*功能概要： 基因突变
*params无
*返回值：无
**/
Nature.prototype.Mutate = function(individual){
	if(random.random()<= this.mutationRate){
		individual.vecChromosome[0] += (random.random()-0.5)*this.maxPerturbation;
		if(individual.vecChromosome[0]> this.rightInterval){
			individual.vecChromosome[0] = this.rightInterval;
		}
		if(individual.vecChromosome[0] < this.leftInterval){
			individual.vecChromosome[0] = this.leftInterval;
		}
	}
}

Nature.prototype.Reproduction = function(){
	var temp = this.population.slice(0);
	this.population = [];

	while(this.population.length < this.popSize){
		var individual = this.GetChromoRoulette(temp);
		this.Mutate(individual);
		individual.fitness = this.assessmentFunction(individual.vecChromosome[0]);
		this.population.push(individual);
	}

	var flag = true;
	for(var i = 0;i < this.popSize;i++){
		if(this.population[i].fitness >= this.bestIndividual.fitness){
			flag = false;
			break;
		}
	}

	if(flag){
		this.population[random.randomIntLCRC(0,this.popSize-1)] = this.bestIndividual;
	}

	this.generation++;
	this.CalculateFitness();
}

module.exports = Nature;