import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sparkles } from '@react-three/drei';
import Flower3D from '../components/Flower3D';

export default function FlowerScene() {
  // Criando várias flores em posições diferentes
  const flowers = [
    { position: [0, 0, 0], color: "#ff69b4", scale: 1 },
    { position: [-1.5, 0.8, -1], color: "#ff1493", scale: 0.8 },
    { position: [1.5, 0.5, -0.5], color: "#db7093", scale: 0.9 },
    { position: [-0.8, -0.9, 0.2], color: "#ff69b4", scale: 0.7 },
    { position: [1, -0.7, 0.5], color: "#c71585", scale: 0.85 },
  ];

  return (
    <div className="h-[50vh] md:h-[60vh] w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {flowers.map((flower, index) => (
            <Flower3D 
              key={index}
              position={flower.position} 
              color={flower.color}
              scale={flower.scale}
            />
          ))}
          
          <Sparkles count={200} scale={10} size={1} speed={0.4} opacity={0.5} />
          <Environment preset="sunset" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.3}
            rotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.3}
            // Definindo o ângulo inicial para mostrar as flores de frente
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
