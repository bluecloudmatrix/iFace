function mouth2music() {
	var mouth2music_div = document.getElementById("mouth2music");
	if(result_mouth == 1) //nature
		mouth2music_div.innerHTML = "千与千寻.mp3";
	else if(result_mouth == 0)
		mouth2music_div.innerHTML = "欢沁.mp3";
}