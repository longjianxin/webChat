var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

function getRandomHeaderID(){
	var minID = 1;
	var maxID = 3;
	return Math.floor(Math.random() * (maxID - minID + 1)) + minID;
}
var connectionList = {};

var chat = io.of('/chat').on('connection', function(socket){
	// console.log(socket.request.headers);
	var socket_id = socket.id;
	if(! connectionList[socket_id]){
		connectionList[socket_id] = {client_id: socket.client.id, header: getRandomHeaderID()};
	}
	
	socket.emit('join', true, connectionList);
	socket.broadcast.emit('join', false, connectionList);//群发【去掉自身】

	var welcome = {socket_id: socket_id, client_id: socket.client.id, header: connectionList[socket_id].header};
	socket.on('say', function(data){
		welcome.msg = data.msg;
		socket.emit('say', welcome);
		socket.broadcast.emit('say', welcome);
	});
	/*socket.on('private', function(to, data){
		console.log('private', to, data);
		socket.to(to).emit('private', data);
	});

	socket.on('all', function(data){
		console.log('all', data);
		socket.broadcast.emit('all', data);
	});*/

	socket.on('disconnect', function(){
		if(connectionList[socket_id]){
			// socket.broadcast.emit('quit', {username: connectionList[socketID].username});
		}

		delete connectionList[socket_id];
	});
});

var news = io.of('/news').on('connection', function(socket){

});