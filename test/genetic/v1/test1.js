var genetic = require('../../../').genetic;

//是否打印进化过程中的日志
genetic.setLog(true);

var engine = new genetic.Engine(300,0.8,300,0,500,function(v){
	return 2 * v + 1;
	//return Math.sin(v);
});

engine.OnStart();


console.log("种群最优个体适应度：%f",engine.GetBeseFitness());
console.log("种群最优个体基因型：%f",engine.GetBestChromosome());