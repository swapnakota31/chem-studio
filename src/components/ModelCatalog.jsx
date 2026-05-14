import React, { useMemo, useState } from 'react';
import models from '../data/models';

const ModelCatalog = ({ selectedId, onSelect, onCompare, compareId, compareList = [], onToggleCompare }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models;
    return models.filter(m => (m.name + ' ' + (m.formula || '') + ' ' + m.category).toLowerCase().includes(q));
  }, [query]);

  const categories = [...new Set(filtered.map(m => m.category))];

  
  return (
    <aside className="panel glass-md p-3 sm:p-4 md:p-6 w-full max-w-xs overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-300">Models</h3>
        <div className="mt-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models..."
            className="w-full p-2 rounded-lg bg-white/3 border border-white/6 text-white text-sm"
          />
        </div>
      </div>

      {categories.map(cat => (
        <div key={cat} className="mb-4">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{cat}</p>
          <div className="space-y-2">
            {filtered
              .filter(m => m.category === cat)
              .map(m => (
                <div
                  key={m.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(m)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelect(m);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${selectedId === m.id ? 'bg-neon-cyan/10 border border-neon-cyan/20' : 'bg-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl glass flex items-center justify-center shrink-0 overflow-hidden">
                      <div className={`w-8 h-8 rounded-full ${m.previewClass || 'bg-neon-cyan/20'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-bold text-white truncate">{m.name}</div>
                        <div className="text-xs text-gray-400 shrink-0">{m.atoms} atoms</div>
                      </div>
                      <div className="text-xs text-gray-400">{m.formula}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(m);
                          }}
                          className="text-xs px-2 py-1 rounded-md glass"
                        >
                          Open
                        </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onToggleCompare) onToggleCompare(m);
                              else onCompare(m);
                            }}
                            className={`text-xs px-2 py-1 rounded-md glass ${compareList.find(p => p.id === m.id) ? 'border border-neon-pink/30 text-neon-pink' : ''}`}
                          >
                            {compareList.find(p => p.id === m.id) ? 'Added' : 'Compare'}
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default ModelCatalog;
