let userName = '', obj = {};
module.exports = function (app, Ms) {
	//图表数据接口
	app.get('/TheChart', (req, res) => {
		userName = global.userName;
		obj = global.obj;
		obj = userName !== 'admin' ? { 'area': userName } : {};
		//  arrArea: 经销商省份数组  arrDea: 经销商数据数组 rowObj: 经销商省份、数据数组
		let arrArea = [], arrDea = [], rowObj = [];
		Ms.Todo.find(obj).exec((err, data) => {
			if (err) {
				// throw err;
				res.json({ status: 0, data: err });
				return false;
			}
			const msg = eval(data);
			let rdata = {};
			for (let i in msg) {
				let c = data[i].prov;
				rdata[c] ? (rdata[c]++) : (rdata[c] = 1);
			}
			for (let j in rdata) {
				arrDea.push(rdata[j]);
				arrArea.push(j);
			}
			arrArea.forEach((value, index) => {
				let o = { '省份': arrArea[index], '经销商': arrDea[index] };
				rowObj.push(o);
			});
			res.json({ status: 1, data: arrArea, len: arrDea,rowObj: rowObj});
		});
	});
};