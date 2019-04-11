/* eslint-disable no-undef */
/**
 * 经销商增删改查模块
 */
global.userName = ''; global.obj = {};
let currData = null;
let currentpage = null;
let pageStart = 0; let pageEnd = 0;
// let	len = 0;
let n1 = {}; let n2 = { 'area': userName }; let
	sObj = null;
module.exports = function (app, Ms) {
	// parse application/x-www-form-urlencoded
	// const bodyParser = Ms.bodyParser.urlencoded({ extended: false });
	// parse application/json
	const jsonParser = Ms.bodyParser.json();
	// 默认获取经销商数据接口
	app.post('/getdata', jsonParser, (req, res) => {
		currData = req.body.currData;
		currentpage = req.body.currentpage;
		pageEnd = currData * currentpage;
		pageStart = pageEnd - currData;
		n2.area = userName;
		// admin 管理员账号返回全部数据  其他账号就返回相应站点的数据
		obj = userName !== 'admin' ? { area: userName } : {};
		sObj = userName !== 'admin' ? n2 : n1;
		// console.log(sObj);
		// 分页查询获取数据
		Ms.Todo.find(sObj).skip(pageStart).limit(currData).exec((err, data) => {
			if (err) throw err;
			Ms.Todo.find(sObj).then((msg) => {
				res.json({ data, len: msg.length });
			}).catch((err) => { console.log(err); });
		});
	});
	// 登录接口
	app.post('/login', jsonParser, (req, res) => {
		// 每次登录前 恢复默认筛选设置
		n1 = {};
		n2 = { area: userName };
		const name = req.body.name;
		const pass = req.body.pass;
		Ms.Users.find({ name }).exec((err, data) => {
			if (err) throw err;
			if (data.length !== 0) {
				const username = { name: req.body.name }; // 要生成token的主题信息
				const secretOrPrivateKey = 'asdtpor123e12w456fgh12bnhjk552yu';// 这是加密的key（密钥）
				// 秘钥 + username + 过期时间生成 Token
				const token = Ms.jwt.sign(username, secretOrPrivateKey, {
					expiresIn: 60 * 60, // 过期时间 秒
				});
				if (pass !== data[0].pass) {
					res.json({ status: 2, mess: '密码错误' });
					return false;
				}
				// userName = name;  //报名成功赋值用户名给全局变量
				global.userName = name; // 报名成功赋值用户名给全局变量
				res.json({
					status: 1, mess: 'ok', token, user_name: req.body.name
				});
			} else {
				res.json({ status: 401, mess: '账户不存在' });
			}
		});
	});
	// 判断token接口
	app.get('/checkUser', (req, res) => {
		const authorization = req.get('Authorization');
		if (authorization === '') { // 判断请求头有没有携带 token ,没有直接返回 401
			res.status(401);
		}
		const token = authorization.split(' ')[1];
		const secretOrPrivateKey = 'asdtpor123e12w456fgh12bnhjk552yu'; // 这是加密的key（密钥）
		Ms.jwt.verify(token, secretOrPrivateKey, (err, data) => {
			if (err) { //  时间失效的时候/ 伪造的token
				res.send({ status: 10010 });
			} else {
				res.send({ status: 10000, msg: data });
			}
		});
	});
	// 删除经销商数据接口
	app.post('/delete', jsonParser, (req, res) => {
		// console.log(req.body.data._id);
		// 分页查询获取数据
		Ms.Todo.find({ _id: req.body.data._id }).deleteMany().then(() => {
			Ms.Todo.find(sObj).skip(pageStart).limit(currData).exec((err, data) => {
				if (err) throw err;
				Ms.Todo.find(sObj).then((msg) => {
					res.json({ data, len: msg.length });
				}).catch((err) => { console.log(err); });
			});
		}).catch((err) => { console.log(err); });
	});
	// 编辑经销商数据接口
	app.post('/edit', jsonParser, (req, res) => {
		n2.area = userName;
		Ms.Todo.updateMany({ _id: req.body.id }, {
			area: req.body.area, prov: req.body.prov, city: req.body.city, code: req.body.code, phone: req.body.phone, name: req.body.name, address: req.body.address
		}).then((msg) => {
			Ms.Todo.find(sObj).skip(pageStart).limit(currData).exec((err, data) => {
				if (err) throw err;
				Ms.Todo.find(sObj).then((msg) => {
					res.json({ data, len: msg.length });
				}).catch((err) => { console.log(err); });
			});
		}).catch((err) => { console.log(err); });
	});
	// 增加经销商数据接口
	app.post('/addDealer', jsonParser, (req, res) => {
		Ms.Todo(req.body).save().then((msg) => {
			Ms.Todo.find({}, (err, data) => {
				if (err) throw err;
				res.json({ status: 1, data: msg });
			});
		}).catch((err) => { console.log(err); });
	});
	// 获取省份接口
	app.get('/getArea', (req, res) => {
		Ms.Todo.find(obj).exec((err, data) => {
			if (err) {
				//throw err;
				res.json({ status: 0, data: err });
				return false;
			}
			const arrArea = [];
			data.forEach((value, index) => {
				if (!arrArea.includes(data[index].prov)) {
					arrArea.push(data[index].prov);
				}
			});
			res.json({ status: 1, data: arrArea });
		});
	});
	// 查找对应省份经销商
	app.post('/setProv', jsonParser, (req, res) => {
		if (req.body.prov !== '') {
			n1 = { prov: req.body.prov };
			n2 = { area: userName, prov: req.body.prov };
		} else {
			n1 = {};
			n2 = { area: userName };
		}
		sObj = userName !== 'admin' ? n2 : n1;
		Ms.Todo.find(obj).then((data) => {
			const arrCity = []; let
				arrDea = [];
			data.forEach((value, index) => {
				if (!arrCity.includes(data[index].city) && req.body.prov === data[index].prov) {
					arrCity.push(data[index].city);
				}
				if (req.body.prov === data[index].prov) {
					// 返回相关省份经销商数据
					arrDea.push(data[index]);
				}
			});
			res.json({
				status: 1, data: arrCity, dea: arrDea, len: arrDea.length
			});
		}).catch((err) => {
			res.json({ status: 0, data: err });
		});
	});
	// 查找对应城市经销商接口
	app.post('/setCity', jsonParser, (req, res) => {
		if (req.body.prov !== '' && req.body.city !== '') {
			n1 = { prov: req.body.prov, city: req.body.city };
			n2 = { area: userName, prov: req.body.prov, city: req.body.city };
		} else if (req.body.prov === '' && req.body.city !== '') {
			n1 = { city: req.body.city };
			n2 = { area: userName, city: req.body.city };
		} else if (req.body.prov !== '' && req.body.city === '') {
			n1 = { prov: req.body.prov };
			n2 = { area: userName, prov: req.body.prov };
		} else if (req.body.prov === '' && req.body.city === '') {
			n1 = {};
			n2 = { area: userName };
		}
		sObj = userName !== 'admin' ? n2 : n1;
		Ms.Todo.find(sObj).then((data) => {
			res.json({ status: 1, data: data });
		}).catch((err) => {
			res.json({ status: 0, data: err });
		});
	});
};