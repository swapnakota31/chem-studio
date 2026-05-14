import React from 'react';
import { motion } from 'framer-motion';

const categoryColors = {
  'nonmetal': 'periodic-nonmetal',
  'noble gas': 'periodic-noble-gas',
  'alkali metal': 'periodic-alkali-metal',
  'alkaline earth metal': 'periodic-alkaline-earth',
  'metalloid': 'periodic-metalloid',
  'halogen': 'periodic-halogen',
  'post-transition metal': 'periodic-post-transition',
  'lanthanide': 'periodic-lanthanide',
  'actinide': 'periodic-actinide',
  'transition metal': 'periodic-transition-metal'
};

function formatMass(value) {
  if (value === null || value === undefined || value === '') return '—';
  return typeof value === 'number' ? value.toFixed(value < 100 ? 3 : 2).replace(/\.0+$/, '').replace(/(\.[1-9]*)0+$/, '$1') : String(value);
}

export default function ElementCard({ el, onOpen, onToggleCompare, isCompared, isSearchMatch, isActiveSearchMatch, style }) {
  const colorClass = categoryColors[el.category] || 'periodic-default';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.18 }}
      style={style}
      className={`element-card glass cursor-pointer ${colorClass} ${isSearchMatch ? 'periodic-search-hit' : ''} ${isActiveSearchMatch ? 'periodic-search-active' : ''}`}
      onClick={() => onOpen(el)}
    >
      <div className="periodic-tile">
        <div className="periodic-tile-top">
          <span className="periodic-atomic-number">{el.number}</span>
          <span className="periodic-mass">{formatMass(el.atomicMass)}</span>
        </div>

        <div className="periodic-symbol">{el.symbol}</div>
        <div className="periodic-name">{el.name}</div>

        <div className="periodic-tile-footer">
          <span className="periodic-category-label">{el.category}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleCompare(el); }}
            className={`periodic-compare-btn ${isCompared ? 'periodic-compare-btn-active' : ''}`}
          >
            {isCompared ? 'Added' : 'Compare'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
