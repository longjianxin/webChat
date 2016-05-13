$(function(){
	var chat = io('http://192.168.0.110:8080/chat'),
		news = io('http://192.168.0.110:8080/news');

	chat.on('connect', function(){
		console.log('<------------chat------------>');

		//flag 新加入状态
		chat.on('join', function(flag, data){
			addUser(flag, chat.id, data);
		});

		chat.on('say', function(data){
			if(data.client_id != chat.id){
				sayHello(data);
			}else{
				$("#textMsg").val('');
				sayHello(data, true);
			}
		});

		/*chat.on('private', function(data){
			alert(data);
		});

		chat.on('all', function(data){
			alert(data);
		});*/
	});

	$("#sendMsg").on("click",function(e){
		say();
	});
	$(document).keypress(function(e){
		console.log(e, e.ctrlKey, e.which);
		if(e.ctrlKey && (e.which == 10 || e.which == 13)){
			say();
		}
	});

	function say(){
		var msg = $("#textMsg").val();
		chat.emit('say', {msg: msg});
	}

	news.on('connect', function(){
		console.log('<------------news------------>');
	});
});
