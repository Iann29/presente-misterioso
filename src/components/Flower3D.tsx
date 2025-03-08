import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

// Componente para criar uma pétala de flor com formato mais orgânico
const Petal = ({ position, rotation, color, scale, index }) => {
  const mesh = useRef();
  const hoverColor = new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.2).getStyle();
  const [hover, setHover] = useState(false);
  
  // Animação mais natural das pétalas
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    // Movimento ondulante com defasagem baseada no índice da pétala
    const offset = index * 0.2;
    mesh.current.rotation.z = rotation[2] + Math.sin(t * 0.5 + offset) * 0.12;
    // Leve movimento para cima e para baixo
    mesh.current.position.z = Math.sin(t * 0.3 + offset) * 0.05;
  });

  return (
    <mesh 
      ref={mesh} 
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Geometria curva ao invés de caixa para as pétalas */}
      <cylinderGeometry args={[0.02, 0.2, 1, 8, 1, false, 0, Math.PI]} />
      <meshStandardMaterial 
        color={hover ? hoverColor : color}
        roughness={0.5} 
        metalness={0.1}
        side={THREE.DoubleSide}
        flatShading={false}
      />
    </mesh>
  );
};

// Centro da flor com estames
const FlowerCenter = ({ color }) => {
  const centerRef = useRef();
  const stamenCount = 12;
  
  // Animação suave do centro
  useFrame((state) => {
    if (!centerRef.current) return;
    const t = state.clock.getElapsedTime();
    centerRef.current.rotation.y = t * 0.1;
  });
  
  // Criação dos estames (filamentos no centro da flor)
  const stamens = Array.from({ length: stamenCount }).map((_, i) => {
    const angle = (i / stamenCount) * Math.PI * 2;
    const posX = Math.cos(angle) * 0.1;
    const posY = Math.sin(angle) * 0.1;
    
    return (
      <group key={i} position={[posX, posY, 0.1]} rotation={[0.2, 0, angle]}>
        <mesh>
          <cylinderGeometry args={[0.01, 0.01, 0.2, 6]} />
          <meshStandardMaterial color="#f5deb3" />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#ffa500" />
        </mesh>
      </group>
    );
  });

  return (
    <group ref={centerRef}>
      {/* Centro da flor com textura mais detalhada */}
      <mesh>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.7} 
          metalness={0.1}
          emissive={new THREE.Color(color).lerp(new THREE.Color("#000000"), 0.8)}
          emissiveIntensity={0.2}
        />
      </mesh>
      {stamens}
    </group>
  );
};

// Componente da flor completa
export default function Flower3D({ position = [0, 0, 0], color = "#ff69b4", scale = 1 }) {
  const flowerGroup = useRef();
  const [petalColor, setCenterColor] = useState(color);
  const [centerColor, setPetalColor] = useState(new THREE.Color(color).lerp(new THREE.Color("#ffcc00"), 0.7).getStyle());
  
  // Calcula cores complementares quando a cor muda
  useEffect(() => {
    setCenterColor(color);
    setPetalColor(new THREE.Color(color).lerp(new THREE.Color("#ffcc00"), 0.7).getStyle());
  }, [color]);
  
  // Mais pétalas para uma flor mais realista
  const petalCount = 12;
  const petals = Array.from({ length: petalCount }).map((_, i) => {
    const angle = (i / petalCount) * Math.PI * 2;
    const posX = Math.cos(angle) * 0.3;
    const posY = Math.sin(angle) * 0.3;
    const rotation = [0.3, 0, angle + Math.PI / 2];
    
    // Variação de cores entre pétalas para efeito mais natural
    const variation = Math.sin(i * 0.5) * 0.2;
    const petalVariation = new THREE.Color(petalColor)
      .lerp(new THREE.Color("#ffffff"), 0.1 + variation)
      .getStyle();
    
    return (
      <Petal 
        key={i} 
        index={i}
        position={[posX, posY, 0]} 
        rotation={rotation} 
        color={petalVariation}
        scale={[scale, scale * (0.8 + Math.random() * 0.4), scale]}
      />
    );
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.4}
      position={position}
    >
      <group ref={flowerGroup} scale={scale}>
        {petals}
        <FlowerCenter color={centerColor} />
      </group>
    </Float>
  );
}