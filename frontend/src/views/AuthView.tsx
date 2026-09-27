import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface AuthViewProps {
  onLoginSuccess: () => void;
  onNavigate: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('engineer@techcorp.pk');
  const [password, setPassword] = useState('Jazbaat#2026!');
  const [fullName, setFullName] = useState('Zain Ahmed');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password entropy calculation
  const getPasswordEntropy = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const entropy = getPasswordEntropy(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      navigate('/dashboard/analyzer');
    }, 800);
  };

  const handleSsoClick = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      navigate('/dashboard/analyzer');
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl rounded-3xl bg-[#171b26] border border-[#313540] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Telemetry Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0a0e18] via-[#171b26] to-[#0f131d] p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#313540] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8083ff]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Platform Brand */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8083ff] to-[#494bd6] flex items-center justify-center shadow-lg shadow-[#8083ff]/20">
                <span className="material-symbols-outlined text-[#ffffff] text-xl font-bold">translate</span>
              </div>
              <div>
                <span className="font-headline-md font-bold tracking-tight text-[#dfe2f1] text-lg">Jazbaat AI</span>
                <span className="text-[10px] block font-mono text-[#908fa0]">Intelligence Terminal v2.4</span>
              </div>
            </div>

            <h2 className="font-headline-lg text-2xl font-bold text-[#dfe2f1] mb-2">
              Enter the Roman Urdu Intelligence Suite
            </h2>
            <p className="text-xs text-[#908fa0] leading-relaxed mb-6">
              Access real-time sentiment telemetry, custom dialect fine-tuning checkpoints, and ABSA entity pipelines.
            </p>

            {/* Live Token Telemetry Preview Stream */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#908fa0]">
                <span>Live Cluster Inferences</span>
                <span className="flex items-center gap-1 text-[#4edea3]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
                  Stream Active
                </span>
              </div>

              {/* Sample Stream Item 1 */}
              <div className="p-3 rounded-xl bg-[#0f131d]/90 border border-[#313540] text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#908fa0] font-mono">Feedback #89421</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#00a572]/20 text-[#4edea3] font-bold">Mosbat 98.4%</span>
                </div>
                <p className="text-[#dfe2f1] font-mono text-[11px] line-clamp-1">
                  "Pizza bohat garam tha maza aagaya rider bhai ne deliver time pe kiya"
                </p>
                <div className="text-[10px] text-[#8083ff] font-mono">Aspect: Food: +0.98 | Delivery: +0.89</div>
              </div>

              {/* Sample Stream Item 2 */}
              <div className="p-3 rounded-xl bg-[#0f131d]/90 border border-[#313540] text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#908fa0] font-mono">Feedback #89420</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] font-bold">Manfi 96.1%</span>
                </div>
                <p className="text-[#dfe2f1] font-mono text-[11px] line-clamp-1">
                  "Order abhi tak nahi mila, rider call attend nahi kar raha"
                </p>
                <div className="text-[10px] text-[#ffb4ab] font-mono">Aspect: Support: -0.92 | Delay: -0.97</div>
              </div>
            </div>
          </div>

          {/* Compliance & Security Footer */}
          <div className="pt-6 border-t border-[#313540]/60 mt-6 space-y-2">
            <div className="flex items-center gap-4 text-[11px] text-[#908fa0]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#4edea3]">lock</span>
                AES-256 GCM
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#4edea3]">verified_user</span>
                SOC-2 Type II
              </span>
              <span>Zero-Log GPU</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Mode Switcher Tabs */}
            <div className="flex p-1 rounded-xl bg-[#0f131d] border border-[#313540]">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-[#1c1f2a] text-[#dfe2f1] shadow-sm'
                    : 'text-[#908fa0] hover:text-[#dfe2f1]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'register'
                    ? 'bg-[#1c1f2a] text-[#dfe2f1] shadow-sm'
                    : 'text-[#908fa0] hover:text-[#dfe2f1]'
                }`}
              >
                Create Account
              </button>
            </div>

            <div>
              <h3 className="font-headline-md text-2xl font-bold text-[#dfe2f1]">
                {mode === 'signin' ? 'Welcome Back' : 'Get Started with Jazbaat AI'}
              </h3>
              <p className="text-xs text-[#908fa0] mt-1">
                {mode === 'signin'
                  ? 'Enter your enterprise credentials to access the workspace.'
                  : 'Start with 10,000 free monthly Roman Urdu inferences.'}
              </p>
            </div>

            {/* SSO Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSsoClick('Google')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#0f131d] border border-[#313540] hover:bg-[#1c1f2a] text-xs font-medium text-[#dfe2f1] transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSsoClick('GitHub')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#0f131d] border border-[#313540] hover:bg-[#1c1f2a] text-xs font-medium text-[#dfe2f1] transition-all"
              >
                <span className="material-symbols-outlined text-base">terminal</span>
                <span>GitHub</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#313540] w-full"></div>
              <span className="bg-[#171b26] px-3 text-[11px] text-[#908fa0] uppercase tracking-wider font-mono absolute">
                Or email
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-[#93000a]/20 border border-[#93000a]/50 text-xs text-[#ffb4ab]">
                {errorMsg}
              </div>
            )}

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-[#908fa0] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f131d] border border-[#313540] text-xs text-[#dfe2f1] focus:outline-none focus:border-[#8083ff] transition-all"
                    placeholder="e.g. Zain Ahmed"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#908fa0] mb-1">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f131d] border border-[#313540] text-xs text-[#dfe2f1] focus:outline-none focus:border-[#8083ff] transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#908fa0]">Password</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to registered email.')}
                      className="text-[11px] text-[#8083ff] hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f131d] border border-[#313540] text-xs text-[#dfe2f1] focus:outline-none focus:border-[#8083ff] transition-all pr-10"
                    placeholder="Enter security passphrase"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#908fa0] hover:text-[#dfe2f1]"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Password Entropy Meter */}
                {mode === 'register' && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#908fa0]">Passphrase Entropy:</span>
                      <span className={entropy === 100 ? 'text-[#4edea3]' : entropy >= 50 ? 'text-[#c0c1ff]' : 'text-[#ffb4ab]'}>
                        {entropy === 100 ? 'Optimal (Production Ready)' : entropy >= 75 ? 'Strong' : entropy >= 50 ? 'Moderate' : 'Weak'}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 h-1">
                      <div className={`rounded-full ${entropy >= 25 ? 'bg-[#ffb4ab]' : 'bg-[#313540]'}`}></div>
                      <div className={`rounded-full ${entropy >= 50 ? 'bg-[#d0bcff]' : 'bg-[#313540]'}`}></div>
                      <div className={`rounded-full ${entropy >= 75 ? 'bg-[#8083ff]' : 'bg-[#313540]'}`}></div>
                      <div className={`rounded-full ${entropy === 100 ? 'bg-[#4edea3]' : 'bg-[#313540]'}`}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="rounded bg-[#0f131d] border-[#313540] text-[#8083ff] focus:ring-0"
                  />
                  <span className="text-xs text-[#908fa0]">Remember device session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] font-bold text-xs tracking-wide transition-all shadow-lg shadow-[#8083ff]/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    <span>Validating Session...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'signin' ? 'Authenticate Session' : 'Create Intelligence Account'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <Link
                to="/"
                className="text-xs text-[#908fa0] hover:text-[#dfe2f1] transition-colors"
              >
                ← Back to Platform Overview
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
