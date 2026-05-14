import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function SearchAutocomplete({ items = [], value, onChange, placeholder = 'Search...', renderItem }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (value) setQuery(value.name || value.symbol || '');
  }, [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items.filter(it => (it.name + ' ' + it.symbol + ' ' + (it.number || it.atomicNumber || '')).toLowerCase().includes(q)).slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); const sel = filtered[active]; if (sel) { onChange(sel); setOpen(false); } }
      if (e.key === 'Escape') { setOpen(false); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onChange]);

  return (
    <div className="relative" ref={ref}>
      <input
        className="w-full p-3 rounded-lg glass"
        placeholder={placeholder}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
      />

      {open && filtered.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 glass rounded-lg overflow-hidden z-50">
          {filtered.map((it, idx) => (
            <div
              key={it.number || it.atomicNumber || idx}
              className={`p-3 cursor-pointer ${idx === active ? 'bg-white/6' : ''}`}
              onMouseEnter={() => setActive(idx)}
              onClick={() => { onChange(it); setOpen(false); }}
            >
              {renderItem ? renderItem(it) : `${it.symbol} — ${it.name}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
