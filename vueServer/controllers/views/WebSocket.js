const WebSocket = require('ws');

module.exports = function (app) {
	const server = require('http').Server(app);
	const wss = new WebSocket.Server({ port: 8080 });
	const Arrays = [];
	wss.on('connection', function connection(ws) {
		console.log('server: receive connection.~~服务器启动!!!');
			
		ws.on('message', function incoming(message) {
			//接收客户端传输过来的数据
			// console.log('server: received: %s', message); 
			console.log(message);
			// Arrays.push(message);
			// const mao = new Map([
			// 	[react,[]]
			// ])
			// console.log(Arrays);
			if (message) {
				ws.send(message);
			}
		});
		ws.on('close', function close() {
			console.log('客户端关闭!!!!');
		})
		// ws.ping('', false, true);
	});

	app.get('/websocket', function (req, res) {
		res.json({state:'ok'});
	});
}