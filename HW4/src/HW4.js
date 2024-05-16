function setup() {
    var canvas = document.getElementById('MyCanvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('object');
    slider.value=0;
    function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}

    function drawVerticalBar(Tx) {
        context.fillStyle="orange";
        context.beginPath();
        moveToTx([0,0],Tx);
        lineToTx([20,0],Tx);
        lineToTx([20,200],Tx);
        lineToTx([0,200],Tx);
        context.closePath();
        context.fill();
    }
    function drawHorizontalBar(Tx){
        context.fillStyle='orange';
        context.beginPath();
        moveToTx([0,0],Tx);
        lineToTx([200,0],Tx);
        lineToTx([200,20],Tx);
        lineToTx([0,20],Tx);
        context.closePath();
        context.fill();
    }

    function drawMaze() {
        //draw the 1st vertical bar
        var Tx1v = mat3.create();
        mat3.translate(Tx1v,Tx1v,[320,-80]);
        drawVerticalBar(Tx1v);
        //1st horizontal bar
        var Tx1h=mat3.create();
        mat3.translate(Tx1h, Tx1h, [0,50]);
        drawHorizontalBar(Tx1h);
        //2nd horizontal bar
        var Tx2h=mat3.create();
        mat3.translate(Tx2h,Tx2h,[60, 100]);
        drawHorizontalBar(Tx2h);
        //3rd H
        var Tx3h=mat3.create();
        mat3.translate(Tx3h,Tx3h,[220, 180]);
        drawHorizontalBar(Tx3h);
        //2nd vertical bar
        var Tx2v=mat3.create();
        mat3.translate(Tx2v,Tx2v,[150,50]);
        drawVerticalBar(Tx2v);
        //3rd v
        var Tx3v=mat3.create();
        mat3.translate(Tx3v,Tx3v,[240, -80]);
        drawVerticalBar(Tx3v);
        //4th v
        var Tx4v=mat3.create();
        mat3.translate(Tx4v,Tx4v,[30, 150]);
        drawVerticalBar(Tx4v);
        //4th h
        var Tx4h=mat3.create();
        mat3.translate(Tx4h,Tx4h,[50, 280]);
        drawHorizontalBar(Tx4h);
        //5th h
        var Tx5h=mat3.create();
        mat3.translate(Tx5h,Tx5h,[-90, 200]);
        drawHorizontalBar(Tx5h);
        //5th v
        var Tx5v=mat3.create();
        mat3.translate(Tx5v,Tx5v,[300, 240]);
        drawVerticalBar(Tx5v);

        //6th h
        var Tx6h=mat3.create();
        mat3.translate(Tx6h,Tx6h,[100, 350]);
        drawHorizontalBar(Tx6h);

        //7th h
        var Tx7h=mat3.create();
        mat3.translate(Tx7h,Tx7h,[320, 300]);
        drawHorizontalBar(Tx7h);

    }

    function drawTarget() {
        context.fillStyle='yellow';
        context.beginPath();
        context.arc(390, 148, 7,0, 2*Math.PI);
        context.closePath();
        context.fill();
    }

    function drawRed(Tx) {
        context.fillStyle="red";context.beginPath();
        moveToTx([0,0],Tx);
        lineToTx([0,-10],Tx);
        lineToTx([5,-15], Tx);
        lineToTx([10,-10],Tx);
        lineToTx([10,0],Tx);
        context.closePath();context.fill();
    }
    function drawBlack(Tx) {
        context.fillStyle="black";context.beginPath();
        moveToTx([0,0],Tx);
        lineToTx([0,-10],Tx);
        lineToTx([5,-15], Tx);
        lineToTx([10,-10],Tx);
        lineToTx([10,0],Tx);
        context.closePath();context.fill();
        }

    function returnTx(matr, angle) {
        var Tx=mat3.create();
        mat3.translate(Tx,Tx,matr);
        mat3.rotate(Tx,Tx,angle);
        return Tx;
    }


    function blackTank(){
        //1st black tank
        var Tx1=returnTx([60,260],Math.PI/2); drawBlack(Tx1);
        //2nd black tank
        var Tx2=returnTx([380, 220], -Math.PI/2); drawBlack(Tx2);
        //3rd black tank
        var Tx3=returnTx([295, 10], Math.PI);drawBlack(Tx3);
    }

    function redTank() {
        var Tx=returnTx([65, 395],0); drawRed(Tx);
    }
    //some fixed point the red needs to pass
    var p0=[70,395]; var d0=[0,-80]; var a0=[0,0];
    var p1=[70, 330];
    var p2=[260, 330];
    var p3=[270, 250];
    var p4=[193, 230];
    var p5=[195,160];
    var p6=[285, 150];
    var p7=[385, 150];
    var Tx=returnTx(p1,0);drawRed(Tx);
    var Tx=returnTx(p2,0);drawRed(Tx);
    var Tx=returnTx(p3,0);drawRed(Tx);
    var Tx=returnTx(p5,0);drawRed(Tx);
    var Tx=returnTx(p6,0);drawRed(Tx);
    var Tx=returnTx(p7,0);drawRed(Tx);
    var Tx=returnTx(p4,0);drawRed(Tx);
    var keyx=p0[0];
    var keyy=p0[1];
    function mousedown(e) {
        keyx=e.clientX;
        keyy=e.clientY;
        moveMouse();

    }
    var t = 0;
    var currPos=[70,395];
//    function moveMouse(){
//        moveAlongMouse(keyx,keyy);
//        window.requestAnimationFrame(moveMouse);
//    }
//    window.requestAnimationFrame(moveMouse);

    /**
        The following functions calculate the natural cubic given value pairs p1,d1,a1,p2
    */
    function naturalCubics(p1,d1,a1,p2){
        var B=[[1,0,0,0],[0,1,0,0],[0,0,1./2,0],[-1,-1,-1./2,1]];
        var BP=[[p1[0],p1[1]],[d1[0],d1[1]],[1./2*a1[0],1./2*a1[1]],
        [-p1[0]-d1[0]-1./2*a1[0]+p2[0],-p1[1]-d1[1]-1./2*a1[1]+p2[1]]];
        return BP;
    }

    function hermiteCubics(p1,d1,p2,d2){
        //var B=
    }

    function bezierCubics(p1,p2,p3,p4) {
        var B=[[1,0,0,0],[-3,3,0,0],[3,-6,3,0],[-1,3,-3,1]];
        var BP=[[p1[0],p1[1]],[-3*p1[0]+3*p2[0],-3*p1[1]+3*p2[1]],[3*p1[0]-6*p2[0]+3*p3[0],3*p1[1]-6*p2[1]+3*p3[1]],
        [-p1[0]+3*p2[0]-3*p3[0]+p4[0],-p1[0]+3*p2[0]-3*p3[0]+p4[0]]];
        return BP;
    }
    function calcCubics(BP, t) {
        var tx=BP[0][0]+BP[1][0]*t+BP[2][0]*Math.pow(t,2)+BP[3][0]*Math.pow(t,3);
        var ty=BP[0][1]+BP[1][1]*t+BP[2][1]*Math.pow(t,2)+BP[3][1]*Math.pow(t,3);
        return [tx,ty];
    }
    //basis is uB for each cubics type; P is the set of points (4x2 matrix); t is the parameter
    //It returns the final coordinate on the cubics given a certain parameter
    function Cubic(basis,P,t){
    	    var b = basis(t);
    	    var result=vec2.create();
    	    vec2.scale(result,P[0],b[0]);
    	    vec2.scaleAndAdd(result,result,P[1],b[1]);
    	    vec2.scaleAndAdd(result,result,P[2],b[2]);
    	    vec2.scaleAndAdd(result,result,P[3],b[3]);
    	    return result;
    	}

    //uB for Bspline
    var Bspline = function(t) {
    	    return [
    		(1./6.)*(-t*t*t+3*t*t-3*t+1),
    		(1./6.)*(3*t*t*t-6*t*t+4),
    		(1./6.)*(-3*t*t*t+3*t*t+3*t+1),
    		(1./6.)*t*t*t
    	    ];
    	}
    //uB for Bezer
    var Bezier = function(t){
            return [
            1-3*t+3*t*t-t*t*t,
            3*t-8*t*t+3*t*t*t,
            3*t*t-3*t*t*t,
            t*t*t
            ];
    }
    //uB for Natural Cubics
    var Natural = function(t) {
            return [
            1-t*t*t,
            t-t*t*t,
            1./2*t*t-1./2*t*t*t,
            t*t*t
            ];

    }
    //t_begin is the starting point parameter, intervals is the # of segments to partition the cubics,
    //C is the function passed to calculate the coordinate at a certain point on the cubics, Tx is the
    //overall translation of the whole curve
    function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
    	    context.strokeStyle=color;
    	    context.beginPath();
            moveToTx(C(t_begin),Tx);
            for(var i=1;i<=intervals;i++){
    		var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
    		lineToTx(C(t),Tx);
            }
            context.stroke();
    }
    var P0 = [p0,d0,a0,p2];
    var C0 = function(t_) {return Cubic(Natural,P0,t_);};

    function drawPath(tStart, tEnd, Tx) { //Tx is a 2D vector
        context.strokeStyle='red';
        context.beginPath();
        moveToTx([70,395],Tx);
        for (var t_ =0; t_< 100; t_++){
            var naturalCubicsBP=naturalCubics(p0,d0,a0,p1);
            var cur = calcCubics(naturalCubicsBP,t_/100.*(tEnd-tStart)+tStart);
            lineToTx(cur, Tx);
        }
        context.closePath();
        context.stroke();
    }
    function moveAlongMouse(x, y){
        if (x>50 && x<90 && y<395 && y>330) {
           var key=[x,y];
//           function naturalCubics1 (x,y,t) {
//                return [70+(x-70)*Math.pow(t,3), 395-50*t+(y-345)*Math.pow(t,3)];
           var BP1=naturalCubics(p0,d0,a0,key);


           while (t < 300) { //TODO:Change it to animation
                //canvas.width=canvas.width;
                draw();
                if (!(currPos[0]>50 && currPos[0]<90 && currPos[1]<=395 && currPos[1]>330)) break;
                if (Math.abs(currPos[0]-keyx)<1 && Math.abs(currPos[1]-keyy)<1) break;

                currPos=calcCubics(BP1,t/100);
                var Tx=returnTx(currPos, 0); //TODO: change the angle
                drawRed(Tx);
                t++;
                //window.requestAnimationFrame(moveMouse);
           }
        }
    }
//    function mouseup(e) {
//        t=0;
//        currPos=[keyx,keyy];
//    }
    function draw() {
        drawMaze();
        blackTank();
        redTank();
        drawTarget();
        //drawPath(0,50, [0,0]); //TODO:
        drawTrajectory(0.0,1.0,100,C0,[-100,-100],"red");

    }
    draw();
//    window.addEventListener('mousedown', mousedown);
//    window.addEventListener('mouseup',mouseup);
}
window.onload=setup;