function setup(){
    var observerCanvas=document.getElementById('observer');
    var cameraCanvas=document.getElementById('camera');
    var observerContext=observerCanvas.getContext('2d');
    var cameraContext=cameraCanvas.getContext('2d');
    var slider = document.getElementById("slider");
    var slider1=document.getElementById("train");
    slider1.value=0;
    slider.value=0;
    var tparam;
    function draw(){
    cameraCanvas.width=cameraCanvas.width;
        observerCanvas.width=observerCanvas.width;

    var context=cameraContext;
    //Because we are drawing on 2d canvas, we only need coordinate x and y (res[0] and [1])
    function moveToTx(loc,Tx)
    {var loc1=vec3.fromValues(loc[0],loc[1],loc[2]);
    var Tx1=mat3.create();
    //mat4.translate(loc1,loc1,loc);
    //var Tx1=vec3.create();
    //vec3.transformMat4(Tx1,Tx1,Tx);
    var res=vec3.create(); vec3.transformMat4(res,loc1,Tx); context.moveTo(res[0],res[1]);}

    function lineToTx(loc,Tx)
    {var loc1=vec3.fromValues(loc[0],loc[1],loc[2]);
    //mat4.translate(loc1,loc1,loc);
    //var Tx1=vec3.create();
        //vec3.transformMat4(Tx1,Tx1,Tx);
    var res=vec3.create(); vec3.transformMat4(res,loc1,Tx); context.lineTo(res[0],res[1]);}

    function drawTrainBody(Tx){
        //var context = cameraContext;
        context.strokeStyle='orange';
        context.beginPath();
        moveToTx([0,0,5],Tx);
        lineToTx([7.5,0,5],Tx);lineToTx([7.5,15,5],Tx);lineToTx([0,15,5],Tx);lineToTx([0,15,15],Tx);
        lineToTx([0,0,15],Tx);lineToTx([0,0,5],Tx);lineToTx([0,15,5],Tx);
        moveToTx([0,0,15],Tx); lineToTx([7.5,0,15],Tx);lineToTx([7.5,0,5],Tx);
        moveToTx([0,15,15],Tx); lineToTx([7.5,15,15],Tx);lineToTx([7.5,15,5],Tx);
        moveToTx([7.5,15,15],Tx);lineToTx([7.5,0,15],Tx);
        //train head
        moveToTx([3.75, 20, 10], Tx); lineToTx([0,15,5],Tx);
        moveToTx([3.75, 20, 10], Tx); lineToTx([7.5,15,5],Tx);
        moveToTx([3.75, 20, 10], Tx); lineToTx([0,15,15],Tx);
        moveToTx([3.75, 20, 10], Tx); lineToTx([7.5,15,15],Tx);
        context.closePath();
        context.stroke();
    }//TODO:

    var Bezier=function(t){
        return [1-3*t+3*t*t-t*t*t,3*t-6*t*t+3*Math.pow(t,3),3*t*t-3*t*t*t,t*t*t];
    }

    function Bspline(t){
        return [
        (1./6.)*(-t*t*t+3*t*t-3*t+1),
        (1./6.)*(3*t*t*t-6*t*t+4),
        (1./6.)*(-3*t*t*t+3*t*t+3*t+1),
        (1./6.)*t*t*t
        ];
    }

    function cubicCoordinate(cubicFunction,P,t) {
    //P is point set
    var palt1=vec3.fromValues(P[0][0],P[0][1],P[0][2]);
    //console.log(palt1);//palt1 works:1x3 array
    var palt2=vec3.fromValues(P[1][0],P[1][1],P[1][2]);
    var palt3=vec3.fromValues(P[2][0],P[2][1],P[2][2]);
    var palt4=vec3.fromValues(P[3][0],P[3][1],P[3][2]);
    var basis=cubicFunction(t);
    //console.log(basis);//basis works:1x4 array
    var res=vec3.create();
    vec3.scale(res,palt1,basis[0]);
    //console.log(res);
    vec3.scaleAndAdd(res,res,palt2,basis[1]); //TODO:STUPID MISTAKE! only input three paramters before!!!!!!!!!!
    //console.log(res);
    vec3.scaleAndAdd(res,res,palt3,basis[2]);
    vec3.scaleAndAdd(res,res,palt4,basis[3]);
   // console.log(res);
    return [res[0],res[1],res[2]];
    }

    function derivativeBezier(t){
        return [-3+6*t-3*t*t,3-12*t+9*t*t,6*t-9*t*t,-3*t*t];
    }

    function higherOrderBezier(t){//TODO:


    }

    function drawPath(start,end,interval,curve,Tx,color){
        //context=cameraContext;
        context.strokeStyle=color;
        context.beginPath();
        moveToTx(curve(start),Tx);
        for (var i=0; i<=interval; i++) {
            var t=start+i/interval*(end-start);
            lineToTx(curve(t),Tx);
            //console.log(curve(t)); //TODO:
        }
        //context.closePath();
        context.stroke();

    }

    var rt3=Math.sqrt(3);
    var p0=[200,50,0]; //starting point of the Rollercoaster
    var p1=[220,50,10]; var p2=[240,50-7*Math.sqrt(3),10];
    var p3=[250,50+17*Math.sqrt(3),20]; var p4=[260,50+41*Math.sqrt(3),30]; var p5=[
        300+46*rt3,99*rt3+90,40];
    var p6=[200+50*Math.sqrt(3),100,60]; var p7=[100+54*rt3,110-99*rt3,80]; //var p71 = [150+54*rt3, 200-50*rt3, 90];
    //var p72=[];
    var p8=[290, 170,100];
    var p9=[300,150,110];var p10=[310,130,120]; var p11=[460-40*rt3, 140,140];
    var p12=[200+50*Math.sqrt(3),150,160];var p13=[140*rt3 - 60,160,180]; var p14=[260,13*Math.sqrt(3)+150,200];
    var p15=[250, 150+16*Math.sqrt(3),220];var p16=[240,150+19*Math.sqrt(3),220]; var p17=[220,250,200];
    var p18=[200,250,180]; var p19=[180, 250,160]; var p20=[160,150+20*Math.sqrt(3),140];
    var p21=[150,150+16*Math.sqrt(3),110]; var p22=[140,12*Math.sqrt(3)+150,80]; var p23=[50*rt3-66,160,50];
    var p24=[200-50*Math.sqrt(3), 150,40]; var p25=[466-150*rt3,140,30];var p26=[100, 170,30];
    var p27=[100,150,50];var p28=[100, 130,70]; var p29=[-53*rt3+200,110,100];
    var p30=[200-50*Math.sqrt(3),100,130];var p31=[200-47*rt3,
    90,160];var p32=[140,50+53*Math.sqrt(3),140];
    var p33=[150,50+16*Math.sqrt(3),100];var p34=[160,50-21*Math.sqrt(3),60]; var p35=[180,50,-10];



    var P0=[p0,p1,p2,p3];var P3=[p3,p4,p5,p6];var P6=[p6,p7,p8,p9];var P9=[p9,p10,p11,p12];
    var P10=[p10,p11,p12,p13];var P11=[p11,p12,p13,p14];var P12=[p12,p13,p14,p15];var P13=[p13,p14,p15,p16];
    var P14=[p14,p15,p16,p17];var P15=[p15,p16,p17,p18];var P16=[p16,p17,p18,p19];var P17=[p17,p18,p19,p20];
    var P18=[p18,p19,p20,p21];var P19=[p19,p20,p21,p22];var P20=[p20,p21,p22,p23];var P21=[p21,p22,p23,p24];
    var P22=[p22,p23,p24,p25];var P23=[p23,p24,p25,p26];var P24=[p24,p25,p26,p27];var P25=[p25,p26,p27,p28];
    var P26=[p26,p27,p28,p29];var P27=[p27,p28,p29,p30];var P28=[p28,p29,p30,p31];var P29=[p29,p30,p31,p32];
    var P30=[p30,p31,p32,p33];var P31=[p31,p32,p33,p34];var P32=[p32,p33,p34,p35];var P33=[p33,p34,p35,p0];


    var C0=function(t){return cubicCoordinate(Bezier,P0,t);};
    var C0prime=function(t){return cubicCoordinate(derivativeBezier,P0,t);};
    var C3=function(t){return cubicCoordinate(Bezier,P3,t);};
    var C3prime=function(t){return cubicCoordinate(derivativeBezier,P3,t);};
    var C6=function(t){return cubicCoordinate(Bezier,P6,t);};
    var C6prime=function(t){return cubicCoordinate(derivativeBezier,P6,t);};
    var C9=function(t){return cubicCoordinate(Bezier,P9,t);};
    var C9prime=function(t){return cubicCoordinate(derivativeBezier,P9,t);};
    var C12=function(t){return cubicCoordinate(Bezier,P12,t);};
    var C12prime=function(t){return cubicCoordinate(derivativeBezier,P12,t);};
    var C15=function(t){return cubicCoordinate(Bezier,P15,t);};
    var C15prime=function(t){return cubicCoordinate(derivativeBezier,P15,t);};
    var C18=function(t){return cubicCoordinate(Bezier,P18,t);};
    var C18prime=function(t){return cubicCoordinate(derivativeBezier,P18,t);};
    var C21=function(t){return cubicCoordinate(Bezier,P21,t);};
    var C21prime=function(t){return cubicCoordinate(derivativeBezier,P21,t);};
    var C24=function(t){return cubicCoordinate(Bezier,P24,t);};
    var C24prime=function(t){return cubicCoordinate(derivativeBezier,P24,t);};
    var C27=function(t){return cubicCoordinate(Bezier,P27,t);};
    var C27prime=function(t){return cubicCoordinate(derivativeBezier,P27,t);};
    var C30=function(t){return cubicCoordinate(Bezier,P30,t);};
    var C30prime=function(t){return cubicCoordinate(derivativeBezier,P30,t);};
    var C33=function(t){return cubicCoordinate(Bezier,P33,t);};
    var C33prime=function(t){return cubicCoordinate(derivativeBezier,P33,t);};
{
//    var tparam=slider.value*0.02*Math.PI;
//    function cameraCurve(tparam) {
//        var eye = vec3.create();
//        eye[0] = 300*Math.sin(tparam);
//        eye[1] = 300*Math.cos(tparam);
//        eye[2] = 300;
//        return [eye[0],eye[1],eye[2]];
//    }
//    var angle = slider.value*0.02*Math.PI;
//    var eyeCamera = cameraCurve(angle);
//    var targetCamera = vec3.fromValues(0,0,0);
//    var upCamera = vec3.fromValues(0,0,100);
//    var TlookAtCamera = mat4.create();
//    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);
//
//    var eyeObserver = vec3.fromValues(400,400,400);
//    var targetObserver = vec3.fromValues(0,0,100);
//    var upObserver = vec3.fromValues(0,0,1);
//    var TlookAtObserver = mat4.create();
//    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);
//
//    var Tviewpoint = mat4.create();
//    mat4.fromTranslation(Tviewpoint,[200,300,0]);
//    mat4.scale(Tviewpoint,Tviewpoint,[1000,-1,1]);
//
//    context = cameraContext;
//    var TprojectionCamera = mat4.create();
//    mat4.ortho(TprojectionCamera,-100,100,-1,1,-1,1); //TODO
////
//    var TprojectionObserver = mat4.create();
//    mat4.ortho(TprojectionObserver,-420,420,-420,420,-400,400);
////
//    var tVP_PROJ_VIEW_Camera = mat4.create();
//    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewpoint,TprojectionCamera);
//    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
//    var tVP_PROJ_VIEW_Observer = mat4.create();
//    mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewpoint,TprojectionObserver);
//    mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);


//    var Tmodel = mat4.create();
//    mat4.fromTranslation(Tmodel,Ccomp(tParam));
//
//    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
//    mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
//    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
//    mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
//    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
//    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
//    var TlookFromCamera = mat4.create();
//    mat4.invert(TlookFromCamera,TlookAtCamera);
//    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);
}
    function trainPath(t) {
        if (t<10) {
            var u=t/10.;
            return C0(u);
        }
        else if (t<20){
            var u=(t-10)/10.;
            return C3(u);
        }
        else if (t<30){
            var u=(t-20)/10.;
            return C6(u);
        }
        else if(t<40){
        var u=(t-30)/10.;
        return C9(u);}
        else if (t<50){
            var u=(t-40)/10.;
            return C12(u);
        }else if (t<60){
        var u=(t-50)/10.;
        return C15(u);
        }
        else if (t<70){
        var u = (t-60)/10.;
        return C18(u);}
        else if (t<80){
        var u=(t-70)/10.;
        return C21(u);
        }else if (t<90){
        var u = (t-80)/10.;
        return C24(u);
        }else if (t<100){
        var u = (t-90)/10.;
        return C27(u);
        }else if (t<110){
        var u = (t-100)/10.;
        return C30(u);}
        else {
        var u=(t-110)/10.;
        return C33(u);}
    }
    function trainOrient(t){
    if (t<10) {
                var u=t/10.;
                return C0prime(u);
            }
            else if (t<20){
                var u=(t-10)/10.;
                return C3prime(u);
            }
            else if (t<30){
                var u=(t-20)/10.;
                return C6prime(u);
            }
            else if(t<40){
            var u=(t-30)/10.;
            return C9prime(u);}
            else if (t<50){
                var u=(t-40)/10.;
                return C12prime(u);
            }else if (t<60){
            var u=(t-50)/10.;
            return C15prime(u);
            }
            else if (t<70){
            var u = (t-60)/10.;
            return C18prime(u);}
            else if (t<80){
            var u=(t-70)/10.;
            return C21prime(u);
            }else if (t<90){
            var u = (t-80)/10.;
            return C24prime(u);
            }else if (t<100){
            var u = (t-90)/10.;
            return C27prime(u);
            }else if (t<110){
            var u = (t-100)/10.;
            return C30prime(u);}
            else {
            var u=(t-110)/10.;
            return C33prime(u);}

    }
    function drawRollerCoaster(matr){
    var Tx=mat4.create();

        drawPath(0.0,1.0,100,C0,matr,"red");

        //drawPath(0.0,1.0,100,C1,tVP_PROJ_VIEW_Camera,"blue");
        //drawPath(0.0,1.0,100,C2,tVP_PROJ_VIEW_Camera,"red");
        drawPath(0.0,1.0,100,C3,matr,"blue");
//        drawPath(0.0,1.0,100,C4,tVP_PROJ_VIEW_Camera,"red");
//        drawPath(0.0,1.0,100,C5,tVP_PROJ_VIEW_Camera,"blue");
        drawPath(0.0,1.0,100,C6,matr,"orange");
//        drawPath(0.0,1.0,100,C7,tVP_PROJ_VIEW_Camera,"blue");
//        drawPath(0.0,1.0,100,C8,tVP_PROJ_VIEW_Camera,"red");
        drawPath(0.0,1.0,100,C9,matr,"yellow");
//        drawPath(0.0,1.0,100,C10,tVP_PROJ_VIEW_Camera,"red");
//        drawPath(0.0,1.0,100,C11,tVP_PROJ_VIEW_Camera,"blue");
        drawPath(0.0,1.0,100,C12,matr,"green");
//        drawPath(0.0,1.0,100,C13,tVP_PROJ_VIEW_Camera,"blue");
//        drawPath(0.0,1.0,100,C14,tVP_PROJ_VIEW_Camera,"red");
        drawPath(0.0,1.0,100,C15,matr,"brown");
//        drawPath(0.0,1.0,100,C16,tVP_PROJ_VIEW_Camera,"red");
//        drawPath(0.0,1.0,100,C17,tVP_PROJ_VIEW_Camera,"blue");
        drawPath(0.0,1.0,100,C18,matr,"black");
//        drawPath(0.0,1.0,100,C19,tVP_PROJ_VIEW_Camera,"blue");
//        drawPath(0.0,1.0,100,C20,tVP_PROJ_VIEW_Camera,"red");
        drawPath(0.0,1.0,100,C21,matr,"blue");
//        drawPath(0.0,1.0,100,C22,tVP_PROJ_VIEW_Camera,"red");
//        drawPath(0.0,1.0,100,C23,tVP_PROJ_VIEW_Camera,"blue");
        drawPath(0.0,1.0,100,C24,matr,"pink");
//        drawPath(0.0,1.0,100,C25,tVP_PROJ_VIEW_Camera,"blue");
//        drawPath(0.0,1.0,100,C26,tVP_PROJ_VIEW_Camera,"red");
        drawPath(0.0,1.0,100,C27,matr,"silver");
//        drawPath(0.0,1.0,100,C28,tVP_PROJ_VIEW_Camera,"red");
//        drawPath(0.0,1.0,100,C29,tVP_PROJ_VIEW_Camera,"blue");
        drawPath(0.0,1.0,100,C30,matr,"red");
//        drawPath(0.0,1.0,100,C31,tVP_PROJ_VIEW_Camera,"blue");
//        drawPath(0.0,1.0,100,C32,tVP_PROJ_VIEW_Camera,"red");
        drawPath(0.0,1.0,100,C33,matr,"black");
    }


        //context=observerContext;
        tparam=slider.value*Math.PI/10.;
            function cameraCurve(tparam) {
                var eye = vec3.create();
                eye[0] = 500*Math.sin(tparam);
                eye[1] = 500*Math.cos(tparam);
                eye[2] = 100;
                return [eye[0],eye[1],eye[2]];
            }
            var angle = slider.value*0.02*Math.PI;
                var eyeCamera = cameraCurve(angle);
                var targetCamera = vec3.fromValues(0,0,0);
                var upCamera = vec3.fromValues(0,0,1);
                var TlookAtCamera = mat4.create();
                mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

                var eyeObserver = vec3.fromValues(1500,-300,400);
                var targetObserver = vec3.fromValues(0,0,100);
                var upObserver = vec3.fromValues(0,0,1);
                var TlookAtObserver = mat4.create();
                mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

                var Tviewpoint = mat4.create();
                mat4.fromTranslation(Tviewpoint,[300,300,300]);
                mat4.scale(Tviewpoint,Tviewpoint,[-10,-10,-1]);

                context = cameraContext;
                var TprojectionCamera = mat4.create();
                mat4.ortho(TprojectionCamera,-25,15,-15,15,2,-40); //TODO
            //
                var TprojectionObserver = mat4.create();
                mat4.ortho(TprojectionObserver,-22,22,-22,22,2,-20);
            //
                var tVP_PROJ_VIEW_Camera = mat4.create();
                mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewpoint,TprojectionCamera);
                mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);

                var Tmodel = mat4.create();
                var trainCoordinate=vec3.fromValues(trainPath(slider1.value)[0],trainPath(slider1.value)[1],
                trainPath(slider1.value)[2]);
                var norm=Math.sqrt(Math.pow(trainOrient(slider1.value)[0],2)+Math.pow(trainOrient(slider1.value)[1],2)
                +Math.pow(trainOrient(slider1.value)[2],2));
                var trainOrientation=vec3.fromValues(-trainOrient(slider1.value)[0]/norm,
                1-trainOrient(slider1.value)[1]/norm,
                -trainOrient(slider1.value)[2]/norm);

                mat4.fromTranslation(Tmodel,trainCoordinate);
                //mat4.fromTranslation(Tmodel,trainOrientation);

                var angleZ = Math.atan2(trainOrientation[1],trainOrientation[0]);
                mat4.rotateZ(Tmodel,Tmodel,Math.PI/2.-angleZ);
                var angleX=Math.atan2(trainOrientation[2],trainOrientation[1]);
                mat4.rotateX(Tmodel,Tmodel,Math.PI/2.-angleX);
                var angleY=Math.atan2(trainOrientation[0],trainOrientation[2]);
                mat4.rotateY(Tmodel,Tmodel,Math.PI/2.-angleY);


var tVP_PROJ_VIEW_Observer = mat4.create();
                mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewpoint,TprojectionObserver);
                mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);
                var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
                mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
                var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
                mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
//                var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
//                mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
                //var TlookFromCamera = mat4.create();
                //mat4.invert(TlookFromCamera,TlookAtCamera);
                //mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

        drawRollerCoaster(tVP_PROJ_VIEW_Camera);
        drawTrainBody(tVP_PROJ_VIEW_MOD_Camera);
//        context.strokeStyle='black';
//        context.beginPath();
//        //var Tx=mat4.create();
//        //mat4.translate(Tx,Tx,tVP_PROJ_VIEW_Camera);
//        //console.log(TlookAtCamera);
//        moveToTx([0,0,0],tVP_PROJ_VIEW_Camera);
//        lineToTx([100,100,0],tVP_PROJ_VIEW_Camera);
//        lineToTx([0,100,0],tVP_PROJ_VIEW_Camera);lineToTx([0,0,0],tVP_PROJ_VIEW_Camera);
//        context.closePath();
//        context.stroke();
context=observerContext;
//draw camera curve
function drawCameraCurve(){
        context.strokeStyle="pink";
        context.beginPath();
        moveToTx(cameraCurve(0),tVP_PROJ_VIEW_Observer);
        for (var i=0; i<=100; i=i+2) {
            var t=0+i/100.*(2*Math.PI-0);
            moveToTx(cameraCurve(0+(i-1)/100.*(2*Math.PI-0)),tVP_PROJ_VIEW_Observer);
            lineToTx(cameraCurve(t),tVP_PROJ_VIEW_Observer);
        }
        //context.closePath();
        context.stroke();
}
drawCameraCurve();
        drawRollerCoaster(tVP_PROJ_VIEW_Observer);
        var trainBodyPos=mat4.create();
        var j;

        observerCanvas.width=observerCanvas.width;

            drawRollerCoaster(tVP_PROJ_VIEW_Observer);
            drawCameraCurve();
//            mat4.translate(trainBodyPos,trainBodyPos, trainPath(slider1.value));
//            mat4.multiply(trainBodyPos, tVP_PROJ_VIEW_Observer,trainBodyPos);
            drawTrainBody(tVP_PROJ_VIEW_MOD1_Observer);
            j=j+1;
        //window.requestAnimationFrame(animateTrain);

        //window.requestAnimationFrame(animateTrain);
        //console.log(tVP_PROJ_VIEW_MOD1_Observer);
        //drawRollerCoaster();

    }

    draw();

slider.addEventListener('input',draw);
slider1.addEventListener('input',draw);
}
window.onload=setup;