# 欢迎使用asgc-ai

**asgc-ai**是傲世孤尘开源的一个人工智能库，用于集成各种人工智能算法。
## 如何使用asgc-web
 

### 1、安装模块

npm install asgc-ai



### 2、遗传算法示例

```javascript
//是否打印进化过程中的日志
genetic.setLog(true);

var engine = new genetic.Engine(300,0.8,300,0,500,function(v){
	return 2 * v + 1;
	//return Math.sin(v);
});

engine.OnStart();


console.log("种群最优个体适应度：%f",engine.GetBeseFitness());
console.log("种群最优个体基因型：%f",engine.GetBestChromosome());
```

## asgc-ai相关

###asgc-web

**asgc-web**是傲世孤尘开源的一个nodejs web容器，mvc框架。实现了后端路由、请求分发、参数解析、前端模板渲染等等。

### asgc-observer

**asgc-observer**是傲世孤尘开源的一个消息库，通过接口定义消息，发布消息，可以拿到消息订阅者的返回值，实现方法的消息式调用。

### asgc-lisen

**asgc-lisen**是傲世孤尘开源的一个监听变量值、表达式变化的库。基于这个库，笔者已实现一个前段双向绑定的工具。类似于vue、angularjs。


## 联系我们

笔者QQ    `1052045476`

nodejs交流群    `527393872`

java交流群    `527393872`

c/c++语言交流群    `251975693`

