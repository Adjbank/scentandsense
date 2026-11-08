import type { Plant } from "@/data/types";

const FAMILY_COLOR: Record<
  string,
  { leaf: string; dark: string; pot: string }
> = {
  floral: { leaf: "#9ccc9c", dark: "#5d8a66", pot: "#e8d9c8" },
  citrus: { leaf: "#b7d98a", dark: "#6f9a4a", pot: "#d9c7a7" },
  herbal: { leaf: "#8fbf9f", dark: "#4f7f63", pot: "#cfd8c2" },
  spicy: { leaf: "#a9c88e", dark: "#6b8d4f", pot: "#d4b59a" },
  woody: { leaf: "#7fa88a", dark: "#466b52", pot: "#b89a7a" },
  resinous: { leaf: "#86a98f", dark: "#4a6f57", pot: "#c7b299" },
  green: { leaf: "#9ed0a4", dark: "#5c8c66", pot: "#dcd6c3" },
  sweet: { leaf: "#a8d1a0", dark: "#5f8f66", pot: "#efd9c9" },
  camphoraceous: { leaf: "#9bc9b8", dark: "#4f8574", pot: "#d6dfd9" },
};

/** ภาพประกอบต้นไม้ในกระถางแบบ SVG (ใช้แทนรูปถ่ายจนกว่าจะมีภาพจริงจากสวน) */
export function PlantArt({
  plant,
  className = "",
}: {
  plant: Plant;
  className?: string;
}) {
  const c = FAMILY_COLOR[plant.scentFamilies[0]] ?? FAMILY_COLOR.green;
  const seed = plant.signNo;
  const tall = plant.scentedPart === "wood" || plant.scentedPart === "resin";
  const flower = plant.scentedPart === "flower";
  const fruit = plant.scentedPart === "fruit";
  const leaves = 5 + (seed % 3);
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      role="img"
      aria-label={plant.thaiName}
    >
      <rect width="160" height="160" rx="18" fill="#f1f3ec" />
      {/* pot */}
      <path d="M52 112 h56 l-6 36 h-44 z" fill={c.pot} />
      <rect
        x="46"
        y="104"
        width="68"
        height="12"
        rx="4"
        fill={c.dark}
        opacity="0.85"
      />
      {/* stem */}
      <path
        d={`M80 108 C80 ${tall ? 40 : 70} 80 ${tall ? 30 : 60} 80 ${tall ? 24 : 52}`}
        stroke={c.dark}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* leaves */}
      {Array.from({ length: leaves }).map((_, i) => {
        const t = i / (leaves - 1);
        const y = (tall ? 32 : 58) + t * (tall ? 60 : 40);
        const side = i % 2 === 0 ? -1 : 1;
        const len = 26 + ((seed * 7 + i * 13) % 14);
        const rot = side * (25 + ((seed + i * 5) % 20));
        return (
          <g key={i} transform={`translate(80 ${y}) rotate(${rot})`}>
            <path
              d={`M0 0 C ${side * len * 0.4} -${len * 0.35}, ${side * len} -${len * 0.1}, ${side * len} 0 C ${side * len} ${len * 0.1}, ${side * len * 0.4} ${len * 0.35}, 0 0 Z`}
              fill={i % 3 === 0 ? c.dark : c.leaf}
            />
            <path
              d={`M0 0 L ${side * len * 0.9} 0`}
              stroke={c.dark}
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        );
      })}
      {flower &&
        [0, 1, 2].map((i) => {
          const x = 80 + (i - 1) * 22 + ((seed * 3 + i) % 7) - 3;
          const y = (tall ? 36 : 50) + ((seed + i * 11) % 10);
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx="0"
                  cy="-6"
                  rx="3.2"
                  ry="6"
                  fill="#fff6e8"
                  stroke="#e4c48a"
                  strokeWidth="0.6"
                  transform={`rotate(${a})`}
                />
              ))}
              <circle r="2.6" fill="#e4b04a" />
            </g>
          );
        })}
      {fruit &&
        [0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={66 + ((seed * 5 + i * 17) % 30)}
            cy={62 + ((seed + i * 9) % 30)}
            r="4"
            fill={i % 2 ? "#b45a5a" : "#6b3f7a"}
          />
        ))}
    </svg>
  );
}
