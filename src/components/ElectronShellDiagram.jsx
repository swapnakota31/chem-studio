import React from 'react';

// Simple Bohr-style electron shell SVG visualizer.
// Expects `element` with `shells` array (electron counts per shell) or `number` to approximate shells.
export default function ElectronShellDiagram({ element }) {
  const shells = element?.shells || (() => {
    // fallback: distribute electrons by simple pattern based on atomic number
    const n = element?.number || element?.atomicNumber || 0;
    if (n === 0) return [0];
    const pattern = [];
    let remaining = n;
    const capacities = [2, 8, 18, 32, 50];
    for (let i = 0; remaining > 0 && i < capacities.length; i++) {
      const take = Math.min(capacities[i], remaining);
      pattern.push(take);
      remaining -= take;
    }
    return pattern;
  })();

  const maxR = 72;

  return (
    <svg width="160" height="160" viewBox="0 0 160 160" className="mx-auto">
      <defs>
        <radialGradient id="glo" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" rx="12" fill="url(#glo)" opacity="0.06" />

      <g transform="translate(80,80)">
        {shells.map((count, idx) => {
          const r = 18 + idx * 16;
          const electrons = Math.max(1, Math.min(count, 12));
          return (
            <g key={idx}>
              <circle cx="0" cy="0" r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
              {Array.from({ length: electrons }).map((_, i) => {
                const angle = (i / electrons) * Math.PI * 2;
                const ex = Math.cos(angle) * r;
                const ey = Math.sin(angle) * r;
                return (
                  <circle key={i} cx={ex} cy={ey} r={3} fill="#fff" opacity={0.9} />
                );
              })}
            </g>
          );
        })}

        <circle r="6" fill="#fff" />
      </g>
    </svg>
  );
}
