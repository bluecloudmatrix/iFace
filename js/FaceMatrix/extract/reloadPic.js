function reloadPic() {
	$('#scen3').hide();
	$('#scen5').fadeIn();
	
	var test = document.getElementById('testpic');
	test.onload = function() {
		var test1 = document.getElementById('testpic1');
		test1.onload = function() {
			var test2 = document.getElementById('testpic2');
			test2.onload = function() {
				var test3 = document.getElementById('testpic3');
				test3.onload = function() {
					var test4 = document.getElementById('testpic4');
						test4.onload = function() {
							//for the background music
							if(result_mouth == 0) { //happy
								var music = document.getElementById("bgSound_00");
								music.play();
							} else if(result_mouth == 1){ //nature
								var music = document.getElementById("bgSound_01");
								music.play();
							}
							
							//background colour
							if(result_eye == 1) { //day
								var d=document.getElementById('st');
								d.style.background = '#350847';
							} else if(result_eye == 0) { //night
								var d=document.getElementById('st');
								d.style.background = '#0f192c';
							}
							test4.onload = null;
						}
						test4.src = "image/test4.png";
						test3.onload = null;
				}
				test3.src = "image/test3.png";
				test2.onload = null;
			}
			test2.src = "image/test2.png";
			test1.onload = null;
		}
		test1.src = "image/test1.png";
		test.onload = null;
	}
	test.src = "image/player.png";
}