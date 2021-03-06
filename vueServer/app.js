const express = require('express');
const cors = require('cors');
const controllers = require('./controllers/controller');
const app = express();

//允许跨域
app.use(cors({
	// origin: ['http://localhost:8081', 'http://127.0.0.1:5500', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://localhost:4200', 'http://192.168.31.206:8080'],
	origin: "*",
	methods: ['PUT, POST, GET, DELETE, OPTIONS'],
	alloweHeaders: ['Conten-Type', 'Authorization'],
	credentials: true // 是否带cookie
}));

//调用控制模块
controllers(app);


app.listen(3001, () => {
	console.log('Success Server run 3001');
});