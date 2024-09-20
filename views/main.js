import * as THREE from '../build/three.module.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.ConeGeometry( 1, 1, 64 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 8;
camera.position.y = 0;

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function getRandomColor() {
    return Math.floor(Math.random() * 16777215);
}

function onPointerClick() {

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    // If an object is intersected, change its color
    if (intersects.length > 0) {
        intersects[0].object.material.color.set(getRandomColor()); // Change the object color on click
    }
}

function animate() {

	renderer.render( scene, camera );

}

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onPointerClick);
window.requestAnimationFrame(render);