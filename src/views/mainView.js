import * as THREE from 'three';
import { LoadGLTFByPath } from '../helpers/ModelHelper.js'
import { setupRenderer } from '../helpers/RendererHelper.js'
import { getFirstCameraInScene, updateCameraAspect } from '../helpers/CameraHelper.js'
import { checkRayIntersections, getMouseVector2 } from '../helpers/RayCastHelper.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { getOutlineEffect, configureOutlineEffectSettings_Default, addOutlinesBasedOnIntersections } from '../helpers/OutlineHelper.js';
import { setBackground } from '../helpers/BackgroundHelper.js'

const scenePath = './src/models/scene.gltf'

export async function setupScene(canvas) {

	const scene = new THREE.Scene();
	const renderer = setupRenderer();
	let mousePointer = new THREE.Vector2();
	const raycaster = new THREE.Raycaster();
	let camera;

	await LoadGLTFByPath(scene, scenePath)
		.then(() => {
			camera = getFirstCameraInScene(scene);
			updateCameraAspect(camera);
		})
		.catch((error) => {
			console.error('Error loading JSON scene:', error);
	});

	scene.add(camera);
	setBackground(scene);

	let composer = new EffectComposer( renderer );

	//Setup renderPass and add it to the composer
	const renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );

	//Setup outlinePass, configure outlinePass settings, add it to the composer
	let outlinePass = getOutlineEffect(window, scene, camera);
	configureOutlineEffectSettings_Default(outlinePass);
	composer.addPass( outlinePass );

	document.addEventListener('mousemove', onMouseMove, false);

	function onMouseMove(event) {
		mousePointer = getMouseVector2(event, window);

		const intersections = checkRayIntersections(mousePointer, camera, raycaster, scene);

		//Add outline on intersections
		addOutlinesBasedOnIntersections(intersections, outlinePass);
	}

	// Animate the scene
	function animate() {
		requestAnimationFrame(animate);

		composer.render();
	}

	animate();
};
