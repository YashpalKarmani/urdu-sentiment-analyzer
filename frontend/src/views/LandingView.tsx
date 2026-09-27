import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LandingViewProps {
  onNavigate: () => void;
}

export const LandingView: React.FC<LandingViewProps> = () => {
  const navigate = useNavigate();
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'python' | 'node'>('python');
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Interactive mini-demo in the hero
  const [heroInput, setHeroInput] = useState('Biryani bohat lazeez aur masalaydaar thi lekin delivery adha ghanta late aayi.');
  const [heroAnalysis, setHeroAnalysis] = useState<{
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    tokens: { word: string; weight: string; color: string }[];
  }>({
    sentiment: 'positive',
    confidence: 96.4,
    tokens: [
      { word: 'Biryani', weight: '+0.2', color: 'text-[#c7c4d7]' },
      { word: 'bohat', weight: '+0.6', color: 'text-[#4edea3]' },
      { word: 'lazeez', weight: '+0.95', color: 'text-[#4edea3] font-bold bg-[#00a572]/20 px-1 rounded' },
      { word: 'masalaydaar', weight: '+0.88', color: 'text-[#4edea3] font-bold' },
      { word: 'lekin', weight: 'contrast', color: 'text-[#d0bcff]' },
      { word: 'delivery', weight: '-0.3', color: 'text-[#c7c4d7]' },
      { word: 'late aayi', weight: '-0.85', color: 'text-[#ffb4ab] font-bold bg-[#93000a]/20 px-1 rounded' }
    ]
  });

  const handleHeroAnalyze = () => {
    // Determine sentiment dynamically for hero sandbox
    const lower = heroInput.toLowerCase();
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    let confidence = 94.2;

    if (lower.includes('fazool') || lower.includes('kharab') || lower.includes('badtameez') || lower.includes('late') || lower.includes('thanda')) {
      sentiment = lower.includes('lazeez') || lower.includes('zabardast') ? 'positive' : 'negative';
      confidence = 96.8;
    } else if (lower.includes('zabardast') || lower.includes('lazeez') || lower.includes('acha') || lower.includes('shukriya') || lower.includes('fresh')) {
      sentiment = 'positive';
      confidence = 98.4;
    }

    const words = heroInput.split(' ').map(w => {
      const isPos = ['bohat', 'lazeez', 'masalaydaar', 'zabardast', 'acha', 'fresh', 'shukriya', 'fit'].includes(w.toLowerCase().replace(/[^a-z]/g, ''));
      const isNeg = ['fazool', 'late', 'kharab', 'thanda', 'badtameez', 'bekar', 'crash'].includes(w.toLowerCase().replace(/[^a-z]/g, ''));
      const isContrast = ['lekin', 'magar', 'par'].includes(w.toLowerCase().replace(/[^a-z]/g, ''));
      
      return {
        word: w,
        weight: isPos ? '+0.89' : isNeg ? '-0.85' : isContrast ? 'pivot' : '+0.12',
        color: isPos 
          ? 'text-[#4edea3] font-bold bg-[#00a572]/20 px-1 rounded' 
          : isNeg 
            ? 'text-[#ffb4ab] font-bold bg-[#93000a]/20 px-1 rounded' 
            : isContrast 
              ? 'text-[#d0bcff]' 
              : 'text-[#c7c4d7]'
      };
    });

    setHeroAnalysis({
      sentiment,
      confidence,
      tokens: words.slice(0, 10)
    });
  };

  const copyCodeSnippet = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const codeSnippets = {
    python: `from jazbaat import JazbaatClassifier

client = JazbaatClassifier(api_key="jaz_live_sec_892x04")

response = client.analyze(
    sequence="Biryani bohat lazeez thi lekin delivery late hui",
    dialect_context="karachi_slang",
    extract_aspects=True
)

print(response.predominant)     # 'positive' (68%)
print(response.aspects["food"]) # 'positive' (98%)
print(response.aspects["speed"])# 'negative' (86%)`,
    curl: `curl -X POST https://api.jazbaat.ai/v2/analyze \\
  -H "Authorization: Bearer jaz_live_sec_892x04" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sequence": "Biryani bohat lazeez thi lekin delivery late hui",
    "extract_aspects": true,
    "confidence_threshold": 0.85
  }'`,
    node: `import { JazbaatClient } from '@jazbaat/sdk';

const jazbaat = new JazbaatClient({ apiKey: process.env.JAZBAAT_API_KEY });

const result = await jazbaat.sentiment.analyze({
  text: "Biryani bohat lazeez thi lekin delivery late hui",
  includeAttentionWeights: true
});

console.log(result.predominant, result.aspects);`
  };

  return (
    <div className="space-y-24 py-8">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1f2a] border border-[#313540] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#8083ff] animate-pulse"></span>
              <span className="text-[#c0c1ff] font-semibold">UrduRoBERTa-v2.4 Released</span>
              <span className="text-[#908fa0]">| 96.8% Macro F1</span>
            </div>

            <h1 className="font-headline-lg text-4xl sm:text-6xl font-extrabold tracking-tight text-[#dfe2f1] leading-[1.1]">
              Decode Emotions in <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8083ff] via-[#c0c1ff] to-[#4edea3]">
                Roman Urdu
              </span>{' '}
              with 96.8% Accuracy
            </h1>

            <p className="text-base sm:text-lg text-[#908fa0] leading-relaxed max-w-2xl">
              Standard NLP models fail when handling code-mixed Urdu with English, regional vernaculars (Karachi, Lahori, Pindi), and culturally layered sarcasm. Jazbaat AI is custom-architected for Pakistani customer interactions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/dashboard/analyzer')}
                className="px-6 py-3.5 rounded-xl font-semibold bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] shadow-lg shadow-[#8083ff]/25 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Launch Sentiment Workspace</span>
                <span className="material-symbols-outlined text-base font-bold">arrow_forward</span>
              </button>
              <button
                onClick={() => navigate('/admin/evaluations')}
                className="px-5 py-3.5 rounded-xl font-medium bg-[#1c1f2a] hover:bg-[#262a35] text-[#dfe2f1] border border-[#313540] transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base text-[#4edea3]">bar_chart</span>
                <span>View F1 Benchmarks</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#313540]/60 max-w-lg">
              <div>
                <p className="font-headline-md text-2xl font-bold text-[#dfe2f1]">45M+</p>
                <p className="text-xs text-[#908fa0]">Urdu Tokens Processed</p>
              </div>
              <div>
                <p className="font-headline-md text-2xl font-bold text-[#4edea3]">14.2ms</p>
                <p className="text-xs text-[#908fa0]">Edge Ingestion Latency</p>
              </div>
              <div>
                <p className="font-headline-md text-2xl font-bold text-[#c0c1ff]">96.8%</p>
                <p className="text-xs text-[#908fa0]">Macro F1 Score</p>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive Sandbox Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#171b26] border border-[#313540] p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#313540]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8083ff] text-lg">code</span>
                  <span className="text-xs font-mono font-semibold uppercase text-[#dfe2f1] tracking-wider">Live Playground</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4edea3]/15 text-[#4edea3] border border-[#4edea3]/30">
                  REAL-TIME PREVIEW
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#908fa0] mb-1.5">
                    Input Roman Urdu Sequence:
                  </label>
                  <textarea
                    rows={3}
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    className="w-full rounded-xl bg-[#0f131d] border border-[#313540] p-3 text-xs text-[#dfe2f1] focus:outline-none focus:border-[#8083ff] transition-all resize-none font-sans"
                    placeholder="Type Roman Urdu feedback..."
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        setHeroInput('Biryani bohat lazeez aur masalaydaar thi lekin delivery adha ghanta late aayi.');
                      }}
                      className="text-[11px] px-2 py-1 rounded bg-[#1c1f2a] text-[#908fa0] hover:text-[#dfe2f1] hover:bg-[#262a35] transition-all"
                    >
                      Food
                    </button>
                    <button
                      onClick={() => {
                        setHeroInput('Zabardast product hai yaar! Packing ek number thi.');
                      }}
                      className="text-[11px] px-2 py-1 rounded bg-[#1c1f2a] text-[#908fa0] hover:text-[#dfe2f1] hover:bg-[#262a35] transition-all"
                    >
                      E-com
                    </button>
                    <button
                      onClick={() => {
                        setHeroInput('Fazool tareen rider tha, khana thanda ho gaya bilkul.');
                      }}
                      className="text-[11px] px-2 py-1 rounded bg-[#1c1f2a] text-[#908fa0] hover:text-[#dfe2f1] hover:bg-[#262a35] transition-all"
                    >
                      Negative
                    </button>
                  </div>
                  
                  <button
                    onClick={handleHeroAnalyze}
                    className="px-4 py-2 rounded-lg bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-[#8083ff]/20"
                  >
                    <span>Analyze</span>
                    <span className="material-symbols-outlined text-sm">bolt</span>
                  </button>
                </div>

                {/* Analysis Output Container */}
                <div className="p-4 rounded-xl bg-[#0f131d]/80 border border-[#313540] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#908fa0]">Predicted Polarity:</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        heroAnalysis.sentiment === 'positive' 
                          ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/40' 
                          : heroAnalysis.sentiment === 'negative'
                            ? 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/40'
                            : 'bg-[#313540] text-[#c7c4d7]'
                      }`}>
                        {heroAnalysis.sentiment === 'positive' ? 'Mosbat (Positive)' : heroAnalysis.sentiment === 'negative' ? 'Manfi (Negative)' : 'Darmiyana (Neutral)'}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#dfe2f1]">
                        {heroAnalysis.confidence}%
                      </span>
                    </div>
                  </div>

                  {/* Tokenized Attention Mini-Stream */}
                  <div>
                    <span className="text-[11px] text-[#908fa0] block mb-1.5 font-mono">Attention Token Map:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {heroAnalysis.tokens.map((t, idx) => (
                        <span key={idx} className={`text-xs px-2 py-0.5 rounded bg-[#1c1f2a] border border-[#313540] ${t.color}`}>
                          {t.word}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#313540]/60 flex items-center justify-between text-[11px] text-[#908fa0]">
                    <span>Dialect: <strong className="text-[#dfe2f1]">Karachi & Urban Mixed</strong></span>
                    <button 
                      onClick={() => navigate('/dashboard/analyzer')}
                      className="text-[#8083ff] hover:underline font-medium flex items-center gap-1"
                    >
                      Open in Full Workspace →
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Core Capabilities Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#8083ff] font-semibold">Engineered For Roman Urdu</p>
          <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#dfe2f1]">
            Why Generic LLMs Fail on Pakistani Vernacular
          </h2>
          <p className="text-sm text-[#908fa0]">
            English-centric models misinterpret Roman Urdu expressions like <span className="text-[#dfe2f1]">"ek number"</span> as a numeral or <span className="text-[#dfe2f1]">"chuss maari"</span> as gibberish. Jazbaat AI maps cultural semantics directly into latent embedding space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Dialect Awareness */}
          <div className="rounded-2xl bg-[#171b26] border border-[#313540] p-6 hover:border-[#8083ff]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#8083ff]/15 border border-[#8083ff]/30 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#c0c1ff] text-2xl">location_on</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-[#dfe2f1] mb-2">Regional Dialect Disambiguation</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed mb-4">
                Native normalization for Karachi slang (<code className="text-[#c0c1ff]">"bhai scene on hai"</code>), Lahori urban phrasing (<code className="text-[#c0c1ff]">"chuss mat maro"</code>), and Pindi street terminology.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#0f131d] border border-[#313540] text-[11px] font-mono text-[#c7c4d7]">
              Normalization: <span className="text-[#4edea3]">bohot, bht, bahaat → bohat</span>
            </div>
          </div>

          {/* Card 2: Aspect-Based Sentiment (ABSA) */}
          <div className="rounded-2xl bg-[#171b26] border border-[#313540] p-6 hover:border-[#8083ff]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#4edea3]/15 border border-[#4edea3]/30 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#4edea3] text-2xl">category</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-[#dfe2f1] mb-2">Aspect-Based Entity Dissection (ABSA)</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed mb-4">
                Separates compound reviews into discrete entity buckets. Understand when food quality is 5-star positive while the delivery rider speed was 1-star negative in the exact same sentence.
              </p>
            </div>
            <div className="space-y-1.5 p-3 rounded-lg bg-[#0f131d] border border-[#313540] text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#908fa0]">Khana (Food):</span>
                <span className="text-[#4edea3] font-bold">Mosbat (98%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#908fa0]">Raftaar (Delivery):</span>
                <span className="text-[#ffb4ab] font-bold">Manfi (86%)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Sarcasm & Negation Resilience */}
          <div className="rounded-2xl bg-[#171b26] border border-[#313540] p-6 hover:border-[#8083ff]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#d0bcff]/15 border border-[#d0bcff]/30 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#d0bcff] text-2xl">sentiment_dissatisfied</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-[#dfe2f1] mb-2">Sarcasm & Negation Resilience</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed mb-4">
                Detects culturally inverted praise like <code className="text-[#d0bcff]">"kya hi tezi hai aapki, 3 ghantay baad pohanchi biryani"</code> and maps the true grievance without false positives.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#0f131d] border border-[#313540] text-[11px] font-mono text-[#c7c4d7]">
              Attention Inversion: <span className="text-[#ffb4ab]">Praise inverted to Grievance (94.7%)</span>
            </div>
          </div>

        </div>
      </section>

      {/* Developer Integration Code Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#171b26] border border-[#313540] p-8 sm:p-12 overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4edea3] font-semibold">Production Ready</span>
              <h2 className="font-headline-lg text-3xl font-bold text-[#dfe2f1]">
                2 Lines of Code to Real-Time Sentiment
              </h2>
              <p className="text-xs sm:text-sm text-[#908fa0] leading-relaxed">
                Connect your food delivery dispatch, e-commerce support desk, or WhatsApp customer engagement pipeline via low-latency REST and gRPC endpoints.
              </p>
              
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#dfe2f1]">
                  <span className="material-symbols-outlined text-[#4edea3] text-sm">check_circle</span>
                  <span>Python, Node.js, Go, and cURL client SDKs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#dfe2f1]">
                  <span className="material-symbols-outlined text-[#4edea3] text-sm">check_circle</span>
                  <span>Batch throughput up to 10,000 sentences / second</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#dfe2f1]">
                  <span className="material-symbols-outlined text-[#4edea3] text-sm">check_circle</span>
                  <span>OpenAPI 3.1 & Postman Collection included</span>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => navigate('/dashboard/analyzer')}
                  className="px-5 py-2.5 rounded-lg bg-[#8083ff] text-[#0d0096] text-xs font-semibold hover:bg-[#8083ff]/90 transition-all flex items-center gap-2"
                >
                  <span>Explore Developer Sandbox</span>
                  <span className="material-symbols-outlined text-sm">terminal</span>
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#0f131d] border border-[#313540] overflow-hidden shadow-2xl">
                
                {/* Code Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0e18] border-b border-[#313540]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ffb4ab]/40"></span>
                    <span className="w-3 h-3 rounded-full bg-[#8083ff]/40"></span>
                    <span className="w-3 h-3 rounded-full bg-[#4edea3]/40"></span>
                    <div className="ml-3 flex items-center gap-1">
                      {(['python', 'curl', 'node'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveCodeTab(tab)}
                          className={`px-3 py-1 rounded text-xs font-mono capitalize transition-all ${
                            activeCodeTab === tab
                              ? 'bg-[#1c1f2a] text-[#dfe2f1] font-semibold'
                              : 'text-[#908fa0] hover:text-[#dfe2f1]'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={copyCodeSnippet}
                    className="flex items-center gap-1.5 text-xs text-[#908fa0] hover:text-[#dfe2f1] font-mono transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedCode ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Code Block Content */}
                <div className="p-4 overflow-x-auto text-xs font-mono text-[#c7c4d7] leading-relaxed">
                  <pre>{codeSnippets[activeCodeTab]}</pre>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Enterprise Social Proof / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-[#908fa0]">Enterprise Grade</p>
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#dfe2f1] mt-1">
            Trusted by Pakistan’s Leading Tech Platforms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#171b26] border border-[#313540] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffb4ab]/20 text-[#ffb4ab] flex items-center justify-center font-bold text-sm font-headline-md">
                FP
              </div>
              <div>
                <p className="text-xs font-bold text-[#dfe2f1]">Lead Data Scientist</p>
                <p className="text-[11px] text-[#908fa0]">Food Delivery & Quick Commerce</p>
              </div>
            </div>
            <p className="text-xs text-[#c7c4d7] leading-relaxed italic">
              "We used to struggle with 35% unrecognized sentiment when riders were reviewed in Roman Urdu. Jazbaat AI’s ABSA split resolved rider vs food disputes instantly."
            </p>
            <div className="flex items-center gap-1 text-[#4edea3] text-xs">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Reduced Escalations by 42%</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#171b26] border border-[#313540] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8083ff]/20 text-[#8083ff] flex items-center justify-center font-bold text-sm font-headline-md">
                DZ
              </div>
              <div>
                <p className="text-xs font-bold text-[#dfe2f1]">VP of Customer Experience</p>
                <p className="text-[11px] text-[#908fa0]">E-Commerce Marketplace</p>
              </div>
            </div>
            <p className="text-xs text-[#c7c4d7] leading-relaxed italic">
              "Parsing millions of daily seller reviews written in mixed Punjabi-Urdu-English was impossible for stock BERT models. Jazbaat’s F1 score speaks for itself."
            </p>
            <div className="flex items-center gap-1 text-[#4edea3] text-xs">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>18M+ Reviews Triaged</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#171b26] border border-[#313540] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center font-bold text-sm font-headline-md">
                CR
              </div>
              <div>
                <p className="text-xs font-bold text-[#dfe2f1]">Head of Machine Learning</p>
                <p className="text-[11px] text-[#908fa0]">Mobility & Super App</p>
              </div>
            </div>
            <p className="text-xs text-[#c7c4d7] leading-relaxed italic">
              "Sub-15ms edge inference latency allows us to flag aggressive or unsafe passenger/captain exchanges in real time while rides are active."
            </p>
            <div className="flex items-center gap-1 text-[#4edea3] text-xs">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>12.4ms P99 Latency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Tiers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-[#8083ff] font-semibold">Predictable Scalability</p>
          <h2 className="font-headline-lg text-3xl font-bold text-[#dfe2f1] mt-1">
            Built for Hackers, Scaling to Millions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className="rounded-2xl bg-[#171b26] border border-[#313540] p-6 space-y-6">
            <div>
              <h3 className="font-headline-md text-lg font-bold text-[#dfe2f1]">Developer Sandbox</h3>
              <p className="text-xs text-[#908fa0] mt-1">For prototyping and thesis research.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold font-headline-lg text-[#dfe2f1]">$0</span>
                <span className="text-xs text-[#908fa0]"> / forever</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-[#c7c4d7]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>10,000 inferences / month</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>Full ABSA Entity Extraction</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>Community Discord Support</span>
              </li>
            </ul>
            <button
              onClick={() => navigate('/dashboard/analyzer')}
              className="w-full py-2.5 rounded-lg bg-[#1c1f2a] hover:bg-[#262a35] text-[#dfe2f1] border border-[#313540] text-xs font-semibold transition-all"
            >
              Start Free Today
            </button>
          </div>

          {/* Growth Tier */}
          <div className="rounded-2xl bg-[#171b26] border-2 border-[#8083ff] p-6 space-y-6 relative shadow-xl shadow-[#8083ff]/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#8083ff] text-[#0d0096] font-bold">
              Most Popular
            </span>
            <div>
              <h3 className="font-headline-md text-lg font-bold text-[#dfe2f1]">Growth Production</h3>
              <p className="text-xs text-[#908fa0] mt-1">For high-volume apps and customer desks.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold font-headline-lg text-[#dfe2f1]">$149</span>
                <span className="text-xs text-[#908fa0]"> / month</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-[#c7c4d7]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>1,500,000 inferences / month</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>Dialect Custom Normalization Rules</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>Sub-15ms Dedicated Edge Workers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>SLA 99.9% Guarantee</span>
              </li>
            </ul>
            <button
              onClick={() => navigate('/dashboard/analyzer')}
              className="w-full py-2.5 rounded-lg bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] text-xs font-bold transition-all shadow-md shadow-[#8083ff]/20"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="rounded-2xl bg-[#171b26] border border-[#313540] p-6 space-y-6">
            <div>
              <h3 className="font-headline-md text-lg font-bold text-[#dfe2f1]">Custom Enterprise</h3>
              <p className="text-xs text-[#908fa0] mt-1">On-premise & fine-tuned checkpoints.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold font-headline-lg text-[#dfe2f1]">Custom</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-[#c7c4d7]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>Unlimited batch inferences</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>Private VPC / On-Prem Kubernetes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>Custom Fine-Tuning on your Corpus</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-sm">check</span>
                <span>Dedicated NLP Research Engineer</span>
              </li>
            </ul>
            <button
              onClick={() => navigate('/admin')}
              className="w-full py-2.5 rounded-lg bg-[#1c1f2a] hover:bg-[#262a35] text-[#dfe2f1] border border-[#313540] text-xs font-semibold transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#1c1f2a] via-[#262a35] to-[#1c1f2a] border border-[#8083ff]/40 p-10 sm:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8083ff]/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#dfe2f1]">
            Ready to Unlock Roman Urdu Intelligence?
          </h2>
          <p className="text-sm text-[#908fa0] max-w-xl mx-auto">
            Experience the real-time tokenized attention maps, dialect normalization, and aspect breakdown directly in your browser.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/dashboard/analyzer')}
              className="px-8 py-3.5 rounded-xl font-bold bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] text-sm shadow-xl shadow-[#8083ff]/25 transition-all inline-flex items-center gap-2"
            >
              <span>Launch Sentiment Workspace</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
