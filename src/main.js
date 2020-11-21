import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

let camera, scene, renderer;
let geometry, material, mesh;
let controls;
let clock;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  scene = new THREE.Scene();

  geometry = new THREE.PlaneBufferGeometry(2, 2);
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
    },
    // wireframe: true
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  controls = new OrbitControls(camera, renderer.domElement);
  clock = new THREE.Clock();

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  controls.update();

  material.uniforms.uTime.value = clock.getElapsedTime();

  renderer.render(scene, camera);
}