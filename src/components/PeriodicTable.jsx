import React, { useEffect, useMemo, useState } from 'react';
import elements from '../data/elements';
import ElementCard from './ElementCard';
import ElementModal from './ElementModal';
import { motion } from 'framer-motion';

const filterChips = [
  { label: 'All', value: 'all' },
  { label: 'Metals', value: 'metals' },
  { label: 'Nonmetals', value: 'nonmetals' },
  { label: 'Noble Gases', value: 'noble-gases' },
  { label: 'Transition Metals', value: 'transition-metals' },
  { label: 'Radioactive', value: 'radioactive' }
];

const categoryGroups = {
  metals: new Set(['alkali metal', 'alkaline earth metal', 'transition metal', 'post-transition metal', 'lanthanide', 'actinide']),
  nonmetals: new Set(['nonmetal', 'halogen']),
  'noble-gases': new Set(['noble gas']),
  'transition-metals': new Set(['transition metal']),
  radioactive: new Set(['actinide'])
};

function matchesCategoryFilter(element, filter) {
  if (filter === 'all') return true;
  if (filter === 'radioactive') {
    return element.category === 'actinide' || element.number >= 84 || element.number === 43 || element.number === 61;
  }
  return categoryGroups[filter]?.has(element.category) ?? true;
}

function matchesQuery(element, query) {
  if (!query) return true;
  const normalized = query.toLowerCase();
  return [element.name, element.symbol, String(element.number)].some(value => String(value).toLowerCase().includes(normalized));
}

function formatAtomicMass(value) {
  if (value === null || value === undefined || value === '') return '—';
  return Number.isFinite(value) ? value.toFixed(value < 100 ? 3 : 2).replace(/\.0+$/, '').replace(/(\.[1-9]*)0+$/, '$1') : String(value);
}

export default function PeriodicTable({ compareList = [], onToggleCompare }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeEl, setActiveEl] = useState(null);
  const [activeMatchIndex, setActiveMatchIndex] = useState(-1);

  const visibleElements = useMemo(() => {
    return elements.filter(element => matchesCategoryFilter(element, filter));
  }, [filter]);

  const searchResults = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return visibleElements.filter(element => matchesQuery(element, q));
  }, [query, visibleElements]);

  const searchResultNumbers = useMemo(() => new Set(searchResults.map(element => element.number)), [searchResults]);

  useEffect(() => {
    if (searchResults.length === 0) {
      setActiveMatchIndex(-1);
      return;
    }
    setActiveMatchIndex(index => Math.max(0, Math.min(index, searchResults.length - 1)));
  }, [searchResults]);

  const activeMatch = activeMatchIndex >= 0 ? searchResults[activeMatchIndex] : null;

  function handleSearchKeyDown(event) {
    if (!searchResults.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveMatchIndex(index => (index + 1) % searchResults.length);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveMatchIndex(index => (index <= 0 ? searchResults.length - 1 : index - 1));
    }
    if (event.key === 'Enter' && activeMatch) {
      event.preventDefault();
      setActiveEl(activeMatch);
    }
    if (event.key === 'Escape') {
      setQuery('');
    }
  }

  return (
    <div className="periodic-table-page p-4 sm:p-6">
      <div className="content-card periodic-toolbar mb-4">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.35em] text-neon-cyan font-semibold mb-2">Scientific Layout</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Interactive Periodic Table</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              Elements are positioned from `xpos` and `ypos` so the layout matches a chemistry textbook, including the separate lanthanide and actinide rows.
            </p>
          </div>

          <div className="periodic-search">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search by name, symbol or atomic number"
              className="w-full p-3 rounded-lg glass periodic-search-input"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="periodic-clear-search">Clear</button>
            )}
          </div>
        </div>

        <div className="periodic-chip-row mt-4">
          {filterChips.map(chip => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilter(chip.value)}
              className={`periodic-chip ${filter === chip.value ? 'periodic-chip-active' : ''}`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-3 px-1">
        <div className="text-xs uppercase tracking-[0.35em] text-gray-400">
          {searchResults.length > 0 ? `${searchResults.length} match${searchResults.length === 1 ? '' : 'es'}` : `${visibleElements.length} visible elements`}
        </div>
        <div className="text-xs text-gray-500">
          {activeMatch ? `Active result: ${activeMatch.symbol} ${activeMatch.name}` : 'Use arrow keys to move through search results.'}
        </div>
      </div>

      <div className="periodic-grid-legend glass mb-3">
        <span>Groups 1-18</span>
        <span>Periods 1-7</span>
        <span>Lanthanides 57-71</span>
        <span>Actinides 89-103</span>
      </div>

      <div className="periodic-table-scroll">
        <div className="periodic-table-grid">
          {visibleElements.map(element => {
            const isSearchMatch = searchResultNumbers.has(element.number);
            const isActiveSearchMatch = activeMatch?.number === element.number;
            return (
              <ElementCard
                key={element.number}
                el={element}
                onOpen={setActiveEl}
                onToggleCompare={onToggleCompare}
                isCompared={compareList.some(item => item.number === element.number)}
                isSearchMatch={isSearchMatch}
                isActiveSearchMatch={isActiveSearchMatch}
                style={{ gridColumn: element.xpos, gridRow: element.ypos }}
              />
            );
          })}
        </div>
      </div>

      {activeEl && <ElementModal el={activeEl} onClose={() => setActiveEl(null)} />}
    </div>
  );
}
