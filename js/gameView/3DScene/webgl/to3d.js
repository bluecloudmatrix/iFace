/**
 * turn mapMatrix into 3D scene via three.js
 * 2013/7/13
**/
function SetOpacity(ev, v) {
	ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')'
			: ev.style.opacity = v / 100;
}

var Cflag = 0; //0-deviceorientation
var FoundFlag = 1;
var htracker_own;
var stopAnimate = 1; //0表示一直循环，1表示结束3D场景
var scene;
var dir = 6; 
var camera;
var view = 1;
var blocks;
var bDirection = new Array();
var keepDirection = new Array();
var t = 0;
var tool_one = 0;
var tool_two = 0;
var tool_three = 0;
var maxJumpTime = 39;//5px each time, arrive at the max height of 300 px;
var jumptime = 0;
var falltime = 0;
var date1, date2, date3;
var booms = 0;
var score;
var currentJigsaw = 0;


var missingPiece = new Array();
for(var i = 0; i < 4; i++)
	missingPiece[i] = 0;

var stats;
var container;
var keyArr = new Array();
var angle = 90;
var light;
var glowSpeed = 0.05;	//speed of light change
var floor;
var jigsaw11, jigsaw12, jigsaw21, jigsaw22;
var currentDirection = 0; // 0 for x & 1 for z
var overX = 0, overZ = 0; // 0 for normal & -1 for meeting the bottom line & 1 for meeting the top line
var jigsaw11Got = false;
var jigsaw12Got = false;
var jigsaw21Got = false;
var jigsaw22Got = false;
var nextX;
var nextZ;
var speed = 6;
var gotAll = 0;

/********************************
********************************/
var clickJigsaw = 0;
var strMap = "";
var jigsaw = 0;;
var isOk = 0;
var channel = null;
var id = 0;
var myDate = new Date();
id = myDate.getHours() + "" + myDate.getMinutes() + myDate.getSeconds() + parseInt(10*Math.random());
var playerid = new Array();
var players = new Array();
var users = new Array();

var one = 0;
var two = 0;
var three = 0;
var four = 0;
var eye = 0;
var mouth = 0;
/********************************
********************************/
var TomStartGameTime;
var TomStopGameTime;
var TomeStepNum = 0;


//deviceorientation
function to3D() {
	//计时
	TomStartGameTime = Date.parse(new Date()); 
	
	eye = result_eye;
	mouth = result_mouth;
	$('#getall').show();
	$('#scen4').show();
	$('#video').hide();
	$('#scen5').hide();
	$('#reload').show();
	$('#jigsaw').show();
	$('#ThreeJS').show();
	$('#findhelp').show();
	$('#jump').show();
	$('#xray').show();
	
	Cflag = 0;
	
/********************************
********************************/
	
	function startWebRtc(){
		channel = new DataChannel();
		channel.open(roomid);
		channel.onopen = function(userid) {
			$('#newOne').fadeIn();
			isOk = 1;
		};
		
		channel.onmessage = function(obj, userid) {
			//alert(obj.arrJigsaw.one);
			/*
			if(obj.jigsaw != 0)
				removeJigsaw(obj.jigsaw);
			if(obj.clickJigsaw !=0){
				clickJig(obj.clickJigsaw);
			}
			*/
			if(obj.one == 1){
				removeJigsaw(1);
				clickJig(1);
				missingPiece[0] = 1;
			}
			if(obj.two == 1){
				removeJigsaw(2);
				clickJig(2);
				missingPiece[1] = 1; 
			}
			if(obj.three == 1){
				removeJigsaw(3);
				clickJig(3);
				missingPiece[2] = 1;
			}
			if(obj.four == 1){
				removeJigsaw(4);
				clickJig(4);
				missingPiece[3] = 1;
			}
			var flag = 0;
			var i = 0;
			for(i = 0; i < players.length; i++){
				if(playerid[i] == obj.id){
					flag = 1;
					players[i].position.x = obj.x;
					players[i].position.z = obj.z;
				}
			}
			if(flag == 0){
				playerid[i] = obj.id;
				users[i] = userid;
				//alert(strMap);
				var json_sphere={"id":id, "x":camera.position.x, "z":camera.position.z, "mapMatrix":strMap,"one":one,"two":two,"three":three,"four":four,"eye":eye,"mouth":mouth};
				sendViaRtc(json_sphere);
				InitSphere();
				//alert("initSphere!");
			}
		};
			
		channel.onleave = function(userid) {
			var i = 0;
				for(i = 0; i < players.length; i++){
					if(users[i] == userid){
						playerid.splice(i,1);
						scene.remove(players[i]);
						players.splice(i,1);
					}
				}
				$('#leave').fadeIn();
				};				
	}
		
	function sendViaRtc(a){
		if(isOk == 1){
			channel.send(a);
		}
	}	
/********************************
********************************/
	var t = 0;
	function animate() {
		TomeStepNum++;
		if(stopAnimate == 1) {
			//*******************************/
				if(t < 200) {
					camera.position.x = 625;
					camera.position.y = 0;
					camera.position.z = 2500 - 15*t;
					camera.lookAt( {x:635, y:0, z:400 } );   
				} else if(t >= 200 && t < 300){
					camera.position.x = 200*Math.cos(t/15)+625;
					camera.position.y = 800;
					camera.position.z = 200*Math.sin(t/15)+400;
					camera.lookAt( {x:635, y:300, z:400 } );   
				} else if(t == 300){
					//camera.position.x = 0;
					//camera.position.y = 30;
					//camera.position.z = 0;
					//window.addEventListener('deviceorientation', moveBall, true);
				}
				t++;
				
			//*******************************/
			
			//changing glowing lights				
			light.intensity += glowSpeed;
			if (light.intensity >= 3.5 || light.intensity <= 0.15){
				//light.intensity = 0;
				glowSpeed *= -1;
			}
		
			//stats.update();
			HandleCamera();
			PlayerJump();
			if(gotAll == 0){
				jigsawRun(jigsaw11);
				jigsawRun(jigsaw12);
				jigsawRun(jigsaw21);
				jigsawRun(jigsaw22);
			}else{
				jigsawRun2(jigsaw11);
				jigsawRun2(jigsaw12);
				jigsawRun2(jigsaw21);
				jigsawRun2(jigsaw22);
			}
			if(FoundFlag == 0)
				foundJigsaw();
			foundAll();
			
				
	/******************************
	***************************/
			//var arrJigsaw={"one":0,"two":0,"three":0,"four":0};
			var json_sphere={"id":id, "x":camera.position.x, "z":camera.position.z, "mapMatrix":0, "one":one,"two":two,"three":three,"four":four, "eye":eye, "mouth":mouth};
			sendViaRtc(json_sphere);
	/******************************
	***************************/	
			
			renderer.render(scene, camera);
			window.requestAnimationFrame(animate);
		
		}else {
			return 0;
		}	
	}
	
	function start(){
		startWebRtc();
		InitCamera();
		InitScene();
		if(result_eye == 1) {//open
			InitLight_open();
			InitFloor_open();
			InitBlocks_open();
		} else if(result_eye == 0) {
			InitLight();
			InitFloor();
			InitBlocks();
		}
		InitJigsaw();
		InitRender();
		date1 = new Date();
		
		document.onkeydown=function(e){
		var e = event || window.event;     
		var keycode = e.which ? e.which : e.keyCode;
		if(keycode == 37){//left
			keyArr[37] = 1;			
					
		}else if(keycode == 39){//right
			keyArr[39] = 1;
					
		}else if(keycode == 38){//up
			keyArr[38] = 1;
					
		}else if(keycode == 40){//down
			keyArr[40] = 1;
						
		}else if(keycode == 87){//w
			keyArr[87] = 1;
		}else if(keycode == 83){//s
			keyArr[83] = 1;
		}else if(keycode == 65){//a			
			keyArr[65] = 1;
		}else if(keycode == 68){//d
			keyArr[68] = 1;
		}
		}
		
		document.onkeyup=function(e){
			var e = event || window.event;     
			var keycode = e.which ? e.which : e.keyCode;
					
			if(keycode == 37){//left
				keyArr[37] = 0;
			}else if(keycode == 39){//right
				keyArr[39] = 0;
			}else if(keycode == 38){//up
				keyArr[38] = 0;
			}else if(keycode == 40){//down
				keyArr[40] = 0;
			}else if(keycode == 87){//w
						keyArr[87] = 0;
					}else if(keycode == 83){//s
						keyArr[83] = 0;
					}else if(keycode == 65){//a			
						keyArr[65] = 0;
					}else if(keycode == 68){//d
						keyArr[68] = 0;
					}
		}
	
	
		animate();
	}
	start();
}	
//face
function to3D_face() {
	//计时
	TomStartGameTime = Date.parse(new Date()); 

	eye = result_eye;
	mouth = result_mouth;
	$('#getall').show();
	$('#scen4').show();
	$('#video').hide();
	$('#scen5').hide();
	$('#reload').show();
	$('#jigsaw').show();
	$('#ThreeJS').show();
	$('#findhelp').show();
	$('#jump').show();
	$('#xray').show();
	
	Cflag = 1;
	
/********************************
********************************/
	function startWebRtc(){
		channel = new DataChannel();
		channel.open(roomid);
		channel.onopen = function(userid) {
			$('#newOne').fadeIn();
			isOk = 1;
		};
		
		channel.onmessage = function(obj, userid) {
			//alert(obj.arrJigsaw.one);
			/*
			if(obj.jigsaw != 0)
				removeJigsaw(obj.jigsaw);
			if(obj.clickJigsaw !=0){
				clickJig(obj.clickJigsaw);
			}
			*/
			if(obj.one == 1){
				removeJigsaw(1);
				clickJig(1);
				missingPiece[0] = 1;
			}
			if(obj.two == 1){
				removeJigsaw(2);
				clickJig(2);
				missingPiece[1] = 1; 
			}
			if(obj.three == 1){
				removeJigsaw(3);
				clickJig(3);
				missingPiece[2] = 1;
			}
			if(obj.four == 1){
				removeJigsaw(4);
				clickJig(4);
				missingPiece[3] = 1;
			}
			var flag = 0;
			var i = 0;
			for(i = 0; i < players.length; i++){
				if(playerid[i] == obj.id){
					flag = 1;
					players[i].position.x = obj.x;
					players[i].position.z = obj.z;
				}
			}
			if(flag == 0){
				playerid[i] = obj.id;
				users[i] = userid;
				//alert(strMap);
				var json_sphere={"id":id, "x":camera.position.x, "z":camera.position.z, "mapMatrix":strMap,"one":one,"two":two,"three":three,"four":four,"eye":eye,"mouth":mouth};
				sendViaRtc(json_sphere);
				InitSphere();
				//alert("initSphere!");
			}
		};
			
		channel.onleave = function(userid) {
			var i = 0;
				for(i = 0; i < players.length; i++){
					if(users[i] == userid){
						playerid.splice(i,1);
						scene.remove(players[i]);
						players.splice(i,1);
					}
				}
				$('#leave').fadeIn();
				};				
	}
		
	function sendViaRtc(a){
		if(isOk == 1){
			channel.send(a);
		}
	}	
/********************************
********************************/

	var t = 0;
	function animate() {
		TomeStepNum++;
		//*******************************/
		if(stopAnimate == 1) {
			/*if(t < 200) {
				camera.position.x = 625;
				camera.position.y = 0;
				camera.position.z = 2500 - 15*t;
				camera.lookAt( {x:635, y:0, z:400 } );   
			} else if(t >= 200 && t < 300){
				camera.position.x = 200*Math.cos(t/15)+625;
				camera.position.y = 800;
				camera.position.z = 200*Math.sin(t/15)+400;
				camera.lookAt( {x:635, y:300, z:400 } );   
			} else if(t == 300){
				//camera.position.x = 0;
				//camera.position.y = 30;
				//camera.position.z = 0;
			}
			t++;*/
			if(t < 50) {
					camera.position.x = 625;
					camera.position.y = 0;
					camera.position.z = 2500 - 60*t;
					camera.lookAt( {x:635, y:0, z:400 } );   
				} else if(t >= 50 && t < 100){
					camera.position.x = 50*Math.cos(t/15)+625;
					camera.position.y = 800;
					camera.position.z = 50*Math.sin(t/15)+400;
					camera.lookAt( {x:635, y:300, z:400 } );   
				} else if(t == 100){
					//camera.position.x = 0;
					//camera.position.y = 30;
					//camera.position.z = 0;
					//window.addEventListener('deviceorientation', moveBall, true);
				}
				t++;
			
			//*******************************/
			
			//changing glowing lights				
			light.intensity += glowSpeed;
			if (light.intensity >= 3.5 || light.intensity <= 0.15){
				//light.intensity = 0;
				glowSpeed *= -1;
			}
		
			//stats.update();
			HandleCamera();
			PlayerJump();
			if(gotAll == 0){
				jigsawRun(jigsaw11);
				jigsawRun(jigsaw12);
				jigsawRun(jigsaw21);
				jigsawRun(jigsaw22);
			}else{
				jigsawRun2(jigsaw11);
				jigsawRun2(jigsaw12);
				jigsawRun2(jigsaw21);
				jigsawRun2(jigsaw22);
			}
			if(FoundFlag == 0)
				foundJigsaw();
			foundAll();
			
			/******************************
			***************************/	
			//var arrJigsaw={"one":0,"two":0,"three":0,"four":0};
			var json_sphere={"id":id, "x":camera.position.x, "z":camera.position.z, "mapMatrix":0, "one":one,"two":two,"three":three,"four":four, "eye":eye, "mouth":mouth};
			sendViaRtc(json_sphere);
			/******************************
			***************************/	
			
			renderer.render(scene, camera);
			window.requestAnimationFrame(animate);
		} else {
			return 0;
		}
	}	
	
	function start(){
		startWebRtc();
		InitCamera();
		InitScene();			
		if(result_eye == 1) {//open
			InitLight_open();
			InitFloor_open();
			InitBlocks_open();
		} else if(result_eye == 0) {
			InitLight();
			InitFloor();
			InitBlocks();
		}
		InitJigsaw();
		InitRender();
		date1 = new Date();
		
		//face control
		var overlay = control.getContext('2d');	
		document.addEventListener("facetrackingEvent", function( event ) {
			if (event.detection == "CS") {			
				overlay.beginPath();
                overlay.arc(event.x, event.y+10, event.width*0.1, 0, Math.PI * 2, true);
                overlay.closePath();
				overlay.fillStyle = "#FF0000";
                overlay.fill();
				overlay.translate(event.x, event.y)
				overlay.rotate(event.angle-(Math.PI/2));
				overlay.strokeStyle = "#00CC00";
				overlay.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
				overlay.rotate((Math.PI/2)-event.angle);
				overlay.translate(-event.x, -event.y);

				GAMEVIEW.faceControl.faceTriggerThird(event.x, event.y);
				
			}		
		});
		
		htracker_own = new headtrackr.Tracker({altVideo : {ogv : "./media/capture5.ogv", mp4 : "./media/capture5.mp4"}, calcAngles : true, ui : false, headPosition : false, debug : false});
		htracker_own.init(video, control); 
		htracker_own.start();
		
		animate();

	}
	start();
}	

	
	function InitCamera(){
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.x = 0;
		camera.position.z = 0;
		camera.position.y = 40;
		camera.lookAt( {x:0, y:120, z:100 } );
		camera.rotation.x = 0;
		camera.rotation.y = 0;
		camera.rotation.z = 0;
	}
	
	function InitScene(){
		scene = new THREE.Scene();
	}	
	
	function InitLight() { 
		light = new THREE.DirectionalLight(0x9fcef4, 1.0, 0);
		light.position.set(10, 300, -130);
		light.intensity = 2;
		
		var light_02 = new THREE.DirectionalLight(0x9fcef4, 1.0, 0);
		light_02.position.set(10, 300, 130);
		light_02.intensity = 2;
		//light.castShadow = true;		//启用阴影
		scene.add(light);	
		scene.add(light_02);	
	}
	
	function InitLight_open() { 
		light = new THREE.DirectionalLight(0x9fcef4, 1.0, 0);
		light.position.set(10, 300, -130);
		light.intensity = 2;
		
		var light_02 = new THREE.DirectionalLight(0x9fcef4, 1.0, 0);
		light_02.position.set(10, 300, 130);
		light_02.intensity = 2;
		//light.castShadow = true;		//启用阴影
		scene.add(light);	
		scene.add(light_02);	
	}
	
	function InitFloor(){/*
		var texture = new THREE.ImageUtils.loadTexture('webgl/floor.png');
		texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
		texture.repeat.set(100, 100);
		var material = new THREE.MeshBasicMaterial({ map: texture, color: 0x804000});
		var floor = new Physijs.BoxMesh(new THREE.PlaneGeometry(4000, 3000), material, 0);
		floor.position.y = -5;
		scene.add(floor);*/
		var texture = new THREE.ImageUtils.loadTexture('webgl/floor.png');
		for(var i = 0; i < 5; i++){
			for(var j = 0; j < 6; j++){
				var floor = new THREE.Mesh(					
					new THREE.PlaneGeometry(250, 200), 
					new THREE.MeshBasicMaterial({map: texture, color: 0x804000})
				);
				floor.position.y = -5;
				floor.position.x = j * 250;
				floor.position.z = i * 200;
				//floor.receiveShadow = true;		
				scene.add(floor);	
			}
		}
	
	}
	
	function InitFloor_open(){
		var texture = new THREE.ImageUtils.loadTexture('webgl/grid.png');
		texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
		texture.repeat.set(100, 100);
		var material = new THREE.MeshBasicMaterial({ map: texture, color: 0x804000});
		var floor = new Physijs.BoxMesh(new THREE.PlaneGeometry(4000, 3000), material, 0);
		floor.position.y = -5;
		scene.add(floor);
		
		/*var texture = new THREE.ImageUtils.loadTexture('webgl/ground4.png');
		for(var i = 0; i < 5; i++){
			for(var j = 0; j < 6; j++){
				var floor = new THREE.Mesh(					
					new THREE.PlaneGeometry(250, 200), 
					new THREE.MeshBasicMaterial({map: texture})
				);
				floor.position.y = -5;
				floor.position.x = j * 250;
				floor.position.z = i * 200;
				//floor.receiveShadow = true;		
				scene.add(floor);	
			}
		}*/
	}
	
		/*
	 ***********************************************************
	 *				the models of the buildings
	 ***********************************************************
	*/
	//the normal building 15
	function building_one(){
		this.mybody = new THREE.Object3D();
		this.mybody.position.x = threeDWidth*10*Math.random();
		this.mybody.position.y = 0;
		this.mybody.position.z = threeDHeight*10*Math.random();
	
		var b_one_l1 = new THREE.Mesh(
			new THREE.CubeGeometry(20, 70, 20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_one_l1.position.x = 0;
		b_one_l1.position.z = 0;
		b_one_l1.position.y = 0;
	
		this.mybody.add(b_one_l1);
					
		var b_one_l2 = new THREE.Mesh(
			new THREE.CubeGeometry(20, 10, 20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_one_l2.position.x = 0;
		b_one_l2.position.z = 0;
		b_one_l2.position.y = 45;
	
		this.mybody.add(b_one_l2);
		
		var b_one_l3 = new THREE.Mesh(
			new THREE.CubeGeometry(20, 10, 20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_one_l3.position.x = 0;
		b_one_l3.position.z = 0;
		b_one_l3.position.y = 60;
	
		this.mybody.add(b_one_l3);
		
		var b_one_l4 = new THREE.Mesh(
			new THREE.CubeGeometry(20, 10, 20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_one_l4.position.x = 0;
		b_one_l4.position.z = 0;
		b_one_l4.position.y = 75;

		this.mybody.add(b_one_l4);
		
		var b_one_l5 = new THREE.Mesh(
			new THREE.CubeGeometry(20, 10, 20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_one_l5.position.x = 0;
		b_one_l5.position.z = 0;
		b_one_l5.position.y = 90;
	
		this.mybody.add(b_one_l5);	
		
		var b_one_l6 = new THREE.Mesh(
			new THREE.CubeGeometry(20, 10, 20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_one_l6.position.x = 0;
		b_one_l6.position.z = 0;
		b_one_l6.position.y = 105;
		
		this.mybody.add(b_one_l6);	
		
		var b_one_l7 = new THREE.Mesh(
			new THREE.CubeGeometry(20, 30, 20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_one_l7.position.x = 0;
		b_one_l7.position.z = 0;
		b_one_l7.position.y = 120;
	
		this.mybody.add(b_one_l7);	
					
		scene.add(this.mybody);
	}

	//six edges 5
	function building_two(){
		this.mybody = new THREE.Object3D();
		this.mybody.position.x = threeDWidth*10*Math.random();
		this.mybody.position.y = 0;
		this.mybody.position.z = threeDHeight*10*Math.random();
		
		var b_two_l1 = new THREE.Mesh(
			new THREE.TorusGeometry(5, 5, 8, 6, Math.PI * 2),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_two_l1.position.x = 0;
		b_two_l1.position.z = 0;
		b_two_l1.position.y = 0;
		b_two_l1.rotation.set(Math.PI/2, 0, 0);
	
		this.mybody.add(b_two_l1);
		
		var b_two_l2 = new THREE.Mesh(
			new THREE.TorusGeometry(5, 5, 8, 6, Math.PI * 2),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_two_l2.position.x = 0;
		b_two_l2.position.z = 0;
		b_two_l2.position.y = 8;
		b_two_l2.rotation.set(Math.PI/2, 0, 0);
		
		this.mybody.add(b_two_l2);	
		
		var b_two_l3 = new THREE.Mesh(
			new THREE.TorusGeometry(5, 5, 8, 6, Math.PI * 2),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_two_l3.position.x = 0;
		b_two_l3.position.z = 0;
		b_two_l3.position.y = 16;
		b_two_l3.rotation.set(Math.PI/2, 0, 0);
	
		this.mybody.add(b_two_l3);	
		
		var b_two_l4 = new THREE.Mesh(
			new THREE.TorusGeometry(5, 5, 8, 6, Math.PI * 2),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_two_l4.position.x = 0;
		b_two_l4.position.z = 0;
		b_two_l4.position.y = 24;
		b_two_l4.rotation.set(Math.PI/2, 0, 0);
		
		this.mybody.add(b_two_l4);	
		
		var b_two_l5 = new THREE.Mesh(
			new THREE.TorusGeometry(5, 5, 8, 6, Math.PI * 2),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_two_l5.position.x = 0;
		b_two_l5.position.z = 0;
		b_two_l5.position.y = 32;
		b_two_l5.rotation.set(Math.PI/2, 0, 0);
		
		this.mybody.add(b_two_l5);	
					
		scene.add(this.mybody);
	}

	//the pearl of the oreient 2
	function building_three(){
		this.mybody = new THREE.Object3D();
		this.mybody.position.x = threeDWidth*10*Math.random();
		this.mybody.position.y = 30;
		this.mybody.position.z = threeDHeight*10*Math.random();
		
		var b_three_l1_1 = new THREE.Mesh(
			new THREE.CubeGeometry(15, 80, 15),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_three_l1_1.position.x = 0;
		b_three_l1_1.position.z = -35;
		b_three_l1_1.position.y = -10;
		b_three_l1_1.rotation.set(Math.PI/4, 0, 0);	
		
		this.mybody.add(b_three_l1_1);	
		
		var b_three_l1_2 = new THREE.Mesh(
			new THREE.CubeGeometry(15, 80, 15),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_three_l1_2.position.x = 0;
		b_three_l1_2.position.z = 35;
		b_three_l1_2.position.y = -10;
		b_three_l1_2.rotation.set(-Math.PI/4, 0, 0);
		
		this.mybody.add(b_three_l1_2);
		
		var b_three_l1_3 = new THREE.Mesh(
			new THREE.CubeGeometry(15, 80, 15),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_three_l1_3.position.x = -35;
		b_three_l1_3.position.z = 0;
		b_three_l1_3.position.y = -10;
		b_three_l1_3.rotation.set(0, 0, -Math.PI/4);
	
		this.mybody.add(b_three_l1_3);	
		
		var b_three_l1_4 = new THREE.Mesh(
			new THREE.CubeGeometry(15, 80, 15),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_three_l1_4.position.x = 35;
		b_three_l1_4.position.z = 0;
		b_three_l1_4.position.y = -10;
		b_three_l1_4.rotation.set(0, 0, Math.PI/4);
		
		this.mybody.add(b_three_l1_4);	
		
		var b_three_l2 = new THREE.Mesh(
			new THREE.SphereGeometry(40,20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_three_l2.position.x = 0;
		b_three_l2.position.z = 0;
		b_three_l2.position.y = 40;
	
		this.mybody.add(b_three_l2);	
		
		var b_three_l3 = new THREE.Mesh(
			new THREE.CubeGeometry(30, 100, 30),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_three_l3.position.x = 0;
		b_three_l3.position.z = 0;
		b_three_l3.position.y = 120;
		
		this.mybody.add(b_three_l3);	
		
		var b_three_l4 = new THREE.Mesh(
			new THREE.SphereGeometry(25,20),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_three_l4.position.x = 0;
		b_three_l4.position.z = 0;
		b_three_l4.position.y = 190;
	
		this.mybody.add(b_three_l4);	
		
		var b_three_l5 = new THREE.Mesh(
			new THREE.OctahedronGeometry(15,0),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_three_l5.position.x = 0;
		b_three_l5.position.z = 0;
		b_three_l5.position.y = 240;
	
		this.mybody.add(b_three_l5);	
					
		scene.add(this.mybody);
	}

	//the statue 10
	function building_four(){
		this.mybody = new THREE.Object3D();
		this.mybody.position.x = threeDWidth*10*Math.random();
		this.mybody.position.y = 0;
		this.mybody.position.z = threeDHeight*10*Math.random();
	
		var b_four_l1 = new THREE.Mesh(
			new THREE.CubeGeometry(10, 10, 10),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_four_l1.position.x = 0;
		b_four_l1.position.z = 0;
		b_four_l1.position.y = 0;
		
		this.mybody.add(b_four_l1);	
		
		var b_four_l2 = new THREE.Mesh(
			new THREE.CubeGeometry(6, 4, 6),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_four_l2.position.x = 0;
		b_four_l2.position.z = 0;
		b_four_l2.position.y = 7;
		
		this.mybody.add(b_four_l2);	
		
		var b_four_l3 = new THREE.Mesh(
			new THREE.TorusKnotGeometry(5, 2, 34, 8, 2, 3, 1),
			new THREE.MeshPhongMaterial({color:0xFFFFFF})
		);
		b_four_l3.position.x = 0;
		b_four_l3.position.z = 0;
		b_four_l3.position.y = 17;
		
		this.mybody.add(b_four_l3);	
					
		scene.add(this.mybody);
	}
	/*
	 ***********************************************************
	 *				end models of the buildings
	 ***********************************************************
	*/
	
	function InitBlocks(){
		var bMat = new THREE.MeshPhongMaterial({
			color: 0xFF9900
		});

		blocks = new Array();
		var count = 0;
		for(var n = 0; n < 32; n++){
			randX = Math.round((threeDWidth-10)*Math.random());
			randY = Math.round((threeDHeight-10)*Math.random());
			if(n < 2){
				var building1 = new building_three();
				for(var i = randY; i < randY+10; i++){
					for(var j = randX; j < randX+10; j++){
						mapMatrix[i][j] = 0;
					}
				}
			}else if(n >= 2 && n < 7){
				var building2 = new building_one();
				for(var i = randY; i < randY+3; i++){
					for(var j = randX; j < randX+3; j++){
						mapMatrix[i][j] = 0;
					}
				}
			}else if(n >= 17 && n < 22){
				var building3 = new building_two();
				for(var i = randY; i < randY+3; i++){
					for(var j = randX; j < randX+3; j++){
						mapMatrix[i][j] = 0;
					}
				}
			}else{
				var building4 = new building_four();
				for(var i = randY; i < randY+2; i++){
					for(var j = randX; j < randX+2; j++){
						mapMatrix[i][j] = 0;
					}
				}
			}
		}
		
		for (var i = 0; i < threeDHeight; i+=3){
			for (var j = 0; j < threeDWidth; j++) {
					if(mapMatrix[i][j] == 2){
						//count++;
						
						//Horizontal SEO
						var preJ = j;
						var rowNum = 0;
						while(mapMatrix[i][j] == 2) {	
							rowNum++;
							j++;
						}
						j--;
					
						var b1 = new THREE.Mesh(
							new THREE.CubeGeometry(10*rowNum, 200*Math.random()+10, 10),
							bMat
						);
						//var b1 = new THREE.Mesh(
						//	new THREE.PlaneGeometry(10*rowNum, 10), 
						//	new THREE.MeshLambertMaterial({color: 0xFFFFFF})
						//);
			
						var nowJ = preJ + (rowNum-1)/2;
						b1.position.y = 0;
						b1.position.x = nowJ * 10;
						b1.position.z = i * 10;
						scene.add(b1);
						blocks.push(b1);
					}
			}
		}
		
		for (var i = 1; i < threeDHeight; i+=3){
			for (var j = 0; j < threeDWidth; j++) {
					if(mapMatrix[i][j] == 2){
						count++;
						
						//Horizontal SEO
						var preJ = j;
						var rowNum = 0;
						while(mapMatrix[i][j] == 2) {	
							rowNum++;
							j++;
						}
						j--;
					
						var b1 = new THREE.Mesh(
							new THREE.PlaneGeometry(10*rowNum, 10), 
							new THREE.MeshLambertMaterial({color: 0x0000FF})
						);
						
						var nowJ = preJ + (rowNum-1)/2;
						b1.position.y = -4;
						b1.position.x = nowJ * 10;
						b1.position.z = i * 10;
						b1.material.wireframe = true;
						scene.add(b1);
						blocks.push(b1);
					}
			}
		}
		
		for (var i = 2; i < threeDHeight; i+=3){
			for (var j = 0; j < threeDWidth; j++) {
					if(mapMatrix[i][j] == 2){
						count++;
						
						//Horizontal SEO
						var preJ = j;
						var rowNum = 0;
						while(mapMatrix[i][j] == 2) {	
							rowNum++;
							j++;
						}
						j--;
					
						var b1 = new THREE.Mesh(
							new THREE.PlaneGeometry(10*rowNum, 10), 
							new THREE.MeshLambertMaterial({color: 0x0000FF})
						);
						
						var nowJ = preJ + (rowNum-1)/2;
						b1.position.y = -4;
						b1.position.x = nowJ * 10;
						b1.position.z = i * 10;
						b1.material.wireframe = true;
						scene.add(b1);
						blocks.push(b1);
					}
			}
		}
	
		console.log(count);
	}
	
	function InitBlocks_open(){
		var bMat = new THREE.MeshPhongMaterial({
			color: 0xCCFF33
		});

		blocks = new Array();
		var count = 0;
			for(var n = 0; n < 32; n++){
			randX = Math.round((threeDWidth-10)*Math.random());
			randY = Math.round((threeDHeight-10)*Math.random());
			if(n < 2){
				var building1 = new building_three();
				for(var i = randY; i < randY+10; i++){
					for(var j = randX; j < randX+10; j++){
						mapMatrix[i][j] = 0;
					}
				}
			}else if(n >= 2 && n < 7){
				var building2 = new building_one();
				for(var i = randY; i < randY+3; i++){
					for(var j = randX; j < randX+3; j++){
						mapMatrix[i][j] = 0;
					}
				}
			}else if(n >= 17 && n < 22){
				var building3 = new building_two();
				for(var i = randY; i < randY+3; i++){
					for(var j = randX; j < randX+3; j++){
						mapMatrix[i][j] = 0;
					}
				}
			}else if(n >= 22 && n < 27){
				var building4 = new building_four();
				for(var i = randY; i < randY+2; i++){
					for(var j = randX; j < randX+2; j++){
						mapMatrix[i][j] = 0;
					}
				}
			}
		}
		
		for (var i = 0; i < threeDHeight; i+=3){
			for (var j = 0; j < threeDWidth; j++) {
					if(mapMatrix[i][j] == 2){
						//count++;
						
						//Horizontal SEO
						var preJ = j;
						var rowNum = 0;
						while(mapMatrix[i][j] == 2) {	
							rowNum++;
							j++;
						}
						j--;
					
						var b1 = new THREE.Mesh(
							new THREE.CubeGeometry(10*rowNum, 200*Math.random()+10, 10),
							bMat
						);
						//var b1 = new THREE.Mesh(
						//	new THREE.PlaneGeometry(10*rowNum, 10), 
						//	new THREE.MeshLambertMaterial({color: 0xFFFFFF})
						//);
			
						var nowJ = preJ + (rowNum-1)/2;
						b1.position.y = 0;
						b1.position.x = nowJ * 10;
						b1.position.z = i * 10;
						scene.add(b1);
						blocks.push(b1);
					}
			}
		}
		
		for (var i = 1; i < threeDHeight; i+=3){
			for (var j = 0; j < threeDWidth; j++) {
					if(mapMatrix[i][j] == 2){
						count++;
						
						//Horizontal SEO
						var preJ = j;
						var rowNum = 0;
						while(mapMatrix[i][j] == 2) {	
							rowNum++;
							j++;
						}
						j--;
					
						var b1 = new THREE.Mesh(
							new THREE.PlaneGeometry(10*rowNum, 10), 
							new THREE.MeshLambertMaterial({color: 0x0000FF})
						);
						
						var nowJ = preJ + (rowNum-1)/2;
						b1.position.y = -4;
						b1.position.x = nowJ * 10;
						b1.position.z = i * 10;
						b1.material.wireframe = true;
						scene.add(b1);
						blocks.push(b1);
					}
			}
		}
		
		for (var i = 2; i < threeDHeight; i+=3){
			for (var j = 0; j < threeDWidth; j++) {
					if(mapMatrix[i][j] == 2){
						count++;
						
						//Horizontal SEO
						var preJ = j;
						var rowNum = 0;
						while(mapMatrix[i][j] == 2) {	
							rowNum++;
							j++;
						}
						j--;
					
						var b1 = new THREE.Mesh(
							new THREE.PlaneGeometry(10*rowNum, 10), 
							new THREE.MeshLambertMaterial({color: 0x0000FF})
						);
						
						var nowJ = preJ + (rowNum-1)/2;
						b1.position.y = -4;
						b1.position.x = nowJ * 10;
						b1.position.z = i * 10;
						b1.material.wireframe = true;
						scene.add(b1);
						blocks.push(b1);
					}
			}
		}
	
		console.log(count);
	}
	
	function InitJigsaw(){
		var textureJigsaw11 = new THREE.ImageUtils.loadTexture("image/test1.png");
		var textureJigsaw12 = new THREE.ImageUtils.loadTexture("image/test2.png");
		var textureJigsaw21 = new THREE.ImageUtils.loadTexture("image/test3.png");
		var textureJigsaw22 = new THREE.ImageUtils.loadTexture("image/test4.png");
		var textureBottom = new THREE.ImageUtils.loadTexture("images/gameView/maps/props_bottom.jpg");	
		
		//jigsaw11
		jigsaw11 = new THREE.Object3D();
		jigsaw11.position.y = 0;
		jigsaw11.position.x = Math.round((threeDWidth*10)*Math.random());
		jigsaw11.position.z = Math.round((threeDHeight*10)*Math.random());		
		
		var jigsaw11_box = new THREE.Mesh(
			new THREE.CubeGeometry(15, 15, 15),
			new THREE.MeshLambertMaterial({map: textureJigsaw11})
		);
		jigsaw11_box.position.y = 8;
		jigsaw11_box.position.x = 0;
		jigsaw11_box.position.z = 0;
		jigsaw11.add(jigsaw11_box);
		
		var jigsaw11_bottom = new THREE.Mesh(
			new THREE.SphereGeometry(8, 16),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		);
		jigsaw11_bottom.position.x = 0;
		jigsaw11_bottom.position.z = 0;
		jigsaw11_bottom.position.y = 0;
		jigsaw11.add(jigsaw11_bottom);
		
		var jigsaw11_top = new THREE.Mesh(
			new THREE.SphereGeometry(8, 16),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		);
		jigsaw11_top.position.x = 0;
		jigsaw11_top.position.z = 0;
		jigsaw11_top.position.y = 25;
		jigsaw11.add(jigsaw11_top);
		
		scene.add(jigsaw11);
		
		//jigsaw12
		jigsaw12 = new THREE.Object3D();
		jigsaw12.position.y = 0;
		jigsaw12.position.x = Math.round((threeDWidth*10)*Math.random());
		jigsaw12.position.z = Math.round((threeDHeight*10)*Math.random());		
		
		var jigsaw12_box = new THREE.Mesh(
			new THREE.CubeGeometry(15, 15, 15),
			new THREE.MeshLambertMaterial({map: textureJigsaw11})
		);
		jigsaw12_box.position.y = 8;
		jigsaw12_box.position.x = 0;
		jigsaw12_box.position.z = 0;
		jigsaw12.add(jigsaw12_box);
		
		var jigsaw12_bottom = new THREE.Mesh(
			new THREE.SphereGeometry(8, 16),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		);
		jigsaw12_bottom.position.x = 0;
		jigsaw12_bottom.position.z = 0;
		jigsaw12_bottom.position.y = 0;
		jigsaw12.add(jigsaw12_bottom);
		
		var jigsaw12_top = new THREE.Mesh(
			new THREE.SphereGeometry(8, 16),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		);
		jigsaw12_top.position.x = 0;
		jigsaw12_top.position.z = 0;
		jigsaw12_top.position.y = 25;
		jigsaw12.add(jigsaw12_top);
		
		scene.add(jigsaw12);
		
		//jigsaw21
		jigsaw21 = new THREE.Object3D();
		jigsaw21.position.y = 0;
		jigsaw21.position.x = Math.round((threeDWidth*10)*Math.random());
		jigsaw21.position.z = Math.round((threeDHeight*10)*Math.random());		
		
		var jigsaw21_box = new THREE.Mesh(
			new THREE.CubeGeometry(15, 15, 15),
			new THREE.MeshLambertMaterial({map: textureJigsaw11})
		);
		jigsaw21_box.position.y = 8;
		jigsaw21_box.position.x = 0;
		jigsaw21_box.position.z = 0;
		jigsaw21.add(jigsaw21_box);
		
		var jigsaw21_bottom = new THREE.Mesh(
			new THREE.SphereGeometry(8, 16),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		);
		jigsaw21_bottom.position.x = 0;
		jigsaw21_bottom.position.z = 0;
		jigsaw21_bottom.position.y = 0;
		jigsaw21.add(jigsaw21_bottom);
		
		var jigsaw21_top = new THREE.Mesh(
			new THREE.SphereGeometry(8, 16),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		);
		jigsaw21_top.position.x = 0;
		jigsaw21_top.position.z = 0;
		jigsaw21_top.position.y = 25;
		jigsaw21.add(jigsaw21_top);
		
		scene.add(jigsaw21);
		
		//jigsaw22
		jigsaw22 = new THREE.Object3D();
		jigsaw22.position.y = 0;
		jigsaw22.position.x = Math.round((threeDWidth*10)*Math.random());
		jigsaw22.position.z = Math.round((threeDHeight*10)*Math.random());		
		
		var jigsaw22_box = new THREE.Mesh(
			new THREE.CubeGeometry(15, 15, 15),
			new THREE.MeshLambertMaterial({map: textureJigsaw11})
		);
		jigsaw22_box.position.y = 8;
		jigsaw22_box.position.x = 0;
		jigsaw22_box.position.z = 0;
		jigsaw22.add(jigsaw22_box);
		
		var jigsaw22_bottom = new THREE.Mesh(
			new THREE.SphereGeometry(8, 16),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		);
		jigsaw22_bottom.position.x = 0;
		jigsaw22_bottom.position.z = 0;
		jigsaw22_bottom.position.y = 0;
		jigsaw22.add(jigsaw22_bottom);
		
		var jigsaw22_top = new THREE.Mesh(
			new THREE.SphereGeometry(8, 16),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		);
		jigsaw22_top.position.x = 0;
		jigsaw22_top.position.z = 0;
		jigsaw22_top.position.y = 25;
		jigsaw22.add(jigsaw22_top);
		
		scene.add(jigsaw22);
	}
	
	function jigsawRun(jigsaw){				
		var direction = Math.round(50*Math.random());
		//var step1 = Math.round(-10*Math.random() + 8);
		//var step2 = Math.round(-10*Math.random() + 2);
		var step1 = 1;
		var step2 = -1;
		if(direction < 3){//turn to x
			if(jigsaw.position.x > threeDWidth*10-10){
				overX = 1;
			}else if(jigsaw.position.x < 10){
				overX = -1;
			}
			if(overX == -1){
				jigsaw.position.x += step1;
			}else if(overX == 1){
				jigsaw.position.x += step2;
			}else{
				jigsaw.position.x += step1;
			}
			currentDirection = 0;
		}else if(direction > 47){//turn to z
			if(jigsaw.position.z > threeDHeight*10-10){
				overZ = 1;
			}else if(jigsaw.position.z < 10){
				overZ = -1;
			}
			if(overZ == -1){
				jigsaw.position.z += step1;
			}else if(overZ == 1){
				jigsaw.position.z += step2;
			}else{
				jigsaw.position.z += step1;
			}
			currentDirection = 1;
		}else{
			if(currentDirection == 0){
				if(jigsaw.position.x > threeDWidth*10-10){
					overX = 1;
				}else if(jigsaw.position.x < 10){
					overX = -1;
				}
				if(overX == -1){
					jigsaw.position.x += step1;
				}else if(overX == 1){
					jigsaw.position.x += step2;
				}else{
					jigsaw.position.x += step1;
				}
			}else{
				if(jigsaw.position.z > threeDHeight*10-10){
					overZ = 1;
				}else if(jigsaw.position.z < 10){
					overZ = -1;
				}
				if(overZ == -1){
					jigsaw.position.z += step1;
				}else if(overZ == 1){
					jigsaw.position.z += step2;
				}else{
					jigsaw.position.z += step1;
				}
			}
		}
	}
	
	function jigsawRun2(jigsaw){
		var destinationX = camera.position.x;
		var destinationZ = camera.position.z;
		var selfX = jigsaw.position.x;
		var selfZ = jigsaw.position.z;
		
		if(destinationX != selfX){
			if(destinationX > selfX){
				jigsaw.position.x += 3;
			}else{
				jigsaw.position.x -= 3;
			}
		}
		if(destinationZ != selfZ){
			if(destinationZ > selfZ){
				jigsaw.position.z += 3;
			}else{
				jigsaw.position.z -= 3;
			}
		}
	}
	
	function foundJigsaw(){
		var playerX = camera.position.x;
		var playerZ = camera.position.z;
		var jigsaw11X = jigsaw11.position.x;
		var jigsaw11Z = jigsaw11.position.z;
		var jigsaw12X = jigsaw12.position.x;
		var jigsaw12Z = jigsaw12.position.z;
		var jigsaw21X = jigsaw21.position.x;
		var jigsaw21Z = jigsaw21.position.z;
		var jigsaw22X = jigsaw22.position.x;
		var jigsaw22Z = jigsaw22.position.z;
		
		if((jigsaw11X-playerX)*(jigsaw11X-playerX)+(jigsaw11Z-playerZ)*(jigsaw11Z-playerZ)<300 && !jigsaw11Got){
			jigsaw11Got = true;
			currentJigsaw = 1;
			one = 1;
			scene.remove(jigsaw11);					
			
			var elem2 = document.getElementById('cover11');
			elem2.style.display = 'none';
			missingPiece[0] = 1;
			clickJigsaw = 1;
		}else if((jigsaw12X-playerX)*(jigsaw12X-playerX)+(jigsaw12Z-playerZ)*(jigsaw12Z-playerZ)<300 && !jigsaw12Got){
			jigsaw12Got = true;
			currentJigsaw = 2;
			two = 1;
			scene.remove(jigsaw12);
			
			var elem2 = document.getElementById('cover12');
			elem2.style.display = 'none';
			missingPiece[1] = 1;
			clickJigsaw = 2;
		}else if((jigsaw21X-playerX)*(jigsaw21X-playerX)+(jigsaw21Z-playerZ)*(jigsaw21Z-playerZ)<300 && !jigsaw21Got){
			jigsaw21Got = true;
			currentJigsaw = 3;
			three = 1;
			scene.remove(jigsaw21);
			
			var elem2 = document.getElementById('cover21');
			elem2.style.display = 'none';
			missingPiece[2] = 1;
			clickJigsaw = 3;
		}else if((jigsaw22X-playerX)*(jigsaw22X-playerX)+(jigsaw22Z-playerZ)*(jigsaw22Z-playerZ)<300 && !jigsaw22Got){
			jigsaw22Got = true;
			currentJigsaw = 4;
			four = 1;
			scene.remove(jigsaw22);
			
			var elem2 = document.getElementById('cover22');
			elem2.style.display = 'none';
			missingPiece[3] = 1;
			clickJigsaw = 4;
		}
	}
	
	function foundAll(){
		if(missingPiece[0]==1&&missingPiece[1]==1&&missingPiece[2]==1&&missingPiece[3]==1){			
			document.getElementById("win").style.display='';
			//missingPiece = -1;
			TomStopGameTime = Date.parse(new Date()); 
		}
	}
	
	function InitRender(){
		renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		container = document.getElementById( 'ThreeJS' );
		container.appendChild(renderer.domElement);	
		/*stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		container.appendChild( stats.domElement );*/
		THREEx.WindowResize(renderer, camera);
		THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	}
	
	function HandleCamera(){		
		if(keyArr[87]){//w
			nextX = camera.position.x + Math.cos(angle*Math.PI/180) * speed;
			nextZ = camera.position.z + Math.sin(angle*Math.PI/180) * speed;
			camera.position.x = nextX;
			camera.position.z = nextZ;
			camera.lookAt({x:camera.position.x + Math.cos(angle*Math.PI/180) * 100, y:camera.position.y, z:camera.position.z + Math.sin(angle*Math.PI/180) * 100});	
		}
				
		if(keyArr[83]){//s
			nextX = camera.position.x - Math.cos(angle*Math.PI/180) * speed;
			nextZ = camera.position.z - Math.sin(angle*Math.PI/180) * speed;
			camera.position.x = nextX;
			camera.position.z = nextZ;
			camera.lookAt({x:camera.position.x + Math.cos(angle*Math.PI/180) * 100, y:camera.position.y, z:camera.position.z + Math.sin(angle*Math.PI/180) * 100});
		}
				
		if(keyArr[65]){//a
			angle -= 2;
			camera.lookAt({x:camera.position.x + Math.cos(angle*Math.PI/180) * 100, y:camera.position.y, z:camera.position.z + Math.sin(angle*Math.PI/180) * 100});	
		}
				
		if(keyArr[68]){//d
			angle += 2;
			camera.lookAt({x:camera.position.x + Math.cos(angle*Math.PI/180) * 100, y:camera.position.y, z:camera.position.z + Math.sin(angle*Math.PI/180) * 100});	
		}
	}
	
	function XRay(){
		tool_one = 1;
		blocks[0].material.wireframe = true;
		setTimeout("blocks[0].material.wireframe = false",5000);	
	}

	function stop(){
		if(Cflag == 0) {
			camera.position.x = 0;
			camera.position.y = 30;
			camera.position.z = 0;
			window.addEventListener('deviceorientation', moveBall, true);
			FoundFlag = 0;
		} else if(Cflag == 1) {
			camera.position.x = 0;
			camera.position.y = 30;
			camera.position.z = 0;
			FoundFlag = 0;
		}
	}
	
	function Jump(){
		tool_two = 1;
	}

	function getAll(){
		gotAll = 1;
	}
	
	function PlayerJump(){
		if(tool_two == 1){
			if(jumptime < maxJumpTime){
				t++;
				camera.position.y += 40-t;
				
				jumptime++;
			}else{
				if(falltime < maxJumpTime){
					camera.position.y -= 40-t;
					t--;
					falltime++;
				}else{
					tool_two = 0;
					falltime = 0;
					jumptime = 0;
				}
			}
			
		}
	}

	function moveBall(event) {
		var accel_x =  Math.sin(event.gamma / 180 * Math.PI); //right-->accel_x>0
		var accel_y =  Math.sin(event.beta  / 180 * Math.PI); //up-->accel_y<0
		if(accel_x > 0.3) { //right
			keyArr[65] = 0;	
			keyArr[68] = 1;
		} else if(accel_x < -0.3) { //left
			keyArr[68] = 0;
			keyArr[65] = 1;			
		} else {
			keyArr[68] = 0;
			keyArr[65] = 0;	
		}
		
		if(accel_y < 0.7) { //up
			keyArr[83] = 0;
			keyArr[87] = 1;	
		} else if(accel_y > 0.7) { //down
			keyArr[87] = 0;
			keyArr[83] = 1;
		}
		
	}
	
	
/******************************
***************************/	
function removeJigsaw(a){
	if(a == 1){
		scene.remove(jigsaw11);
	}else if(a == 2){
		scene.remove(jigsaw12);
	}else if(a == 3){
		scene.remove(jigsaw21);
	}else if(a == 4){
		scene.remove(jigsaw22);
	}
}
function clickJig(a){
	if(a == 1){
		document.getElementById("cover11").style.display="none";		
	}else if(a == 2){
		document.getElementById("cover12").style.display="none";
	}else if(a == 3){
		document.getElementById("cover21").style.display="none";
	}else if(a == 4){
		document.getElementById("cover22").style.display="none";	
	}
}
	
/******************************
***************************/		

function InitSphere(){
		var sphere;
		sphere = new THREE.Mesh(
			new THREE.SphereGeometry(5, 16, 16),
			new THREE.MeshLambertMaterial({color: 0xff0000})
		);				
		sphere.position.x = 0;
		sphere.position.z = 120;
		sphere.position.y = 100;
		scene.add(sphere);
		players.push(sphere);
}

//********************************/

	
function lookGrade() {
	
	if(Cflag == 1)
		htracker_own.stop();
	
	renderer.clear();
	stopAnimate = 0;
	$('#getall').hide();
	$('#scen4').hide();
	$('#reload').hide();
	$('#jigsaw').hide();
	$('#ThreeJS').hide();
	$('#findhelp').hide();
	$('#jump').hide();
	$('#xray').hide();
	$('#win').hide();
	$('#legend').fadeIn();
	$('#grades').fadeIn();
	
	/**your several grades*/ 
	var rule = 50;
	//时间
	var timeG;
	getMyTime();
	var elem_00 = -parseInt(rule*Math.random()); //时间
	var elem_01 = -parseInt(rule*Math.random());
	
	//步数
	var stepG;
	getMyStep();
	var elem_20 = 240+parseInt(rule*Math.random()); //步数
	var elem_21 = -parseInt(rule*Math.random());

	//
	var elem_40 = 120-parseInt(rule*Math.random());
	var elem_41 = 120+parseInt(rule*Math.random());
	
	//装饰度
	var demG;
	getMyDem();
	var elem_50 = 240+parseInt(rule*Math.random()); //装饰度
	var elem_51 = 120+parseInt(rule*Math.random());
	
	//心情
	var feelG;
	getMyFeel();
	var elem_70 = 120+parseInt(rule*Math.random()); //心情
	var elem_71 = 240+parseInt(rule*Math.random());
	
	//show these grades
	var _contextItemDiv_0 = document.getElementById("timeG");
	_contextItemDiv_0.innerHTML="时间："+timeG;
	
	var _contextItemDiv_1 = document.getElementById("stepG");
	_contextItemDiv_1.innerHTML="步数："+stepG;
		
	var _contextItemDiv_2 = document.getElementById("demG");
	_contextItemDiv_2.innerHTML="装饰度："+demG;
	
	var _contextItemDiv_3 = document.getElementById("feelG");
	_contextItemDiv_3.innerHTML="心情："+feelG;
	
	/**多边形图量化*/
	var imgData = [
		{name:"face",path:"image/player.png"}
	];

	init(3,"legend",640,480,main);
	
	var vertices;
	var indices;
	var uvtData;
	var stageLayer,backLayer;
	var bitmapData;

	var imglist;
	var pointList=[];
	var mouseX,mouseY;
	var mouseObj = null;
	
	function main(){
		LLoadManage.load(imgData,null,gameInit);
		document.getElementById("legend").style.zIndex=100;
		document.getElementById('st').style.background = '#FF9900';
	}
	
	function gameInit(result){
		LGlobal.setDebug(true);
		imglist = result;
		bitmapData = new LBitmapData(imglist["face"]);
		
		stageLayer = new LSprite();
		stageLayer.graphics.drawRect(1,"#c0d9d9",[0,0,LGlobal.width,LGlobal.height],true,"#c0d9d9");
		addChild(stageLayer);
		
		backLayer = new LSprite();
		backLayer.x = 100;
		backLayer.y = 100;
		stageLayer.addChild(backLayer);
		
		vertices = new Array();
		//在位图上定义了6个点
		
		vertices.push(elem_00, elem_01); //时间
		vertices.push(0, 120);
		vertices.push(0, 240);
		vertices.push(120, 0);
		vertices.push(elem_40, elem_41); //
		vertices.push(elem_70, elem_71); //心情
		vertices.push(elem_20, elem_21); //步数
		vertices.push(elem_50, elem_51); //装饰度
		vertices.push(240, 240);
		
		var i,obj;
		for(i = 0;i < vertices.length;i+=2){
			obj = new LSprite();
			obj.x = vertices[i];
			obj.y = vertices[i+1];
			obj.graphics.drawArc(1,"#ff0000",[0,0,10,0,2*Math.PI],true,"#ff0000");
			backLayer.addChild(obj);
			pointList.push(obj);
		}
		indices = new Array();
		//这里用之前的6个点将图形分成4个三角形
		indices.push(0, 3, 1);
		indices.push(3, 1, 4);
		indices.push(1, 4, 2);
		indices.push(4, 2, 5);
		indices.push(3, 6, 4);
		indices.push(6, 4, 7);
		indices.push(4, 7, 5);
		indices.push(7, 5, 8);
		uvtData = new Array();
		//这里是定义6各点原来应在的位置
		uvtData.push(0, 0);
		uvtData.push(0, 0.5);
		uvtData.push(0, 1);
		uvtData.push(0.5, 0);
		uvtData.push(0.5, 0.5);
		uvtData.push(0.5, 1);
		uvtData.push(1, 0);
		uvtData.push(1, 0.5);
		uvtData.push(1, 1);
		backLayer.graphics.beginBitmapFill(bitmapData);
		backLayer.graphics.drawTriangles(vertices, indices, uvtData);
		
		//stageLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		//stageLayer.addEventListener(LMouseEvent.MOUSE_DOWN,down);
		//stageLayer.addEventListener(LMouseEvent.MOUSE_UP,up);
		//stageLayer.addEventListener(LMouseEvent.MOUSE_MOVE,move);
	}	
	
	/*function onframe(){
		backLayer.graphics.clear();
		backLayer.graphics.beginBitmapFill(bitmapData);
		backLayer.graphics.drawTriangles(vertices, indices, uvtData);
		var i,obj;
		for(i = 0;i < pointList.length;i++){
			obj = pointList[i];
			obj.alpha = 1;
			if(Math.pow(obj.x-mouseX,2)+Math.pow(obj.y-mouseY,2) < Math.pow(10,2)){
				obj.alpha = 0.5;
			}
		}
	}
	function down(event){
		if(mouseObj)return;
		var i,obj;
		for(i = 0;i < pointList.length;i++){
			obj = pointList[i];
			if(Math.pow(obj.x-mouseX,2)+Math.pow(obj.y-mouseY,2) < Math.pow(10,2)){
				mouseObj = obj;
				mouseObj.index = i*2;
				mouseObj.mouseX = mouseX;
				mouseObj.mouseY = mouseY;
				mouseObj.saveX = mouseObj.x;
				mouseObj.saveY = mouseObj.y;
				break;
			}
		}
		
	}
	function up(event){
		mouseObj = null;
	}
	function move(event){
		mouseX = event.offsetX - backLayer.x;
		mouseY = event.offsetY - backLayer.y;
		if(mouseObj){
			mouseObj.x = mouseX - mouseObj.mouseX + mouseObj.saveX;
			mouseObj.y = mouseY - mouseObj.mouseY + mouseObj.saveY;
			vertices[mouseObj.index] = mouseObj.x;
			vertices[mouseObj.index + 1] = mouseObj.y;
		}
	}*/
	
	function getMyTime() {
		timeG = (TomStopGameTime - TomStartGameTime)/1000;
	}
	
	function getMyStep() {
		stepG = parseInt(TomeStepNum/20);
	}
	
	function getMyDem() {
		if(result_eye == 1 && result_mouth == 1) 
			demG = 90;
		else if(result_eye == 1 && result_mouth == 0)
			demG = 80;
		else if(result_eye == 0 && result_mouth == 1)
			demG = 60;
		else if(result_eye == 0 && result_mouth == 0)
			demG = 30;
	}
	
	function getMyFeel() {
		feelG = (TomFeelGrade_red/TomFeelGrade_blue).toFixed(2);
	}
	
}



