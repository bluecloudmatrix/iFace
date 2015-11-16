/**
 * copy canvas_1 to canvas_2
 * 2013/11/3
 **/
(function() {

	var namespace = FACEMATRIX.namespace('FACEMATRIX.func');
	
	if(namespace.copyCanvas === undefined) {
	
		namespace.copyCanvas = function(canvas_1, canvas_2) {
			
			var context_1 = canvas_1.getContext("2d");
			var imgData = context_1.getImageData(0, 0, canvas_1.width, canvas_1.height);
			
			var context_2 = canvas_2.getContext("2d");
			context_2.putImageData(imgData, 0, 0);
		}
		 
	}

}) ();