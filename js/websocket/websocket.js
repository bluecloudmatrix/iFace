var ws = null;
	function startWebSocket() {
		
		var ip = "211.87.227.32";
	
		if ('WebSocket' in window)
			//ws = new WebSocket("ws://localhost:8080/iFace3.0.0/mywebsocket.do");
			ws = new WebSocket("ws://"+ip+":8080/iFace3.0.0/mywebsocket.do");
		else if ('MozWebSocket' in window)
			//ws = new MozWebSocket("ws://localhost:8080/iFace3.0.0/mywebsocket.do");
			ws = new MozWebSocket("ws://"+ip+":8080/iFace3.0.0/mywebsocket.do");
		else
			alert("not support");
		
		ws.binaryType = 'arraybuffer';
		ws.onmessage = function(msg) {
			//alert(msg.data);
			if(msg.data == 'ok'){
				document.getElementById("load").style.display = "none";
			}
			/*var arrayBuffer = msg.data;
			var bytes = new Uint8Array(arrayBuffer);
			console.log(msg.data);
			
			var image = document.createElement('image'); 
			image.src=msg.data;
			document.body.appendChild(image);*/

		};
		
		ws.onclose = function(evt) {
			alert("lost");
		};
		
		ws.onopen = function(evt) {
			alert("connected");
		};
	}
	
	function sendMsg() {
		ws.send(document.getElementById('writeMsg').value);
	}
	function sendPic(){
		var file = document.querySelector('input[type="file"]').files[0];
		//var file = document.querySelector('input[type="file"]');
		console.log(file);
		ws.send(file);
	}
	function draw() {
		myImage = new Image();
		//myImage.src = 'http://localhost:8080/iFace3.0.0/asm6.png';
		myImage.src = 'http://'+ip+':8080/iFace3.0.0/asm6.png';
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.drawImage(myImage, 50, 25);
		var dataUrl = document.getElementById('canvas').toDataURL();
		if(dataUrl != null)
			ws.send(dataUrl);
	    }