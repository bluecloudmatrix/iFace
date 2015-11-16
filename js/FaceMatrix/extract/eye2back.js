function eye2back() {
	var eye2back_div = document.getElementById("eye2back");
	if(result_eye == 1) //open
		eye2back_div.innerHTML = "白天";
	else if(result_eye == 0)
		eye2back_div.innerHTML = "黑夜";
}