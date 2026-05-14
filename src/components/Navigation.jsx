import React, { useState } from 'react';
import { FaAtom } from 'react-icons/fa';

/**
 * Navigation Component - compact top navbar
 */
export const Navigation = ({ activePage, onChangePage }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 dashboard-header px-3 sm:px-4">
      <div className="content-card w-full flex items-center justify-between gap-4 sm:gap-6 min-h-[68px]">
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <div className="relative p-2 rounded-full glass">
            <FaAtom className="text-lg sm:text-2xl text-neon-cyan" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.35em] text-neon-cyan font-semibold">Chem Studio</p>
            <h1 className="text-lg sm:text-xl font-bold text-white">Dashboard</h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <nav className="flex items-center gap-3">
            {['visualize','periodic-table','compare','about'].map((p) => (
              <button key={p} type="button" onClick={() => onChangePage(p)} className={`px-4 py-2 rounded-full border transition duration-300 text-sm ${activePage === p ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' : 'glass text-gray-300 border-white/10 hover:border-white/20'}`}>
                {p === 'periodic-table' ? 'Periodic Table' : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setOpen(v => !v)} className="p-2 rounded glass">Menu</button>
        </div>
      </div>

      {open && (
        <div className="absolute right-4 mt-2 w-48 glass p-3 rounded-lg z-40">
          <div className="flex flex-col gap-2">
            <button className="text-left" onClick={() => { onChangePage('visualize'); setOpen(false); }}>Visualize</button>
            <button className="text-left" onClick={() => { onChangePage('periodic-table'); setOpen(false); }}>Periodic Table</button>
            <button className="text-left" onClick={() => { onChangePage('compare'); setOpen(false); }}>Compare</button>
            <button className="text-left" onClick={() => { onChangePage('about'); setOpen(false); }}>About</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
