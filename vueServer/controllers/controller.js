const Ms = require('./tool/tool');
const Dealers = require('./views/dealers');
const TheChart = require('./views/TheChart');
const userControl = require('./views/userControl');
const test = require('./views/test');
const excel = require('./views/Excel');
const WebSocket = require('./views/WebSocket');
module.exports = function (app) {
	Dealers(app, Ms);
	TheChart(app, Ms);
	userControl(app, Ms);
	excel(app, Ms);
	test(app, Ms);
	WebSocket(app);
};