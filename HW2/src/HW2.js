function setup() {
    var canvas = document.getElementById('MyCanvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('angle');
    slider.value = 45;
    var buttonStart=document.getElementById('start');
    var buttonReset=document.getElementById('reset');
    var slider2 = document.getElementById("velocity");
    slider2.value = 30;
    function drawBase() {
        context.save();
        context.strokeStyle = "black";
        context.fillStyle="orange";
        context.beginPath();
        context.moveTo(80, 600);
        context.lineTo(80, 580);
        context.lineTo(170, 580);
        context.lineTo(170, 600);
        context.closePath();
        context.fill();
        context.stroke();
    }
    function drawConnection() {
        context.strokeStyle = "black";
        context.fillStyle="orange";
        context.beginPath();
        context.arc(125,575, 5, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    }
    function drawBrim() {
        context.strokeStyle = "black";
        context.fillStyle="orange";
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(0,5);
        context.lineTo(50, 5);
        context.lineTo(50, -5);
        context.lineTo(0, -5);
        context.closePath();
        context.fill();
        context.stroke();
    }
    function drawCirc() {
        context.strokeStyle = "black";
        context.fillStyle="orange";
        context.beginPath();
        context.arc(0,0,5,0,2*Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    }
    function drawHand(){
        context.save();
        context.translate(125, 575);
        context.save();
        context.rotate(-2*Math.PI/3);
        drawBrim();
        context.save();
        context.translate(50,0);
        drawCirc();
        context.save();
        context.rotate(Math.PI/3);
        drawBrim();
        context.save();
        context.translate(50,0);
        //drawCirc();
        context.save();
        drawFinger();
        drawSquare();
    }
    function drawHandCopy() {
            context.save();
            context.translate(125, 575);
            context.save();
            context.rotate(-2*Math.PI/3);
            drawBrim();
            context.save();
            context.translate(50,0);
            drawCirc();
            context.save();
            context.rotate(Math.PI/3);
            drawBrim();
            context.save();
            context.translate(50,0);
            //drawCirc();
            context.save();
            drawFinger();
    }
    function drawFinger() {
        context.strokeStyle = "black";
        context.fillStyle="orange";
        context.beginPath();context.moveTo(0,0);
        context.save();
        context.rotate(-2*Math.PI/3);
        drawBrim();
        context.arc(0,0,5,0,2*Math.PI);
        context.closePath();
        context.stroke();
        context.fill();
    }
    function drawSquare() {
        context.strokeStyle = "black";
        context.fillStyle="red";
        context.beginPath();
        context.rect(15,5,20,20);
        context.closePath();
        context.stroke();
        context.fill();
    }
    //var t=0;
    //var startTime = new Date().getTime();
    var t=0;
    function updateBrims(){
        var angle=slider.value;
        var a=(Math.PI/3)/225; //This is the parameter calculated
        var b=a*30;
        var radiusAngle=angle/180 * Math.PI;
        var aForHand=radiusAngle/900.;
        if (t<=30){
            canvas.width=canvas.width;
            drawBase();
            drawConnection();
            drawTarget();
            context.translate(125, 575);
            context.rotate(-2*Math.PI/3+a*t*t-b*t);
            drawBrim(); //first brim
            context.translate(50,0);
            drawCirc();
            context.rotate(Math.PI/3+a*t*t-b*t);
            drawBrim(); //second brim
            context.translate(50,0);
            context.strokeStyle = "black";
            context.fillStyle="orange";
            context.beginPath();
            context.rotate(-2*Math.PI/3-a*t*t+b*t+aForHand*t*t);
            drawBrim(); //should be the brim to hold the square
            context.arc(0,0,5,0,2*Math.PI);
            context.closePath();
            context.stroke();
            context.fill();
            context.save();
            drawSquare();
            t++;
            animation = window.requestAnimationFrame(updateBrims);
        }
        else {
            context.clearRect(15,5,20,20);
            window.cancelAnimationFrame(animation);

            throwSquare();
        }
    }

    var v = slider2.value;
    var angle=slider.value/180 * Math.PI;
    var vx=v*Math.sin(angle);
    var vy=v*Math.cos(angle);
    //var startTime2 = new Date().getTime();
    var t2=0;
    var x=0;
    var y=0;
    function throwSquare() {
        context.clearRect(15+x,5+y,20,20);
        //context.restore();
        var angle=slider.value
        var radiusAngle=angle/180 * Math.PI;
        var a=5; //acceleration
        t2=t2+1;
        y=slider2.value*t2-a*Math.cos(slider.value/180*Math.PI)/2 *Math.pow(t2,2);
        x=-1/2 *a*Math.sin(slider.value/180*Math.PI)*Math.pow(t2,2);
        drawSquare2(x,y);
        //throwSquare();
        //if(tiltAngle <= 2* slider.value/180 * Math.PI) {
        animation2=window.requestAnimationFrame(throwSquare);
        //}
    function drawSquare2(x,y) {
        context.strokeStyle = "black";
        context.fillStyle="red";
        context.beginPath();
        context.rect(15+x,5+y,20,20);
        context.closePath();
        context.stroke();
        context.fill();
    }
    }
    var animation;
    var animation2;
    function start() {
        if (t==0 && t2==0) { //This step ensures that user can start animation only if they have hit reset.
                animation=window.requestAnimationFrame(updateBrims);
        }
    }

    function reset() {
        context.restore();
        window.cancelAnimationFrame(animation);
        window.cancelAnimationFrame(animation2);
        draw();
    }
    function drawTarget(){
        context.fillStyle="yellow"; context.beginPath();
        context.arc(570, 580, 10, 0, 2*Math.PI);
        context.closePath();
        context.fill();
    }
    function draw() {
        canvas.width=canvas.width;
        t=0;
        t2=0;
        drawBase();
        drawConnection();
        drawTarget();
        drawHand(); //drawHand with square
    }
    draw();
    buttonReset.addEventListener('click', reset);
    buttonStart.addEventListener('click', start);
}
window.onload = setup;