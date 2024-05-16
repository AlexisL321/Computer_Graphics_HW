function setup() {

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext('2d');
	var slider1 = document.getElementById("slider1");
	var slider2 = document.getElementById("slider2");
	var select=document.getElementById("shapes");
	slider1.value=-180;
	slider2.value=0;
	dx=slider1.value;
	number=slider2.value;
	function numOfTree(){
		canvas.width=canvas.width;
		draw();
	
//	sunPath();
drawSun(280*Math.cos(slider1.value/180*Math.PI)+260,150*Math.sin(slider1.value/180*Math.PI));
		var numTree=slider2.value;
		var interval=canvas.width/(numTree/2);
		var initialX=0;
		var initialY=0;
		for (i=0;i<numTree;i++){
			initialX+=interval;
			drawTreeHollow(initialX-interval/2,-70);
			drawTree(initialX,initialY);
		}
	}

	function drawSun(x,y){
		context.beginPath();
		context.fillStyle="orange";
		context.arc(x-15,300+y,15,0,2*Math.PI);
		context.closePath();
		context.fill();

	}
	function sunPath() {
		canvas.width=canvas.width;
		drawSun(0,0);
		drawTree(0,0);
		numOfTree();
		var t=slider1.value/180 * Math.PI;
		var x=280*Math.cos(t)+260;
		var y=150*Math.sin(t);
		drawSun(x,y);
		var param=slider1.value;
		if(param<-150||param>-30) {
			animateRain();
		}	
//		else{
//
//			clearInterval(interval);
//numOfTree();
//		}
	}
	function drawTree(x,y) {
		context.beginPath();
		context.fillStyle="green";
		context.moveTo(0+x,400+y);
		context.lineTo(50+x, 400+y);
		context.lineTo(40+x,370+y);
		context.lineTo(45+x,370+y);context.lineTo(25+x,295+y);
		context.lineTo(5+x,370+y);context.lineTo(10+x, 370+y);
		context.closePath();
		context.fill();
		context.beginPath();
		context.fillStyle="brown";
		context.moveTo(20+x, 500+y);
		context.lineTo(20+x,400+y);context.lineTo(30+x,400+y);context.lineTo(30+x,500+y);	context.lineTo(20+x,500+y);
		context.fill();
	}
	function drawTreeHollow(x,y){
		context.beginPath();
		context.strokeStyle="green";
		context.moveTo(0+x,400+y);
		context.lineTo(50+x, 400+y);
		context.lineTo(40+x,370+y);
		context.lineTo(45+x,370+y);context.lineTo(25+x,295+y);
		context.lineTo(5+x,370+y);context.lineTo(10+x, 370+y);
		context.closePath();
		context.stroke();
		context.strokeStyle="brown";
		context.beginPath();
		context.moveTo(20+x, 500+y);
		context.lineTo(20+x,400+y);context.lineTo(30+x,400+y);context.lineTo(30+x,500+y);   context.lineTo(20+x,500+y);
		context.closePath();
		context.stroke();

	}
	function drawRaindrop(x,y) {
		context.fillStyle="blue";
		context.beginPath();
		context.arc(0+x,0+y,3,0,2*Math.PI);
		context.closePath();
		context.fill();
	}
	function animateRain(){
		var interval=setInterval(animate);
		var count=0;
		function animate(){
			canvas.width=canvas.width;
			sunPath();
			numOfTree();			
			for (i=0;i<10;i++){
				for (j=0;j<10;j++){
					drawRaindrop((50*i)%500,(50*j+count*10)%500);
				}}
			for (i=0;i<10;i++){
				for (j=0;j<10;j++){
					drawRaindrop(50*i+20,(50*j+15+count*10)%500);}}   
			count=count+1;
if (slider1.value>=-165 && slider1.value<=-15) {
clearInterval(interval);
canvas.width=canvas.width;
numOfTree();
sunPath();
}
		}

	}

	function draw(){
		canvas.width=canvas.width;
		drawTree(0,0);
		//drawTreeHollow(0,0);
	}

	draw();
	slider1.addEventListener("input",sunPath);
	slider2.addEventListener("input",numOfTree);
}
window.onload=setup;
