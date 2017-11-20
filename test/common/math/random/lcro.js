var random = require('../../../../lib/common/math').random;

var l = 10;
var r = 30;
var count = 100;

var data = {};
data.l = l;
data.r = r;
data.count = count;
data.size = r - l;

data.sumCount = 0;
data.sumRate = 0;

for(var i = l;i < r;i++){
	data[i] = {
		count: 0,
		rate: 0
	}
}

for(var i = 0;i < count;i++){
	var num = random.randomIntLCRO(l,r);
	data[num].count++;
}

for(var i = l;i < r;i++){
	data[i].rate = data[i].count / data.count;
	data.sumCount += data[i].count;
	data.sumRate += data[i].rate;
}

console.log(data);