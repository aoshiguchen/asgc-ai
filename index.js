var common = require('./lib/common');

global.ctx = {};

ctx.common = common;

ctx.setLog = function(val){
	ctx.logFlag = val;
}

module.exports = {
	ctx: ctx,
	genetic: require('./lib/genetic/v1')
};