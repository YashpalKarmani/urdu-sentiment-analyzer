import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  userLoggedIn: boolean;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userLoggedIn,
  onSignOut
}) => {
  const [showScreenDropdown, setShowScreenDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = location.pathname;

  const screens = [
    { id: '/', name: 'Landing', icon: 'home', desc: 'Product showcase' },
    { id: '/dashboard/analyzer', name: 'Analyzer Workspace', icon: 'psychology', desc: 'Real-time sentiment inference' },
    { id: '/dashboard/history', name: 'History & Logs', icon: 'history', desc: 'Inference logs' },
    { id: '/admin', name: 'Admin Dashboard', icon: 'admin_panel_settings', desc: 'Global statistics overview' },
    { id: '/admin/datasets', name: 'Datasets', icon: 'dataset', desc: 'Training corpora management' },
    { id: '/admin/evaluations', name: 'Model Evaluations', icon: 'monitoring', desc: 'AI model metrics' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0f131d]/90 backdrop-blur-md border-b border-[#313540]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Screen Picker */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group transition-all">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8083ff] to-[#494bd6] flex items-center justify-center shadow-lg shadow-[#8083ff]/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[#ffffff] text-xl font-bold">translate</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-md font-bold tracking-tight text-[#dfe2f1] text-lg">Jazbaat</span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#8083ff]/15 text-[#c0c1ff] border border-[#8083ff]/30 font-semibold">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-[#908fa0] leading-none tracking-wide">Roman Urdu NLP Suite</p>
            </div>
          </Link>

          {/* Screen Switcher Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowScreenDropdown(!showScreenDropdown)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#1c1f2a] border border-[#313540] hover:border-[#8083ff]/50 text-xs font-medium text-[#c7c4d7] hover:text-[#dfe2f1] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="hidden sm:inline">Screen:</span>
              <span className="font-semibold text-[#dfe2f1]">
                {screens.find(s => s.id === currentView)?.name || 'Screens'}
              </span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {showScreenDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowScreenDropdown(false)} />
                <div className="absolute left-0 mt-2 w-80 rounded-xl bg-[#171b26] border border-[#313540] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="space-y-1">
                    {screens.map(screen => (
                      <Link
                        key={screen.id}
                        to={screen.id}
                        onClick={() => setShowScreenDropdown(false)}
                        className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-all ${
                          currentView === screen.id 
                            ? 'bg-[#8083ff]/15 border border-[#8083ff]/40 text-[#ffffff]' 
                            : 'hover:bg-[#1c1f2a] text-[#c7c4d7] hover:text-[#dfe2f1]'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-lg mt-0.5 ${currentView === screen.id ? 'text-[#c0c1ff]' : 'text-[#908fa0]'}`}>
                          {screen.icon}
                        </span>
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            {screen.name}
                          </div>
                          <p className="text-[11px] text-[#908fa0] leading-tight mt-0.5 line-clamp-1">{screen.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/dashboard/analyzer"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === '/dashboard/analyzer' ? 'bg-[#262a35] text-[#dfe2f1] font-semibold' : 'text-[#908fa0] hover:text-[#dfe2f1] hover:bg-[#1c1f2a]'
            }`}
          >
            Workspace
          </Link>
          <Link
            to="/dashboard/history"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === '/dashboard/history' ? 'bg-[#262a35] text-[#dfe2f1] font-semibold' : 'text-[#908fa0] hover:text-[#dfe2f1] hover:bg-[#1c1f2a]'
            }`}
          >
            History
          </Link>
          <Link
            to="/admin/datasets"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === '/admin/datasets' ? 'bg-[#262a35] text-[#dfe2f1] font-semibold' : 'text-[#908fa0] hover:text-[#dfe2f1] hover:bg-[#1c1f2a]'
            }`}
          >
            Datasets
          </Link>
          <Link
            to="/admin"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === '/admin' ? 'bg-[#262a35] text-[#dfe2f1] font-semibold' : 'text-[#908fa0] hover:text-[#dfe2f1] hover:bg-[#1c1f2a]'
            }`}
          >
            Admin
          </Link>
        </nav>

        {/* Right Action Tools & Auth */}
        <div className="flex items-center gap-3">
          {userLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard/analyzer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1c1f2a] border border-[#313540] hover:border-[#8083ff]/50 transition-all text-xs">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#8083ff] to-[#4edea3] flex items-center justify-center font-bold text-[#0d0096] text-[11px]">
                  ZA
                </div>
                <span className="text-[#dfe2f1] font-medium hidden sm:inline">Zain Ahmed</span>
              </Link>
              <button
                onClick={onSignOut}
                className="p-1.5 rounded-lg text-[#908fa0] hover:text-[#ffb4ab] hover:bg-[#93000a]/20 transition-all"
                title="Sign out"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#c7c4d7] hover:text-[#dfe2f1] hover:bg-[#1c1f2a] transition-all">
                Sign In
              </Link>
              <Link to="/dashboard/analyzer" className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] shadow-md shadow-[#8083ff]/20 transition-all flex items-center gap-1.5">
                Launch App
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
