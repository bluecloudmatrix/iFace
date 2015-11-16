/**
 * 人脸控制小球方式三（最佳）
 * 2013/8/31
 **/
(function() {

	var namespace = GAMEVIEW.namespace('GAMEVIEW.faceControl');
	
	if(namespace.faceTriggerThird === undefined) {
	
		namespace.faceTriggerThird = function(face_center_x, face_center_y) {
		
			var controlCanvas = document.getElementById("control");
			
			var ctx = controlCanvas.getContext("2d");
			ctx.strokeStyle = "#0080FF";
			
			var width = controlCanvas.width;
			var height = controlCanvas.height;
			
			//划分为九个区域
			var up_point_0_x = width * (1/3);
			var up_point_0_y = 0;
			
			var up_point_1_x = width * (2/3);
			var up_point_1_y = 0;
			
			var down_point_0_x = width * (1/3);
			var down_point_0_y = height;
			
			var down_point_1_x = width * (2/3);
			var down_point_1_y = height;
			
			var left_point_0_x = width;
			var left_point_0_y = height * (1/3);
			
			var left_point_1_x = width;
			var left_point_1_y = height * (2/3);
			
			var right_point_0_x = 0;
			var right_point_0_y = height * (1/3);
			
			var right_point_1_x = 0;
			var right_point_1_y = height * (2/3);
			
			ctx.beginPath(); 
			
			//ctx.moveTo(up_point_0_x, up_point_0_y); 
			ctx.moveTo(up_point_0_x, left_point_0_y); 
            ctx.lineTo(down_point_0_x, down_point_0_y);  

			//ctx.moveTo(up_point_1_x, up_point_1_y);   
			ctx.moveTo(up_point_1_x, left_point_0_y);   
            ctx.lineTo(down_point_1_x, down_point_1_y);  
			
			ctx.moveTo(left_point_0_x, left_point_0_y);   
            ctx.lineTo(right_point_0_x, right_point_0_y);  
			
			ctx.moveTo(left_point_1_x, left_point_1_y);   
            ctx.lineTo(right_point_1_x, right_point_1_y);  
			
            ctx.stroke(); 
			
			//人脸控制方向判别
			if(face_center_x < up_point_0_x && face_center_y > right_point_0_y && face_center_y < right_point_1_y) { //向右
				keyArr[68] = 1;
				keyArr[65] = 0;
				keyArr[87] = 0;
				keyArr[83] = 0;
			} else if(face_center_x > up_point_1_x && face_center_y > left_point_0_y && face_center_y < left_point_1_y) { //向左
				keyArr[65] = 1;
				keyArr[68] = 0;
				keyArr[87] = 0;
				keyArr[83] = 0;
			} else if(face_center_y < left_point_0_y && face_center_x > up_point_0_x && face_center_x < up_point_1_x) { //向上
				
			} else if(face_center_y > left_point_1_y && face_center_x > down_point_0_x && face_center_x < down_point_1_x) { //向下
				keyArr[83] = 1;
				keyArr[87] = 0;
				keyArr[68] = 0;
				keyArr[65] = 0;
			} else if(face_center_x < up_point_0_x && face_center_y < left_point_0_y) { //左上
			
			} else if(face_center_x < down_point_0_x && face_center_y > left_point_1_y) { //左下
				keyArr[65] = 0;
				keyArr[68] = 1;
				keyArr[87] = 0;
				keyArr[83] = 0;
			} else if(face_center_x > up_point_1_x && face_center_y < right_point_0_y) { //右上

			} else if(face_center_x > down_point_1_x && face_center_y > right_point_1_y) { //右下
				keyArr[68] = 0;
				keyArr[65] = 1;
				keyArr[87] = 0;
				keyArr[83] = 0;
			} else { //中间向上
				keyArr[87] = 1;
				keyArr[83] = 0;
				keyArr[68] = 0;
				keyArr[65] = 0;
			}
		
		}
	
	}

}) ();