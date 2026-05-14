import React from 'react';
import { motion } from 'framer-motion';
import ElectronShellDiagram from './ElectronShellDiagram';

function formatValue(value, fallback = '—') {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value === 'number') {
    return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, '');
  }
  return String(value);
}

function buildShells(element) {
  if (!element) return [];
  if (Array.isArray(element.shells)) return element.shells;
  const count = element.number || element.atomicNumber || 0;
  const capacities = [2, 8, 18, 32, 32, 18, 8];
  const shells = [];
  let remaining = count;
  for (const capacity of capacities) {
    if (!remaining) break;
    const fill = Math.min(capacity, remaining);
    shells.push(fill);
    remaining -= fill;
  }
  return shells;
}

export default function ElementModal({ el, onClose }) {
  if (!el) return null;

  const shells = buildShells(el);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/55" onClick={onClose} />
      <motion.div layoutId={`el-${el.number}`} className="element-modal-shell glass relative z-10">
        <div className="element-modal-header">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-neon-cyan font-semibold">Element Details</p>
            <h3 className="text-2xl font-bold text-white mt-2">{el.name} <span className="text-gray-300">({el.symbol})</span></h3>
          </div>
          <button onClick={onClose} className="element-modal-close">Close</button>
        </div>

        <div className="element-modal-grid">
          <div className="element-modal-hero glass">
            <div className="element-modal-symbol">{el.symbol}</div>
            <div className="element-modal-meta">
              <div>
                <span className="element-modal-label">Atomic Number</span>
                <div className="element-modal-value">{el.number}</div>
              </div>
              <div>
                <span className="element-modal-label">Atomic Mass</span>
                <div className="element-modal-value">{formatValue(el.atomicMass)}</div>
              </div>
            </div>
          </div>

          <div className="element-modal-body">
            <p className="text-sm text-gray-300 leading-relaxed">{el.description}</p>

            <div className="element-modal-shell-wrap glass">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Electron Shell Diagram</p>
                  <p className="text-sm text-gray-300 mt-1">Shell distribution for {el.name}</p>
                </div>
                <div className="text-xs text-gray-500">{shells.join(' • ')}</div>
              </div>
              <ElectronShellDiagram element={{ ...el, shells }} />
            </div>

            <div className="element-modal-spec-grid">
              <div><span>Electron Config</span><strong>{el.electronConfig || '—'}</strong></div>
              <div><span>Category</span><strong>{el.category || '—'}</strong></div>
              <div><span>Density</span><strong>{formatValue(el.density)}</strong></div>
              <div><span>Atomic Radius</span><strong>{formatValue(el.atomicRadius)}</strong></div>
              <div><span>Melting Point</span><strong>{formatValue(el.meltingPoint)} K</strong></div>
              <div><span>Boiling Point</span><strong>{formatValue(el.boilingPoint)} K</strong></div>
              <div><span>Electronegativity</span><strong>{formatValue(el.electronegativity)}</strong></div>
              <div><span>Discovered By</span><strong>{el.discoveredBy || '—'}</strong></div>
              <div><span>Year Discovered</span><strong>{el.yearDiscovered || el.discovered || '—'}</strong></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
