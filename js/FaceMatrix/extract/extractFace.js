/**
 * use it to extract face in oval
 * 2013/11/3 10:59
 **/
(function() {

	var namespace = FACEMATRIX.namespace('FACEMATRIX.extract');
	
	if(namespace.extractFace === undefined) {
	
		namespace.extractFace = function() {
			var canvas = document.getElementById('output');
			var context = canvas.getContext("2d");
			var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
			
			var tempCanvas = document.createElement('canvas');
			tempCanvas.width = canvas.width;
			tempCanvas.height = canvas.height;

			FACEMATRIX.func.copyCanvas(canvas, tempCanvas);
			
			var tempContext = tempCanvas.getContext("2d");
			tempContext.lineWidth = 1;
			
			if(result_eye == 1) { //open	
				//colourful clear hair
				var img = new Image();
				img.src = "photo/hair.png";
				img.onload = function() {
					tempContext.drawImage(img, GLOBALTOM.HAIREDGE.x, GLOBALTOM.HAIREDGE.y, GLOBALTOM.HAIREDGE.width, GLOBALTOM.HAIREDGE.height);
					
					$('#scen2').hide();
				
					var fCanvas = document.getElementById('finalCanvas');
					var fContext = fCanvas.getContext('2d');
					var tData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
					fContext.putImageData(tData, 0, 0);
		
					if(result_mouth == 1) { //nature
						//yellow huzi
						var img_01 = new Image();
						img_01.src = "photo/huzi.png";
						img_01.onload = function() {
							tempContext.drawImage(img_01, GLOBALTOM.MOUTH.x, GLOBALTOM.MOUTH.y, GLOBALTOM.MOUTH.width, GLOBALTOM.MOUTH.height);
						
							var fCanvas = document.getElementById('finalCanvas');
							var fContext = fCanvas.getContext('2d');
							var tData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
							fContext.putImageData(tData, 0, 0);
				
							$('#scen3').fadeIn();
							
							var dataUrl_0 = document.getElementById('finalCanvas').toDataURL();
							if(dataUrl_0 != null) {
								ws.send(dataUrl_0);
							}
						}
					} else if(result_mouth == 0) { //big smile
						//red nose
						var img_01 = new Image();
						img_01.src = "photo/red_nose.png";
						img_01.onload = function() {
							tempContext.drawImage(img_01, GLOBALTOM.MOUTH.x, GLOBALTOM.MOUTH.y, GLOBALTOM.MOUTH.width, GLOBALTOM.MOUTH.height);
					
							var fCanvas = document.getElementById('finalCanvas');
							var fContext = fCanvas.getContext('2d');
							var tData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
							fContext.putImageData(tData, 0, 0);
				
							$('#scen3').fadeIn();
							
							var dataUrl_0 = document.getElementById('finalCanvas').toDataURL();
							if(dataUrl_0 != null) {
								ws.send(dataUrl_0);
							}
						}
					}
				}
			} else if(result_eye == 0) { //close
				//colourful mess hair
				var img = new Image();
				img.src = "photo/hair_01.png";
				img.onload = function() {
					tempContext.drawImage(img, GLOBALTOM.HAIREDGE.x, GLOBALTOM.HAIREDGE.y, GLOBALTOM.HAIREDGE.width, GLOBALTOM.HAIREDGE.height);
					
					$('#scen2').hide();
				
					var fCanvas = document.getElementById('finalCanvas');
					var fContext = fCanvas.getContext('2d');
					var tData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
					fContext.putImageData(tData, 0, 0);
		
					if(result_mouth == 1) { //nature
						//yellow huzi
						var img_01 = new Image();
						img_01.src = "photo/huzi.png";
						img_01.onload = function() {
							tempContext.drawImage(img_01, GLOBALTOM.MOUTH.x, GLOBALTOM.MOUTH.y, GLOBALTOM.MOUTH.width, GLOBALTOM.MOUTH.height);
						
							var fCanvas = document.getElementById('finalCanvas');
							var fContext = fCanvas.getContext('2d');
							var tData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
							fContext.putImageData(tData, 0, 0);
				
							$('#scen3').fadeIn();
							
							var dataUrl_0 = document.getElementById('finalCanvas').toDataURL();
							if(dataUrl_0 != null) {
								ws.send(dataUrl_0);
							}
						}
					} else if(result_mouth == 0) { //big smile
						//red nose
						var img_01 = new Image();
						img_01.src = "photo/red_nose.png";
						img_01.onload = function() {
							tempContext.drawImage(img_01, GLOBALTOM.MOUTH.x, GLOBALTOM.MOUTH.y, GLOBALTOM.MOUTH.width, GLOBALTOM.MOUTH.height);
					
							var fCanvas = document.getElementById('finalCanvas');
							var fContext = fCanvas.getContext('2d');
							var tData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
							fContext.putImageData(tData, 0, 0);
				
							$('#scen3').fadeIn();
							
							var dataUrl_0 = document.getElementById('finalCanvas').toDataURL();
							if(dataUrl_0 != null) {
								ws.send(dataUrl_0);
							}
						}
					}
				}
			}	
		}
		 
	}
	
}) ();

	/*var canvas = document.getElementById('output');
			var context = canvas.getContext("2d");
			var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
			
			var tempCanvas = document.createElement('canvas');
			tempCanvas.width = canvas.width;
			tempCanvas.height = canvas.height;

			FACEMATRIX.func.copyCanvas(canvas, tempCanvas);
			
			var tempContext = tempCanvas.getContext("2d");
			tempContext.lineWidth = 1;
			
			var tempData = FACEMATRIX.func.gray(tempContext, 0, 0, tempCanvas.width, tempCanvas.height);
			tempContext.putImageData(tempData, 0, 0);
			var x = GLOBALTOM.AppEyeArea.x + GLOBALTOM.AppEyeArea.width*0.5;
			var y = GLOBALTOM.AppEyeArea.y + GLOBALTOM.AppEyeArea.height*0.5;
			var a = GLOBALTOM.AppEyeArea.width*0.65;
			var b = GLOBALTOM.AppEyeArea.height*1.3;				
			FACEMATRIX.faceEdge.faceOval.BezierEllipse(tempContext, x, y, a, b);
			
			//only show the face in the oval
			tempData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
			var idx;
			var flag = 0;
			for(var i = 0; i < tempCanvas.height; i++) {
				var flag_ = 0;
				for(var j = 0; j < tempCanvas.width; j++) {
					idx = (i * tempCanvas.width + j)*4;
					if(tempData.data[idx] != tempData.data[idx+1] || tempData.data[idx+1] != tempData.data[idx+2] || tempData.data[idx] != tempData.data[idx+2]) {
						
						var jj = j;
						var idx_ = idx;
						while(tempData.data[idx_] != tempData.data[idx_+1] || tempData.data[idx_+1] != tempData.data[idx_+2] || tempData.data[idx_] != tempData.data[idx_+2]) {
							jj++;
							idx_ = (i * tempCanvas.width + jj)*4;
						}
						for(var m = jj; m < tempCanvas.width; m++) {
							idx_ = (i * tempCanvas.width + m)*4;
							if(tempData.data[idx_] != tempData.data[idx_+1] || tempData.data[idx_+1] != tempData.data[idx_+2] || tempData.data[idx_] != tempData.data[idx_+2]) {
								flag_ = 1;
								break;
							}
						}
						
						if(flag_ == 1) {
							if(flag == 0) {
								while(tempData.data[idx] != tempData.data[idx+1] || tempData.data[idx+1] != tempData.data[idx+2] || tempData.data[idx] != tempData.data[idx+2]) {
									j++;
									idx = (i * tempCanvas.width + j)*4;
								}
								j--;
								idx = (i * tempCanvas.width + j)*4;
								flag = 1;
							} else if(flag == 1) {
								while(tempData.data[idx] != tempData.data[idx+1] || tempData.data[idx+1] != tempData.data[idx+2] || tempData.data[idx] != tempData.data[idx+2]) {
									j++;
									idx = (i * tempCanvas.width + j)*4;
								}
								j--;
								idx = (i * tempCanvas.width + j)*4;
								flag = 0;
							}
						}
					}
					if(flag == 1) {
						tempData.data[idx] = imgData.data[idx];
						tempData.data[idx+1] = imgData.data[idx+1];
						tempData.data[idx+2] = imgData.data[idx+2];
						tempData.data[idx+3] = imgData.data[idx+3];
					}
					if(flag == 0) {
						tempData.data[idx] = 255;
						tempData.data[idx+1] = 255;
						tempData.data[idx+2] = 255;
						tempData.data[idx+3] = 255;
					}
				}
			}		
			
			//back
			var back_img = new Image();
			var back_path = "photo/back/back_06.jpg";
			back_img.src = back_path;
			back_img.onload = function() {
				var bCanvas = document.createElement('canvas');
				bCanvas.width = canvas.width;
				bCanvas.height = canvas.height;
				var bContext = bCanvas.getContext("2d");
				bContext.drawImage(back_img, 0, 0, bCanvas.width, bCanvas.height);
				var bData = bContext.getImageData(0, 0, bCanvas.width, bCanvas.height);
				
				for(var i = 0; i < tempCanvas.height; i++) {
					for(var j = 0; j < tempCanvas.width; j++) {
						idx = (i * tempCanvas.width + j)*4;
						if(tempData.data[idx] == 255 && tempData.data[idx+1] == 255 && tempData.data[idx+2] == 255) {
							tempData.data[idx] = bData.data[idx];
							tempData.data[idx+1] = bData.data[idx+1];
							tempData.data[idx+2] = bData.data[idx+2];
							tempData.data[idx+3] = bData.data[idx+3];				
						}
					}
				}
				
				tempContext.putImageData(tempData, 0, 0);
				
				//colourful hair
				var img = new Image();
				img.src = "photo/hair.png";
				img.onload = function() {
					tempContext.drawImage(img, GLOBALTOM.HAIREDGE.x, GLOBALTOM.HAIREDGE.y, GLOBALTOM.HAIREDGE.width, GLOBALTOM.HAIREDGE.height);
					
					$('#scen2').hide();
				
					var fCanvas = document.getElementById('finalCanvas');
					var fContext = fCanvas.getContext('2d');
					var tData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
					fContext.putImageData(tData, 0, 0);
		
					$('#scen3').fadeIn();
					
					var dataUrl = document.getElementById('finalCanvas').toDataURL();
					if(dataUrl != null) {
						ws.send(dataUrl);
					}
				}
				
			};*/