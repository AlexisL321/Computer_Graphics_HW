function setup(){
    var canvas = document.getElementById('MyCanvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('object');
    var buttonShow=document.getElementById('show');
    var buttonChange=document.getElementById('change');
    slider.value=0;
    function moveToTx(loc,Tx)
    {var loc1=vec2.create();
    vec2.transformMat3(loc1,loc1,loc);
//    var Tx1=mat3.create();
//         mat3.translate(Tx1,Tx1,Tx);
    var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);
    }

    function lineToTx(loc,Tx){var loc1=vec2.create();
     vec2.transformMat3(loc1,loc1,loc);
//     var Tx1=mat3.create();
//     mat3.translate(Tx1,Tx1,Tx);
    var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);
    }

    function drawVerticalBar(Tx) {
            context.fillStyle="orange";
            context.beginPath();
            moveToTx([0,0],Tx);
            lineToTx([20,0],Tx);
            lineToTx([20,200],Tx);
            lineToTx([0,200],Tx);
            lineToTx([0,0],Tx);
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
            lineToTx([0,0],Tx);
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

        function Bezier(t){
                return [
                1-3*t+3*t*t-t*t*t,
                3*t-6*t*t+3*Math.pow(t,3),
                3*t*t-3*t*t*t,
                t*t*t
                ];
        }

        function Bspline(t){
                return [
                (1./6.)*(-t*t*t+3*t*t-3*t+1),
                (1./6.)*(3*t*t*t-6*t*t+4),
                (1./6.)*(-3*t*t*t+3*t*t+3*t+1),
                (1./6.)*t*t*t
                ];
        }
        function drawRed(Tx) {
                context.fillStyle="red";context.beginPath();
                moveToTx([0,0],Tx);
                lineToTx([0,-10],Tx);
                lineToTx([5,-15], Tx);
                lineToTx([10,-10],Tx);
                lineToTx([10,0],Tx);
                context.closePath();context.fill();}

        function redTank(){
        var Tx=mat3.create();
        mat3.translate(Tx,Tx,[65, 395]);
        //vec3.transformMat4(Tx, Tx, [395, 65]);
        //var Tx=[395,65];
        drawRed(Tx);
        }
        var Hermite = function(t) {
        	    return [
        		2*t*t*t-3*t*t+1,
        		t*t*t-2*t*t+t,
        		-2*t*t*t+3*t*t,
        		t*t*t-t*t
        	    ];
        	}

        function drawPath(start,end,interval,curve,Tx,color){
            //context=cameraContext;
            context.strokeStyle=color;
            context.beginPath();
            moveToTx(curve(start),Tx);
            for (var i=5; i<=interval; i=i+10) {
                var t=start+i/interval*(end-start);
                moveToTx(curve(start+(i-5)/interval*(end-start)),Tx);
                lineToTx(curve(t),Tx);
            }
            //context.closePath();
            context.stroke();

        }
        function drawPath2(start,end,interval,curve,Tx,color){
                    //context=cameraContext;
                    context.strokeStyle=color;
                    context.beginPath();
                    moveToTx(curve(start),Tx);
                    for (var i=0; i<=interval; i++) {
                        var t=start+i/interval*(end-start);
                        //moveToTx(curve(start+(i-5)/interval*(end-start)),Tx);
                        lineToTx(curve(t),Tx);
                    }
                    //context.closePath();
                    context.stroke();

                }
        var p0=[70,395]; var d0=[-10,-80]; var a0=[0,0];
        var p1=[70, 320]; var d1=[10,-10];
        //var m11=[100, 320];
        var p2=[260, 330]; var d2=[10,-10];
        var p3=[270, 250]; var d3=[-10,-50];
        var p4=[193, 230]; var d4=[-10,50];
        var p5=[195,160]; var d5=[50,-10];
        var p6=[285, 150]; var d6=[325,160];
        var p7=[385, 150]; var d7=[335,160];

    var m0=p0;
        var m1=[50,300]; var m2=[240,300];
        var m3=[260,340]; var m4=[300,300]; var m5=[300,260];
        var m6=[250,240]; var m7=[230,260]; var m8=[200,260];
        var m9=[140,280]; var m10=[140,220]; var m11=[130,230];
        var m12=[120,200];var m13=[100,140]; var m14=[40,145];
        var m15=[10,100];

var P0=[p0,d0,p1,d1]; var P1=[p1,d1,p2,d2]; var P2=[p2,d2,p3,d3]; var P3=[p3,d3,p4,d4];var P4=[p4,d4,p5,d5];
var P5=[p5,d5,p6,d6];var P6=[p6,d6,d7,p7];

var M0=[m0,m1,m2,m3];var M1=[m3,m4,m5,m6];var M2=[m6,m7,m8,m9];var M3=[m9,m10,m11,m12];var M4=[m12,m13,m14,m15];

var B0=function(t){return cubicCoordinate(Bezier, M0,t);};
    var B1=function(t){return cubicCoordinate(Bezier, M1,t);};
    var B2=function(t){return cubicCoordinate(Bezier, M2,t);};
    var B3=function(t){return cubicCoordinate(Bezier, M3,t);};
    var B4=function(t){return cubicCoordinate(Bezier, M4,t);};
var B01=function(t){return cubicCoordinate(derivativeBezier, M0,t);};
var B11=function(t){return cubicCoordinate(derivativeBezier, M1,t);};
var B21=function(t){return cubicCoordinate(derivativeBezier, M2,t);};
var B31=function(t){return cubicCoordinate(derivativeBezier, M3,t);};
var B41=function(t){return cubicCoordinate(derivativeBezier, M4,t);};



function Bezier(t){
        return [
        1-3*t+3*t*t-t*t*t,
        3*t-6*t*t+3*Math.pow(t,3),
        3*t*t-3*t*t*t,
        t*t*t
        ];
    }
    var HermiteDerivative = function(t) {
            return [
            6*t*t-6*t,
            3*t*t-4*t+1,
            -6*t*t+6*t,
            3*t*t-2*t
            ];
        }
        function derivativeBezier(t){
                return [-3+6*t-3*t*t,3-12*t+9*t*t,6*t-9*t*t,-3*t*t];
            }
    var C0=function(t){return cubicCoordinate(Hermite, P0,t);};
    var C1=function(t){return cubicCoordinate(Hermite, P1,t);};
    var C2=function(t){return cubicCoordinate(Hermite, P2,t);};
    var C3=function(t){return cubicCoordinate(Hermite, P3,t);};
    var C4=function(t){return cubicCoordinate(Hermite, P4,t);};
    var C5=function(t){return cubicCoordinate(Hermite, P5,t);};
    var C6=function(t){return cubicCoordinate(Bezier, P6,t);};
    var C01=function(t){return cubicCoordinate(HermiteDerivative, P0,t);};
        var C11=function(t){return cubicCoordinate(HermiteDerivative, P1,t);};
        var C21=function(t){return cubicCoordinate(HermiteDerivative, P2,t);};
        var C31=function(t){return cubicCoordinate(HermiteDerivative, P3,t);};
        var C41=function(t){return cubicCoordinate(HermiteDerivative, P4,t);};
        var C51=function(t){return cubicCoordinate(HermiteDerivative, P5,t);};
        var C61=function(t){return cubicCoordinate(derivativeBezier, P6,t);};
function cubicCoordinate(cubicFunction,P,t) {
    //P is point set
    var palt1=vec2.fromValues(P[0][0],P[0][1]);
    //console.log(palt1);
    var palt2=vec2.fromValues(P[1][0],P[1][1]);
    var palt3=vec2.fromValues(P[2][0],P[2][1]);
    var palt4=vec2.fromValues(P[3][0],P[3][1]);
    var basis=cubicFunction(t);
    //console.log(basis);
    var res=vec2.create();
    vec2.scale(res,palt1,basis[0]);
    //console.log(res);
    vec2.scaleAndAdd(res,res,palt2,basis[1]);
    //console.log(res);
    vec2.scaleAndAdd(res,res,palt3,basis[2]);
    vec2.scaleAndAdd(res,res,palt4,basis[3]);
   // console.log(res);
    return [res[0],res[1]];
    }
function drawBezierPath(t) {
    if (t<14) {
                        var u=t/14.;
                        return B0(u);
                    }
                    else if (t<28){
                        var u=(t-14)/14.;
                        return B1(u);
                    }
                    else if (t<42){
                        var u=(t-28)/14.;
                        return B2(u);
                    }
                    else if(t<56){
                    var u=(t-42)/14.;
                    return B3(u);}
                    else if (t<70){
                        var u=(t-56)/14.;
                        return B4(u);
                    }
}

function drawBezierOrient(t) {
    if (t<14) {
                        var u=t/14.;
                        return B01(u);
                    }
                    else if (t<28){
                        var u=(t-14)/14.;
                        return B11(u);
                    }
                    else if (t<42){
                        var u=(t-28)/14.;
                        return B21(u);
                    }
                    else if(t<56){
                    var u=(t-42)/14.;
                    return B31(u);}
                    else if (t<70){
                        var u=(t-56)/14.;
                        return B41(u);
                    }
}
function wholePath(t){
    if (t<10) {
                    var u=t/10.;
                    return C0(u);
                }
                else if (t<20){
                    var u=(t-10)/10.;
                    return C1(u);
                }
                else if (t<30){
                    var u=(t-20)/10.;
                    return C2(u);
                }
                else if(t<40){
                var u=(t-30)/10.;
                return C3(u);}
                else if (t<50){
                    var u=(t-40)/10.;
                    return C4(u);
                }else if (t<60){
                var u=(t-50)/10.;
                return C5(u);
                }
                else if (t<70){
                var u = (t-60)/10.;
                return C6(u);}
}
function wholePathDerivative(t){
    if (t<10) {
                    var u=t/10.;
                    return C01(u);
                }
                else if (t<20){
                    var u=(t-10)/10.;
                    return C11(u);
                }
                else if (t<30){
                    var u=(t-20)/10.;
                    return C21(u);
                }
                else if(t<40){
                var u=(t-30)/10.;
                return C31(u);}
                else if (t<50){
                    var u=(t-40)/10.;
                    return C41(u);
                }else if (t<60){
                var u=(t-50)/10.;
                return C51(u);
                }
                else if (t<70){
                var u = (t-60)/10.;
                return C61(u);}
}

function drawwholePath(){
var Tx=mat3.create();
mat3.translate(Tx,Tx,[0,0]);
if (choosePath==0) {
drawPath(0,1,100, C0,Tx,"red");
drawPath(0,1,100, C1,Tx,"red");
drawPath(0,1,100, C2,Tx,"red");
drawPath(0,1,100, C3,Tx,"red");
drawPath(0,1,100, C4,Tx,"red");
drawPath(0,1,100, C5,Tx,"red");
drawPath(0,1,100, C6,Tx,"red");
}
else if (choosePath==1) {
drawPath(0,1,100, B0,Tx,"red");
drawPath(0,1,100, B1,Tx,"red");
drawPath(0,1,100, B2,Tx,"red");
drawPath(0,1,100, B3,Tx,"red");
drawPath(0,1,100, B4,Tx,"red");

}
}
function draw() {
canvas.width=canvas.width;
        choosePath=0;
        drawMaze();
        //blackTank();
        redTank();
        //drawTarget();
        if (choosePath==0) {drawTarget();}
        else if (choosePath==1) {
        context.fillStyle='yellow';
                        context.beginPath();
                        context.arc(10, 100, 7,0, 2*Math.PI);
                        context.closePath();
                        context.fill();
        }
         //TODO:

    }
    draw();
    function moveObject(){

    canvas.width=canvas.width;
    var t=slider.value;
    drawMaze();
    if (choosePath==0) {
    drawTarget();
    var objectCoordinate=wholePath(t);
    var objectOrient=wholePathDerivative(t);
    var angle=Math.atan2(objectOrient[1],objectOrient[0]);

    var Tx=mat3.create();
    mat3.translate(Tx,Tx,objectCoordinate);
    mat3.rotate(Tx,Tx,angle+Math.PI/2.);
    console.log(angle/Math.PI*180);
    drawRed(Tx);
    if (showOrNot==1) drawwholePath();
    }
    else if (choosePath==1){
    context.fillStyle='yellow';
                            context.beginPath();
                            context.arc(10, 100, 7,0, 2*Math.PI);
                            context.closePath();
                            context.fill();
    var objectCoordinate=drawBezierPath(t);
    var objectOrient=drawBezierOrient(t);
        var angle=Math.atan2(objectOrient[1],objectOrient[0]);

    var Tx=mat3.create();
        mat3.translate(Tx,Tx,objectCoordinate);
        mat3.rotate(Tx,Tx,angle+Math.PI/2.);
        drawRed(Tx);
            if (showOrNot==1) drawwholePath();
    }
    }
    var showOrNot=0;
    function showButton(){

        if (showOrNot==0) {showOrNot=1;
        drawwholePath();
        }
        else showOrNot=0;
    }

    var choosePath=0;
    function changePath(){
    canvas.width=canvas.width;
    //draw();
    drawMaze();
    redTank();
    slider.value=0;
    showOrNot=0;
    //choosePath=Math.floor(Math.random()*2);
    if (choosePath==0) {choosePath=1;
    context.fillStyle='yellow';
                                context.beginPath();
                                context.arc(10, 100, 7,0, 2*Math.PI);
                                context.closePath();
                                context.fill();}
    else if(choosePath==1) {choosePath=0; drawTarget();}
    }
slider.addEventListener('input',moveObject);
buttonShow.addEventListener('click',showButton);
buttonChange.addEventListener('click',changePath);

}
window.onload=setup;