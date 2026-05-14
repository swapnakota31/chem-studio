import React, { useEffect, useMemo, useState } from 'react';

const StructurePanel = ({ model, compareModel, compareList = [], onClearCompare, onRemoveCompare }) => {
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const modelId = model?.id;

  useEffect(() => {
    if (compareModel && compareModel.id !== modelId) {
      setComparisonOpen(true);
    }
  }, [compareModel, modelId]);

  const comparisonRows = useMemo(() => {
    // Multi-item comparison: prefer compareList if available otherwise fallback to compareModel single comparison
    const items = (compareList && compareList.length > 0) ? [model, ...compareList] : (compareModel && compareModel.id !== model?.id ? [model, compareModel] : []);
    if (!model || items.length <= 1) return [];

    // standard keys to show
    const keys = ['name', 'symbol', 'atomicMass', 'density', 'meltingPoint', 'boilingPoint', 'electronegativity', 'category', 'state'];
    return keys.map(k => ({ key: k, values: items.map(it => it?.[k] ?? it?.properties?.[k] ?? '—'), label: k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()) }));
  }, [compareList, compareModel, model]);

  const comparisonTheory = (compareList && compareList.length > 0) || (compareModel && compareModel.id !== model.id)
    ? 'Comparison helps identify how structure changes influence bonding, geometry, and molecular behavior. Use it to contrast size, shape, and composition before switching models.'
    : 'Select another model from the catalog or Periodic Table to activate comparison.';

  if (!model) return null;

  return (
    <aside className="panel glass-md p-4 w-full max-w-xs overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-300">Structure Details</h3>
      </div>

      <div className="space-y-3">
        <div className="stat-box">
          <p className="text-xs text-neon-cyan uppercase tracking-widest font-bold">Name</p>
          <p className="text-lg font-bold text-white mt-2">{model.name}</p>
          <p className="text-xs text-gray-400 mt-1">{model.description}</p>
        </div>

        <div className="stat-box">
          <p className="text-xs text-neon-purple uppercase tracking-widest font-bold">Formula</p>
          <p className="text-lg font-bold text-white mt-2">{model.formula}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="stat-box">
            <p className="text-xs text-neon-pink uppercase tracking-widest">Atoms</p>
            <p className="text-lg font-bold text-white mt-1">{model.atoms}</p>
          </div>
          <div className="stat-box">
            <p className="text-xs text-neon-cyan uppercase tracking-widest">Bonds</p>
            <p className="text-lg font-bold text-white mt-1">{model.bonds}</p>
          </div>
        </div>

        <div className="pt-2">
          <button className="w-full p-3 rounded-lg glass hover:glow-cyan transition">Show markers</button>
        </div>
      </div>
      
      {/* Comparison cell */}
      <div className="mt-6 content-card">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h4 className="text-xs uppercase tracking-widest text-neon-cyan font-bold">Compare Cells</h4>
          {compareModel && compareModel.id !== model.id && (
            <button className="text-xs text-neon-pink" onClick={onClearCompare}>Clear</button>
          )}
        </div>

          {(compareList && compareList.length > 0) || (compareModel && compareModel.id !== model.id) ? (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-4 py-2 rounded-full border border-white/15 bg-white/8 text-sm text-white shadow-sm shadow-black/20 backdrop-blur-sm">{model.name}</span>
                <span className="text-gray-300 text-sm font-semibold px-1">vs</span>
                {(compareList && compareList.length > 0) ? (
                  <div className="flex items-center gap-2">
                    {compareList.map((c) => (
                      <span key={c.number} className="px-3 py-1 rounded-full border border-white/15 bg-white/6 text-sm text-white">{c.name}</span>
                    ))}
                  </div>
                ) : (
                  <span className="px-4 py-2 rounded-full border border-white/15 bg-white/8 text-sm text-white shadow-sm shadow-black/20 backdrop-blur-sm">{compareModel?.name}</span>
                )}
            </div>

            <button
              type="button"
              onClick={() => setComparisonOpen((value) => !value)}
              className="w-full p-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500 text-gray-950 font-bold tracking-wide transition duration-300 shadow-lg shadow-emerald-400/25 hover:shadow-emerald-300/40 border border-emerald-200/20"
            >
              {comparisonOpen ? 'Hide Comparison View' : 'Open Comparison View'}
            </button>

            <div className="mt-4 space-y-3">
              <div className="stat-box">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Comparison Theory</p>
                <p className="text-xs text-gray-300 leading-relaxed">{comparisonTheory}</p>
              </div>

              <div className="stat-box overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Comparison Table</p>
                  <span className="text-[11px] text-gray-500">Selected vs Compare</span>
                </div>

                <div className="overflow-x-auto">
                  {comparisonRows.length > 0 ? (
                    <table className="w-full text-left text-xs border-separate border-spacing-y-2 sticky">
                      <thead className="bg-white/3 sticky top-0">
                        <tr className="text-gray-400 uppercase tracking-widest">
                          <th className="pb-2 pr-2 font-semibold">Property</th>
                          {((compareList && compareList.length > 0) ? [model, ...compareList] : [model, compareModel]).map((item, idx) => (
                            <th key={idx} className="pb-2 pr-2 font-semibold">{item?.name || item?.symbol || `Item ${idx+1}`}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonRows.map((row) => (
                          <tr key={row.key} className="align-top border-t border-white/5">
                            <td className="py-2 pr-2 text-gray-400">{row.label}</td>
                            {row.values.map((v, i) => (
                              <td key={i} className={`py-2 pr-2 text-white ${i > 0 && row.values[0] !== v ? 'bg-neon-cyan/5' : ''}`}>{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-xs text-gray-500">Pick two different models or elements to show the table.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="stat-box">
            <p className="text-xs text-gray-300 leading-relaxed">{comparisonTheory}</p>
          </div>
        )}
      </div>

      {/* Knowledge base & quick facts */}
      <div className="mt-6">
        <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Knowledge Base</h4>
        <div className="stat-box">
          <p className="text-xs text-gray-300">{model.description}</p>
        </div>

        <h4 className="text-xs uppercase tracking-widest text-gray-400 mt-4 mb-2">Quick Facts</h4>
        <div className="space-y-3">
          <div className="stat-box">
            <p className="text-xs uppercase tracking-widest text-neon-cyan font-bold mb-2">Model Insight</p>
            <p className="text-xs text-gray-300 leading-relaxed">Useful fact or note about this model.</p>
          </div>
          <div className="stat-box">
            <p className="text-xs uppercase tracking-widest text-neon-purple font-bold mb-2">Observation</p>
            <p className="text-xs text-gray-300 leading-relaxed">Another fact or observation.</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default StructurePanel;
