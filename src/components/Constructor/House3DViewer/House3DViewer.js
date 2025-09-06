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

    // Создаем стены с вырезами для дверей
    if (!doors || doors.length === 0) {
      // Обычные стены без проемов
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
      return;
    }
    
    const wallPositions = [
      { x: 0, z: -houseHeight/2, width: houseWidth, height: wallThickness, isHorizontal: true },
      { x: 0, z: houseHeight/2, width: houseWidth, height: wallThickness, isHorizontal: true },
      { x: -houseWidth/2, z: 0, width: wallThickness, height: houseHeight, isHorizontal: false },
      { x: houseWidth/2, z: 0, width: wallThickness, height: houseHeight, isHorizontal: false }
    ];

    wallPositions.forEach(pos => {
      // Проверяем, есть ли двери на этой стене
      const doorsOnWall = doors.filter(door => {
        const doorX = (door.x - (houseElement.x + houseElement.width / 2)) * scale;
        const doorZ = (door.y - (houseElement.y + houseElement.height / 2)) * scale;
        
        if (pos.isHorizontal) {
          return Math.abs(doorZ - pos.z) < 5 && 
                 doorX >= pos.x - pos.width/2 && doorX <= pos.x + pos.width/2;
        } else {
          return Math.abs(doorX - pos.x) < 5 && 
                 doorZ >= pos.z - pos.height/2 && doorZ <= pos.z + pos.height/2;
        }
      });

      if (doorsOnWall.length === 0) {
        // Обычная стена без дверей
        const wallGeometry = new THREE.BoxGeometry(pos.width, wallHeight, pos.height);
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(pos.x, wallHeight/2, pos.z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        scene.add(wall);
      } else {
        // Стена с дверными проемами
        const doorWidth = 15;
        const doorHeight = 25;
        
        doorsOnWall.forEach(door => {
          const doorX = (door.x - (houseElement.x + houseElement.width / 2)) * scale;
          const doorZ = (door.y - (houseElement.y + houseElement.height / 2)) * scale;
          
          if (pos.isHorizontal) {
            // Левый сегмент стены
            const leftWidth = (doorX - doorWidth/2) - (pos.x - pos.width/2);
            if (leftWidth > 1) {
              const leftWall = new THREE.Mesh(
                new THREE.BoxGeometry(leftWidth, wallHeight, pos.height), 
                wallMaterial
              );
              leftWall.position.set(pos.x - pos.width/2 + leftWidth/2, wallHeight/2, pos.z);
              leftWall.castShadow = true;
              scene.add(leftWall);
            }
            
            // Правый сегмент стены
            const rightWidth = (pos.x + pos.width/2) - (doorX + doorWidth/2);
            if (rightWidth > 1) {
              const rightWall = new THREE.Mesh(
                new THREE.BoxGeometry(rightWidth, wallHeight, pos.height), 
                wallMaterial
              );
              rightWall.position.set(pos.x + pos.width/2 - rightWidth/2, wallHeight/2, pos.z);
              rightWall.castShadow = true;
              scene.add(rightWall);
            }
            
            // Верхняя часть над дверью
            const topWallHeight = wallHeight - doorHeight;
            if (topWallHeight > 0) {
              const topWall = new THREE.Mesh(
                new THREE.BoxGeometry(doorWidth, topWallHeight, pos.height), 
                wallMaterial
              );
              topWall.position.set(doorX, doorHeight + topWallHeight/2, pos.z);
              topWall.castShadow = true;
              scene.add(topWall);
            }
          } else {
            // Верхний сегмент стены
            const topHeight = (doorZ - doorWidth/2) - (pos.z - pos.height/2);
            if (topHeight > 1) {
              const topWall = new THREE.Mesh(
                new THREE.BoxGeometry(pos.width, wallHeight, topHeight), 
                wallMaterial
              );
              topWall.position.set(pos.x, wallHeight/2, pos.z - pos.height/2 + topHeight/2);
              topWall.castShadow = true;
              scene.add(topWall);
            }
            
            // Нижний сегмент стены
            const bottomHeight = (pos.z + pos.height/2) - (doorZ + doorWidth/2);
            if (bottomHeight > 1) {
              const bottomWall = new THREE.Mesh(
                new THREE.BoxGeometry(pos.width, wallHeight, bottomHeight), 
                wallMaterial
              );
              bottomWall.position.set(pos.x, wallHeight/2, pos.z + pos.height/2 - bottomHeight/2);
              bottomWall.castShadow = true;
              scene.add(bottomWall);
            }
            
            // Верхняя часть над дверью
            const topWallHeight = wallHeight - doorHeight;
            if (topWallHeight > 0) {
              const topWall = new THREE.Mesh(
                new THREE.BoxGeometry(pos.width, topWallHeight, doorWidth), 
                wallMaterial
              );
              topWall.position.set(pos.x, doorHeight + topWallHeight/2, doorZ);
              topWall.castShadow = true;
              scene.add(topWall);
            }
          }
        });
      }
    });
  };

  const createInternalWalls = () => {
    const scene = sceneRef.current;
    const wallHeight = 30;
    const wallThickness = 1;
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xE6E6FA });
    const houseElement = elements.find(el => el.type === 'house');
    const scale = 0.5;

    walls.forEach(wall => {
      // Проверяем, есть ли двери на этой стене
      const doorsOnWall = doors.filter(door => {
        if (!door.wallStart || !door.wallEnd) return false;
        
        // Проверяем, находится ли дверь на этой стене (по расстоянию)
        const distToStart = Math.sqrt(Math.pow(door.x - wall.start.x, 2) + Math.pow(door.y - wall.start.y, 2));
        const distToEnd = Math.sqrt(Math.pow(door.x - wall.end.x, 2) + Math.pow(door.y - wall.end.y, 2));
        const wallLength = Math.sqrt(Math.pow(wall.end.x - wall.start.x, 2) + Math.pow(wall.end.y - wall.start.y, 2));
        
        // Дверь на стене, если сумма расстояний примерно равна длине стены
        return Math.abs((distToStart + distToEnd) - wallLength) < 5;
      });
      
      const wallLengthPixels = Math.sqrt(
        Math.pow(wall.end.x - wall.start.x, 2) + Math.pow(wall.end.y - wall.start.y, 2)
      );
      const wallLength = wallLengthPixels * scale;
      const centerX = ((wall.start.x + wall.end.x) / 2 - (houseElement.x + houseElement.width / 2)) * scale;
      const centerZ = ((wall.start.y + wall.end.y) / 2 - (houseElement.y + houseElement.height / 2)) * scale;
      const angle = Math.atan2(wall.end.y - wall.start.y, wall.end.x - wall.start.x);
      
      if (doorsOnWall.length === 0) {
        // Обычная стена без дверей
        const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
        const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
        wallMesh.position.set(centerX, wallHeight/2, centerZ);
        wallMesh.rotation.y = angle;
        wallMesh.castShadow = true;
        wallMesh.receiveShadow = true;
        scene.add(wallMesh);
      } else {
        // Стена с дверными проемами
        const doorWidth = 15;
        const doorHeight = 25;
        
        doorsOnWall.forEach(door => {
          const doorPosOnWall = Math.sqrt(
            Math.pow(door.x - wall.start.x, 2) + Math.pow(door.y - wall.start.y, 2)
          ) * scale;
          
          // Левый сегмент
          const leftLength = doorPosOnWall - doorWidth/2;
          if (leftLength > 1) {
            const leftWall = new THREE.Mesh(
              new THREE.BoxGeometry(leftLength, wallHeight, wallThickness),
              wallMaterial
            );
            const leftCenterX = ((wall.start.x + (wall.start.x + (wall.end.x - wall.start.x) * leftLength / wallLength)) / 2 - (houseElement.x + houseElement.width / 2)) * scale;
            const leftCenterZ = ((wall.start.y + (wall.start.y + (wall.end.y - wall.start.y) * leftLength / wallLength)) / 2 - (houseElement.y + houseElement.height / 2)) * scale;
            leftWall.position.set(leftCenterX, wallHeight/2, leftCenterZ);
            leftWall.rotation.y = angle;
            leftWall.castShadow = true;
            scene.add(leftWall);
          }
          
          // Правый сегмент
          const rightLength = wallLength - doorPosOnWall - doorWidth/2;
          if (rightLength > 1) {
            const rightWall = new THREE.Mesh(
              new THREE.BoxGeometry(rightLength, wallHeight, wallThickness),
              wallMaterial
            );
            const rightStartPos = doorPosOnWall + doorWidth/2;
            const rightCenterX = (((wall.start.x + (wall.end.x - wall.start.x) * rightStartPos / wallLength) + wall.end.x) / 2 - (houseElement.x + houseElement.width / 2)) * scale;
            const rightCenterZ = (((wall.start.y + (wall.end.y - wall.start.y) * rightStartPos / wallLength) + wall.end.y) / 2 - (houseElement.y + houseElement.height / 2)) * scale;
            rightWall.position.set(rightCenterX, wallHeight/2, rightCenterZ);
            rightWall.rotation.y = angle;
            rightWall.castShadow = true;
            scene.add(rightWall);
          }
          
          // Верхняя часть над дверью
          const topWallHeight = wallHeight - doorHeight;
          if (topWallHeight > 0) {
            const topWall = new THREE.Mesh(
              new THREE.BoxGeometry(doorWidth, topWallHeight, wallThickness),
              wallMaterial
            );
            const doorCenterX = (door.x - (houseElement.x + houseElement.width / 2)) * scale;
            const doorCenterZ = (door.y - (houseElement.y + houseElement.height / 2)) * scale;
            topWall.position.set(doorCenterX, doorHeight + topWallHeight/2, doorCenterZ);
            topWall.rotation.y = angle;
            topWall.castShadow = true;
            scene.add(topWall);
          }
        });
      }
    });
  };

  const createDoors = () => {
    const scene = sceneRef.current;
    const doorHeight = 25;
    const doorWidth = 15;
    const doorThickness = 2;
    const frameThickness = 1;
    const houseElement = elements.find(el => el.type === 'house');
    const scale = 0.5;

    doors.forEach(door => {
      const posX = (door.x - (houseElement.x + houseElement.width / 2)) * scale;
      const posZ = (door.y - (houseElement.y + houseElement.height / 2)) * scale;
      
      let doorAngle = 0;
      if (door.wallStart && door.wallEnd) {
        doorAngle = Math.atan2(door.wallEnd.y - door.wallStart.y, door.wallEnd.x - door.wallStart.x);
      }
      
      const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      
      // Верхняя перекладина рамы
      const topFrame = new THREE.Mesh(new THREE.BoxGeometry(doorWidth + 2, frameThickness, doorThickness), frameMaterial);
      topFrame.position.set(posX, doorHeight - frameThickness/2, posZ);
      topFrame.rotation.y = doorAngle;
      scene.add(topFrame);
      
      // Левая стойка рамы
      const leftFrame = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, doorHeight, doorThickness), frameMaterial);
      leftFrame.position.set(posX - (doorWidth + frameThickness)/2 * Math.cos(doorAngle), doorHeight/2, posZ - (doorWidth + frameThickness)/2 * Math.sin(doorAngle));
      leftFrame.rotation.y = doorAngle;
      scene.add(leftFrame);
      
      // Правая стойка рамы
      const rightFrame = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, doorHeight, doorThickness), frameMaterial);
      rightFrame.position.set(posX + (doorWidth + frameThickness)/2 * Math.cos(doorAngle), doorHeight/2, posZ + (doorWidth + frameThickness)/2 * Math.sin(doorAngle));
      rightFrame.rotation.y = doorAngle;
      scene.add(rightFrame);
      
      // Открытая дверь (крепится к левой стойке)
      const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 1);
      const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
      const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
      
      // Позиция открытой двери относительно левой стойки
      const hingeX = posX - (doorWidth + frameThickness)/2 * Math.cos(doorAngle);
      const hingeZ = posZ - (doorWidth + frameThickness)/2 * Math.sin(doorAngle);
      
      const doorOpenOffset = doorWidth / 2;
      const openOffsetX = Math.cos(doorAngle + Math.PI/2) * doorOpenOffset;
      const openOffsetZ = Math.sin(doorAngle + Math.PI/2) * doorOpenOffset;
      
      doorMesh.position.set(hingeX + openOffsetX, doorHeight/2, hingeZ + openOffsetZ);
      doorMesh.rotation.y = doorAngle + Math.PI/3;
      doorMesh.castShadow = true;
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
      const posX = (window.x - (houseElement.x + houseElement.width / 2)) * scale;
      const posZ = (window.y - (houseElement.y + houseElement.height / 2)) * scale;
      
      let windowAngle = 0;
      if (window.wallStart && window.wallEnd) {
        windowAngle = Math.atan2(window.wallEnd.y - window.wallStart.y, window.wallEnd.x - window.wallStart.x);
      }
      
      // Рама окна
      const frameGeometry = new THREE.BoxGeometry(windowWidth + 2, windowHeight + 2, windowThickness + 0.5);
      const frameMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(posX, 18, posZ);
      frame.rotation.y = windowAngle;
      frame.castShadow = true;
      scene.add(frame);
      
      // Прозрачное стекло
      const glassGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 0.1);
      const glassMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x87CEEB, 
        transparent: true, 
        opacity: 0.2 
      });
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.set(posX, 18, posZ);
      glass.rotation.y = windowAngle;
      scene.add(glass);
      
      // Вертикальная перемычка
      const vDividerGeometry = new THREE.BoxGeometry(0.5, windowHeight, windowThickness);
      const dividerMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      const vDivider = new THREE.Mesh(vDividerGeometry, dividerMaterial);
      vDivider.position.set(posX, 18, posZ);
      vDivider.rotation.y = windowAngle;
      scene.add(vDivider);
      
      // Горизонтальная перемычка
      const hDividerGeometry = new THREE.BoxGeometry(windowWidth, 0.5, windowThickness);
      const hDivider = new THREE.Mesh(hDividerGeometry, dividerMaterial);
      hDivider.position.set(posX, 18, posZ);
      hDivider.rotation.y = windowAngle;
      scene.add(hDivider);
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