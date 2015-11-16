//the normal building 5
function building_one(){
	this.mybody = new THREE.Object3D();
	this.mybody.position.x = threeDWidth*10*Math.random();
	this.mybody.position.y = 25;
	this.mybody.position.z = threeDHeight*10*Math.random();
	this.mybody.receiveShadow = true;
	this.mybody.castShadow = true;
				
	var b_one_l1 = new THREE.Mesh(
		new THREE.CubeGeometry(50, 70, 50),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_one_l1.position.x = 0;
	b_one_l1.position.z = 0;
	b_one_l1.position.y = 0;
	b_one_l1.receiveShadow = true;
	b_one_l1.castShadow = true;
	this.mybody.add(b_one_l1);
				
	var b_one_l2 = new THREE.Mesh(
		new THREE.CubeGeometry(50, 10, 50),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_one_l2.position.x = 0;
	b_one_l2.position.z = 0;
	b_one_l2.position.y = 45;
	b_one_l2.receiveShadow = true;
	b_one_l2.castShadow = true;
	this.mybody.add(b_one_l2);
	
	var b_one_l3 = new THREE.Mesh(
		new THREE.CubeGeometry(50, 10, 50),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_one_l3.position.x = 0;
	b_one_l3.position.z = 0;
	b_one_l3.position.y = 60;
	b_one_l3.receiveShadow = true;
	b_one_l3.castShadow = true;
	this.mybody.add(b_one_l3);
	
	var b_one_l4 = new THREE.Mesh(
		new THREE.CubeGeometry(50, 10, 50),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_one_l4.position.x = 0;
	b_one_l4.position.z = 0;
	b_one_l4.position.y = 75;
	b_one_l4.receiveShadow = true;
	b_one_l4.castShadow = true;
	this.mybody.add(b_one_l4);
	
	var b_one_l5 = new THREE.Mesh(
		new THREE.CubeGeometry(50, 10, 50),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_one_l5.position.x = 0;
	b_one_l5.position.z = 0;
	b_one_l5.position.y = 90;
	b_one_l5.receiveShadow = true;
	b_one_l5.castShadow = true;
	this.mybody.add(b_one_l5);	
	
	var b_one_l6 = new THREE.Mesh(
		new THREE.CubeGeometry(50, 10, 50),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_one_l6.position.x = 0;
	b_one_l6.position.z = 0;
	b_one_l6.position.y = 105;
	b_one_l6.receiveShadow = true;
	b_one_l6.castShadow = true;
	this.mybody.add(b_one_l6);	
	
	var b_one_l7 = new THREE.Mesh(
		new THREE.CubeGeometry(50, 10, 50),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_one_l7.position.x = 0;
	b_one_l7.position.z = 0;
	b_one_l7.position.y = 120;
	b_one_l7.receiveShadow = true;
	b_one_l7.castShadow = true;
	this.mybody.add(b_one_l7);	
				
	scene.add(this.mybody);
}

//six edges 5
function building_two(){
	this.mybody = new THREE.Object3D();
	this.mybody.position.x = threeDWidth*10*Math.random();
	this.mybody.position.y = 35;
	this.mybody.position.z = threeDHeight*10*Math.random();
	this.mybody.receiveShadow = true;
	this.mybody.castShadow = true;
	
	var b_two_l1 = new THREE.Mesh(
		new THREE.TorusGeometry(40, 40, 8, 6, Math.PI * 2),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_two_l1.position.x = 0;
	b_two_l1.position.z = 0;
	b_two_l1.position.y = 0;
	b_two_l1.rotation.set(Math.PI/2, 0, 0);
	b_two_l1.receiveShadow = true;
	b_two_l1.castShadow = true;
	this.mybody.add(b_two_l1);
	
	var b_two_l2 = new THREE.Mesh(
		new THREE.TorusGeometry(40, 40, 8, 6, Math.PI * 2),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_two_l2.position.x = 0;
	b_two_l2.position.z = 0;
	b_two_l2.position.y = 60;
	b_two_l2.rotation.set(Math.PI/2, 0, 0);
	b_two_l2.receiveShadow = true;
	b_two_l2.castShadow = true;
	this.mybody.add(b_two_l2);	
	
	var b_two_l3 = new THREE.Mesh(
		new THREE.TorusGeometry(40, 40, 8, 6, Math.PI * 2),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_two_l3.position.x = 0;
	b_two_l3.position.z = 0;
	b_two_l3.position.y = 120;
	b_two_l3.rotation.set(Math.PI/2, 0, 0);
	b_two_l3.receiveShadow = true;
	b_two_l3.castShadow = true;
	this.mybody.add(b_two_l3);	
	
	var b_two_l4 = new THREE.Mesh(
		new THREE.TorusGeometry(40, 40, 8, 6, Math.PI * 2),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_two_l4.position.x = 0;
	b_two_l4.position.z = 0;
	b_two_l4.position.y = 180;
	b_two_l4.rotation.set(Math.PI/2, 0, 0);
	b_two_l4.receiveShadow = true;
	b_two_l4.castShadow = true;
	this.mybody.add(b_two_l4);	
	
	var b_two_l5 = new THREE.Mesh(
		new THREE.TorusGeometry(40, 40, 8, 6, Math.PI * 2),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_two_l5.position.x = 0;
	b_two_l5.position.z = 0;
	b_two_l5.position.y = 240;
	b_two_l5.rotation.set(Math.PI/2, 0, 0);
	b_two_l5.receiveShadow = true;
	b_two_l5.castShadow = true;
	this.mybody.add(b_two_l5);	
				
	scene.add(this.mybody);
}

//the pearl of the oreient 2
function building_three(){
	this.mybody = new THREE.Object3D();
	this.mybody.position.x = threeDWidth*10*Math.random();
	this.mybody.position.y = 30;
	this.mybody.position.z = threeDHeight*10*Math.random();
	this.mybody.receiveShadow = true;
	this.mybody.castShadow = true;
	
	var b_three_l1_1 = new THREE.Mesh(
		new THREE.CubeGeometry(15, 80, 15),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_three_l1_1.position.x = 0;
	b_three_l1_1.position.z = -35;
	b_three_l1_1.position.y = -10;
	b_three_l1_1.rotation.set(Math.PI/4, 0, 0);	
	b_three_l1_1.receiveShadow = true;
	b_three_l1_1.castShadow = true;
	this.mybody.add(b_three_l1_1);	
	
	var b_three_l1_2 = new THREE.Mesh(
		new THREE.CubeGeometry(15, 80, 15),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_three_l1_2.position.x = 0;
	b_three_l1_2.position.z = 35;
	b_three_l1_2.position.y = -10;
	b_three_l1_2.rotation.set(-Math.PI/4, 0, 0);
	b_three_l1_2.receiveShadow = true;
	b_three_l1_2.castShadow = true;
	this.mybody.add(b_three_l1_2);
	
	var b_three_l1_3 = new THREE.Mesh(
		new THREE.CubeGeometry(15, 80, 15),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_three_l1_3.position.x = -35;
	b_three_l1_3.position.z = 0;
	b_three_l1_3.position.y = -10;
	b_three_l1_3.rotation.set(0, 0, -Math.PI/4);
	b_three_l1_3.receiveShadow = true;
	b_three_l1_3.castShadow = true;
	this.mybody.add(b_three_l1_3);	
	
	var b_three_l1_4 = new THREE.Mesh(
		new THREE.CubeGeometry(15, 80, 15),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_three_l1_4.position.x = 35;
	b_three_l1_4.position.z = 0;
	b_three_l1_4.position.y = -10;
	b_three_l1_4.rotation.set(0, 0, Math.PI/4);
	b_three_l1_4.receiveShadow = true;
	b_three_l1_4.castShadow = true;
	this.mybody.add(b_three_l1_4);	
	
	var b_three_l2 = new THREE.Mesh(
		new THREE.SphereGeometry(40,20),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_three_l2.position.x = 0;
	b_three_l2.position.z = 0;
	b_three_l2.position.y = 40;
	b_three_l2.receiveShadow = true;
	b_three_l2.castShadow = true;
	this.mybody.add(b_three_l2);	
	
	var b_three_l3 = new THREE.Mesh(
		new THREE.CubeGeometry(30, 100, 30),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_three_l3.position.x = 0;
	b_three_l3.position.z = 0;
	b_three_l3.position.y = 120;
	b_three_l3.receiveShadow = true;
	b_three_l3.castShadow = true;
	this.mybody.add(b_three_l3);	
	
	var b_three_l4 = new THREE.Mesh(
		new THREE.SphereGeometry(25,20),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_three_l4.position.x = 0;
	b_three_l4.position.z = 0;
	b_three_l4.position.y = 190;
	b_three_l4.receiveShadow = true;
	b_three_l4.castShadow = true;
	this.mybody.add(b_three_l4);	
	
	var b_three_l5 = new THREE.Mesh(
		new THREE.OctahedronGeometry(15,0),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_three_l5.position.x = 0;
	b_three_l5.position.z = 0;
	b_three_l5.position.y = 240;
	b_three_l5.receiveShadow = true;
	b_three_l5.castShadow = true;
	this.mybody.add(b_three_l5);	
				
	scene.add(this.mybody);
	alert("building added!");
}

//the statue 10
function building_four(){
	this.mybody = new THREE.Object3D();
	this.mybody.position.x = threeDWidth*10*Math.random();
	this.mybody.position.y = 25;
	this.mybody.position.z = threeDHeight*10*Math.random();
	this.mybody.receiveShadow = true;
	this.mybody.castShadow = true;
	
	var b_four_l1 = new THREE.Mesh(
		new THREE.CubeGeometry(50, 50, 50),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_four_l1.position.x = 0;
	b_four_l1.position.z = 0;
	b_four_l1.position.y = 0;
	b_four_l1.receiveShadow = true;
	b_four_l1.castShadow = true;
	this.mybody.add(b_four_l1);	
	
	var b_four_l2 = new THREE.Mesh(
		new THREE.CubeGeometry(30, 20, 30),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_four_l2.position.x = 0;
	b_four_l2.position.z = 0;
	b_four_l2.position.y = 35;
	b_four_l2.receiveShadow = true;
	b_four_l2.castShadow = true;
	this.mybody.add(b_four_l2);	
	
	var b_four_l3 = new THREE.Mesh(
		new THREE.TorusKnotGeometry(30, 7, 64, 8, 2, 3, 1),
		new THREE.MeshPhongMaterial({color:0xFFFFFF})
	);
	b_four_l3.position.x = 0;
	b_four_l3.position.z = 0;
	b_four_l3.position.y = 90;
	b_four_l3.receiveShadow = true;
	b_four_l3.castShadow = true;
	this.mybody.add(b_four_l3);	
				
	scene.add(this.mybody);
}