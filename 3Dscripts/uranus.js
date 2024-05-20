import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;

let controls;

let objToRender = 'uranus';

const loader = new GLTFLoader();

loader.load(
    `3D/${objToRender}/uranus.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
        console.log("Model loaded successfully");
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error("An error happened", error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);


// Camera distance from object
camera.position.z = objToRender === "uranus" ? 500 : 800;

// Lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(0, 0, 500); // Top-left-ish
topLight.castShadow = true;


const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "uranus" ? 5 : 1);
scene.add(ambientLight);

if (objToRender === "uranus") {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 300; 
  controls.maxDistance = 900
}

function animate() {
  requestAnimationFrame(animate);

  

  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();
