"use strict";

/************ shader program for the skybox ****************/

const vertexShaderSourceSkybox = `
     uniform mat4 projection;
     uniform mat4 modelview;
     attribute vec3 coords;
     varying vec3 v_objCoords;
     void main() {
        vec4 eyeCoords = modelview * vec4(coords,1.0); //
        gl_Position = projection * eyeCoords;
        v_objCoords = coords;
     }`;
const fragmentShaderSourceSkybox = `
     precision mediump float;
     varying vec3 v_objCoords;
     uniform samplerCube skybox;
     void main() {
          gl_FragColor = textureCube(skybox, v_objCoords);
     }`;

/************ shader program for the reflecting object ****************/

const vertexShaderSource = `
     uniform mat4 projection;
     uniform mat4 modelview;
     attribute vec3 coords;
     attribute vec3 normal;
     varying vec3 v_eyeCoords;
     varying vec3 v_normal;
     void main() {
        vec4 eyeCoords = modelview * vec4(coords,1.0);
        gl_Position = projection * eyeCoords;
        v_eyeCoords = eyeCoords.xyz;
        v_normal = normalize(normal);
     }`;
const fragmentShaderSource = `
     precision mediump float;
     varying vec3 vCoords;
     varying vec3 v_normal;
     varying vec3 v_eyeCoords;
     uniform samplerCube skybox;
     uniform mat3 normalMatrix;
     uniform mat3 inverseViewTransform;//TODO:reflection mapping

     void main() {
          vec3 N = normalize(normalMatrix * v_normal);
          vec3 V = -v_eyeCoords;
          vec3 R = -reflect(V,N);
//          vec3 R = 2.0 * dot(V,N) * N - V; // This is how to compute R without the reflect() function.
          vec3 T = inverseViewTransform * R; // Transform by inverse of the view transform that was applied to the skybox
          gl_FragColor = textureCube(skybox, T);
     }`;



let gl;   // The webgl context.

let a_coords_loc_SB;         // For drawing the skybox
let u_projection_SB;
let u_modelview_SB;
let prog_SB;

let a_coords_loc;          // For drawing the reflective object
let a_normal_loc;
let u_projection;
let u_modelview;
let u_normalMatrix;
let u_inverseViewTransform;
let prog;

const projection = mat4.create();   // projection matrix
let modelview;            // modelview matrix
const normalMatrix = mat3.create();  // normal transformation matrix
const inverseViewTransform = mat3.create();  // The inverse of the view transform rotation matrix.

let texID;   // The cubemap texture.

let skyboxCube;

let objects;  // The available objects for rendering

let rotator;   // A SimpleRotator object to enable rotation by mouse/finger dragging.
               // Provides the view transform that is applied to both skybox and teapot.

let rotX = 0, rotY = 0;  // Additional rotations applied as modeling transform to the reflective object.
                         // Modified by pressing arrow and home keys.


function draw() {
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    modelview = rotator.getViewMatrix();
    mat3.normalFromMat4(normalMatrix, modelview);

    // Draw the skybox, with the viewing transform from the rotator.

    gl.useProgram(prog_SB); // Select the shader program that is used for the skybox.
    gl.depthMask(false);
    if (texID) {
        gl.enableVertexAttribArray(a_coords_loc_SB);
        skyboxCube.render();
        gl.disableVertexAttribArray(a_coords_loc_SB);
    }

    // Get the inverse of the rotation that was applied to the skybox.
    // This is needed in the teapot shader to account for the rotation
    // of the skybox.  (Note that it is passed to the shader in the
    // teapot's render function.)

    mat3.fromMat4(inverseViewTransform, modelview);
    mat3.invert(inverseViewTransform,inverseViewTransform);

    // Add modeling rotations to the view transform.

    mat4.rotateX(modelview,modelview,rotX);
    mat4.rotateY(modelview,modelview,rotY);

    mat3.normalFromMat4(normalMatrix, modelview);

    // Draw the object.

    let objectNum = Number(document.getElementById("object").value);

    gl.useProgram(prog); // Select the shader program that is used for the reflective object.
    gl.depthMask(true);
    if (texID) {
        gl.enableVertexAttribArray(a_coords_loc);
        gl.enableVertexAttribArray(a_normal_loc);
        objects[objectNum].render();
        gl.disableVertexAttribArray(a_coords_loc);
        gl.disableVertexAttribArray(a_normal_loc);
    }
}


/* loads the images for the texture cube, and calls draw() when finished */
function loadTextureCube() {
    document.getElementById("headline").innerHTML = "WebGL Reflection Map With Skybox -- LOADING CUBEMAP TEXTURE";
    let ct = 0;
    let img = new Array(6);
    let urls = [
       "https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg",
       "https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg",
       "https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg",
       "https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg",
       "https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg",
       "https://live.staticflickr.com/5564/30725680942_0c6e60a13f_o.jpg"
    ];
    for (let i = 0; i < 6; i++) {
        img[i] = new Image();
        img[i].crossOrigin="anonymous";
        img[i].onload = function() {
            ct++;
            if (ct == 6) {
                document.getElementById("headline").innerHTML = "WebGL Reflection Map With Skybox";
                texID = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texID);
                let targets = [
                   gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                   gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                   gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
                ];
                //try {
                    for (let j = 0; j < 6; j++) {
                        gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img[j]);
                        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    }
                //} catch(e) {
                  //  document.getElementById("canvas-holder").innerHTML = "ERROR: CANNOT ACCESS CUBEMAP TEXTURE IMAGES";
               // }
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                draw();
            }
        };
        img[i].onerror = function() {
             document.getElementById("canvas-holder").innerHTML = "ERROR WHILE TRYING TO LOAD CUBEMAP TEXTURE";
        };
        img[i].src = urls[i];
    }
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

function createModelSB(modelData) {  // For creating the cube for the skybox.
    let model = {};
    model.coordsBuffer = gl.createBuffer();
    model.indexBuffer = gl.createBuffer();
    model.count = modelData.indices.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, model.coordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);
    model.render = function() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.coordsBuffer);
        gl.vertexAttribPointer(a_coords_loc_SB, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(u_modelview_SB, false, modelview );
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
    };
    return model;
}



/**
 *  An event listener for the keydown event.  It is installed by the init() function.
 */
function doKey(evt) {
    let rotationChanged = true;
    switch (evt.keyCode) {
        case 37: rotY -= 0.15; break;        // left arrow
        case 39: rotY +=  0.15; break;       // right arrow
        case 38: rotX -= 0.15; break;        // up arrow
        case 40: rotX += 0.15; break;        // down arrow
        case 13:                             // return
        case 36:                             // home
            rotX = rotY = 0;
            rotator.setAngles(0,0);
            break;
        default: rotationChanged = false;
    }
    if (rotationChanged) {
        evt.preventDefault();
        draw();
    }
}


/* Creates a program for use in the WebGL context gl, and returns the
 * identifier for that program.  If an error occurs while compiling or
 * linking the program, an exception of type Error is thrown.  The error
 * string contains the compilation or linking error.  If no error occurs,
 * the program identifier is the return value of the function.
 *    The second and third parameters are strings that contain the
 * source code for the vertex shader and for the fragment shader.
 */
function createProgram(gl, vShader, fShader) {
    let vsh = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource(vsh,vShader);
    gl.compileShader(vsh);
    if ( ! gl.getShaderParameter(vsh, gl.COMPILE_STATUS) ) {
        throw new Error("Error in vertex shader:  " + gl.getShaderInfoLog(vsh));
     }
    let fsh = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource(fsh, fShader);
    gl.compileShader(fsh);
    if ( ! gl.getShaderParameter(fsh, gl.COMPILE_STATUS) ) {
       throw new Error("Error in fragment shader:  " + gl.getShaderInfoLog(fsh));
    }
    let prog = gl.createProgram();
    gl.attachShader(prog,vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
       throw new Error("Link error in program:  " + gl.getProgramInfoLog(prog));
    }
    return prog;
}


/* Initialize the WebGL context.  Called by init() */
function initGL() {
    prog_SB = createProgram(gl, vertexShaderSourceSkybox, fragmentShaderSourceSkybox );
    a_coords_loc_SB =  gl.getAttribLocation(prog_SB, "coords");
    u_modelview_SB = gl.getUniformLocation(prog_SB, "modelview");
    u_projection_SB = gl.getUniformLocation(prog_SB, "projection");
    prog = createProgram(gl, vertexShaderSource, fragmentShaderSource );
    a_coords_loc =  gl.getAttribLocation(prog, "coords");
    a_normal_loc =  gl.getAttribLocation(prog, "normal");
    u_modelview = gl.getUniformLocation(prog, "modelview");
    u_projection = gl.getUniformLocation(prog, "projection");
    u_normalMatrix = gl.getUniformLocation(prog, "normalMatrix");
    u_inverseViewTransform = gl.getUniformLocation(prog, "inverseViewTransform");
    gl.enable(gl.DEPTH_TEST);


    gl.useProgram(prog_SB);
    mat4.perspective(projection, Math.PI/4, 1, 1, 100);
    gl.uniformMatrix4fv(u_projection_SB, false, projection);

    skyboxCube = createModelSB( cube(100) );

    gl.useProgram(prog);
    mat4.perspective(projection, Math.PI/4, 1, 1, 10);
    gl.uniformMatrix4fv(u_projection, false, projection);

    objects = new Array(6);
    objects[0] = createModel( cube(0.9) );
    objects[1] = createModel( uvSphere(0.6,64,32) );
    objects[2] = createModel( uvCylinder() );
    objects[3] = createModel( uvCone() );
    objects[4] = createModel( uvTorus(0.65,0.2,64,24) );
    for (let i = 0; i < teapotModel.vertexPositions.length; i++) {
        teapotModel.vertexPositions[i] *= 0.05; // scale teapot model to a size that matches other objects
    }
    objects[5] = createModel( teapotModel );
}

/**
 * initialization function that will be called when the page has loaded
 */
function init() {
    let canvas;
    try {
        canvas = document.getElementById("webglcanvas");
        gl = canvas.getContext("webgl");
        if ( ! gl ) {
            throw "Browser does not support WebGL";
        }
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not get a WebGL graphics context.</p>";
        return;
    }
    try {
        initGL();  // initialize the WebGL graphics context
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not initialize the WebGL graphics context: " + e.message + "</p>";
        return;
    }
    document.getElementById("object").value = "5";
    document.getElementById("object").onchange = function() {
        draw();
        document.getElementById("reset").focus();  // to make sure arrow key input is not sent to popup menu
    };
    document.addEventListener("keydown", doKey, false);
    document.getElementById("reset").onclick = function() {
        rotX = rotY = 0;
        rotator.setAngles(0,0);
        draw();
    };
    rotator = new SimpleRotator(canvas,draw,2.7);
    loadTextureCube();
}