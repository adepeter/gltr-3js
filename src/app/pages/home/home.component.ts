import {Component, OnInit} from '@angular/core';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

@Component({
  selector: 's3d-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private currentModel: string;

  constructor() {
    this.currentModel = this.changeModel();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('white');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.physicallyCorrectLights = true;
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      `dist/seek3d/assets/${this.currentModel}/scene.gltf`,
      function (gltf) {
        // gltf.scene.scale.set(0.01,0.01,0.01);
        scene.add(gltf.scene);
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
    const light = new THREE.AmbientLight(0x404040, 25);
    // const light = new THREE.DirectionalLight(0xffffff, 25);
    scene.add(light);
    window.addEventListener(
      'resize',
      () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      animate();
    },
      false
    );
    const stats = Stats();
    document.body.appendChild(stats.dom);
    const render = () => {
      renderer.render(scene, camera);
    }
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      render();
      stats.update();
    }
    animate();
  }

  ngOnInit(): void {
  }

  changeModel(): string {
    const MODEL_NAMES = ['armadillo', 'car', 'mountain', 'warrior', 'radio', 'pivot'];
    const randomInt = Math.floor(Math.random() * MODEL_NAMES.length);
    return MODEL_NAMES[randomInt];
  }
}
