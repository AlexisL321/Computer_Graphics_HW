function start() {
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    var vertexSource = document.getElementById("vertexShader").text;
    var fragmentSource = document.getElementById("fragmentShader").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(vertexShader)); return null; }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(fragmentShader)); return null; }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);

    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);

    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);

    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);

    //shaderProgram.texcoordAttribute = gl.getAttribLocation(shaderProgram, "vTexCoord");
    //gl.enableVertexAttribArray(shaderProgram.texcoordAttribute);

    // this gives us access to the matrix uniform
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram,"uMV");
    shaderProgram.MVNormalmatrix = gl.getUniformLocation(shaderProgram,"uMVn");
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");

    // Data ...
var points= new Array();
var r=15;
function sphere() {
    //var points= new Array();
    for (var i = 0; i < 19; i++){
        for (var j = 0; j < 36; j++){
            var theta=2*Math.PI/18*i-Math.PI/2;
            if (i%2 ==0) {
                var alpha=2*Math.PI/36*j;
            }
            else {
                var alpha =2* Math.PI/36*j - Math.PI/36;
            }
            var z = r* Math.cos(theta);
            var x = r*Math.sin(theta)*Math.cos(alpha);
            var y = r*Math.sin(theta)*Math.sin(alpha);
            var point=[x,y,z];
            console.log(z,theta/Math.PI*180);
            points.push(point);
        }
    }
    }
    sphere();
        //console.log(points);

    function calcCross1(i,j){
    var x1=points.at((i*36+(j-1)%36))[0]-points.at((i*36+j))[0];
    var y1=-(points.at((i*36+j))[1]-points.at((i*36+(j-1)%36))[1]);
    var z1=-(points.at((i*36+j))[2]-points.at((i*36+(j-1)%36))[2]);
    var x2=points.at((i*36+j))[0]-points.at(((i-1)*36+(j-1)%36))[0];
    var y2=points.at((i*36+j))[1]-points.at(((i-1)*36+(j-1)%36))[1];
    var z2=points.at((i*36+j))[2]-points.at(((i-1)*36+(j-1)%36))[2];
    var vec1=vec3.fromValues(x1,y1,z1);
    var vec2=vec3.fromValues(-x2,-y2,-z2);
    var cross = vec3.create();
    vec3.cross(cross, vec2, vec1);
    return cross;
    }
    function calcCross2(i,j){
    var x1=points.at((i*36+j))[0]-points.at(((i-1)*36+(j)%36))[0];
    var y1=points.at((i*36+j))[1]-points.at(((i-1)*36+(j)%36))[1];
    var z1=points.at((i*36+j))[2]-points.at(((i-1)*36+(j)%36))[2];
    var x2=points.at((i*36+j))[0]-points.at(((i-1)*36+(j-1)%36))[0];
    var y2=points.at((i*36+j))[1]-points.at(((i-1)*36+(j-1)%36))[1];
    var z2=points.at((i*36+j))[2]-points.at(((i-1)*36+(j-1)%36))[2];
    var vec1=vec3.fromValues(-x1,-y1,-z1);
    var vec2=vec3.fromValues(-x2,-y2,-z2);
    var cross = vec3.create();
    vec3.cross(cross, vec1, vec2);
    return cross;
    }
    function calcCross3(i,j){
    var x1=points.at((i*36+j))[0]-points.at(((i-1)*36+(j)%36))[0];
        var y1=points.at((i*36+j))[1]-points.at(((i-1)*36+(j)%36))[1];
        var z1=points.at((i*36+j))[2]-points.at(((i-1)*36+(j)%36))[2];
        var x2=points.at((i*36+j))[0]-points.at(((i)*36+(j+1)%36))[0];
        var y2=points.at((i*36+j))[1]-points.at(((i)*36+(j+1)%36))[1];
        var z2=points.at((i*36+j))[2]-points.at(((i)*36+(j+1)%36))[2];
        var vec1=vec3.fromValues(-x1,-y1,-z1);
        var vec2=vec3.fromValues(-x2,-y2,-z2);
        var cross = vec3.create();
        vec3.cross(cross, vec2, vec1);
        return cross;
    }
    function calcCross4(i,j){
    //console.log((i));
    var x1=points.at((i*36+j))[0]-points.at(((i+1)*36+(j)%36))[0];
        var y1=points.at((i*36+j))[1]-points.at(((i+1)*36+(j)%36))[1];
        var z1=points.at((i*36+j))[2]-points.at(((i+1)*36+(j)%36))[2];
        var x2=points.at((i*36+j))[0]-points.at(((i)*36+(j-1)%36))[0];
        var y2=points.at((i*36+j))[1]-points.at(((i)*36+(j-1)%36))[1];
        var z2=points.at((i*36+j))[2]-points.at(((i)*36+(j-1)%36))[2];
        var vec1=vec3.fromValues(-x1,-y1,-z1);
        var vec2=vec3.fromValues(-x2,-y2,-z2);
        var cross = vec3.create();
        vec3.cross(cross, vec2, vec1);
        return cross;
    }
    function calcCross5(i,j){
    var x1=points.at((i*36+j))[0]-points.at(((i+1)*36+(j)%36))[0];
        var y1=points.at((i*36+j))[1]-points.at(((i+1)*36+(j)%36))[1];
        var z1=points.at((i*36+j))[2]-points.at(((i+1)*36+(j)%36))[2];
        var x2=points.at((i*36+j))[0]-points.at(((i+1)*36+(j+1)%36))[0];
        var y2=points.at((i*36+j))[1]-points.at(((i+1)*36+(j+1)%36))[1];
        var z2=points.at((i*36+j))[2]-points.at(((i+1)*36+(j+1)%36))[2];
        var vec1=vec3.fromValues(-x1,-y1,-z1);
        var vec2=vec3.fromValues(-x2,-y2,-z2);
        var cross = vec3.create();
        vec3.cross(cross, vec1, vec2);
        return cross;
    }
    function calcCross6(i,j){
                var x1=points.at((i*36+j))[0]-points.at((i*36+(j+1)%36))[0];
                var y1=points.at((i*36+j))[1]-points.at((i*36+(j+1)%36))[1];
                var z1=points.at((i*36+j))[2]-points.at((i*36+(j+1)%36))[2];
                var x2=points.at((i*36+j))[0]-points.at(((i+1)*36+(j+1)%36))[0];
                var y2=points.at((i*36+j))[1]-points.at(((i+1)*36+(j+1)%36))[1];
                var z2=points.at((i*36+j))[2]-points.at(((i+1)*36+(j+1)%36))[2];
                var vec1=vec3.fromValues(-x1,-y1,-z1);
                var vec2=vec3.fromValues(-x2,-y2,-z2);
                var cross = vec3.create();
                vec3.cross(cross, vec2, vec1);
                return cross;
            }
            var vertexNormals = new Float32Array(12312);
            fillNormal();
function fillNormal(){
        //sphere();
        var counter=0;
            for (var i=0; i < 19; i++) {
                for(var j=0; j<36;j++){
                if (i<18 && 0<i){
                var cross1=calcCross1(i,j);
                var cross2=calcCross2(i,j);
                var cross3=calcCross3(i,j);
                var cross4=calcCross4(i,j);
                var cross5=calcCross5(i,j);
                    var cross6=calcCross6(i,j);
                    //console.log(cross1,cross2,cross3,cross4,cross5,cross6);
                    for (var k=0;k<3;k++){
                    vertexNormals.fill(cross1[k],counter);
                                        counter++;

                    }
                    for (var k=0;k<3;k++){
                                        vertexNormals.fill(cross2[k],counter);
                                                            counter++;
                                        }
            for (var k=0;k<3;k++){
                                vertexNormals.fill(cross3[k],counter);
                                                    counter++;
                                }
                    for (var k=0;k<3;k++){
                    vertexNormals.fill(cross4[k],counter);
                                        counter++;
                    }
                    for (var k=0;k<3;k++){
                                        vertexNormals.fill(cross5[k],counter);
                                                            counter++;
                                        }
            for (var k=0;k<3;k++){
                                vertexNormals.fill(cross6[k],counter);
                                                    counter++;
                                }
                    }
                    else if(i==18){
                    for (var k=0;k<6;k++){
                    vertexNormals.fill(0,counter);
                    counter++;
                    vertexNormals.fill(0,counter);
                    counter++;
                    vertexNormals.fill(-1,counter);
                    counter++;
                    }
                    }
                    else{
                    for (var k=0;k<6;k++){
                    vertexNormals.fill(0,counter);
                    counter++;
                    vertexNormals.fill(0,counter);
                    counter++;
                    vertexNormals.fill(1,counter);
                    counter++;
                    }}
                    }
                }
            }console.log(vertexNormals);

    var vertexPos=new Float32Array(12312);
    fillVertex();
        //console.log(points.length);

    function fillVertex(){
    //sphere();
    var counter=0;
        for (var i =0; i<points.length; i ++) {
        for (var k=0; k<6;k++){
        for (var j=0; j<3;j++){
        //console.log(points.length);
        vertexPos.fill(points.at(i)[j],counter);
        counter++;
        //console.log(points.at(i)[j]);
        }}}//console.log(vertexPos);//console.log(points);
        }
//    var vertexPos = new Float32Array(
//        [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,
//           1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,
//           1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,
//          -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,
//          -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,
//           1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1 ]);

//    var vertexNormals = new Float32Array(
//        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
//           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
//           0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
//          -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
//           0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,
//           0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1  ]);
var vertexColors=new Float32Array(12312);
fillColor();
function fillColor(){
        //sphere();
        var counter=0;
            for (var i=0; i < 19; i++) {
                for(var j=0; j<36;j++){
                    if (i%2==0){
                    //Yellow
                    vertexColors.fill(1,counter);
                    counter++;
                    vertexColors.fill(1,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                    //Red
                    vertexColors.fill(1,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                   //Yellow
                   vertexColors.fill(1,counter);
                   counter++;
                   vertexColors.fill(1,counter);
                   counter++;
                   vertexColors.fill(0,counter);
                   counter++;
                    for (var k=0;k<3;k++){
                    vertexColors.fill(0,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                    vertexColors.fill(1,counter);
                    counter++;
                    }
                    }
                    else{
                    for (var k=0;k<3;k++){
                    vertexColors.fill(0,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                    vertexColors.fill(1,counter);
                    counter++;
                    }

                    //Red
                    vertexColors.fill(1,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                    //Yellow
                   vertexColors.fill(1,counter);
                   counter++;
                   vertexColors.fill(1,counter);
                   counter++;
                   vertexColors.fill(0,counter);
                   counter++;
                    //Red
                    vertexColors.fill(1,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                    vertexColors.fill(0,counter);
                    counter++;
                    }

                    }
                }
                //console.log(vertexColors);
            }

//    var vertexColors = new Float32Array(
//        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
//           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
//           0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
//           1, 1, 0,   1, 1, 0,   1, 1, 0,   1, 1, 0,
//           1, 0, 1,   1, 0, 1,   1, 0, 1,   1, 0, 1,
//           0, 1, 1,   0, 1, 1,   0, 1, 1,   0, 1, 1 ]);

    var triangleIndices = new Float32Array(4104);
    fillIndex();
    function fillIndex(){
    //sphere();
    var counter=0;
    var k=0;
    for (var i = 0;i<19;i++){
    for(var j=0;j<36;j++){

    if (i<18){

triangleIndices.fill((i*36+j)*6+5,counter);
counter++;
//console.log(i,j,counter,triangleIndices[counter]);

triangleIndices.fill(((i+1)*36+(j+1)%36)*6+1,counter);
counter++;
//console.log(i,j,counter,triangleIndices[counter]);

triangleIndices.fill((i*36+(j+1)%36)*6+3,counter);
counter++;
//console.log(i,j,counter,triangleIndices[counter]);

triangleIndices.fill((i*36+(j+1)%36)*6+4,counter);
counter++;
//console.log(i,j,counter,triangleIndices[counter]);

triangleIndices.fill(((i+1)*36+(j+1)%36)*6+2,counter);
counter++;
//console.log(i,j,counter,triangleIndices[counter]);

triangleIndices.fill(((i+1)*36+(j+2)%36)*6,counter);
counter++;
//console.log(i,j,counter,triangleIndices[counter]);
}
else{
for(var p=0;p<6;p++){
triangleIndices.fill((i*36+j)*6+k,counter);
       counter++;}
}}
    }
    //console.log(triangleIndices);
    }
//        [  0, 1, 2,   0, 2, 3,    // front
//           4, 5, 6,   4, 6, 7,    // right
//           8, 9,10,   8,10,11,    // top
//          12,13,14,  12,14,15,    // left
//          16,17,18,  16,18,19,    // bottom
//	      20,21,22,  20,22,23 ]); // back

    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 4104;

    // a buffer for normals
    var triangleNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    triangleNormalBuffer.itemSize = 3;
    triangleNormalBuffer.numItems = 4104;

    // a buffer for colors
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 4104;

    // a buffer for indices
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);

    // Scene (re-)draw routine
    function draw() {

        // Translate slider values to angles in the [-pi,pi] interval
        var angle1 = slider1.value*0.01*Math.PI;
        var angle2 = slider2.value*0.01*Math.PI;

        // Circle around the y-axis
        var eye = [200*Math.sin(angle1),0.0,200.0*Math.cos(angle1)];
        var target = [0,0,0];
        var up = [0,1,0];

        var tModel = mat4.create();
        mat4.fromScaling(tModel,[2,2,2]); //TODO:
        mat4.rotate(tModel,tModel,angle2,[1,1,1]);

        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);

        var tProjection = mat4.create();
        mat4.perspective(tProjection,Math.PI/4,1,10,1000);
        //mat4.ortho(tProjection, -200,200,200,200,1,1000);

        var tMV = mat4.create();
        var tMVn = mat3.create();
        var tMVP = mat4.create();
        mat4.multiply(tMV,tCamera,tModel); // "modelView" matrix
        mat3.normalFromMat4(tMVn,tMV);
        mat4.multiply(tMVP,tProjection,tMV);

        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgram.MVmatrix,false,tMV);
        gl.uniformMatrix3fv(shaderProgram.MVNormalmatrix,false,tMVn);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, triangleNormalBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize,
          gl.FLOAT,false, 0, 0);

        // Do the drawing
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);

    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
}

window.onload=start;
