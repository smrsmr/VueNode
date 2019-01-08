const Ms = require('./tool/tool');
const Dealers = require('./views/dealers');
const TheChart = require('./views/TheChart');
const userControl = require('./views/userControl');
const excel = require('./views/Excel');
module.exports = function (app) {
	Dealers(app, Ms);
	TheChart(app, Ms);
	userControl(app, Ms);
	excel(app, Ms);
};