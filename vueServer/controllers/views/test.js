module.exports = function (app, Ms) {
	const jsonParser = Ms.bodyParser.json();
	let pageStart = null ,pageEnd = null,current=null,pageSize=null;
	app.post('/test', jsonParser, (req, res) => {
		// console.log(req.body);
		current = req.body.current;
		pageSize = req.body.pageSize;
		pageStart = current * pageSize -pageSize; 
		pageEnd = current * pageSize;
		// console.log(pageStart,pageEnd);
		Ms.Test.find({}).skip(pageStart).limit(pageSize).exec((err, data) => {
			if (err) throw err;
			Ms.Test.find({}).then((msg) => {
				res.json({status:'ok',data:data,total: msg.length });
			}).catch((err) => { console.log(err); });
		});
	})
}