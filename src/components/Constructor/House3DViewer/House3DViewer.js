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

  const createWallWithOpenings = (scene, wallMaterial, startX, startZ, endX, endZ, wallAngle, wallHeight, wallThickness, openings, houseElement, scale, pileHeight) => {
    const wallLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endZ - startZ, 2));
    const wallVector = new THREE.Vector3(endX - startX, 0, endZ - startZ).normalize();
    const startPos = new THREE.Vector3(startX, 0, startZ);
    
    // Сортируем проемы по позиции на стене
    openings.sort((a, b) => {
      const aPos = new THREE.Vector3(
        (a.x - (houseElement.x + houseElement.width / 2)) * scale,
        0,
        (a.y - (houseElement.y + houseElement.height / 2)) * scale
      );
      const bPos = new THREE.Vector3(
        (b.x - (houseElement.x + houseElement.width / 2)) * scale,
        0,
        (b.y - (houseElement.y + houseElement.height / 2)) * scale
      );
      return aPos.distanceTo(startPos) - bPos.distanceTo(startPos);
    });
    
    let lastPos = 0;
    
    openings.forEach(opening => {
      const openingPos = new THREE.Vector3(
        (opening.x - (houseElement.x + houseElement.width / 2)) * scale,
        0,
        (opening.y - (houseElement.y + houseElement.height / 2)) * scale
      );
      const distFromStart = openingPos.distanceTo(startPos);
      const openingWidth = (opening.width || 30) * scale;
      const isDoor = doors && doors.find(d => d.id === opening.id);
      const openingHeight = isDoor ? 60 : 36; // Дверь 2м, окно 1.2м
      
      // Сегмент стены до проема - полная высота
      const segmentLength = distFromStart - lastPos - openingWidth/2;
      if (segmentLength > 0.1) {
        const segmentCenter = startPos.clone().add(wallVector.clone().multiplyScalar(lastPos + segmentLength/2));
        const segmentGeometry = new THREE.BoxGeometry(segmentLength, wallHeight, wallThickness);
        const segmentWall = new THREE.Mesh(segmentGeometry, wallMaterial);
        segmentWall.position.copy(segmentCenter);
        segmentWall.position.y = pileHeight + wallHeight/2;
        segmentWall.rotation.y = -wallAngle;
        segmentWall.castShadow = true;
        segmentWall.receiveShadow = true;
        scene.add(segmentWall);
      }
      
      // Создаем части стены вокруг проема
      const openingCenter = startPos.clone().add(wallVector.clone().multiplyScalar(distFromStart));
      
      // Перемычка над проемом (для дверей и окон)
      const lintelHeight = wallHeight - openingHeight;
      if (lintelHeight > 0) {
        const lintelGeometry = new THREE.BoxGeometry(openingWidth, lintelHeight, wallThickness);
        const lintel = new THREE.Mesh(lintelGeometry, wallMaterial);
        lintel.position.copy(openingCenter);
        lintel.position.y = pileHeight + openingHeight + lintelHeight/2;
        lintel.rotation.y = -wallAngle;
        lintel.castShadow = true;
        lintel.receiveShadow = true;
        scene.add(lintel);
      }
      
      // Для окон добавляем подоконник
      if (!isDoor) {
        const sillHeight = wallHeight - 28; // Высота от пола до низа окна
        if (sillHeight > 0) {
          const sillGeometry = new THREE.BoxGeometry(openingWidth, sillHeight, wallThickness);
          const sill = new THREE.Mesh(sillGeometry, wallMaterial);
          sill.position.copy(openingCenter);
          sill.position.y = pileHeight + sillHeight/2;
          sill.rotation.y = -wallAngle;
          sill.castShadow = true;
          sill.receiveShadow = true;
          scene.add(sill);
        }
      }
      
      lastPos = distFromStart + openingWidth/2;
    });
    
    // Последний сегмент стены - полная высота
    const finalSegmentLength = wallLength - lastPos;
    if (finalSegmentLength > 0.1) {
      const segmentCenter = startPos.clone().add(wallVector.clone().multiplyScalar(lastPos + finalSegmentLength/2));
      const segmentGeometry = new THREE.BoxGeometry(finalSegmentLength, wallHeight, wallThickness);
      const segmentWall = new THREE.Mesh(segmentGeometry, wallMaterial);
      segmentWall.position.copy(segmentCenter);
      segmentWall.position.y = pileHeight + wallHeight/2;
      segmentWall.rotation.y = -wallAngle;
      segmentWall.castShadow = true;
      segmentWall.receiveShadow = true;
      scene.add(segmentWall);
    }
  };

  const createHouse = (scene) => {
    const houseElement = elements.find(el => el.type === 'house');
    if (!houseElement) return;

    const scale = 1.2; // Увеличиваем масштаб для лучшего отображения
    const pileHeight = 9; // Высота свай над землей

    // Свайно-винтовой фундамент
    const pileMaterial = new THREE.MeshLambertMaterial({ color: 0x4A4A4A });
    const capMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
    
    const houseWidth = houseElement.width * scale;
    const houseHeight = houseElement.height * scale;
    const pileSpacing = 36; // Расстояние между сваями (1.2м)
    
    const pilesX = Math.ceil(houseWidth / pileSpacing) + 1;
    const pilesZ = Math.ceil(houseHeight / pileSpacing) + 1;
    
    for (let i = 0; i < pilesX; i++) {
      for (let j = 0; j < pilesZ; j++) {
        const x = -houseWidth/2 + (i * houseWidth / (pilesX - 1));
        const z = -houseHeight/2 + (j * houseHeight / (pilesZ - 1));
        
        // Свая (цилиндр)
        const pileGeometry = new THREE.CylinderGeometry(1.5, 1.5, pileHeight, 8);
        const pile = new THREE.Mesh(pileGeometry, pileMaterial);
        pile.position.set(x, pileHeight/2 - 2, z);
        pile.castShadow = true;
        scene.add(pile);
        
        // Оголовок сваи (расширение сверху)
        const capGeometry = new THREE.CylinderGeometry(2.5, 2.5, 2, 8);
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.set(x, pileHeight - 2, z);
        cap.castShadow = true;
        scene.add(cap);
      }
    }

    // Пол дома (поднят на высоту свай)
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
      floor.position.y = pileHeight;
      scene.add(floor);
    } else {
      // Обычный пол
      const floorGeometry = new THREE.PlaneGeometry(houseWidth, houseHeight);
      const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xD2B48C });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = pileHeight;
      scene.add(floor);
    }

    // Стены дома (2.2м = 66 единиц)
    const wallHeight = 66;
    const wallThickness = 6;
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xF5DEB3 });

    if (perimeterPoints && perimeterPoints.length >= 4) {
      // Стены по деформированному периметру с проемами для дверей и окон
      for (let i = 0; i < perimeterPoints.length; i++) {
        const start = perimeterPoints[i];
        const end = perimeterPoints[(i + 1) % perimeterPoints.length];
        
        const startX = (start.x - (houseElement.x + houseElement.width / 2)) * scale;
        const startZ = (start.y - (houseElement.y + houseElement.height / 2)) * scale;
        const endX = (end.x - (houseElement.x + houseElement.width / 2)) * scale;
        const endZ = (end.y - (houseElement.y + houseElement.height / 2)) * scale;
        
        const wallVector = new THREE.Vector3(endX - startX, 0, endZ - startZ);
        const wallLength = wallVector.length();
        wallVector.normalize();
        
        const extension = wallThickness / 2;
        const extendedStartX = startX - wallVector.x * extension;
        const extendedStartZ = startZ - wallVector.z * extension;
        const extendedEndX = endX + wallVector.x * extension;
        const extendedEndZ = endZ + wallVector.z * extension;
        
        const extendedLength = wallLength + wallThickness;
        const wallAngle = Math.atan2(endZ - startZ, endX - startX);
        const centerX = (extendedStartX + extendedEndX) / 2;
        const centerZ = (extendedStartZ + extendedEndZ) / 2;
        
        // Находим проемы на этой стене
        const wallId = `perimeter-${i}`;
        const wallOpenings = [...(doors || []), ...(windows || [])].filter(opening => 
          opening.wallId === wallId && opening.type === 'perimeter'
        );
        
        if (wallOpenings.length === 0) {
          // Обычная стена без проемов
          const wallGeometry = new THREE.BoxGeometry(extendedLength, wallHeight, wallThickness);
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.position.set(centerX, pileHeight + wallHeight/2, centerZ);
          wall.rotation.y = -wallAngle;
          wall.castShadow = true;
          wall.receiveShadow = true;
          scene.add(wall);
        } else {
          // Создаем стену с проемами
          createWallWithOpenings(scene, wallMaterial, extendedStartX, extendedStartZ, extendedEndX, extendedEndZ, wallAngle, wallHeight, wallThickness, wallOpenings, houseElement, scale, pileHeight);
        }
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
        wall.position.set(pos.x, pileHeight + wallHeight/2, pos.z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        scene.add(wall);
      });
    }

    // Внутренние стены с проемами
    const internalWallMaterial = new THREE.MeshLambertMaterial({ color: 0xE6E6FA });
    walls.forEach(wall => {
      const startX = (wall.start.x - (houseElement.x + houseElement.width / 2)) * scale;
      const startZ = (wall.start.y - (houseElement.y + houseElement.height / 2)) * scale;
      const endX = (wall.end.x - (houseElement.x + houseElement.width / 2)) * scale;
      const endZ = (wall.end.y - (houseElement.y + houseElement.height / 2)) * scale;
      const angle = Math.atan2(wall.end.y - wall.start.y, wall.end.x - wall.start.x);
      
      // Находим проемы на этой стене
      const wallOpenings = [...(doors || []), ...(windows || [])].filter(opening => 
        opening.wallId === wall.id && opening.type === 'internal'
      );
      
      if (wallOpenings.length === 0) {
        // Обычная стена без проемов
        const wallLengthPixels = Math.sqrt(
          Math.pow(wall.end.x - wall.start.x, 2) + Math.pow(wall.end.y - wall.start.y, 2)
        );
        const wallLength = wallLengthPixels * scale;
        const centerX = (startX + endX) / 2;
        const centerZ = (startZ + endZ) / 2;
        
        const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, 3);
        const wallMesh = new THREE.Mesh(wallGeometry, internalWallMaterial);
        wallMesh.position.set(centerX, pileHeight + wallHeight/2, centerZ);
        wallMesh.rotation.y = -angle;
        wallMesh.castShadow = true;
        wallMesh.receiveShadow = true;
        scene.add(wallMesh);
      } else {
        // Создаем стену с проемами
        createWallWithOpenings(scene, internalWallMaterial, startX, startZ, endX, endZ, angle, wallHeight, 3, wallOpenings, houseElement, scale, pileHeight);
      }
    });

    // Двери в 3D - для всех типов стен
    if (doors && doors.length > 0) {
      doors.forEach(door => {
        
        const doorWidth = (door.width || 30) * scale;
        const doorHeight = 60; // 2м стандартная высота двери
        const frameDepth = wallThickness + 1;
        
        const doorX = (door.x - (houseElement.x + houseElement.width / 2)) * scale;
        const doorZ = (door.y - (houseElement.y + houseElement.height / 2)) * scale;
        
        let doorAngle = 0;
        if (door.wallEnd && door.wallStart) {
          const wallDx = door.wallEnd.x - door.wallStart.x;
          const wallDy = door.wallEnd.y - door.wallStart.y;
          doorAngle = Math.atan2(wallDy, wallDx);
        }
        
        // Дверная рама (толще стены)
        const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        
        // Верхняя перекладина
        const topFrameGeometry = new THREE.BoxGeometry(doorWidth + 2, 4, frameDepth);
        const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
        topFrame.position.set(doorX, pileHeight + doorHeight - 2, doorZ);
        topFrame.rotation.y = -doorAngle;
        topFrame.castShadow = true;
        scene.add(topFrame);
        
        // Левая стойка
        const leftFrameGeometry = new THREE.BoxGeometry(2, doorHeight - 4, frameDepth);
        const leftFrame = new THREE.Mesh(leftFrameGeometry, frameMaterial);
        const leftOffset = new THREE.Vector3(-(doorWidth + 2)/2, 0, 0);
        leftOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -doorAngle);
        leftFrame.position.set(doorX + leftOffset.x, pileHeight + (doorHeight - 4)/2, doorZ + leftOffset.z);
        leftFrame.rotation.y = -doorAngle;
        leftFrame.castShadow = true;
        scene.add(leftFrame);
        
        // Правая стойка
        const rightFrameGeometry = new THREE.BoxGeometry(2, doorHeight - 4, frameDepth);
        const rightFrame = new THREE.Mesh(rightFrameGeometry, frameMaterial);
        const rightOffset = new THREE.Vector3((doorWidth + 2)/2, 0, 0);
        rightOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -doorAngle);
        rightFrame.position.set(doorX + rightOffset.x, pileHeight + (doorHeight - 4)/2, doorZ + rightOffset.z);
        rightFrame.rotation.y = -doorAngle;
        rightFrame.castShadow = true;
        scene.add(rightFrame);
        
        // Приоткрытая дверь
        const doorPanelWidth = doorWidth - 2;
        const doorPanelHeight = doorHeight - 4;
        const doorPanelGeometry = new THREE.BoxGeometry(doorPanelWidth, doorPanelHeight, 2.5);
        const doorPanelMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const doorPanel = new THREE.Mesh(doorPanelGeometry, doorPanelMaterial);
        
        // Филенки на двери
        const panelGeometry = new THREE.BoxGeometry(doorPanelWidth * 0.8, doorPanelHeight * 0.35, 0.4);
        const panelMaterial = new THREE.MeshLambertMaterial({ color: 0x4A4A4A });
        
        const topPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        const bottomPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        
        // Ручка двери
        const handleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 8);
        const handleMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.rotation.z = Math.PI / 2;
        
        // Позиционирование приоткрытой двери
        const openAngle = Math.PI * 0.25;
        const hingeOffset = new THREE.Vector3(-doorWidth/2, 0, 0);
        hingeOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -doorAngle);
        const hingeX = doorX + hingeOffset.x;
        const hingeZ = doorZ + hingeOffset.z;
        
        const doorCenterOffset = new THREE.Vector3(doorPanelWidth/2, 0, 0);
        doorCenterOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -doorAngle + openAngle);
        const doorCenterX = hingeX + doorCenterOffset.x;
        const doorCenterZ = hingeZ + doorCenterOffset.z;
        
        doorPanel.position.set(doorCenterX, pileHeight + doorPanelHeight/2, doorCenterZ);
        doorPanel.rotation.y = -doorAngle + openAngle;
        
        topPanel.position.set(0, doorPanelHeight * 0.25, 1.4);
        bottomPanel.position.set(0, -doorPanelHeight * 0.25, 1.4);
        handle.position.set(doorPanelWidth * 0.3, 0, 1.8);
        
        doorPanel.add(topPanel);
        doorPanel.add(bottomPanel);
        doorPanel.add(handle);
        doorPanel.castShadow = true;
        scene.add(doorPanel);
      });
    }
    
    // Окна в 3D - для всех типов стен
    if (windows && windows.length > 0) {
      windows.forEach(window => {
        
        const windowWidth = (window.width || 30) * scale;
        const windowHeight = 36; // 1.2м стандартная высота окна
        const frameDepth = wallThickness + 2;
        
        const windowX = (window.x - (houseElement.x + houseElement.width / 2)) * scale;
        const windowZ = (window.y - (houseElement.y + houseElement.height / 2)) * scale;
        const windowY = pileHeight + 30; // Окно на высоте 1м от пола дома
        
        let windowAngle = 0;
        if (window.wallEnd && window.wallStart) {
          const wallDx = window.wallEnd.x - window.wallStart.x;
          const wallDy = window.wallEnd.y - window.wallStart.y;
          windowAngle = Math.atan2(wallDy, wallDx);
        }
        
        // Материалы
        const frameMaterial = new THREE.MeshLambertMaterial({ color: 0xF5F5F5 });
        const glassMaterial = new THREE.MeshLambertMaterial({ 
          color: 0xE0F6FF, 
          transparent: true, 
          opacity: 0.2
        });
        const sashMaterial = new THREE.MeshLambertMaterial({ color: 0xE8E8E8 });
        
        // Внешняя рама окна (коробка)
        const outerFrameWidth = windowWidth + 6;
        const outerFrameHeight = windowHeight + 6;
        
        // Верхняя часть рамы
        const topFrameGeometry = new THREE.BoxGeometry(outerFrameWidth, 3, frameDepth);
        const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
        topFrame.position.set(windowX, windowY + windowHeight/2 + 1.5, windowZ);
        topFrame.rotation.y = -windowAngle;
        topFrame.castShadow = true;
        scene.add(topFrame);
        
        // Нижняя часть рамы (подоконник)
        const bottomFrameGeometry = new THREE.BoxGeometry(outerFrameWidth, 4, frameDepth + 2);
        const bottomFrame = new THREE.Mesh(bottomFrameGeometry, frameMaterial);
        bottomFrame.position.set(windowX, windowY - windowHeight/2 - 2, windowZ);
        bottomFrame.rotation.y = -windowAngle;
        bottomFrame.castShadow = true;
        scene.add(bottomFrame);
        
        // Боковые части рамы
        const sideFrameGeometry = new THREE.BoxGeometry(3, windowHeight + 6, frameDepth);
        const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
        const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
        
        const leftOffset = new THREE.Vector3(-outerFrameWidth/2, 0, 0);
        const rightOffset = new THREE.Vector3(outerFrameWidth/2, 0, 0);
        leftOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -windowAngle);
        rightOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -windowAngle);
        
        leftFrame.position.set(windowX + leftOffset.x, windowY, windowZ + leftOffset.z);
        rightFrame.position.set(windowX + rightOffset.x, windowY, windowZ + rightOffset.z);
        leftFrame.rotation.y = -windowAngle;
        rightFrame.rotation.y = -windowAngle;
        leftFrame.castShadow = true;
        rightFrame.castShadow = true;
        scene.add(leftFrame);
        scene.add(rightFrame);
        
        // Створки окна (разделение на 4 части)
        const sashWidth = windowWidth / 2 - 1;
        const sashHeight = windowHeight / 2 - 1;
        
        // Центральная вертикальная перемычка
        const vSashGeometry = new THREE.BoxGeometry(2, windowHeight, 1.5);
        const vSash = new THREE.Mesh(vSashGeometry, sashMaterial);
        vSash.position.set(windowX, windowY, windowZ);
        vSash.rotation.y = -windowAngle;
        vSash.castShadow = true;
        scene.add(vSash);
        
        // Центральная горизонтальная перемычка
        const hSashGeometry = new THREE.BoxGeometry(windowWidth, 2, 1.5);
        const hSash = new THREE.Mesh(hSashGeometry, sashMaterial);
        hSash.position.set(windowX, windowY, windowZ);
        hSash.rotation.y = -windowAngle;
        hSash.castShadow = true;
        scene.add(hSash);
        
        // 4 стеклопакета
        const glassPositions = [
          { x: -sashWidth/2 - 0.5, y: sashHeight/2 + 0.5 }, // верхний левый
          { x: sashWidth/2 + 0.5, y: sashHeight/2 + 0.5 },  // верхний правый
          { x: -sashWidth/2 - 0.5, y: -sashHeight/2 - 0.5 }, // нижний левый
          { x: sashWidth/2 + 0.5, y: -sashHeight/2 - 0.5 }   // нижний правый
        ];
        
        glassPositions.forEach(pos => {
          const glassGeometry = new THREE.BoxGeometry(sashWidth, sashHeight, 0.3);
          const glass = new THREE.Mesh(glassGeometry, glassMaterial);
          
          const glassOffset = new THREE.Vector3(pos.x, pos.y, 0);
          glassOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -windowAngle);
          
          glass.position.set(
            windowX + glassOffset.x, 
            windowY + pos.y, 
            windowZ + glassOffset.z
          );
          glass.rotation.y = -windowAngle;
          scene.add(glass);
        });
        
        // Ручки на створках
        const handleMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
        const handleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 6);
        
        // Ручка на правой створке
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        const handleOffset = new THREE.Vector3(windowWidth/4, 0, 0);
        handleOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -windowAngle);
        handle.position.set(
          windowX + handleOffset.x, 
          windowY - 5, 
          windowZ + handleOffset.z
        );
        handle.rotation.z = Math.PI / 2;
        handle.rotation.y = -windowAngle;
        scene.add(handle);
      });
    }

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