import React, { useState } from 'react';

export const AdminView: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Cache synchronized!');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c1f2a] border border-[#8083ff] text-xs text-[#dfe2f1] shadow-2xl shadow-[#8083ff]/30 animate-in fade-in">
          <span className="material-symbols-outlined text-sm text-[#4edea3]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#313540]/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-headline-lg text-2xl font-bold text-[#dfe2f1]">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-xs text-[#908fa0] mt-1">
            Global metrics across all sentiments, datasets, and evaluations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="px-4 py-2.5 rounded-xl bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] text-xs font-bold transition-all shadow-lg shadow-[#8083ff]/20 flex items-center gap-2 disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncing ? 'Synchronizing...' : 'Refresh Stats'}</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#171b26] border border-[#313540] space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#908fa0] uppercase">Total Sentiments</span>
          </div>
          <p className="font-headline-md text-3xl font-bold text-[#dfe2f1]">1,842</p>
          <span className="text-[10px] text-[#4edea3] mt-2 block">+12 today</span>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#171b26] border border-[#313540] space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#908fa0] uppercase">Avg Confidence</span>
          </div>
          <p className="font-headline-md text-3xl font-bold text-[#4edea3]">94.6%</p>
          <span className="text-[10px] text-[#908fa0] mt-2 block">Across all inferences</span>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#171b26] border border-[#313540] space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#908fa0] uppercase">Active Datasets</span>
          </div>
          <p className="font-headline-md text-3xl font-bold text-[#c0c1ff]">14</p>
          <span className="text-[10px] text-[#908fa0] mt-2 block">Available for training</span>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#171b26] border border-[#313540] space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#908fa0] uppercase">Latest Model Acc.</span>
          </div>
          <p className="font-headline-md text-3xl font-bold text-[#d0bcff]">92.0%</p>
          <span className="text-[10px] text-[#908fa0] mt-2 block">v1.0.1 Model</span>
        </div>

      </div>

    </div>
  );
};
