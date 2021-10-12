import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Scene } from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

import horizontalGridVertexShader from './shaders/horizontalGrid/vertex.glsl'
import horizontalGridFragmentShader from './shaders/horizontalGrid/fragment.glsl'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'
// /**
//  * Base
//  */


// // Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')
scene.add(new THREE.AxesHelper())

// Geometry
const particlesGeometry = new THREE.BufferGeometry()
// const position = new Float32Array(quantityPoints*3)
// position.forEach((e,i) => {position[i] = Math.random()})

var points = [];
var rows = 40;
var columns = 40;
for(var i = 0; i <rows; i+=0.1){
    for(var j = 0; j <columns; j+=0.1){
        points.push([i,0,j])
    }
}

points = points.flat(2)
points = Float32Array.from(points)
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(points ,3))

const testMaterial = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    // size: .02,
    // sizeAttenuation: true,
    uniforms: {
        // uDownload: {value: 0.0},
        uTime: {value: 0.0},
    },
    depthWrite: false,
    transparent: true,
    alphaTest: 0.5,
    // sizeAttentuation: true,
    // blending: THREE.AdditiveBlending
})

const particles = new THREE.Points(particlesGeometry, testMaterial)
scene.add(particles)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -5
camera.position.y = 3.0
camera.lookAt(0,0,0)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.xr.enabled = true;
document.body.appendChild( VRButton.createButton( renderer ) );


/**
 * Animate
 */
const clock = new THREE.Clock()
let delta = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    delta += clock.getDelta();
    testMaterial.uniforms.uTime.value = elapsedTime;
}
tick()

renderer.setAnimationLoop( function () {
    tick()
	renderer.render( scene, camera );
} );


