import React, { useState, useMemo } from 'react';
import { Sentiment, SentimentType } from '../types';

interface HistoryViewProps {
  history: Sentiment[];
  onDeleteItems: (ids: string[]) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onDeleteItems,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | SentimentType>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Filtered rows
  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesSearch = 
        item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item._id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSentiment = sentimentFilter === 'all' || item.sentiment === sentimentFilter;

      return matchesSearch && matchesSentiment;
    });
  }, [history, searchTerm, sentimentFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredHistory.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredHistory.map(i => i._id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    onDeleteItems(selectedIds);
    setSelectedIds([]);
    showToast(`Deleted ${selectedIds.length} records.`);
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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-2xl font-bold text-[#dfe2f1]">
              Inference History
            </h1>
            <p className="text-xs text-[#908fa0] mt-1">
              Historical query logs and analysis results.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#171b26] border border-[#313540] flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#908fa0] text-sm">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Roman Urdu feedback, text, ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0f131d] border border-[#313540] text-xs text-[#dfe2f1] focus:outline-none focus:border-[#8083ff] transition-all"
          />
        </div>

        {/* Sentiment Dropdown & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#908fa0]">Filter:</span>
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-[#0f131d] border border-[#313540] text-xs text-[#dfe2f1] focus:outline-none cursor-pointer"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 pl-3 border-l border-[#313540]">
              <span className="text-xs font-mono text-[#dfe2f1] font-semibold">
                {selectedIds.length} Selected
              </span>
              <button
                onClick={handleDeleteSelected}
                className="px-3 py-1.5 rounded-lg bg-[#93000a]/20 border border-[#93000a]/50 text-xs font-semibold text-[#ffb4ab] hover:bg-[#93000a]/40 transition-all"
              >
                Delete
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Inference History Table */}
      <div className="rounded-2xl bg-[#171b26] border border-[#313540] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f131d] border-b border-[#313540] text-[#908fa0] uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={filteredHistory.length > 0 && selectedIds.length === filteredHistory.length}
                    onChange={toggleSelectAll}
                    className="rounded bg-[#171b26] border-[#313540] text-[#8083ff] focus:ring-0"
                  />
                </th>
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 min-w-[280px]">Input Sequence</th>
                <th className="py-3 px-4">Sentiment</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#313540]/60">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#908fa0]">
                    No inference records match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => {
                  const isSelected = selectedIds.includes(item._id);
                  return (
                    <tr
                      key={item._id}
                      className={`hover:bg-[#1c1f2a]/70 transition-colors ${isSelected ? 'bg-[#8083ff]/10' : ''}`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(item._id)}
                          className="rounded bg-[#171b26] border-[#313540] text-[#8083ff] focus:ring-0"
                        />
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#8083ff]">
                        {item._id.substring(0, 8)}...
                      </td>
                      <td className="py-3.5 px-4 text-[#908fa0] whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-[#dfe2f1] font-medium leading-relaxed">{item.text}</p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                          item.sentiment === 'positive'
                            ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/40'
                            : item.sentiment === 'negative'
                              ? 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/40'
                              : 'bg-[#313540] text-[#c7c4d7]'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.sentiment === 'positive' ? 'bg-[#4edea3]' : item.sentiment === 'negative' ? 'bg-[#ffb4ab]' : 'bg-[#c0c1ff]'
                          }`}></span>
                          {item.sentiment}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#dfe2f1]">{(item.confidence * 100).toFixed(1)}%</span>
                          <div className="w-12 h-1 rounded-full bg-[#0f131d] overflow-hidden">
                            <div
                              className="h-full bg-[#8083ff] rounded-full"
                              style={{ width: `${item.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#908fa0] whitespace-nowrap">
                        {item.processingTime}ms
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.text);
                              showToast(`Copied snippet to clipboard!`);
                            }}
                            className="p-1.5 rounded-lg text-[#908fa0] hover:text-[#dfe2f1] hover:bg-[#0f131d] transition-all"
                            title="Copy Sequence"
                          >
                            <span className="material-symbols-outlined text-sm">content_copy</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
