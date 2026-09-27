import React from 'react';
import { Evaluation } from '../types';

interface EvaluationsViewProps {
  evaluations: Evaluation[];
}

export const EvaluationsView: React.FC<EvaluationsViewProps> = ({
  evaluations,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-[#dfe2f1]">
            Model Evaluations
          </h1>
          <p className="text-xs text-[#908fa0] mt-1">
            Track AI model performance and metrics over time.
          </p>
        </div>
      </div>

      {/* Evaluations Table */}
      <div className="rounded-2xl bg-[#171b26] border border-[#313540] overflow-hidden shadow-xl">
        <div className="p-4 bg-[#0f131d] border-b border-[#313540] flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-[#dfe2f1] font-semibold">Evaluation History</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171b26] border-b border-[#313540] text-[#908fa0] uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Model Version</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall</th>
                <th className="py-3 px-4">F1 Score</th>
                <th className="py-3 px-4">Train Samples</th>
                <th className="py-3 px-4">Eval Samples</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#313540]/60">
              {evaluations.map((ev) => (
                <tr key={ev._id} className="hover:bg-[#1c1f2a]/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#8083ff]">
                    {ev.modelVersion}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#4edea3]">
                    {(ev.accuracy * 100).toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#dfe2f1]">
                    {(ev.precision * 100).toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#dfe2f1]">
                    {(ev.recall * 100).toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#8083ff]">
                    {(ev.f1Score * 100).toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-4 text-[#908fa0]">
                    {ev.trainingSamples.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[#908fa0]">
                    {ev.evaluationSamples.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[#908fa0]">
                    {new Date(ev.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {evaluations.length === 0 && (
                <tr>
                   <td colSpan={8} className="text-center py-6 text-xs text-[#908fa0]">No evaluations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
