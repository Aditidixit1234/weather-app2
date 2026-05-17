import React from "react";
import "./SnowEffect.css";

export default function SnowEffect() {
  return (
    <div className="snow">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
}