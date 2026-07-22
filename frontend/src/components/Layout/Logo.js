import React from "react";

const Logo = ({ size = 32, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <rect width="100" height="100" rx="24" fill="var(--primary)" />
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="var(--bg-dark)"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="54"
        letterSpacing="-3"
      >
        SN
      </text>
    </svg>
  );
};

export default Logo;
