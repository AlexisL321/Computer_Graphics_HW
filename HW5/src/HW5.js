function setup() {
    var observerCanvas=document.getElementById('observer');
    var cameraCanvas=document.getElementById('camera');
    var observerContext=observerCanvas.getContext('2d');
    var cameraContext=cameraCanvas.getContext('2d');
    var slider1= document.getElementById('slider1');
    var button = document.getElementById('start');
    slider1.value = 0;
        var r=100;
var t=0;
function moveToTx(loc,Tx)
    {var loc1=vec3.fromValues(loc[0],loc[1],loc[2]);
    //var Tx1=mat3.create();
    var res=vec3.create(); vec3.transformMat4(res,loc1,Tx); context.moveTo(res[0],res[1]);}

    function lineToTx(loc,Tx)
    {var loc1=vec3.fromValues(loc[0],loc[1],loc[2]);
    var res=vec3.create(); vec3.transformMat4(res,loc1,Tx); context.lineTo(res[0],res[1]);}
    var points = new Array();

    function drawCamera(color,TxU,scale) {
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx,Tx,[scale,scale,scale]);
            context.beginPath();
    	    context.strokeStyle = color;
            // Twelve edges of a cropped pyramid
            moveToTx([-3,-3,-2],Tx);lineToTx([3,-3,-2],Tx);
            lineToTx([3,3,-2],Tx);lineToTx([-3,3,-2],Tx);
            moveToTx([3,-3,-2],Tx);lineToTx([2,-2,0],Tx);
            lineToTx([2,2,0],Tx);lineToTx([3,3,-2],Tx);
            moveToTx([2,-2,0],Tx);lineToTx([-2,-2,0],Tx);
            lineToTx([-2,2,0],Tx);lineToTx([2,2,0],Tx);
            moveToTx([-2,-2,0],Tx);lineToTx([-3,-3,-2],Tx);
            lineToTx([-3,3,-2],Tx);lineToTx([-2,2,0],Tx);
            context.stroke();
        }
    function draw3DAxes(color,TxU,scale) {
                var Tx = mat4.clone(TxU);
                mat4.scale(Tx,Tx,[scale,scale,scale]);

                context.strokeStyle=color;
        	    context.beginPath();
        	    // Axes
        	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
                moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
        	    // Arrowheads
        	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
        	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
              	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
        	    // X-label
        	    moveToTx([1.3,-.05,0],Tx);lineToTx([1.4,.05,0],Tx);
        	    moveToTx([1.3,.05,0],Tx);lineToTx([1.4,-.05,0],Tx);
                // Y-label
                moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.35,0],Tx);lineToTx([.05,1.4,0],Tx);
                moveToTx([0,1.35,0],Tx);lineToTx([0,1.28,0],Tx);
        	    // Z-label
        	    moveToTx([-.05,0,1.3],Tx);
        	    lineToTx([.05,0,1.3],Tx);
        	    lineToTx([-.05,0,1.4],Tx);
        	    lineToTx([.05,0,1.4],Tx);

        	    context.stroke();
        	}
    function drawUVWAxes(color,TxU,scale) {
                    var Tx = mat4.clone(TxU);
                    mat4.scale(Tx,Tx,[scale,scale,scale]);

                    context.strokeStyle=color;
            	    context.beginPath();
            	    // Axes
            	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
                    moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
            	    // Arrowheads
            	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
            	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
                  	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
            	    // U-label
                    moveToTx([1.3,.05,0],Tx);lineToTx([1.3,-.035,0],Tx);lineToTx([1.35,-.05,0],Tx);
                    lineToTx([1.4,-.035,0],Tx);lineToTx([1.4,.05,0],Tx);
                    // V-label
                    moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.3,0],Tx);lineToTx([.05,1.4,0],Tx);
            	    // W-label
            	    moveToTx([-.1,0,1.3],Tx);lineToTx([-.05,0,1.4],Tx);lineToTx([-0,0,1.3],Tx);
            	    lineToTx([.05,0,1.4],Tx);lineToTx([.1,0,1.3],Tx);

            	    context.stroke();
            	}
    function draw2DAxes(color,Tx) {
    	    context.strokeStyle=color;
    	    context.beginPath();
    	    // Axes
    	    moveToTx([120,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,120,0],Tx);
    	    // Arrowheads
    	    moveToTx([110,5,0],Tx);lineToTx([120,0,0],Tx);lineToTx([110,-5,0],Tx);
    	    moveToTx([5,110,0],Tx);lineToTx([0,120,0],Tx);lineToTx([-5,110,0],Tx);
    	    // X-label
    	    moveToTx([130,0,0],Tx);lineToTx([140,10,0],Tx);
    	    moveToTx([130,10,0],Tx);lineToTx([140,0,0],Tx);
            // Y-label
            moveToTx([0,128,0],Tx);lineToTx([5,133,0],Tx);lineToTx([10,128,0],Tx);
            moveToTx([5,133,0],Tx);lineToTx([5,140,0],Tx);
    	    context.stroke();
    	}
    function drawUpVector(color,vecUp,Tx) {
    	    context.strokeStyle=color;
    	    context.beginPath();
    	    // A single line segment in the "up" direction
    	    moveToTx([0,0,0],Tx);
            lineToTx(vecUp,Tx);
    	    context.stroke();
        }
        var CameraCurve = function(angle) {
                var distance = 120.0;
                var eye = vec3.create();
                eye[0] = distance*Math.sin(angle);
                eye[1] = 50;
                eye[2] = distance*Math.cos(angle);
                return [eye[0],eye[1],eye[2]];
            }
    function sphere() {
    //var points= new Array();
    for (var i = 0; i < 19; i++){
        for (var j = 0; j < 36; j++){
            var theta=Math.PI/18*i;
            if (i%2 ==0) {
                var alpha=2*Math.PI/36*j;
            }
            else {
                var alpha =2* Math.PI/36*j - Math.PI/72;
            }
            var z = r* Math.cos(theta);
            var x = r*Math.sin(theta)*Math.cos(alpha);
            var y = r*Math.sin(theta)*Math.sin(alpha);
            var point=[x,y,z];
            points.push(point);
        }
    }
    }

    function drawSphere(Tx,context){
        sphere();
            var hideOrNot;
            context.strokeStyle='blue';
            for (var i=0; i < 18; i++) {
                for(var j=0; j<36;j++){
                    hideOrNot=hide(i,j,Tx);
                    if(hideOrNot==false){
                    context.beginPath();
                    moveToTx(points.at(i*36+j),Tx);
                    lineToTx(points.at((i+1)*36+j),Tx);
                    lineToTx(points.at(i*36+j+1),Tx);
                    context.closePath();
                    context.stroke();}
                    else {continue;}
                }
            }
        }
        function hide(i,j,Tx){
            var point1=vec3.create();
            vec3.transformMat4(point1,points.at(i*36+j),Tx);
            var point2=vec3.create();
            vec3.transformMat4(point2,points.at(i*36+j+1),Tx);
            var point3=vec3.create();
            vec3.transformMat4(point3,points.at((i+1)*36+j),Tx);
            var x1=point1[0]-point2[0];
            var y1=point1[1]-point2[1];
            var z1=point1[2]-point2[2];
            var x2=point1[0]-point3[0];
            var y2=point1[1]-point3[1];
            var z2=point1[2]-point3[2];
            var vec1=vec3.fromValues(x1,y1,z1);
            var vec2=vec3.fromValues(x2,y2,z2);
            var cross = vec3.create();
            vec3.cross(cross, vec1, vec2);
            if (cross[2]>0){
            return false;}
            return true;
        }

//        function viewAngleChange(){
//        var viewAngle=slider1.value/100.*2*Math.PI;
//        //TODO:
//        draw();
//        }
    // create two lookAt transforms; one for the camera
        // and one for the "external observer"
function draw(){
        observerCanvas.width=observerCanvas.width;
        cameraCanvas.width=cameraCanvas.width;
        // Create Camera (lookAt) transform
        var viewAngle=slider1.value/100.*2*Math.PI;
        var eyeCamera = CameraCurve(viewAngle);
        var targetCamera = vec3.fromValues(0,0,0); // Aim at the origin of the world coords
        var upCamera = vec3.fromValues(0,100,0); // Y-axis of world coords to be vertical
    	var TlookAtCamera = mat4.create();
        mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

        // Create Camera (lookAt) transform
        var eyeObserver = vec3.fromValues(500,300,500);
        var targetObserver = vec3.fromValues(0,50,0); // Observer still looks at origin
        var upObserver = vec3.fromValues(0,1,0); // Y-axis of world coords to be vertical
    	var TlookAtObserver = mat4.create();
        mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

        // Create ViewPort transform (assumed the same for both canvas instances)
        var Tviewport = mat4.create();
    	mat4.fromTranslation(Tviewport,[200,300,0]);  // Move the center of the
                                                      // "lookAt" transform (where
                                                      // the camera points) to the
                                                      // canvas coordinates (200,300)
    	mat4.scale(Tviewport,Tviewport,[100,-100,1]); // Flip the Y-axis,
                                                      // scale everything by 100x
        // make sure you understand these

        context = cameraContext;

        // Create Camera projection transform
        // (orthographic for now)
        var TprojectionCamera = mat4.create();
        mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);
        //mat4.perspective(TprojectionCamera,Math.PI/4,1,-1,1); // Use for perspective teaser!

        // Create Observer projection transform
        // (orthographic for now)
        var TprojectionObserver = mat4.create();
        mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);

        // Create transform t_VP_PROJ_CAM that incorporates
        // Viewport, projection and camera transforms
        var tVP_PROJ_VIEW_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
        mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
        var tVP_PROJ_VIEW_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
        mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);

    	// Create model(ing) transform
        // (from moving object to world)
        var Tmodel = mat4.create();
    	//mat4.fromTranslation(Tmodel,Ccomp(tParam));
//        var tangent = Ccomp_tangent(tParam);
//        var angle = Math.atan2(tangent[1],tangent[0]);
        var angle = Math.PI*2/360 *t;
        t=t+1;
    	mat4.rotateZ(Tmodel,Tmodel,angle);

        // Create transform t_VP_PROJ_VIEW_MOD that incorporates
        // Viewport, projection, camera, and modeling transform
        var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
    	mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
        var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
    	mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
        var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
        mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
    	var TlookFromCamera = mat4.create();
        mat4.invert(TlookFromCamera,TlookAtCamera);
        mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

        // Draw the following in the Camera window

        context = cameraContext;
        //draw2DAxes("black", mat4.create());
    	//draw3DAxes("grey",tVP_PROJ_VIEW_Camera,100.0);
        // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Camera,1.0);
//    	drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Camera,"red");
//        drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Camera,"blue");
//        // draw3DAxes("green", tVP_PROJ_VIEW_MOD_Camera,100.0); // Uncomment to see "model" coords
//        drawObject("green",tVP_PROJ_VIEW_MOD_Camera,100.0);
        drawSphere(tVP_PROJ_VIEW_MOD_Camera,context);
        //drawSphere(tVP_PROJ_VIEW_Camera,context);

        // Draw the following in the Observer window
        context = observerContext;
    	//draw3DAxes("grey",tVP_PROJ_VIEW_Observer,100.0);
        // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Observer,1.0);
//        drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Observer,"red");
//        drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Observer,"blue");
//        drawObject("green",tVP_PROJ_VIEW_MOD1_Observer,100.0);
        drawCamera("purple",tVP_PROJ_VIEW_MOD2_Observer,10.0);
    	//drawUVWAxes("purple",tVP_PROJ_VIEW_MOD2_Observer,100.0);
    	//drawSphere(tVP_PROJ_VIEW_Observer,context);
    	drawSphere(tVP_PROJ_VIEW_MOD1_Observer,context);
    	if (stopRotate==false) animation=requestAnimationFrame(draw);


}
var animation;
var stopRotate=false;
function end(){
if (stopRotate==false){
cancelAnimationFrame(animation);
stopRotate=true;
}
else {requestAnimationFrame(draw);stopRotate=false;}
}
//draw();
requestAnimationFrame(draw);
slider1.addEventListener("input",draw);
button.addEventListener('click',end);
}
window.onload=setup;