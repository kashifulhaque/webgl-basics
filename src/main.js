// Global constants
const width = window.innerWidth;
const height = window.innerHeight;
const fov = 75;
const aspectRatio = width / height;
const nearClippingPlane = 0.1;
const farClippingPlane = 1000;

// Variables
let scene;
let camera;
let renderer;
let cube;

// Initialize function
function init() {
  // Setup scene and camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    fov,
    aspectRatio,
    nearClippingPlane,
    farClippingPlane
  );

  // Initialize the renderer [WebGL rendered in this case]. AA on
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  // Set the size of the renderer
  setRenderSize();

  // Append renderer to the DOM
  document.body.appendChild(renderer.domElement);

  // Set camera to display the cube
  camera.position.z = 6;
}

function drawCube() {
  // Define the geometry
  let geometry = new THREE.BoxGeometry(1, 1, 1);

  // Create a texture
  const texture = new THREE.TextureLoader().load("textures/lava.jpg");

  // Assign the texture to the cube
  let material = new THREE.MeshBasicMaterial({
    map: texture,
  });

  cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.015;

  // Render
  renderer.render(scene, camera);
}

function setRenderSize() {
  renderer.setSize(width, height);
}

function onWindowResize() {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  setRenderSize();
}

// Event listener for browser window resize
window.addEventListener("resize", onWindowResize, false);

init();
drawCube();
animate();
