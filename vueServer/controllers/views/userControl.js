/**
 * 用户权限信息模块
 */
module.exports = function (app, Ms) {
	// parse application/json
	let jsonParser = Ms.bodyParser.json();
	//获取用户信息
	app.get('/userControl/getUserInfo', (req, res) => {
		Ms.Users.find({}, function (err, data) {
			if (err) {
				res.json({ status: 0, data: 'error' });
				return false;
			}
			// console.log(data);
			res.json({ status: 1, data: data });
		});
	});
	//编辑保存用户信息
	app.post('/userControl/editorUser', jsonParser, (req, res) => {
		if (req.body.id === void 0) {
			// 增加账号
			Ms.Users(req.body).save().then(()=>{
				Ms.Users.find({}, function(err, msg) {
					if (err) throw err;
					res.json({ data: msg, len: msg.length});
				});
			}).catch((err)=>{console.log(err);});
		} else {
			//编辑修改 账户信息
			Ms.Users.updateMany({ _id: req.body.id }, { name: req.body.name, privilege: req.body.privilege, pass: req.body.pass }).then(() => {
				Ms.Users.find({}).then(msg => {
					res.json({ data: msg, len: msg.length });
				}).catch(err => { console.log(err); });
			}).catch(err => { console.log(err); });
		}
	});
	//删除用户方法
	app.post('/userControl/deleteUser', jsonParser, (req, res) => {
		Ms.Users.find({ _id: req.body.data._id }).deleteMany().then(() => {
			Ms.Users.find({}).then(msg => {
				res.json({ data: msg });
			}).catch(err => { console.log(err); });
		}).catch((err) => { console.log(err); });
	});
};