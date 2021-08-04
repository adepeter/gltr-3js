import {Component, OnInit} from '@angular/core';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 's3d-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private currentModel: string;

  constructor() {
    this.currentModel = this.changeModel();
    const regexFileName = new RegExp('\w+(.gltf|.glb)', 'gi');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('white');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.physicallyCorrectLights = true;
    document.body.appendChild(renderer.domElement);
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      `assets/${this.currentModel}/scene.gltf`,
      function (gltf) {
        console.log(gltf.asset);
        scene.add(gltf.scene);
        gltf.scenes;
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log('An error happened');
      }
    );
    // const light = new THREE.DirectionalLight(0xffffff, 25);
    const light = new THREE.AmbientLight(0x404040, 25);
    scene.add(light);
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }

  ngOnInit(): void {
  }

  changeModel(): string {
    const MODEL_NAMES = ['armadillo', 'car', 'mountain', 'warrior', 'radio'];
    const randomInt = Math.floor(Math.random() * MODEL_NAMES.length);
    return MODEL_NAMES[randomInt];
  }
}
