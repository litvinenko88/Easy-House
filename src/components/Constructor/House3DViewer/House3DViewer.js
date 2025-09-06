'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './House3DViewer.module.css';

export default function House3DViewer({ elements, walls, doors, windows, initialData, onClose, perimeterPoints }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const cameraAngleRef = useRef({ theta: 0, phi: Math.PI / 4 });
  const cameraDistanceRef = useRef(100);

  useEffect(() => {
    if (!mountRef.current) return;

    console.log('House3DViewer useEffect - данные:', {
      elements: elements?.length || 0,
      walls: walls?.length || 0,
      doors: doors?.length || 0,
      windows: windows?.length || 0,
      perimeterPoints: perimeterPoints?.length || 0
    });
    
    if (walls && walls.length > 0) {
      console.log('Полученные стены в 3D:', walls);
    } else {
      console.log('Нет стен для отображения в 3D');
    }

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
    camera.position.set(100, 80, 100);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Создание рендерера
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 200, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -200;
    directionalLight.shadow.camera.right = 200;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -200;
    scene.add(directionalLight);

    // Создание дома
    createHouse();

    // Управление мышью
    const handleMouseDown = (event) => {
      mouseRef.current.isDown = true;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseMove = (event) => {
      if (!mouseRef.current.isDown) return;
      
      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;
      
      cameraAngleRef.current.theta += deltaX * 0.01;
      cameraAngleRef.current.phi += deltaY * 0.01;
      cameraAngleRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngleRef.current.phi));
      
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? 1.1 : 0.9;
      cameraDistanceRef.current = Math.max(30, Math.min(300, cameraDistanceRef.current * delta));
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Анимация
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Обновление позиции камеры
      const radius = cameraDistanceRef.current;
      camera.position.x = radius * Math.sin(cameraAngleRef.current.phi) * Math.cos(cameraAngleRef.current.theta);
      camera.position.y = radius * Math.cos(cameraAngleRef.current.phi);
      camera.position.z = radius * Math.sin(cameraAngleRef.current.phi) * Math.sin(cameraAngleRef.current.theta);
      camera.lookAt(0, 0, 0);
      
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

  const createHouse = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    console.log('Создание дома в 3D');

    // Очищаем сцену
    while(scene.children.length > 2) {
      scene.remove(scene.children[2]);
    }

    const houseElement = elements.find(el => el.type === 'house');
    if (!houseElement) {
      console.log('Элемент дома не найден');
      return;
    }

    console.log('Элемент дома найден:', houseElement);

    // Создание фундамента (сваи)
    createFoundation(houseElement);

    // Создание стен дома
    createHouseWalls(houseElement);

    // Создание внутренних стен
    createInternalWalls();

    // Создание дверей
    createDoors();

    // Создание окон
    createWindows();

    // Крыша убрана для просмотра внутренней планировки

    // Пол дома
    const scale = 0.5;
    const houseWidth = houseElement.width * scale;
    const houseHeight = houseElement.height * scale;
    
    const floorGeometry = new THREE.PlaneGeometry(houseWidth, houseHeight);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xD2B48C });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Земля вокруг дома
    const groundGeometry = new THREE.PlaneGeometry(300, 300);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);
  };

  const createFoundation = (houseElement) => {
    const scene = sceneRef.current;
    const pileHeight = 15;
    const pileRadius = 1;
    const pileColor = 0x8B4513;

    const scale = 0.5;
    const houseWidth = houseElement.width * scale;
    const houseHeight = houseElement.height * scale;
    
    const pilePositions = [
      { x: -houseWidth/2, z: -houseHeight/2 },
      { x: houseWidth/2, z: -houseHeight/2 },
      { x: houseWidth/2, z: houseHeight/2 },
      { x: -houseWidth/2, z: houseHeight/2 },
      { x: 0, z: -houseHeight/2 },
      { x: 0, z: houseHeight/2 },
      { x: -houseWidth/2, z: 0 },
      { x: houseWidth/2, z: 0 },
      { x: 0, z: 0 }
    ];

    pilePositions.forEach(pos => {
      const pileGeometry = new THREE.CylinderGeometry(pileRadius, pileRadius, pileHeight);
      const pileMaterial = new THREE.MeshLambertMaterial({ color: pileColor });
      const pile = new THREE.Mesh(pileGeometry, pileMaterial);
      pile.position.set(pos.x, -pileHeight/2, pos.z);
      pile.castShadow = true;
      scene.add(pile);
    });
  };

  const createHouseWalls = (houseElement) => {
    const scene = sceneRef.current;
    const wallHeight = 30;
    const wallThickness = 2;
    const scale = 0.5;
    const houseWidth = houseElement.width * scale;
    const houseHeight = houseElement.height * scale;
    const wallMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xF5DEB3,
      transparent: true,
      opacity: 0.9
    });

    // Используем периметр если есть, иначе обычные стены
    if (perimeterPoints && perimeterPoints.length >= 3) {
      // Создаем стены по периметру
      for (let i = 0; i < perimeterPoints.length; i++) {
        const start = perimeterPoints[i];
        const end = perimeterPoints[(i + 1) % perimeterPoints.length];
        
        const wallLength = Math.sqrt(
          Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
        ) * scale / 30;
        
        const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        
        const centerX = ((start.x + end.x) / 2 - (houseElement.x + houseElement.width / 2)) * scale / 30;
        const centerZ = ((start.y + end.y) / 2 - (houseElement.y + houseElement.height / 2)) * scale / 30;
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        
        wall.position.set(centerX, wallHeight/2, centerZ);
        wall.rotation.y = angle;
        wall.castShadow = true;
        wall.receiveShadow = true;
        scene.add(wall);
      }
    } else {
      // Обычные стены дома
      const wallPositions = [
        { x: 0, z: -houseHeight/2, width: houseWidth, height: wallThickness },
        { x: 0, z: houseHeight/2, width: houseWidth, height: wallThickness },
        { x: -houseWidth/2, z: 0, width: wallThickness, height: houseHeight },
        { x: houseWidth/2, z: 0, width: wallThickness, height: houseHeight }
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
  };

  const createInternalWalls = () => {
    const scene = sceneRef.current;
    const wallHeight = 30;
    const wallThickness = 1;
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xE6E6FA });
    const houseElement = elements.find(el => el.type === 'house');
    const scale = 0.5;

    walls.forEach(wall => {
      const wallLengthPixels = Math.sqrt(
        Math.pow(wall.end.x - wall.start.x, 2) + Math.pow(wall.end.y - wall.start.y, 2)
      );
      const wallLength = wallLengthPixels * scale;
      
      const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
      const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
      
      const centerX = ((wall.start.x + wall.end.x) / 2 - (houseElement.x + houseElement.width / 2)) * scale;
      const centerZ = ((wall.start.y + wall.end.y) / 2 - (houseElement.y + houseElement.height / 2)) * scale;
      const angle = Math.atan2(wall.end.y - wall.start.y, wall.end.x - wall.start.x);
      
      wallMesh.position.set(centerX, wallHeight/2, centerZ);
      wallMesh.rotation.y = angle;
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      scene.add(wallMesh);
    });
  };

  const createDoors = () => {
    const scene = sceneRef.current;
    const doorHeight = 25;
    const doorWidth = 15;
    const doorThickness = 2;
    const houseElement = elements.find(el => el.type === 'house');
    const scale = 0.5;

    doors.forEach(door => {
      const frameGeometry = new THREE.BoxGeometry(doorWidth + 2, doorHeight + 2, doorThickness + 0.5);
      const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      
      const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, doorThickness);
      const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
      const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
      
      const posX = (door.x - (houseElement.x + houseElement.width / 2)) * scale;
      const posZ = (door.y - (houseElement.y + houseElement.height / 2)) * scale;
      
      let doorAngle = 0;
      if (door.wallStart && door.wallEnd) {
        doorAngle = Math.atan2(door.wallEnd.y - door.wallStart.y, door.wallEnd.x - door.wallStart.x);
      }
      
      frame.position.set(posX, doorHeight/2, posZ);
      doorMesh.position.set(posX, doorHeight/2, posZ);
      
      frame.rotation.y = doorAngle;
      doorMesh.rotation.y = doorAngle;
      
      frame.castShadow = true;
      doorMesh.castShadow = true;
      scene.add(frame);
      scene.add(doorMesh);
    });
  };

  const createWindows = () => {
    const scene = sceneRef.current;
    const windowHeight = 15;
    const windowWidth = 12;
    const windowThickness = 2;
    const houseElement = elements.find(el => el.type === 'house');
    const scale = 0.5;

    windows.forEach(window => {
      const frameGeometry = new THREE.BoxGeometry(windowWidth + 2, windowHeight + 2, windowThickness + 0.5);
      const frameMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      
      const glassGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, windowThickness);
      const glassMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x87CEEB, 
        transparent: true, 
        opacity: 0.3 
      });
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      
      const posX = (window.x - (houseElement.x + houseElement.width / 2)) * scale;
      const posZ = (window.y - (houseElement.y + houseElement.height / 2)) * scale;
      
      let windowAngle = 0;
      if (window.wallStart && window.wallEnd) {
        windowAngle = Math.atan2(window.wallEnd.y - window.wallStart.y, window.wallEnd.x - window.wallStart.x);
      }
      
      frame.position.set(posX, 18, posZ);
      glass.position.set(posX, 18, posZ);
      
      frame.rotation.y = windowAngle;
      glass.rotation.y = windowAngle;
      
      frame.castShadow = true;
      scene.add(frame);
      scene.add(glass);
    });
  };

  const createRoof = (houseElement) => {
    const scene = sceneRef.current;
    const roofHeight = 40;
    
    if (perimeterPoints && perimeterPoints.length >= 3) {
      // Плоская крыша для деформированного дома
      const roofGeometry = new THREE.BoxGeometry(
        houseElement.width/25, 
        4, 
        houseElement.height/25
      );
      const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8B0000 });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 62;
      roof.castShadow = true;
      scene.add(roof);
    } else {
      // Двускатная крыша
      const roofGeometry = new THREE.ConeGeometry(
        Math.max(houseElement.width/40, houseElement.height/40), 
        roofHeight, 
        4
      );
      const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8B0000 });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 60 + roofHeight/2;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      scene.add(roof);
    }
  };

  return (
    <div className={styles.viewer3D}>
      <div className={styles.controls}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕ Закрыть 3D вид
        </button>
        <div className={styles.hint}>
          Зажмите левую кнопку мыши и перетаскивайте для поворота камеры
        </div>
      </div>
      <div ref={mountRef} className={styles.canvas3D} />
    </div>
  );
}