import React, { useEffect, useState } from 'react';
import Scene3D from './components/Scene3D';
import Navigation from './components/Navigation';
import AtomVisualizer from './components/AtomVisualizer';
import PeriodicTable from './components/PeriodicTable';
import ModelCatalog from './components/ModelCatalog';
import StructurePanel from './components/StructurePanel';
import CompareElements from './components/CompareElements';
import models from './data/models';

/**
 * App Component - ENHANCED VERSION
 * Root component with premium dashboard design
 * Features:
 * - 3D Canvas with realistic molecule visualization
 * - Premium glassmorphic header navigation
 * - Animated particle background
 * - Info panel with molecule details
 * - Dark futuristic neon theme
 * - Fully responsive layout
 */
function App() {
  const [mounted, setMounted] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [compareModel, setCompareModel] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [interactionMode, setInteractionMode] = useState('auto'); // 'auto' or 'live'
  const [activePage, setActivePage] = useState('visualize');
  const [compareAtom, setCompareAtom] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-dark-bg via-dark-secondary to-dark-bg overflow-x-hidden relative">
      {/* NAVIGATION - Stable header */}
      <Navigation activePage={activePage} onChangePage={setActivePage} />

      {activePage === 'periodic-table' ? (
        <PeriodicTable compareList={compareList} onToggleCompare={(item) => {
          // toggle by number
          setCompareList(prev => {
            const exists = prev.find(p => p.number === item.number);
            if (exists) return prev.filter(p => p.number !== item.number);
            return [...prev, item].slice(0, 4);
          });
        }} />
      ) : activePage === 'compare' ? (
        <CompareElements />
      ) : (
        /* Main 3-column layout: Left catalog, Center 3D, Right details */
        <div className="three-col" style={{ marginTop: '72px' }}>
        {/* Left: Model catalog */}
          <div className="panel">
            <ModelCatalog
              selectedId={selectedModel?.id}
              compareId={compareModel?.id}
              onSelect={m => setSelectedModel(m)}
              onCompare={m => setCompareModel(m)}
              compareList={compareList}
              onToggleCompare={(item) => setCompareList(prev => {
                const exists = prev.find(p => p.id ? p.id === item.id : p.number === item.number);
                if (exists) return prev.filter(p => (p.id ? p.id !== item.id : p.number !== item.number));
                return [...prev, item].slice(0, 4);
              })}
            />
          </div>

          {/* Center: 3D canvas */}
          <div className="center-column">
            <div className="content-card mb-4 flex items-center justify-between">
              <div>
                <h1 className="page-heading text-gradient">{selectedModel ? selectedModel.name : 'Water'}</h1>
                <div className="page-subheading">{selectedModel ? `${selectedModel.formula} · ${selectedModel.geometry}` : 'H₂O · Bent'}</div>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInteractionMode('auto')}
                  className={`px-4 py-2 rounded-full text-xs border font-medium transition duration-300 ${interactionMode === 'auto' ? 'bg-neon-cyan/15 border-neon-cyan/30 text-neon-cyan shadow-lg shadow-neon-cyan/20' : 'glass text-gray-300 border-white/10 hover:border-white/20'}`}
                >
                   Auto Rotate
                </button>
                <button
                  type="button"
                  onClick={() => setInteractionMode('live')}
                  className={`px-4 py-2 rounded-full text-xs border font-medium transition duration-300 ${interactionMode === 'live' ? 'bg-neon-purple/15 border-neon-purple/30 text-neon-purple shadow-lg shadow-neon-purple/20' : 'glass text-gray-300 border-white/10 hover:border-white/20'}`}
                >
                   Live Mode
                </button>
              </div>
            </div>

            <div className="center-canvas">
              {mounted && <Scene3D selectedModel={selectedModel} interactionMode={interactionMode} />}
            </div>
          </div>

          {/* Right: Structure details and knowledge base */}
          <div className="panel">
            <StructurePanel
              model={selectedModel}
              compareModel={compareModel}
              compareList={compareList}
              onClearCompare={() => { setCompareModel(null); setCompareList([]); }}
              onRemoveCompare={(item) => setCompareList(prev => prev.filter(p => (p.id ? p.id !== item.id : p.number !== item.number)))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
