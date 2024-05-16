//import vec2, Mat3 from 'gl-matrix-min.js'
function setup() {
    var canvas = document.getElementById("MyCanvas");
    var context = canvas.getContext('2d');
    var button = document.getElementById('start');
    var label=document.getElementById('count');
    var mouseX;
    var mouseY;
    document.onmousemove=getKeyPos;

    function lineToTx(loc, Tx) {
        var res = vec2.create();
        vec2.transformMat3(res, loc,Tx);
        context.lineTo(res[0],res[1]);
    }

    function moveToTx(loc, Tx) {
        var res = vec2.create();
        vec2.transformMat3(res, loc, Tx);//Tx must be of type Mat3
        context.moveTo(res[0],res[1]);
    }
//    function drawCake() {
//        context.
//    }

    function drawBug(loc) {
context.strokeStyle="black";
context.beginPath();
Tx=mat3.create();
mat3.fromTranslation(Tx,loc);
moveToTx([-5.4,-5.4], Tx);
lineToTx([5.4,5.4], Tx);
context.closePath();
context.stroke();
context.beginPath();
moveToTx([5.4,-5.4], Tx);
lineToTx([-5.4,5.4], Tx);
context.closePath();
context.stroke();
context.beginPath();
moveToTx([0,-6.9], Tx);
lineToTx([0,6.9], Tx);
context.closePath();
context.stroke();
context.beginPath();
moveToTx([6,0],Tx);
lineToTx([9.6,-1.7], Tx);
context.closePath();
context.stroke();
context.beginPath();
moveToTx([6,0], Tx);
lineToTx([9.6, 1.7], Tx);
context.closePath();
context.stroke();
context.fillStyle="brown";
    context.beginPath();
        context.arc(0+loc[0],0+loc[1],5,0,Math.PI *2);
context.arc(6+loc[0],0+loc[1],3,0,Math.PI*2);
context.closePath();
context.fill();

    }

    function bugPath(t, order) {
    //var order = Math.ceil(Math.random()*5+1);
    if (order==1) {
        A=300;
        B=300;
        var x=A*t;
        var y=B*t;
        return [x,y];
    }
    else if (order==2){
        A=[150,150];
        B=[150,150];
        var x=150*t+150*t*t;
        var y=150*t+150*t*t;
        return [x,y];
    }
    else if (order==3){
        var x=100*t+100*t*t+100*Math.pow(t,3);
        var y=100*t+100*t*t+100*Math.pow(t,3);
        return [x,y];
    }
    else if (order==4) {
        var x=75*t+75*Math.pow(t,2)+75*Math.pow(t,3)+75*Math.pow(t,4);
        var y= 75*t+75*Math.pow(t,2)+75*Math.pow(t,3)+75*Math.pow(t,4);
        return [x,y];
    }
    else if (order == 5){
        var x=60*t+60*Math.pow(t,2)+60*Math.pow(t,3)+60*Math.pow(t,4)+60*Math.pow(t,5);
        var y= 60*t+60*Math.pow(t,2)+60*Math.pow(t,3)+60*Math.pow(t,4)+60*Math.pow(t,5);
        return [x,y];

    }
    else{
        var x=50*t+50*Math.pow(t,2)+50*Math.pow(t,3)+50*Math.pow(t,4)+50*Math.pow(t,5)+50*Math.pow(t,6);
        var y=50*t+50*Math.pow(t,2)+50*Math.pow(t,3)+50*Math.pow(t,4)+50*Math.pow(t,5)+50*Math.pow(t,6);
        return [x,y];
    }
    }

    function drawGun(theta) { //theta should be in radius
        function drawRect(Tx) {
            context.strokeStyle="red";
            context.beginPath();
            moveToTx([0,0],Tx);
            lineToTx([600,0], Tx);
            context.closePath();
            context.stroke();
            context.fillStyle="orange";
            context.beginPath();

            moveToTx([-25, -15], Tx);
            lineToTx([25, -15], Tx);
            lineToTx([25,15],Tx);
            lineToTx([-25,15], Tx);
            context.closePath();
            context.fill();

        }
        var Tx=mat3.create();
        mat3.translate(Tx, Tx, [300,300]);
        mat3.rotate(Tx, Tx, theta);//Need to first translate and then rotate
        drawRect(Tx);
/**
//        var loc = mat3.create();
//        mat3.rotate(loc, loc, theta-Math.PI/4);
//        var loc1=mat3.create();
//        mat3.rotate(loc1, loc1, theta+Math.PI/4);
//        mat3.scale(loc1,loc1,[70,70]);
//        mat3.scale(loc,loc,[70,70]);
//       loc=mat3.fromTranslation(loc, [250, 250]);
//          loc1=mat3.fromTranslation(loc1, [250, 200]);
//
//       moveToTx([1,1],loc);
//       lineToTx([1,1],loc1);
//       var angle=Math.atan(50./20);
//       var loc2=mat3.create();
//       mat3.rotate(loc2,loc2,theta+angle);
//       mat3.scale(loc2,loc2,[53.85,53.85]);
//       loc2=mat3.fromTranslation(loc2,[200,300]);
//       lineToTx([1,1],loc2);
//       var loc6=mat3.create();
//          mat3.rotate(loc6,loc6,theta-angle);
//          mat3.scale(loc6,loc6,[53.85,53.85]);
//          loc6=mat3.fromTranslation(loc6,[300,300]);
//          lineToTx([1,1],loc6);
//
//       context.closePath();
//       context.fill();
//       context.beginPath();
//       var angle2=Math.atan(5./80);
//       var loc3=mat3.create();
//          mat3.rotate(loc3,loc3,theta-angle2);
//          mat3.scale(loc3,loc3,[80.15,80.15]);
//          mat3.translate(loc3,loc3,[300,300]);
//          moveToTx([1,1],loc3);
//          var loc4=mat3.create();
//                mat3.rotate(loc4,loc4,theta+angle2);
//                mat3.scale(loc4,loc4,[80.15,80.15]);
//                mat3.translate(loc4,loc4,[300,300]);
//
//          lineToTx([1,1], loc4);
//          var angle3=Math.atan(5./50);
//          var loc5=mat3.create();
//                mat3.rotate(loc5,loc5,theta+angle3);
//                mat3.scale(loc5,loc5,[50.24,50.24]);
//                mat3.translate(loc5,loc5,[300,300]);
//          lineToTx([1,1],loc5);
//          var loc7=mat3.create();
//                      mat3.rotate(loc7,loc7,theta-angle3);
//                      mat3.scale(loc7,loc7,[50.24,50.24]);
//                      mat3.translate(loc7,loc7,[300,300]);
//                      lineToTx([1,1],loc7);
//                      context.closePath();
//                      context.fill();
//   context.rect(loc[0], loc[1], 50, 30);
//        //var transformMatrix1=loc+[300, 300];
//        mat3.translate(loc, loc,[-300,-300]);
//    //var transformMatrix2=Tx+[270,220];
//        mat3.scale(loc, loc,[85,85]);
//        mat3.translate(loc, loc,[300,300]);
//        //var transformMatrix2=loc+[300,300];
//context.rect(loc[0], loc[1], 10, 30 );
//context.closePath();
//context.fill();
**/
    }
        function Bullet(Tx) {
            context.fillStyle="black";
            context.beginPath();
            moveToTx([23, -3], Tx);
            lineToTx([23,3],Tx);
            lineToTx([28,3],Tx);
            lineToTx([28,-3],Tx);
            context.closePath();
            context.fill();
        }
        function drawBullet(theta){

            var Tx=mat3.create();
            mat3.translate(Tx,Tx,[300,300]);
            mat3.rotate(Tx,Tx,theta);
            Bullet(Tx);
    }
        function drawCirc(){
             context.strokeStyle="black";
             context.beginPath();
             context.arc(300,300, 50, 0 , 2*Math.PI);
             context.closePath();
             context.stroke();
        }
     //var angle=Math.atan((mouseY-300)/(mouseX-300));
     //drawGun(angle);


//function start() {
//animation=window.requestAnimationFrame(animateBullet);
//}
var x;
var y;
function randomBug(){
    var randomX=Math.random()*580+7;

    var randomY=Math.random()*580+7;
    //var randomAngle=Math.random() * 2*Math.PI;
    var loc=mat3.create();
    mat3.translate(loc,loc,[randomX,randomY]);
    //mat3.rotate(loc,loc, randomAngle);
    var f=Math.pow(randomX-300,2)+Math.pow(randomY-300,2);
    if (Math.sqrt(f)>50){
    drawBug([randomX,randomY]);
    x=randomX;
    y=randomY;
    }
    else {
    randomBug();
    }

}
var t=0;
var order = Math.ceil(Math.random()*5+1);
var startingX=Math.random()*590+5;
var startingY=Math.random()*590+5;
function movingBug(){
    var loc=bugPath(t,2);
    loc=loc+[startingX,startingY];
    drawBug(loc);
    x=loc[0];
    y=loc[1];
    t=t+0.1;
    window.requestAnimationFrame(movingBug);
}
//movingBug();
function draw() {
drawCirc();
//drawBug([10,10]);
drawBullet(0);
drawGun(0);
randomBug();
//controlGun();

}
 var angle;
 var count=0;
// function getKeyPos(e) {
//     canvas.width=canvas.width;
//     mouseX=e.clientX;
//     mouseY=e.clientY;
//
//     angle=Math.atan2((mouseY-300), (mouseX-300));
//     drawCirc();
//     drawGun(angle);
//     drawBullet(angle);
//     //drawBug([x,y]);
//     if (Math.abs(Math.atan2((y-300), (x-300)) - angle)< Math.PI*(1./50)) {
//         //canvas.clearRect(x-10,y-10,20,20);
//         x=-10;
//         y=-10;
//         t=0;
//         count=count+1;
//         label.innerHTML='Number of bugs you have eliminated: ' + count;
//     }
//     else{
//         drawBug([x,y]);
//     }
//     }
function getKeyPos(e) {
    canvas.width=canvas.width;
    mouseX=e.clientX;
    mouseY=e.clientY;
    //console.log(e.clientX,e.clientY)
    angle=Math.atan2((mouseY-300), (mouseX-300));
   //drawBug([10,10]);
    drawCirc();
    drawGun(angle);
    drawBullet(angle);
    endTime=new Date();
    var timeElapsed = (endTime-startTime)/1000.;
    if (timeElapsed > 10) {
        label.innerHTML="Time's up. You killed "+count+" bugs.";
        return;
    }
    if (Math.abs(Math.atan2((y-300), (x-300)) - angle)< Math.PI*(1./90)) {
        //canvas.clearRect(x-10,y-10,20,20);
        x=-10;
        y=-10;
        randomBug();
        count=count+1;
        label.innerHTML='Number of bugs you have eliminated: ' + count;
    }
    else{
        drawBug([x,y]);
    }
//randomBug();
//   while(t<500){
//   mat3.translate(Tx, Tx, [300+t*Math.cos(currangle), 300+t*Math.sin(currangle)]);
//   mat3.rotate(Tx,Tx,currangle);
//   Bullet(Tx);
//   t=t+1;
//   }
   //animateBullet();
   //animation=window.requestAnimationFrame(animateBullet);

}
   var t=0;
var Tx=mat3.create();
   var currangle=angle;
function animateBullet(){
    currangle=angle;
   drawBullet(angle);

   mat3.translate(Tx, Tx, [300+t*Math.cos(currangle), 300+t*Math.sin(currangle)]);
   mat3.rotate(Tx,Tx,currangle);
   Bullet(Tx);
   t=t+5;
   while(t<100){
   window.requestAnimationFrame(animateBullet);
   }
   //window.cancelAnimationFrame(animation);
   }
//animation= window.requestAnimationFrame(animateBullet);
//animateBullet();
function start() {
startTime=new Date();
//randomBug();
count=0;
label.innerHTML="Number of bugs you have eliminated: " + count;
}
button.addEventListener('click', start);
window.addEventListener('mousemove', getKeyPos);
draw();
var startTime;
var endTime;
}
window.onload = setup;