'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './House3DViewer.module.css';

export default function House3DViewer({ 
  elements, 
  walls, 
  doors, 
  windows, 
  initialData,
  perimeterPoints,
  onClose 
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Создание сцены
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    sceneRef.current = scene;

    // Создание камеры
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(80, 60, 80);
    camera.lookAt(0, 20, 0);
    cameraRef.current = camera;

    // Создание рендерера
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Создание дома
    createHouse(scene);

    // Управление мышью
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (event) => {
      mouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseMove = (event) => {
      if (!mouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(camera.position.clone().sub(new THREE.Vector3(0, 20, 0)));
      spherical.theta -= deltaX * 0.01;
      spherical.phi += deltaY * 0.01;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
      
      const newPosition = new THREE.Vector3().setFromSpherical(spherical).add(new THREE.Vector3(0, 20, 0));
      camera.position.copy(newPosition);
      camera.lookAt(0, 20, 0);
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      mouseDown = false;
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? 1.1 : 0.9;
      camera.position.multiplyScalar(delta);
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Анимация
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Обработка изменения размера
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [elements, walls, doors, windows, perimeterPoints]);

  const createHouse = (scene) => {
    const houseElement = elements.find(el => el.type === 'house');
    if (!houseElement) return;

    const scale = 1.2; // Увеличиваем масштаб для лучшего отображения

    // Пол дома
    if (perimeterPoints && perimeterPoints.length >= 4) {
      // Деформированный пол
      const vertices = [];
      const indices = [];
      
      const transformedPoints = perimeterPoints.map(point => ({
        x: (point.x - (houseElement.x + houseElement.width / 2)) * scale,
        z: (point.y - (houseElement.y + houseElement.height / 2)) * scale
      }));
      
      const centerX = transformedPoints.reduce((sum, p) => sum + p.x, 0) / transformedPoints.length;
      const centerZ = transformedPoints.reduce((sum, p) => sum + p.z, 0) / transformedPoints.length;
      
      vertices.push(centerX, 0, centerZ);
      
      transformedPoints.forEach(point => {
        vertices.push(point.x, 0, point.z);
      });
      
      for (let i = 0; i < transformedPoints.length; i++) {
        const next = (i + 1) % transformedPoints.length;
        indices.push(0, i + 1, next + 1);
      }
      
      const floorGeometry = new THREE.BufferGeometry();
      floorGeometry.setIndex(indices);
      floorGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      floorGeometry.computeVertexNormals();
      
      const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xD2B48C, side: THREE.DoubleSide });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = 0;
      scene.add(floor);
    } else {
      // Обычный пол
      const houseWidth = houseElement.width * scale;
      const houseHeight = houseElement.height * scale;
      
      const floorGeometry = new THREE.PlaneGeometry(houseWidth, houseHeight);
      const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xD2B48C });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0;
      scene.add(floor);
    }

    // Стены дома
    const wallHeight = 40;
    const wallThickness = 6;
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xF5DEB3 });

    if (perimeterPoints && perimeterPoints.length >= 4) {
      // Стены по деформированному периметру
      for (let i = 0; i < perimeterPoints.length; i++) {
        const start = perimeterPoints[i];
        const end = perimeterPoints[(i + 1) % perimeterPoints.length];
        
        const startX = (start.x - (houseElement.x + houseElement.width / 2)) * scale;
        const startZ = (start.y - (houseElement.y + houseElement.height / 2)) * scale;
        const endX = (end.x - (houseElement.x + houseElement.width / 2)) * scale;
        const endZ = (end.y - (houseElement.y + houseElement.height / 2)) * scale;
        
        const wallLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endZ - startZ, 2));
        const wallAngle = Math.atan2(endZ - startZ, endX - startX);
        const centerX = (startX + endX) / 2;
        const centerZ = (startZ + endZ) / 2;
        
        const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(centerX, wallHeight/2, centerZ);
        wall.rotation.y = -wallAngle;
        wall.castShadow = true;
        wall.receiveShadow = true;
        scene.add(wall);
      }
    } else {
      // Обычные стены
      const houseWidth = houseElement.width * scale;
      const houseHeight = houseElement.height * scale;
      
      const wallPositions = [
        { x: 0, z: -houseHeight/2, width: houseWidth, height: wallThickness },
        { x: houseWidth/2, z: 0, width: wallThickness, height: houseHeight },
        { x: 0, z: houseHeight/2, width: houseWidth, height: wallThickness },
        { x: -houseWidth/2, z: 0, width: wallThickness, height: houseHeight }
      ];

      wallPositions.forEach(pos => {
        const wallGeometry = new THREE.BoxGeometry(pos.width, wallHeight, pos.height);
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(pos.x, wallHeight/2, pos.z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        scene.add(wall);
      });
    }

    // Внутренние стены
    const internalWallMaterial = new THREE.MeshLambertMaterial({ color: 0xE6E6FA });
    walls.forEach(wall => {
      const wallLengthPixels = Math.sqrt(
        Math.pow(wall.end.x - wall.start.x, 2) + Math.pow(wall.end.y - wall.start.y, 2)
      );
      const wallLength = wallLengthPixels * scale;
      const centerX = ((wall.start.x + wall.end.x) / 2 - (houseElement.x + houseElement.width / 2)) * scale;
      const centerZ = ((wall.start.y + wall.end.y) / 2 - (houseElement.y + houseElement.height / 2)) * scale;
      const angle = Math.atan2(wall.end.y - wall.start.y, wall.end.x - wall.start.x);
      
      const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, 3);
      const wallMesh = new THREE.Mesh(wallGeometry, internalWallMaterial);
      wallMesh.position.set(centerX, wallHeight/2, centerZ);
      wallMesh.rotation.y = -angle;
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      scene.add(wallMesh);
    });

    // Земля
    const groundGeometry = new THREE.PlaneGeometry(1500, 1500);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);
  };

  return (
    <div className={styles.house3DViewer}>
      <div className={styles.viewerControls}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕ Закрыть 3D
        </button>
        <div className={styles.controlsInfo}>
          <span>🖱️ Перетаскивайте для поворота</span>
          <span>🔍 Колесо мыши для масштаба</span>
        </div>
      </div>
      
      <div ref={mountRef} className={styles.viewerContainer} />
    </div>
  );
}