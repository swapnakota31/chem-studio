import React from 'react';
import { FaInfo, FaMouse, FaScroll, FaVial } from 'react-icons/fa';

/**
 * InfoPanel Component - ENHANCED VERSION
 * Premium sidebar with glassmorphism, animations, and neon chemistry theme
 * Fully responsive mobile-friendly layout
 */
export const InfoPanel = ({ model }) => {
  return (
    <div className="panel p-2 sm:p-4 md:p-6 z-40">
      {/* Premium info card - Glassmorphic with gradient border */}
      <div
        className="glass-md p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl w-full space-y-4 sm:space-y-6 max-h-screen overflow-y-auto backdrop-blur-2xl border border-neon-cyan/20 shadow-2xl"
      >
        {/* Header with icon and gradient text */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pb-4 sm:pb-6 border-b border-neon-cyan/20">
          <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex-shrink-0">
            <FaVial className="text-neon-cyan text-2xl" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gradient text-glow">{model ? model.name : 'Water'}</h2>
            <p className="text-xs text-gray-400 mt-1">{model ? `${model.formula} · ${model.geometry}` : 'H₂O · Bent Geometry'}</p>
          </div>
        </div>

        {/* Molecule Details - Stats Grid */}
        <div className="space-y-3 sm:space-y-4">
          <div className="stat-box group">
            <p className="text-xs text-neon-cyan uppercase tracking-widest font-bold">Chemical Formula</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-2 sm:mt-3 group-hover:text-neon-cyan transition duration-300">H₂O</p>
            <p className="text-xs text-gray-400 mt-2">Water / Dihydrogen Monoxide</p>
          </div>

          <div className="stat-box group">
            <p className="text-xs text-neon-purple uppercase tracking-widest font-bold">Molecular Weight</p>
            <p className="text-lg sm:text-2xl font-bold text-white mt-2">18.015 g/mol</p>
            <p className="text-xs text-gray-400 mt-1">Atomic: H(2) + O(1)</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="stat-box group">
              <p className="text-xs text-neon-pink uppercase tracking-widest font-bold">Bond Angle</p>
              <p className="text-lg sm:text-2xl font-bold text-white mt-2">104.5°</p>
            </div>
            <div className="stat-box group">
              <p className="text-xs text-neon-cyan uppercase tracking-widest font-bold">Atoms</p>
              <p className="text-lg sm:text-2xl font-bold text-white mt-2">3</p>
            </div>
          </div>

          <div className="stat-box group">
            <p className="text-xs text-neon-purple uppercase tracking-widest font-bold">Geometry Type</p>
            <p className="text-lg sm:text-xl font-bold text-white mt-2">Bent / Angular</p>
            <p className="text-xs text-gray-400 mt-1">Non-polar molecular geometry</p>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px bg-gradient-to-r from-neon-cyan/30 via-neon-purple/30 to-neon-pink/30" />

        {/* Controls Section */}
        <div className="space-y-3 sm:space-y-4 pt-2">
          <p className="text-xs text-neon-cyan uppercase tracking-widest font-bold">Interaction Guide</p>

          <div className="space-y-3">
            <div
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
            >
              <FaMouse className="text-neon-cyan text-base sm:text-lg flex-shrink-0" />
              <span className="text-sm text-gray-200">Drag to rotate molecule in 3D space</span>
            </div>

            <div
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
            >
              <FaScroll className="text-neon-purple text-base sm:text-lg flex-shrink-0" />
              <span className="text-sm text-gray-200">Scroll wheel to zoom in and out</span>
            </div>

            <div
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-pink-500/10 border border-pink-500/20"
            >
              <span className="text-neon-pink text-base sm:text-lg flex-shrink-0 font-bold">🔄</span>
              <span className="text-sm text-gray-200">Auto-rotating with orbit controls enabled</span>
            </div>
          </div>
        </div>

        {/* Footer with tip */}
        <div className="pt-3 sm:pt-4 border-t border-neon-cyan/10 text-xs text-gray-400">
          <p className="flex items-center gap-2">
            <span className="text-lg">💡</span>
            Right-click and drag to pan the view around
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
