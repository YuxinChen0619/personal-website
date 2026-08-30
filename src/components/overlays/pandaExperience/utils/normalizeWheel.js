// 与参考项目所用 normalize-wheel 的输出形状保持一致，避免额外引入运行依赖。
export default function normalizeWheel(event) {
  const pixelY = event.deltaY ?? 0;
  const pixelX = event.deltaX ?? 0;
  const lineHeight = 40;
  const pageHeight = window.innerHeight || 800;
  const factor = event.deltaMode === 1 ? lineHeight : event.deltaMode === 2 ? pageHeight : 1;

  return {
    spinX: pixelX / lineHeight,
    spinY: pixelY / lineHeight,
    pixelX: pixelX * factor,
    pixelY: pixelY * factor,
  };
}
