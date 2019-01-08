module.exports = function (app, Ms) {
	app.get('/getExcelDealers', (req, res) => {
		Ms.Todo.find({}, (err, data) => {
			if (err) throw err;
			res.json({status:1,data:data});
		});
	});
};