if(!global.ctx){
	global.ctx = {};
}

function setLog(flag){
	global.ctx.logFlag = flag;
}

function out(){
	if(!global.ctx.logFlag) return;
	console.log.apply(null,arguments);
}

module.exports = {
	out: out,
	setLog: setLog
}
