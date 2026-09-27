import React, { useState } from 'react';
import { Sentiment } from '../types';

export const AnalyzerView: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [currentResult, setCurrentResult] = useState<Sentiment | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    // Simulated API Call
    setTimeout(() => {
      const lower = inputText.toLowerCase();
      
      const posWords = ['lazeez', 'masalaydaar', 'bohat', 'zabardast', 'acha', 'shukriya', 'fresh', 'fit', 'ek number', 'kamaal', 'shandar', 'recommend', 'fast', 'quick'];
      const negWords = ['fazool', 'late', 'kharab', 'thanda', 'badtameez', 'bekar', 'crash', 'pesay', 'delay', 'ghanta', 'mana', 'gali', 'masla', 'problem'];

      let isPos = posWords.some(w => lower.includes(w));
      let isNeg = negWords.some(w => lower.includes(w));

      let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
      if (isPos && !isNeg) sentiment = 'positive';
      else if (isNeg && !isPos) sentiment = 'negative';

      const calculatedResult: Sentiment = {
        _id: `res_${Math.random().toString(36).substring(2, 9)}`,
        user: 'current-user',
        text: inputText,
        sentiment: sentiment,
        confidence: Number((0.85 + (Math.random() * 0.14)).toFixed(2)),
        modelVersion: 'v1.0.0',
        processingTime: Math.floor(Math.random() * 200) + 50,
        createdAt: new Date().toISOString()
      };

      setCurrentResult(calculatedResult);
      setIsAnalyzing(false);
      showToast('Analysis completed');
    }, 450);
  };

  const handleSaveCurrent = () => {
    if (!currentResult) return;
    // Simulate save to history
    showToast(`Saved to history log!`);
  };

  const handleClear = () => {
    setInputText('');
    setCurrentResult(null);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c1f2a] border border-[#8083ff] text-xs text-[#dfe2f1] shadow-2xl shadow-[#8083ff]/30 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-sm text-[#4edea3]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#313540]/60">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-[#dfe2f1]">
            Sentiment Analyzer
          </h1>
          <p className="text-sm text-[#908fa0] mt-1">
            Analyze the sentiment of Roman Urdu text seamlessly.
          </p>
        </div>
      </div>

      {/* Sequence Input Card */}
      <div className="rounded-2xl bg-[#171b26] border border-[#313540] p-6 shadow-xl space-y-4">
        
        <div className="flex justify-between items-center">
           <label className="text-sm font-semibold text-[#dfe2f1]">Enter Text</label>
           <button onClick={handleClear} className="text-xs text-[#908fa0] hover:text-[#ffb4ab]">Clear</button>
        </div>

        {/* Text Area */}
        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
              handleAnalyze();
            }
          }}
          placeholder="Type or paste Roman Urdu text here..."
          className="w-full rounded-xl bg-[#0f131d] border border-[#313540] p-4 text-sm text-[#dfe2f1] focus:outline-none focus:border-[#8083ff] transition-all resize-y font-sans leading-relaxed"
        />

        {/* Footer controls inside Sequence card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="text-xs text-[#908fa0]">
            <span>{inputText.length} characters</span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputText.trim()}
            className="px-6 py-2.5 rounded-xl bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#8083ff]/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze Sentiment</span>
                <span className="material-symbols-outlined text-sm font-bold">bolt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {currentResult && (
        <div className="rounded-2xl bg-[#171b26] border border-[#313540] p-6 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#313540]">
            <span className="text-sm font-mono uppercase tracking-wider text-[#908fa0]">Analysis Result</span>
            <span className="text-xs font-mono text-[#4edea3]">
              {currentResult.processingTime}ms Latency
            </span>
          </div>

          <div className="flex flex-col items-center py-4">
            {/* Status Badge */}
            <div className="mb-6">
              <span className={`px-6 py-2 rounded-full text-lg font-bold uppercase tracking-wider ${
                currentResult.sentiment === 'positive'
                  ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/40'
                  : currentResult.sentiment === 'negative'
                    ? 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/40'
                    : 'bg-[#313540] text-[#c7c4d7] border border-[#464554]'
              }`}>
                {currentResult.sentiment}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-center w-full max-w-md">
                <div>
                   <div className="text-2xl font-bold text-[#dfe2f1] font-mono">{(currentResult.confidence * 100).toFixed(1)}%</div>
                   <div className="text-xs text-[#908fa0] uppercase tracking-wide mt-1">Confidence Score</div>
                </div>
                <div>
                   <div className="text-lg font-semibold text-[#dfe2f1] font-mono mt-1">{currentResult.modelVersion}</div>
                   <div className="text-xs text-[#908fa0] uppercase tracking-wide mt-1">Model Version</div>
                </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#313540]/60">
             <button
                onClick={handleSaveCurrent}
                className="px-4 py-2 rounded-xl bg-[#1c1f2a] hover:bg-[#262a35] border border-[#313540] text-sm font-semibold text-[#dfe2f1] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm text-[#4edea3]">save</span>
                <span>Save to History</span>
              </button>
          </div>
        </div>
      )}

    </div>
  );
};
