import React, { useState } from 'react';

const ITEMS = [
  { id: 'MoleculeScene', title: 'MoleculeScene', desc: '3D molecule renderer (WebGL + CSS2D labels). Supports ball-stick, space-fill, wireframe, raycasting and auto-rotate.' },
  { id: 'ElectronShellDiagram', title: 'ElectronShellDiagram', desc: 'Bohr-style electron shell visualizer (SVG) used on AtomVisualizerPage.' },
  { id: 'CompareElements', title: 'CompareElements', desc: 'Side-by-side element comparison UI with property bars and insights.' },
  { id: 'AtomVisualizerPage', title: 'AtomVisualizerPage', desc: 'Page composed of search, shell diagram and property cards.' },
  { id: 'MoleculeScenePage', title: 'MoleculeScenePage', desc: 'Page wrapper for MoleculeScene with library navigation and view modes.' },
  { id: 'elements.js', title: 'elements.js', desc: 'Data file containing all 118 element objects and properties.' },
  { id: 'molecules.js', title: 'molecules.js', desc: 'Molecule database (58 molecules) with atoms, bonds and labels.' }
];

export default function ArchitectureSidebar() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(null);

  return (
    <div className={`arch-sidebar ${open ? 'arch-open' : 'arch-closed'}`}>
      <div className="glass p-4 arch-inner">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-gray-300 font-semibold">Architecture</div>
            <div className="text-xs text-gray-400">Core components & data</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              title="Toggle"
              className="px-2 py-1 rounded text-xs glass"
              onClick={() => setOpen(v => !v)}
            >
              {open ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {ITEMS.map(it => (
            <button
              key={it.id}
              onClick={() => setActive(it)}
              className="model-item w-full text-left transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{it.title}</div>
                  <div className="text-xs text-gray-400">{it.id}</div>
                </div>
                <div className="text-xs text-neon-cyan">View</div>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div className="mt-4 p-3 arch-detail content-card">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-bold">{active.title}</div>
                <div className="text-xs text-gray-400">{active.id}</div>
              </div>
              <button className="text-xs glass" onClick={() => setActive(null)}>Close</button>
            </div>
            <div className="text-sm text-gray-300">{active.desc}</div>
          </div>
        )}
      </div>
    </div>
  );
}
