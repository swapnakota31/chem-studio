import React, { useMemo, useState } from 'react';

const ELEMENTS = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, shells: [1], color: '#e2e8f0', category: 'Reactive nonmetal' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, shells: [2], color: '#facc15', category: 'Noble gas' },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, shells: [2, 1], color: '#ef4444', category: 'Alkali metal' },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, shells: [2, 2], color: '#f97316', category: 'Alkaline earth metal' },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, shells: [2, 3], color: '#14b8a6', category: 'Metalloid' },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, shells: [2, 4], color: '#94a3b8', category: 'Reactive nonmetal' },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, shells: [2, 5], color: '#3b82f6', category: 'Reactive nonmetal' },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, shells: [2, 6], color: '#ef4444', category: 'Reactive nonmetal' },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, shells: [2, 7], color: '#22c55e', category: 'Halogen' },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, shells: [2, 8], color: '#ec4899', category: 'Noble gas' },
];

function shellText(shells) {
  return shells.join('-');
}

export default function AtomVisualizer({ onCompareAtom, compareAtom }) {
  const [selected, setSelected] = useState(ELEMENTS[0]);

  const details = useMemo(() => {
    return [
      { label: 'Atomic Number', value: selected.atomicNumber },
      { label: 'Shells', value: shellText(selected.shells) },
      { label: 'Category', value: selected.category },
      { label: 'Electrons', value: selected.atomicNumber },
    ];
  }, [selected]);

  return (
    <div className="three-col" style={{ marginTop: '72px' }}>
      <div className="panel">
        <div className="content-card">
          <h2 className="text-lg font-bold text-white">Periodic Table</h2>
          <p className="text-xs text-gray-400 mt-1">Ten starter elements only, with compare actions on each card.</p>
        </div>

        <div className="mt-4 grid gap-3">
          {ELEMENTS.map((el) => (
            <div key={el.atomicNumber} className={`content-card border ${selected.atomicNumber === el.atomicNumber ? 'border-neon-cyan/30' : 'border-white/5'}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">Atom</div>
                  <div className="text-xl font-bold text-white">{el.symbol}</div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: el.color }}>
                  {el.atomicNumber}
                </div>
              </div>

              <div className="mt-3">
                <div className="text-sm font-semibold text-white">{el.name}</div>
                <div className="text-xs text-gray-400">Shells {shellText(el.shells)}</div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelected(el)}
                  className="px-3 py-2 rounded-full text-xs border border-white/10 glass text-gray-200"
                >
                  Open
                </button>
                <button
                  type="button"
                  onClick={() => onCompareAtom?.(el)}
                  className="px-3 py-2 rounded-full text-xs border border-neon-pink/20 bg-neon-pink/10 text-neon-pink"
                >
                  Compare
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="center-column">
        <div className="content-card mb-4">
          <h1 className="page-heading text-gradient">{selected.name}</h1>
          <div className="page-subheading">{selected.symbol} · {selected.category}</div>
        </div>

        <div className="content-card">
          <div className="flex items-center justify-center">
            <div className="w-64 h-64 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl" style={{ background: `radial-gradient(circle at 35% 35%, ${selected.color}, #0b1020 72%)` }}>
              {selected.symbol}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {details.map((item) => (
              <div key={item.label} className="stat-box">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{item.label}</div>
                <div className="mt-2 text-sm font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 content-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400">Compare Atom</div>
              <div className="text-sm font-semibold text-white">{compareAtom ? `${compareAtom.name} (${compareAtom.symbol})` : 'No compare atom selected'}</div>
            </div>
            {compareAtom && (
              <div className="text-xs px-3 py-2 rounded-full border border-neon-pink/20 bg-neon-pink/10 text-neon-pink">
                {compareAtom.atomicNumber}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="content-card">
          <h3 className="text-sm font-semibold text-gray-300">Selected Atom</h3>
          <div className="mt-3 space-y-3">
            <div className="stat-box">
              <div className="text-xs text-gray-400 uppercase tracking-widest">Symbol</div>
              <div className="text-2xl font-bold text-white">{selected.symbol}</div>
            </div>
            <div className="stat-box">
              <div className="text-xs text-gray-400 uppercase tracking-widest">Electron Shells</div>
              <div className="text-lg font-bold text-white">{shellText(selected.shells)}</div>
            </div>
            <div className="stat-box">
              <div className="text-xs text-gray-400 uppercase tracking-widest">Tip</div>
              <div className="text-sm text-gray-200">Use the bottom Compare button on each atom card to set your comparison target.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
