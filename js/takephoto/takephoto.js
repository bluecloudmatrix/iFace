/*global 1*/
			var GLOBALTOM = {}; 
			/*存有人眼的大致区域（人眼状态识别 ）*/
			GLOBALTOM.AppEyeArea = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			/*人脸椭圆外接矩形*/
			GLOBALTOM.MATRIX = {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				mapMatrix: 0
			}
			/*头发轮廓的大致区域*/
			GLOBALTOM.HAIREDGE = {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				hairMatrix: 0
			}
			
			/*嘴巴的大致区域*/
			GLOBALTOM.MOUTH = {
				x: 0,
				y: 0,
				width: 120,
				height: 120,
				mapMatrix: 0,
				mouthEmptyMatrix: 0,
				entrance: {x: 0, y: 0},
				portal: {x: 0, y: 0},
				gatePass: {x: 0, y: 0}
			}
			/*眼睛非皮肤区域（用于迷宫模板定位）*/
			GLOBALTOM.EYE = {
				x: 0,
				y: 0,
				width: 240,
				height: 90,
				mapMatrix: 0,
				eyeEmptyMatrix: 0,
				entrance: {x: 0, y: 0},
				portal: {x: 0, y: 0},
				gatePass: {x: 0, y: 0}
			}
			
			/*3d scene build*/
			var mapMatrix;
			var threeDWidth;
			var threeDHeight;
			
			var result_eye, result_mouth;
			
			//feel_grade 量化心情
			var TomFeelGrade_red = 0;
			var TomFeelGrade_blue = 1;
			
			window.onload = function() {

				$('#grades').hide();
				$('#legend').hide();
				$('#getall').hide();
				$('#scen5').hide();
				$('#scen2').hide();
				$('#scen3').hide();
				$('#scen4').hide();
				$('#ThreeJS').hide();
				$('#reload').hide();
				$('#tool_one').hide();
				$('#tool_two').hide();
				$('#jigsaw').hide();
				
				startWebSocket();
				
				// Trigger photo take
				document.getElementById("snap").addEventListener("click", function() {
					App.stream.stop();
					App.loopFlag = 0;
					$('#scen1').hide();
					$('#scen2').fadeIn();
					//App.stream.stop();
						
					var canvas = document.getElementById("output");
					var	context = canvas.getContext("2d");
					context.drawImage(App.video, 0, 0, canvas.width, canvas.height);
					
					//*************face detect************************************************************************/
					var video = App.video,
						ctx = App.context,
						backCtx = App.backContext,
						i,
						comp;
							
					ctx.drawImage(video, 0, 0, App.canvas.width, App.canvas.height);
							
					backCtx.drawImage(video, 0, 0, App.backCanvas.width, App.backCanvas.height);
							
					comp = ccv.detect_objects(App.ccv = App.ccv || {
						canvas: App.backCanvas,
						cascade_face: cascade_face,
						interval: 4,
						min_neighbors: 1
					});
							
					if (comp.length) {
						App.comp = comp;
					}
							
					//************************************************************************************************/
					
					var gCanvas = document.createElement('canvas');
					gCanvas.width = 125;
					gCanvas.height = 80;
					var	gContext = gCanvas.getContext("2d");
					gContext.drawImage(App.video, 0, 0, gCanvas.width, gCanvas.height);
					
					//**************dim binary canny******************************************************************/
					
					var img_u8 = new jsfeat.matrix_t(gCanvas.width, gCanvas.height, jsfeat.U8C1_t);

					var gCanvasDataBuffer = new ArrayBuffer(gCanvas.width * gCanvas.height);
					var gCanvasData = new Int8Array(gCanvasDataBuffer);
					
					gCanvasData = gContext.getImageData(0, 0, gCanvas.width, gCanvas.height);
					
					jsfeat.imgproc.grayscale(gCanvasData.data, img_u8.data);
					
					//var r = options.blur_radius|0;
					var r = 2;
					var kernel_size = (r+1) << 1;
					
					jsfeat.imgproc.gaussian_blur(img_u8, img_u8, kernel_size, 0);
				 
					//jsfeat.imgproc.canny(img_u8, img_u8, options.low_threshold|0, options.high_threshold|0);
					jsfeat.imgproc.canny(img_u8, img_u8, 20, 70);
					 
					// render result back to canvas
					var data_u32 = new Uint32Array(gCanvasData.data.buffer);
					var alpha = (0xff << 24);
					var i = img_u8.cols*img_u8.rows, pix = 0;
					while(--i >= 0) {
						pix = img_u8.data[i];
						data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
					}
					  
					
					// convert to mapMatrix
					var bytearray = gCanvasData.data;
					var canvasWidth = gCanvas.width;
					var canvasHeight = gCanvas.height;
					threeDWidth = gCanvas.width;
					threeDHeight = gCanvas.height;

					mapMatrix = new Array(canvasHeight);
					for (var i = 0; i < canvasHeight; i++) {
						mapMatrix[i] = new Array(canvasWidth);
						for(var j = 0; j < canvasWidth; j++) {
							if(bytearray[(i * canvasWidth + j) * 4] == 255)
								mapMatrix[i][j] = 2; //wall
							else
								mapMatrix[i][j] = 0; //ground
						}
					}
					for(var p = 0; p < 80; p++){
						for(var q = 0; q < 125; q++)
							strMap += mapMatrix[p][q];	
					}					
					//console.log(strMap);					
					//************************************************************************************************/

					//定位眼睛区域和嘴巴（含鼻子）区域进行状态识别
					FACEMATRIX.faceEdge.locateEyeMouthForDetect(App);
					
					//result_eye=1,open;result_eye=0,close
					//result_mouth=1,nature;result_mouth=0,big smile
					//人眼状态识别
					result_eye = eyedetect();
					
					//嘴部表情识别 
					result_mouth = FACEMATRIX.toMaze.mouth.mouthDetect();
	
					//FACEMATRIX.toMaze.matchTemp(result_eye, result_mouth);
				
					//获得人脸和其它部位的大致区域
					FACEMATRIX.faceEdge.getFaceEdge();
							
				});
				
				/**find your face, and take a photo*/
				var App = {
					start: function(stream) {
						
						App.stream = stream;
						App.video.addEventListener('canplay', function() {
							App.video.removeEventListener('canplay');
							setTimeout(function() {
								App.video.play();
								App.canvas.style.display = 'inline';
								App.canvas.width = App.video.videoWidth;
								App.canvas.height = App.video.videoHeight;
								App.backCanvas.width = App.video.videoWidth / 4;
								App.backCanvas.height = App.video.videoHeight / 4;
								App.backContext = App.backCanvas.getContext('2d');
							
								var w = 300 / 4 * 0.8,
									h = 270 / 4 * 0.8;
							
								App.comp = [{
									x: (App.video.videoWidth / 4 - w) / 2,
									y: (App.video.videoHeight / 4 - h) / 2,
									width: w, 
									height: h,
								}];
								
								var boundCanvas = document.getElementById("boundary");
								var boundContext = boundCanvas.getContext("2d");
								
								/*var back_img = new Image();
								var back_path = "photo/back/back_06.jpg";
								back_img.src = back_path;
								back_img.onload = function() {
									boundContext.drawImage(back_img, 0, 0, boundCanvas.width, boundCanvas.height);
								}*/
								
								boundContext.strokeStyle = "#0066CC";
								boundContext.lineWidth = 2;
								boundContext.clearRect(0, 0, boundCanvas.width, boundCanvas.height);
								boundContext.strokeRect(boundCanvas.width/4, boundCanvas.height/16, boundCanvas.width/2, boundCanvas.height*(7/8));
								
								App.drawToCanvas();
								
							}, 500);
						}, true);
						
						var domURL = window.URL || window.webkitURL;
						App.video.src = domURL ? domURL.createObjectURL(stream) : stream;
						
					},
					denied: function() {
						alert("denied");
					},
					error: function(e) {
						if (e) {
							console.error(e);
						}
						alert("error");
					},
					drawToCanvas: function() {
						
						if(App.loopFlag == 1) {
						
							requestAnimationFrame(App.drawToCanvas);
						
							var video = App.video,
								ctx = App.context,
								backCtx = App.backContext,
								i,
								m = 4,
								w = 4,
								comp;
							
							ctx.drawImage(video, 0, 0, App.canvas.width, App.canvas.height);
							
							/*backCtx.drawImage(video, 0, 0, App.backCanvas.width, App.backCanvas.height);
							
							comp = ccv.detect_objects(App.ccv = App.ccv || {
								canvas: App.backCanvas,
								cascade_face: cascade_face,
								interval: 4,
								min_neighbors: 1
							});
							
							if (comp.length) {
								App.comp = comp;
							}
							
							ctx.strokeStyle = "#007500";	
							for (i = App.comp.length; i--; ) {
								//框出用于眼睛状态识别的眼睛区域
								ctx.strokeRect((App.comp[i].x - w / 2) * m , (App.comp[i].y - w / 2) * m , (App.comp[i].width + w) * m, (App.comp[i].height + w) * m * (2/3));
								//框出用于嘴巴状态识别的嘴巴区域
								ctx.strokeRect((App.comp[i].x - w / 2) * m + (App.comp[i].width + w) * m * (1/4) , (App.comp[i].y - w / 2) * m + (App.comp[i].height + w) * m * (1/2), 
												(App.comp[i].width + w) * m * (1/2), (App.comp[i].height + w) * m * (1/2));
							}
							*/
						} else {
							return 0;
						}
						
					}
				};
				
				App.stream = null;
				
				App.loopFlag = 1; //snap后结束requestAnimationFrame
				
				App.init = function() {
					
					App.video = document.createElement('video');
					App.backCanvas = document.createElement('canvas');
					App.canvas = document.querySelector('#vcanvas');
					App.canvas.style.display = 'none';
					App.context = App.canvas.getContext('2d');
					
					navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
					
					try {
						navigator.getUserMedia_({
							video: true,
							audio: false
						}, App.start, App.denied);
					} catch (e) {
						try {
							navigator.getUserMedia_('video', App.start, App.denied);
						} catch (e) {
							App.error(e);
						}
					}
					
					App.video.loop = App.video.muted = true;
					App.video.load();
				};
				
				App.init();		
			};