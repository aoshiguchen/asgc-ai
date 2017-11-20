/**************************************************************************/
/*个体                                                                    */
/*将求解过程模拟成物种的进化、最终经过自然选择存活下来的个体便为"最优解"  */
/**************************************************************************/


/**
*函数名：Individual
*功能概要：默认构造函数
*param@1vecChromosome基因型
*param@1fitness适应度
*返回值：无
**/
function Individual(vecChromosome,fitness){
	if(!(this instanceof Individual)){
		throw new Error('调用方式有误!');
	}

	//基因型
	this.vecChromosome = vecChromosome || [];
	//个体适应度
	this.fitness = fitness || 0;
}

/**
*函数名：clone
*功能概要：复制对象
*返回值：复制后生成的对象
**/
Individual.prototype.clone = function(){
	var individual = new Individual();
	individual.fitness = this.fitness;
	individual.vecChromosome = this.vecChromosome.slice(0);

	return individual;
}

module.exports = Individual;