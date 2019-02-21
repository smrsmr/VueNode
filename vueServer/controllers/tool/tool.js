/**
 * 工具模块
*/
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// let connection = mongoose.createConnection('mongodb://mongodb:123456@localhost/mongodb', { useNewUrlParser: true });
let connection = mongoose.createConnection('mongodb://localhost/mongodb', { useNewUrlParser: true });

//设置变量类型
/**
 * 经销商数据库
 */
let schema = new mongoose.Schema(
	{
		area: String, 
		prov: String,
		city: String,
		dealer: String,
		name: String,
		address: String,
		phone: String,
		code: String 
	}
);
//设置变量类型
/**
 * 用户信息数据库
 */
let user = new mongoose.Schema(
	{
		name: String,
		pass: String,
		privilege: Number,
	}
);
let Todo = connection.model('dealers', schema);   //链接经销商表
let Users = connection.model('users', user);          //链接用户数据表
module.exports = {
	Todo: Todo,
	Users: Users,
	bodyParser: bodyParser,
	jwt: jwt,
};