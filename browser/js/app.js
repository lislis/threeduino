// WEBSOCKET
const socket = new WebSocket('ws://localhost:8088');
let data = {};

socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

socket.addEventListener('message', function (event) {
  let d = JSON.parse(event.data);
  data = {x: parseInt(d.x), y: parseInt(d.y), z: parseInt(d.z)};
  console.log(data);
});


function deg2rad(int) {
  return int * Math.PI / 180;
}


// THREE JS
let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {
  // Get a reference to the container element that will hold our scene
  container = document.querySelector( '#scene-container' );

  // create a Scene
  scene = new THREE.Scene();

  scene.background = new THREE.Color( 0x8FBCD4 );

  // set up the options for a perspective camera
  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;

  const near = 0.1;
  const far = 100;

  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set( 0, 0, 10 );

  // create a geometry
  const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );

  // create a default (white) Basic material
//  const material = new THREE.MeshBasicMaterial();
  const material = new THREE.MeshStandardMaterial( { color: 0x800080 } );


  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh( geometry, material );

  // add the mesh to the scene object
  scene.add( mesh );

  // Create a directional light
  const light = new THREE.DirectionalLight( 0xffffff, 5.0 );

  // move the light back and up a bit
  light.position.set( 10, 10, 10 );

  // remember to add the light to the scene
  scene.add( light );

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  // add the automatically created <canvas> element to the page
  container.appendChild( renderer.domElement );

}

function animate() {
  // call animate recursively
  requestAnimationFrame( animate );

  // render, or 'create a still image', of the scene
  // this will create one still image / frame each time the animate
  // function calls itself
  renderer.render( scene, camera );

  mesh.rotation.z = deg2rad(data.z);
  mesh.rotation.x = deg2rad(data.x);
  mesh.rotation.y = deg2rad(data.y);
}

// call the init function to set everything up
init();

// then call the animate function to render the scene
animate();
