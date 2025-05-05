"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const MouseMove: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const intersection = new THREE.Vector3();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, intersection);
      cube.position.copy(intersection);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-screen h-screen" />;
};

export default MouseMove;
