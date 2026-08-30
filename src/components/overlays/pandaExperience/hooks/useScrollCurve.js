import { useRef } from "react";
import * as THREE from "three";

/**
 * 每个 Experience 挂载都需要自己的曲线：运行时会重写 `.points` 来完成世界循环，
 * 不能复用模块级曲线实例，否则从详情页回来会继承上一次已被改写的路径。
 */
export const useScrollCurve = (initialCurve, initialPoints, shiftAmount, initialLoopCounter = 1) => {
  const loopStart = Number.isFinite(initialLoopCounter)
    ? Math.trunc(initialLoopCounter)
    : 1;
  const curveRef = useRef(null);
  if (!curveRef.current) {
    const initialOffset = shiftAmount * (loopStart - 1);
    const points = initialPoints.map((point) =>
      point.clone().add(new THREE.Vector3(initialOffset, 0, 0))
    );
    const curve = new THREE.CatmullRomCurve3(points);
    curve.curveType = initialCurve.curveType;
    curve.tension = initialCurve.tension;
    curve.closed = initialCurve.closed;
    curve.arcLengthDivisions = initialCurve.arcLengthDivisions;
    curveRef.current = curve;
  }

  const curvePointsRef = useRef(curveRef.current.points);
  const initialCurvePointsRef = useRef(initialPoints.map((v) => v.clone()));

  const loopCounter = useRef(loopStart);
  const transitionCurveActive = useRef(false);

  const transitionCurvePointsRef = useRef([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0),
  ]);

  const initiateTransitionCurve = () => {
    const targetLoopIndex = loopCounter.current;

    transitionCurvePointsRef.current = [
      initialCurvePointsRef.current[initialCurvePointsRef.current.length - 1]
        .clone()
        .add(new THREE.Vector3(shiftAmount * (targetLoopIndex - 1), 0, 0)),

      initialCurvePointsRef.current[0]
        .clone()
        .add(new THREE.Vector3(shiftAmount * targetLoopIndex, 0, 0)),
    ];

    curvePointsRef.current = transitionCurvePointsRef.current;
    curveRef.current.points = transitionCurvePointsRef.current;
    curveRef.current.needsUpdate = true;
  };

  const shiftCurvePoints = (direction = "forward") => {
    let shiftedPoints = [];
    if (direction === "forward") {
      shiftedPoints = initialCurvePointsRef.current.map((point) =>
        point
          .clone()
          .add(new THREE.Vector3(shiftAmount * loopCounter.current, 0, 0))
      );
    } else {
      shiftedPoints = initialCurvePointsRef.current.map((point) =>
        point
          .clone()
          .add(new THREE.Vector3(shiftAmount * (loopCounter.current - 1), 0, 0))
      );
    }

    curvePointsRef.current = shiftedPoints;
    curveRef.current.points = shiftedPoints;
    curveRef.current.needsUpdate = true;
  };

  return {
    curveRef,
    loopCounter,
    transitionCurveActive,
    initiateTransitionCurve,
    shiftCurvePoints,
    getCurrentPoint: (progress) => curveRef.current.getPoint(progress),
  };
};
