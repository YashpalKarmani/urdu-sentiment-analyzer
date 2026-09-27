import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC<{ onNavigate: () => void }> = () => {
  return (
    <footer className="bg-[#0a0e18] border-t border-[#313540]/60 text-[#c7c4d7] py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8083ff] to-[#494bd6] flex items-center justify-center shadow-lg shadow-[#8083ff]/20">
              <span className="material-symbols-outlined text-[#ffffff] text-lg font-bold">translate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-headline-md font-bold tracking-tight text-[#dfe2f1] text-lg">Jazbaat AI</span>
              <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#8083ff]/15 text-[#c0c1ff] border border-[#8083ff]/30 font-semibold">
                v2.4
              </span>
            </div>
          </div>
          <p className="text-xs text-[#908fa0] leading-relaxed max-w-sm">
            High-precision, NLP inference suite engineered specifically for Roman Urdu syntax.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#4edea3] font-mono bg-[#003824]/60 border border-[#00a572]/40 px-2.5 py-1 rounded-md">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
              All Systems Operational
            </span>
          </div>
        </div>

        {/* Column 1: Core Platform */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#dfe2f1] font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-xs text-[#908fa0]">
            <li>
              <Link to="/dashboard/analyzer" className="hover:text-[#dfe2f1] transition-colors">
                Sentiment Workspace
              </Link>
            </li>
            <li>
              <Link to="/dashboard/history" className="hover:text-[#dfe2f1] transition-colors">
                Inference History
              </Link>
            </li>
            <li>
              <Link to="/admin/datasets" className="hover:text-[#dfe2f1] transition-colors">
                Datasets
              </Link>
            </li>
            <li>
              <Link to="/admin/evaluations" className="hover:text-[#dfe2f1] transition-colors">
                Model Evaluations
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-[#dfe2f1] transition-colors">
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#313540]/50 flex flex-col sm:flex-row items-center justify-between text-xs text-[#908fa0] gap-4">
        <p>© 2026 Jazbaat AI Inc. All rights reserved. Specialized for Roman Urdu Natural Language Understanding.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#dfe2f1] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#dfe2f1] cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
