
   import { useEffect, useRef } from "react";

export default function RainEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let drops = [];

    // create rain drops
    for (let i = 0; i < 200; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 5,
        opacity: Math.random(),
      });
    }

    function drawRain() {
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${drop.opacity})`;

        // slanted rain like umbrella rain 🌧️
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 2, drop.y + drop.length);

        ctx.stroke();
      });

      updateRain();
    }

    function updateRain() {
      drops.forEach((drop) => {
        drop.y += drop.speed;
        drop.x += 0.5; // slight angle (wind effect)

        if (drop.y > height) {
          drop.y = -20;
          drop.x = Math.random() * width;
        }
      });
    }

    function animate() {
      drawRain();
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}