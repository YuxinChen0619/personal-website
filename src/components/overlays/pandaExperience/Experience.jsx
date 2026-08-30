import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Scene from "./Scene";
import * as THREE from "three";
import normalizeWheel from "./utils/normalizeWheel";

const DEFAULT_SCENE_SNAPSHOT = {
  scrollProgress: 0,
  loopCounter: 1,
  sceneOffsetX: 0,
  singleSheetOffsetX: 0,
  activeStation: null,
  cameraGroupPosition: [0, 0, 0],
  cameraGroupQuaternion: [0, 0, 0, 1],
};

const Experience = ({ initialSceneSnapshot = DEFAULT_SCENE_SNAPSHOT, onStationChange, onSceneSnapshotChange, onSceneReady }) => {
  const camera = useRef();
  const cameraGroup = useRef();
  const scrollProgress = useRef(initialSceneSnapshot.scrollProgress);
  const targetScrollProgress = useRef(initialSceneSnapshot.scrollProgress);
  const baseScrollSpeed = 0.0085;
  const scrollSpeedMultiplier = useRef(1);
  const lerpFactor = 0.1;
  const isSwiping = useRef(false);
  const mousePositionOffset = useRef(new THREE.Vector3());
  const mouseRotationOffset = useRef(new THREE.Euler());
  const lastTouchY = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const normalized = normalizeWheel(e);

      targetScrollProgress.current +=
        Math.sign(normalized.pixelY) *
        baseScrollSpeed *
        scrollSpeedMultiplier.current *
        Math.min(Math.abs(normalized.pixelY) / 100, 1);
    };

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      const sensitivityX = 0.05;
      const sensitivityY = 0.05;

      mousePositionOffset.current.x = mouseX * sensitivityX;
      mousePositionOffset.current.y = mouseY * sensitivityY;

      const rotationSensitivityX = 0.05;
      const rotationSensitivityY = 0.05;

      mouseRotationOffset.current.x = mouseY * rotationSensitivityX;
      mouseRotationOffset.current.y = mouseX * rotationSensitivityY;
    };

    const handleTouchStart = (e) => {
      isSwiping.current = true;
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isSwiping.current) return;
      e.preventDefault();

      if (lastTouchY.current !== null) {
        const deltaY = e.touches[0].clientY - lastTouchY.current;
        const touchMultiplier = 0.3;
        targetScrollProgress.current +=
          Math.sign(deltaY) *
          baseScrollSpeed *
          touchMultiplier *
          scrollSpeedMultiplier.current;
      }
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      isSwiping.current = false;
      lastTouchY.current = null;
    };

    const handleMouseDown = (e) => {
      if (e.pointerType === "touch") return;
      isSwiping.current = true;
    };

    const handleMouseDrag = (e) => {
      if (!isSwiping.current || e.pointerType === "touch") return;
      const mouseMultiplier = 0.2;
      targetScrollProgress.current +=
        Math.sign(e.movementY) * baseScrollSpeed * mouseMultiplier;
    };

    const handleMouseUp = () => {
      isSwiping.current = false;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerdown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseDrag);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseDrag);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <Canvas
      shadows
      flat={true}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene
        cameraGroup={cameraGroup}
        camera={camera}
        scrollProgress={scrollProgress}
        targetScrollProgress={targetScrollProgress}
        lerpFactor={lerpFactor}
        mousePositionOffset={mousePositionOffset}
        mouseRotationOffset={mouseRotationOffset}
        scrollSpeedMultiplier={scrollSpeedMultiplier}
        initialSceneSnapshot={initialSceneSnapshot}
        onStationChange={onStationChange}
        onSceneSnapshotChange={onSceneSnapshotChange}
        onSceneReady={onSceneReady}
      />

      <group
        ref={cameraGroup}
        position={initialSceneSnapshot.cameraGroupPosition}
        quaternion={initialSceneSnapshot.cameraGroupQuaternion}
      >
        <PerspectiveCamera
          ref={camera}
          makeDefault
          fov={35}
          // position={[0, 0, 30]}
        />
      </group>
    </Canvas>
  );
};

export default Experience;
