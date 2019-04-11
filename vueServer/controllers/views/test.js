module.exports = function (app, Ms) {
	const jsonParser = Ms.bodyParser.json();
	let pageStart = null, current = null, pageSize = null,dataNum=[];
	Ms.Test.find({}).then((msg) => {
		dataNum = msg;
	}).catch((err) => { console.log(err); });
	app.post('/test', jsonParser, (req, res) => {
		current = req.body.current;
		pageSize = req.body.pageSize;
		pageStart = current * pageSize -pageSize; 
		Ms.Test.find({}).skip(pageStart).limit(pageSize).exec((err, data) => {
			if (err) throw err;
			res.json({status:'ok',data:data,total: dataNum.length });
		});
	});
};