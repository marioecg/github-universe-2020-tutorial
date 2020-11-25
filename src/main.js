import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import img from './assets/text.png';

let camera, scene, renderer;
let geometry, material, mesh;
let controls;
let clock;

init();
animate();

function init() {
  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor('black', 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 8;

  // Scene
  scene = new THREE.Scene();

  // Geometry
  geometry = new THREE.TorusGeometry(3, 1, 100, 100);

  // Texture
  const texture = new THREE.TextureLoader().load(img, (texture)=>{
    texture.minFilter = THREE.NearestFilter;
  });

  // Material
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: texture },
    },
    transparent: true,
    side: THREE.DoubleSide
  });

  // Mesh
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Clock
  clock = new THREE.Clock();

  // Events
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