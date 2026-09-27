import React, { useState } from 'react';
import { Dataset } from '../types';

interface DatasetsViewProps {
  datasets: Dataset[];
  onAddDataset: (dataset: Dataset) => void;
  onDeleteDataset: (id: string) => void;
}

export const DatasetsView: React.FC<DatasetsViewProps> = ({
  datasets,
  onAddDataset,
  onDeleteDataset
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<'positive' | 'negative' | 'neutral'>('positive');
  const [source, setSource] = useState('custom');
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleStartUpload = () => {
    if (!text.trim()) {
      showToast('Please enter text.');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const newDs: Dataset = {
        _id: `ds_${Math.random().toString(36).substring(2, 9)}`,
        text: text.trim(),
        sentiment,
        source,
        usedForTraining: true,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      onAddDataset(newDs);
      setIsUploading(false);
      setShowUploadModal(false);
      setText('');
      setSentiment('positive');
      showToast(`Dataset entry added successfully!`);
    }, 800);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-[#dfe2f1]">
            Datasets Management
          </h1>
          <p className="text-xs text-[#908fa0] mt-1">
            Manage training data for the Sentiment Analyzer.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] text-xs font-bold transition-all shadow-lg shadow-[#8083ff]/20 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Add Data Entry</span>
        </button>
      </div>

      {/* Datasets Table */}
      <div className="rounded-2xl bg-[#171b26] border border-[#313540] overflow-hidden shadow-xl">
        <div className="p-4 bg-[#0f131d] border-b border-[#313540] flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-[#dfe2f1] font-semibold">Registered Datasets ({datasets.length})</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171b26] border-b border-[#313540] text-[#908fa0] uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4 min-w-[300px]">Text</th>
                <th className="py-3 px-4">Sentiment</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Training</th>
                <th className="py-3 px-4">Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#313540]/60">
              {datasets.map((ds) => (
                <tr key={ds._id} className="hover:bg-[#1c1f2a]/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#8083ff]">
                    {ds._id.substring(0, 8)}...
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#dfe2f1]">{ds.text}</p>
                    <span className="text-[10px] font-mono text-[#908fa0]">{new Date(ds.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      ds.sentiment === 'positive'
                        ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/40'
                        : ds.sentiment === 'negative'
                          ? 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/40'
                          : 'bg-[#313540] text-[#c7c4d7]'
                    }`}>
                      {ds.sentiment}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#dfe2f1]">
                    {ds.source}
                  </td>
                  <td className="py-3.5 px-4">
                    {ds.usedForTraining ? (
                       <span className="material-symbols-outlined text-sm text-[#4edea3]">check_circle</span>
                    ) : (
                       <span className="material-symbols-outlined text-sm text-[#908fa0]">cancel</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {ds.isActive ? (
                       <span className="material-symbols-outlined text-sm text-[#4edea3]">check_circle</span>
                    ) : (
                       <span className="material-symbols-outlined text-sm text-[#908fa0]">cancel</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onDeleteDataset(ds._id)}
                        className="p-1 rounded text-[#908fa0] hover:text-[#ffb4ab] transition-colors"
                        title="Delete Dataset"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {datasets.length === 0 && (
                <tr>
                   <td colSpan={7} className="text-center py-6 text-xs text-[#908fa0]">No datasets found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-xl w-full rounded-3xl bg-[#171b26] border border-[#313540] shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#313540]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8083ff] text-xl">dataset</span>
                <h3 className="font-headline-md font-bold text-lg text-[#dfe2f1]">
                  Add Dataset Entry
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-[#908fa0] hover:text-[#dfe2f1]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#908fa0] mb-1">Text</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter Roman Urdu text..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f131d] border border-[#313540] text-sm text-[#dfe2f1] focus:outline-none focus:border-[#8083ff] resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#908fa0] mb-1">Sentiment</label>
                  <select
                    value={sentiment}
                    onChange={(e) => setSentiment(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0f131d] border border-[#313540] text-xs text-[#dfe2f1] focus:outline-none"
                  >
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#908fa0] mb-1">Source</label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0f131d] border border-[#313540] text-xs text-[#dfe2f1] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-[#908fa0] hover:text-[#dfe2f1]"
              >
                Cancel
              </button>
              <button
                onClick={handleStartUpload}
                disabled={isUploading}
                className="px-5 py-2.5 rounded-xl bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] text-xs font-bold transition-all shadow-md shadow-[#8083ff]/20 disabled:opacity-50"
              >
                {isUploading ? 'Saving...' : 'Save Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
