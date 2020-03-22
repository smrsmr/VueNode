const express = require("express");
const cors = require("cors");
const controllers = require("./controllers/controller");
var https = require("https");
var fs = require("fs");
const app = express();
var path = require("path");

var privateCrt = fs.readFileSync(path.join(process.cwd(), "https/1_www.adcontrol.club_bundle.crt"), "utf8");
var privateKey = fs.readFileSync(path.join(process.cwd(), "https/2_www.adcontrol.club.key"), "utf8");
//允许跨域
app.use(
	cors({
		// origin: ['http://localhost:8081', 'http://127.0.0.1:5500', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://localhost:4200', 'http://192.168.31.206:8080'],
		origin: "*",
		methods: ["PUT, POST, GET, DELETE, OPTIONS"],
		alloweHeaders: ["Conten-Type", "Authorization"],
		credentials: true // 是否带cookie
	})
);
const HTTPS_OPTOIN = {
	key: privateKey,
	cert: privateCrt
};
const SSL_PORT = 3001;
//调用控制模块
controllers(app);
app.get('/', function (req, res) {
	res.send('Code Player Hello World!');
});
// app.listen(3001, () => {
//   console.log("Success Server run 3001");
// });
const httpsServer = https.createServer(HTTPS_OPTOIN, app);
httpsServer.listen(SSL_PORT, () => {
	console.log(`HTTPS Server is running on: https://localhost:${SSL_PORT}`);
});