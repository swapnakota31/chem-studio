import React, { useMemo, useState } from 'react';
import elements from '../data/elements';
import SearchAutocomplete from './SearchAutocomplete';
import ElementModal from './ElementModal';
import ElectronShellDiagram from './ElectronShellDiagram';

function SummaryRow({ label, a, b }) {
  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const aHigher = !isNaN(aNum) && !isNaN(bNum) && aNum > bNum;
  const bHigher = !isNaN(aNum) && !isNaN(bNum) && bNum > aNum;
  return (
    <div className="flex items-center gap-2 py-2 border-t border-white/5">
      <div className="w-48 text-xs text-gray-400">{label}</div>
      <div className={`flex-1 text-sm ${aHigher ? 'text-emerald-400' : bHigher ? 'text-red-400' : 'text-white'}`}>{a ?? '—'}</div>
      <div className={`w-48 text-right text-sm ${bHigher ? 'text-emerald-400' : aHigher ? 'text-red-400' : 'text-white'}`}>{b ?? '—'}</div>
    </div>
  );
}

export default function CompareElements() {
  const [left, setLeft] = useState(elements[0]);
  const [right, setRight] = useState(elements[1]);
  const [openEl, setOpenEl] = useState(null);

  const keys = useMemo(() => [
    { key: 'atomicMass', label: 'Atomic Mass' },
    { key: 'density', label: 'Density' },
    { key: 'electronegativity', label: 'Electronegativity' },
    { key: 'atomicRadius', label: 'Atomic Radius' },
    { key: 'meltingPoint', label: 'Melting Point' },
    { key: 'boilingPoint', label: 'Boiling Point' },
  ], []);

  const insights = useMemo(() => {
    const out = [];
    if (left && right) {
      if (left.group && left.group === right.group) out.push(`Both elements belong to Group ${left.group}`);
      if ((left.electronegativity || 0) > (right.electronegativity || 0)) out.push(`${left.name} has higher electronegativity`);
      if ((left.atomicRadius || 0) > (right.atomicRadius || 0)) out.push(`${left.name} has larger atomic radius`);
    }
    return out;
  }, [left, right]);

  return (
    <div className="p-6" style={{ marginTop: '72px' }}>
      <div className="content-card mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Compare Elements</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => { const tmp = left; setLeft(right); setRight(tmp); }} className="px-3 py-2 rounded glass">Swap</button>
          <button onClick={() => { setLeft(null); setRight(null); }} className="px-3 py-2 rounded glass">Clear</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="panel p-4">
          <SearchAutocomplete items={elements} value={left} onChange={setLeft} placeholder="Pick left element" renderItem={(it) => (<div className="flex items-center gap-2"><div className="w-6 text-sm font-bold">{it.symbol}</div><div className="text-xs text-gray-300">{it.name}</div></div>)} />
          {left && (
            <div className="mt-4">
              <div className="stat-box">
                <div className="text-sm font-bold">{left.name} ({left.symbol})</div>
                <div className="text-xs text-gray-400">Atomic #{left.number}</div>
                <div className="mt-3"><ElectronShellDiagram element={left} /></div>
              </div>
            </div>
          )}
        </div>

        <div className="panel p-4 lg:col-span-2">
          <div className="content-card p-4">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-300">Comparison Table</div>
                </div>

                <div className="mt-3">
                  {keys.map(k => (
                    <SummaryRow key={k.key} label={k.label} a={left?.[k.key]} b={right?.[k.key]} />
                  ))}
                </div>
              </div>

              <div className="w-64">
                <div className="stat-box">
                  <div className="text-sm font-semibold text-gray-300">Insights</div>
                  <div className="mt-2 text-sm text-white">
                    {insights.length === 0 ? 'No immediate insights.' : insights.map((s, i) => <div key={i} className="mb-2">• {s}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
