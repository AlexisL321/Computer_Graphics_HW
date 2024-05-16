/*
Reference:
For the assignment I drew inspiration from and studied the links here:
https://math.hws.edu/graphicsbook/source/webgl/skybox-and-env-map.html
https://webglfundamentals.org/webgl/lessons/webgl-skybox.html
*/
function start() {
    let skybox={};
    var radius = 1.5;
    var slices = 32;
    var stacks = 16;
       var vertexCount = (slices+1)*(stacks+1);
       var vertices = new Float32Array( 3*vertexCount );
       var normals = new Float32Array( 3* vertexCount );
       var texCoords = new Float32Array( 2*vertexCount );
       var indices = new Uint16Array( 2*slices*stacks*3 );
       var du = 2*Math.PI/slices;
       var dv = Math.PI/stacks;
       var i,j,u,v,x,y,z;
       var indexV = 0;
       var indexT = 0;
       for (i = 0; i <= stacks; i++) {
          v = -Math.PI/2 + i*dv;
          for (j = 0; j <= slices; j++) {
             u = j*du;
             x = Math.cos(u)*Math.cos(v);
             y = Math.sin(u)*Math.cos(v);
             z = Math.sin(v);
             vertices[indexV] = radius*x;
             normals[indexV++] = x;
             vertices[indexV] = radius*y;
             normals[indexV++] = y;
             vertices[indexV] = radius*z;
             normals[indexV++] = z;
             texCoords[indexT++] = j/slices;
             texCoords[indexT++] = i/stacks;
          }
       }
       var k = 0;
       for (j = 0; j < stacks; j++) {
          var row1 = j*(slices+1);
          var row2 = (j+1)*(slices+1);
          for (i = 0; i < slices; i++) {
              indices[k++] = row1 + i;
              indices[k++] = row2 + i + 1;
              indices[k++] = row2 + i;
              indices[k++] = row1 + i;
              indices[k++] = row1 + i + 1;
              indices[k++] = row2 + i + 1;
          }
       }
 var vertexPos = new Float32Array(
        [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,
           1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,
           1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,
          -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,
          -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,
           1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1 ]);

var vertexPos1 = new Float32Array(
        [  100, 100, 100,  -100, 100, 100,  -100,-100, 100,   100,-100, 100,
           100, 100, 100,   100,-100, 100,   100,-100,-100,   100, 100,-100,
           100, 100, 100,   100, 100,-100,  -100, 100,-100,  -100, 100, 100,
          -100, 100, 100,  -100, 100,-100,  -100,-100,-100,  -100,-100, 100,
          -100,-100,-100,   100,-100,-100,   100,-100, 100,  -100,-100, 100,
           100,-100,-100,  -100,-100,-100,  -100, 100,-100,   100, 100,-100 ]);
    // vertex normals
    var vertexNormals = new Float32Array(
        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
           0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
          -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
           0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,
           0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1  ]);

    // vertex colors
    var vertexColors = new Float32Array(
        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
           0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
           1, 1, 0,   1, 1, 0,   1, 1, 0,   1, 1, 0,
           1, 0, 1,   1, 0, 1,   1, 0, 1,   1, 0, 1,
           0, 1, 1,   0, 1, 1,   0, 1, 1,   0, 1, 1 ]);

    // vertex texture coordinates
    var vertexTextureCoords = new Float32Array(
        [  0, 0,   1, 0,   1, 1,   0, 1,
           1, 0,   1, 1,   0, 1,   0, 0,
           0, 1,   0, 0,   1, 0,   1, 1,
           0, 0,   1, 0,   1, 1,   0, 1,
           1, 1,   0, 1,   0, 0,   1, 0,
           1, 1,   0, 1,   0, 0,   1, 0 ]);

    // element index array
    var triangleIndices = new Uint8Array(
        [  0, 1, 2,   0, 2, 3,    // front
           4, 5, 6,   4, 6, 7,    // right
           8, 9,10,   8,10,11,    // top
          12,13,14,  12,14,15,    // left
          16,17,18,  16,18,19,    // bottom
	      20,21,22,  20,22,23 ]); // back
    // Get canvas, WebGL context, twgl.m4
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    // Sliders at center
    var slider1 = document.getElementById('slider1');
    slider1.value = -100;
    var slider2 = document.getElementById('slider2');
    slider2.value = -100;

    // Read shader source
    var vertexSource = document.getElementById("vertexShader").text;
    var fragmentSource = document.getElementById("fragmentShader").text;
    var skyboxVertexSource=document.getElementById("skyboxVertexShader").text;
    var skyboxFragmentSource=document.getElementById("skyboxFragmentShader").text;


    // Compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(vertexShader)); return null; }

    var skyboxVertexShader=gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(skyboxVertexShader,skyboxVertexSource);
    gl.compileShader(skyboxVertexShader);
    if (!gl.getShaderParameter(skyboxVertexShader, gl.COMPILE_STATUS)) {
          alert(gl.getShaderInfoLog(skyboxVertexShader)); return null; }
    // Compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(fragmentShader)); return null; }

    var skyboxFragmentShader=gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(skyboxFragmentShader,skyboxFragmentSource);
    gl.compileShader(skyboxFragmentShader);
    if (!gl.getShaderParameter(skyboxFragmentShader, gl.COMPILE_STATUS)) {
          alert(gl.getShaderInfoLog(skyboxFragmentShader)); return null; }

    // Attach the shaders and link
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialize shaders"); }
    gl.useProgram(skyboxShaderProgram);

    var skyboxShaderProgram=gl.createProgram();
    gl.attachShader(skyboxShaderProgram,skyboxVertexShader);
    gl.attachShader(skyboxShaderProgram,skyboxFragmentShader);
    gl.linkProgram(skyboxShaderProgram);
    if (!gl.getProgramParameter(skyboxShaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialize shaders"); }
    gl.useProgram(skyboxShaderProgram);
    skyboxShaderProgram.PositionAttribute=gl.getAttribLocation(skyboxShaderProgram,"pos");
    //gl.enableVertexAttribArray(skyboxShaderProgram.PositionAttribute);
    skyboxShaderProgram.MVmatrix=gl.getUniformLocation(skyboxShaderProgram,"uMV");
        skyboxShaderProgram.MVPmatrix=gl.getUniformLocation(skyboxShaderProgram,"uMVP");
          var skyboxLocation = gl.getUniformLocation(skyboxShaderProgram, "skybox");


        var skyboxposBuffer = gl.createBuffer();
        var skyboxindexBuffer=gl.createBuffer(); //TODO:
            gl.bindBuffer(gl.ARRAY_BUFFER,skyboxposBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,vertexPos1,gl.STATIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, skyboxindexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,triangleIndices , gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);
    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    //gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    //gl.enableVertexAttribArray(shaderProgram.NormalAttribute);
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    //gl.enableVertexAttribArray(shaderProgram.ColorAttribute);
    shaderProgram.texcoordAttribute = gl.getAttribLocation(shaderProgram, "vTexCoord");
    //gl.enableVertexAttribArray(shaderProgram.texcoordAttribute);
    // this gives us access to the matrix uniform
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram,"uMV");
    shaderProgram.MVNormalmatrix = gl.getUniformLocation(shaderProgram,"uMVn");
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");
    // Attach samplers to texture units
    shaderProgram.texSampler1 = gl.getUniformLocation(shaderProgram, "texSampler1");
    gl.uniform1i(shaderProgram.texSampler1, 2);
    shaderProgram.texSampler2 = gl.getUniformLocation(shaderProgram, "texSampler2");
    gl.uniform1i(shaderProgram.texSampler2, 1);
    shaderProgram.texSampler3=gl.getUniformLocation(shaderProgram,"texSampler3");
    gl.uniform1i(shaderProgram.texSampler3,0);

    var shaderIndexBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shaderIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices , gl.STATIC_DRAW);

    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = vertices.length/3;

    // a buffer for normals
    var triangleNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    triangleNormalBuffer.itemSize = 3;
    triangleNormalBuffer.numItems = normals.length/3;

    // a buffer for colors
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = normals.length/3;

    // a buffer for textures
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    textureBuffer.itemSize = 2;
    textureBuffer.numItems = texCoords.length/2;

    // a buffer for indices
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Set up texture
    var texture1 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image1 = new Image();

    var texture2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image2 = new Image();

    var texture3 = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture3);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        var image3 = new Image();

    var posxTex=gl.createTexture();
    var negxTex=gl.createTexture();
    var posyTex=gl.createTexture();
    var negyTex=gl.createTexture();
    var poszTex=gl.createTexture();
    var negzTex=gl.createTexture();

    //Create skybox images
    var posx= new Image();
    var negx=new Image();
    var posy=new Image();
    var negy=new Image();
    var posz=new Image();
    var negz=new Image();
    var count=0;
    var skyboxTexture = gl.createTexture();
    function loadSkybox(){
    if (count ==5){
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,posx);//TODO:
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,posy);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,posz);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,negx);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,negy);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,negz);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
}
    }

    function initTextureThenDraw()
    {
      // Load the "checkerboard" image by default
      // (if you don't want to load anything, comment out the next 3 lines)
      image1.onload = function() { loadTexture(image1,texture1); };
      image1.crossOrigin = "anonymous";
      image1.src = "https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";
      //image1.src = "https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";

      image2.onload = function() { loadTexture(image2,texture2); };
      image2.crossOrigin = "anonymous";
      image2.src = "https://live.staticflickr.com/65535/50641871583_78566f4fbb_o.jpg";
      //image2.src="https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";

      image3.onload = function() { loadTexture(image3,texture3); };
            image3.crossOrigin = "anonymous";
            image3.src = "https://farm6.staticflickr.com/5726/30206830053_87e9530b48_b.jpg";
      posx.onload=function(){loadSkybox()};
      count++;
      posx.crossOrigin="anonymous";
      //posx.src="https://live.staticflickr.com/65535/52565647639_a908af95fa_n.jpg";
      posx.src="https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";
      negx.onload=function(){loadSkybox()};
      count++;
      negx.crossOrigin="anonymous";
      //negx.src="https://live.staticflickr.com/65535/52564905322_21253711cc_n.jpg";
      negx.src="https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";
      posy.onload=function(){loadSkybox()};
      count++;
      posy.crossOrigin="anonymous";
      //posy.src="https://live.staticflickr.com/65535/52565647619_50d9d7ce8d_n.jpg";
      posy.src="https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";
      negy.onload=function(){loadSkybox()};
      count++;
      negy.crossOrigin="anonymous";
      //negy.src="https://live.staticflickr.com/65535/52564905272_dc7292157e_n.jpg";
      negy.src="https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";
      posz.onload=function(){loadSkybox()};
      count++;
      posz.crossOrigin="anonymous";
      //posz.src="https://live.staticflickr.com/65535/52565896663_ab6708b2fc_n.jpg";
      posz.src="https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";
      negz.onload=function(){loadSkybox()};
      count++;
      negz.crossOrigin="anonymous";
      //negz.src="https://live.staticflickr.com/65535/52565647649_bda5925601_n.jpg";
      negz.src="https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg";
      //loadSkybox();
      window.setTimeout(draw,200);
    }
//    var getViewMatrix = function() {
//            var cosX = Math.cos(rotateX/180*Math.PI);
//            var sinX = Math.sin(rotateX/180*Math.PI);
//            var cosY = Math.cos(rotateY/180*Math.PI);
//            var sinY = Math.sin(rotateY/180*Math.PI);
//            var mat = [  // The product of rotation by rotateX about x-axis and by rotateY about y-axis.
//                cosY, sinX*sinY, -cosX*sinY, 0,
//                0, cosX, sinX, 0,
//                sinY, -sinX*cosY, cosX*cosY, 0,
//                0, 0, 0, 1
//            ];
//            if (center !== undefined) {  // multiply on left by translation by rotationCenter, on right by translation by -rotationCenter
//                var t0 = center[0] - mat[0]*center[0] - mat[4]*center[1] - mat[8]*center[2];
//                var t1 = center[1] - mat[1]*center[0] - mat[5]*center[1] - mat[9]*center[2];
//                var t2 = center[2] - mat[2]*center[0] - mat[6]*center[1] - mat[10]*center[2];
//                mat[12] = t0;
//                mat[13] = t1;
//                mat[14] = t2;
//            }
//            if (viewDistance !== undefined) {  // multipy on left by translation by (0,0,-viewDistance)
//                mat[14] -= viewDistance;
//            }
//            return mat;
//        };
    function loadTexture(image,texture)
    {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      // Option 1 : Use mipmap, select interpolation mode
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

      // Option 2: At least use linear filters
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Optional ... if your shader & texture coordinates go outside the [0,1] range
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    function createModel(modelData) {  // For creating the reflecting object models.
        let model = {};
        model.coordsBuffer = gl.createBuffer();
        model.normalBuffer = gl.createBuffer();
        model.indexBuffer = gl.createBuffer();
        model.count = modelData.indices.length;
        gl.bindBuffer(gl.ARRAY_BUFFER, model.coordsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexNormals, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);
        model.render = function() {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.coordsBuffer);
            gl.vertexAttribPointer(a_coords_loc, 3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(a_normal_loc, 3, gl.FLOAT, false, 0, 0);
            gl.uniformMatrix4fv(u_modelview, false, modelview );
            gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);
            gl.uniformMatrix3fv(u_inverseViewTransform, false, inverseViewTransform);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
        };
        return model;
    }
    var angle1;
    var angle2;
    var modelView;
    // Scene (re-)draw routine
    function draw() {
gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // Translate slider values to angles in the [-pi,pi] interval
        angle1 = slider1.value*0.01*Math.PI;
        angle2 = slider2.value*0.01*Math.PI;

        // Circle around the y-axis
        //var eye = [50*Math.sin(angle1),50.0,50*Math.cos(angle1)];
        var eye=[5*Math.cos(angle1 * .1), 10, 5*Math.sin(angle1 * .1)];
        //var eye=[10,10,10];
        var target = [0,0,0];
        var up = [0,1,0];

        var projection = mat4.create();
        mat4.perspective(projection, Math.PI/4, 1, 1, 2000);
        modelView=mat4.fromValues(1,0,-0,0,0,1,0,0,0,0,1,0,0,0,-2.7,1);
        //modelView=[1,0,-0,0,0,1,0,0,0,0,1,0,0,0,-2.7,1];
        var SBMP=mat4.create();
        console.log(SBMP);
        mat4.multiply(SBMP,projection,modelView);


        var tModel = mat4.create();
        //mat4.fromScaling(tModel,[1,1,1]);
        mat4.rotate(tModel,tModel,angle2,[1,1,1]);

        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);
        var viewMatrix=mat4.create();
        mat4.invert(viewMatrix,tCamera);
        viewMatrix[12]=0;
        viewMatrix[13]=0;
        viewMatrix[14]=0;
        var viewProjectionMatrix =mat4.create();
            mat4.multiply(viewProjectionMatrix,projection, viewMatrix);
        var viewProjectionInverseMatrix = mat4.create();
            mat4.invert(viewProjectionInverseMatrix,viewProjectionMatrix);

        var tProjection = mat4.create();
        mat4.perspective(tProjection,Math.PI/4,1,1,100);
        //TODO:tProjection can be passed to Projection
        var tMV = mat4.create();
        var tMVn = mat3.create();
        var tMVP = mat4.create();
        mat4.multiply(tMV,tCamera,tModel); // "modelView" matrix
        mat3.normalFromMat4(tMVn,tMV);
        mat4.multiply(tMVP,tProjection,tMV);
        //TODO: set modelview:
        //var
       // var modelview = getViewMatrix();

        // Clear screen, prepare for rendering


        gl.useProgram(skyboxShaderProgram);
        gl.depthMask(false);

        //gl.uniformMatrix4fv(skyboxShaderProgram.MVPmatrix,false,SBMP);
        gl.enableVertexAttribArray(skyboxShaderProgram.PositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, skyboxposBuffer);
        gl.vertexAttribPointer(skyboxShaderProgram.PositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(skyboxShaderProgram.MVPmatrix, false, viewProjectionInverseMatrix);
            gl.uniform1i(skyboxLocation, 2);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, skyboxindexBuffer);
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);
        gl.disableVertexAttribArray(skyboxShaderProgram.PositionAttribute);
        //gl.disableVertexAttribArray(skyboxShaderProgram.)


        //TODO:reflection mapping inverse tMVP

        gl.useProgram(shaderProgram);

        gl.depthMask(true);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // Set up uniforms & attributes
//gl.activeTexture(gl.TEXTURE0);
//        gl.bindTexture(gl.TEXTURE_2D, texture1);
//        gl.activeTexture(gl.TEXTURE1);
//        gl.bindTexture(gl.TEXTURE_2D, texture2);
        gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
        gl.enableVertexAttribArray(shaderProgram.NormalAttribute);
        gl.enableVertexAttribArray(shaderProgram.ColorAttribute);
        gl.enableVertexAttribArray(shaderProgram.texcoordAttribute);
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
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.vertexAttribPointer(shaderProgram.texcoordAttribute, textureBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        //TODO:
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shaderIndexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
        gl.disableVertexAttribArray(shaderProgram.PositionAttribute);
        gl.disableVertexAttribArray(shaderProgram.NormalAttribute);
        gl.disableVertexAttribArray(shaderProgram.texcoordAttribute);
        gl.disableVertexAttribArray(shaderProgram.ColorAttribute);


    }

    // When user selects an image file (via the input button & dialog) call the function loadimage() ...
    var imageinput = document.getElementById("getimage");
    //imageinput.addEventListener('change', loadimage, false);

    // ... and using the FileReader API open and read this file, calling the imageHandler() callback afterwards
    function loadimage(inputevent)
    {
        var filename = inputevent.target.files[0];
        var fr = new FileReader();
        fr.onload = imageHandler;
        fr.readAsDataURL(filename);
    }

    // ... which starts reading the image file, and calls the loadTexture() function once loaded, followed with a redraw
    function imageHandler(readerevent)
    {
       image1.onload = function() { loadTexture(image1,texture1); draw(); };
       image1.src = readerevent.target.result;
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    initTextureThenDraw();
}

window.onload=start;
