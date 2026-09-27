import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HistoryItem, Dataset, Sentiment, Evaluation } from './types';
import { INITIAL_DATASETS, INITIAL_HISTORY, INITIAL_EVALUATIONS } from './mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingView } from './views/LandingView';
import { AuthView } from './views/AuthView';
import { AnalyzerView } from './views/AnalyzerView';
import { HistoryView } from './views/HistoryView';
import { DatasetsView } from './views/DatasetsView';
import { EvaluationsView } from './views/EvaluationsView';
import { AdminView } from './views/AdminView';

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  const [history, setHistory] = useState<Sentiment[]>(INITIAL_HISTORY);
  const [datasets, setDatasets] = useState<Dataset[]>(INITIAL_DATASETS);
  const [evaluations] = useState<Evaluation[]>(INITIAL_EVALUATIONS);

  // Handlers
  const handleDeleteHistoryItems = (ids: string[]) => {
    setHistory(prev => prev.filter(i => !ids.includes(i._id)));
  };

  const handleAddDataset = (newDataset: Dataset) => {
    setDatasets(prev => [newDataset, ...prev]);
  };

  const handleDeleteDataset = (id: string) => {
    setDatasets(prev => prev.filter(d => d._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0f131d] text-[#dfe2f1] flex flex-col font-body-md selection:bg-[#8083ff] selection:text-[#0d0096]">
      
      {/* Universal Top Navigation */}
      <Navbar
        userLoggedIn={userLoggedIn}
        onSignOut={() => setUserLoggedIn(false)}
      />

      {/* Screen Views */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingView onNavigate={() => {}} />} />
          <Route path="/login" element={<AuthView onLoginSuccess={() => setUserLoggedIn(true)} onNavigate={() => {}} />} />
          <Route path="/register" element={<AuthView onLoginSuccess={() => setUserLoggedIn(true)} onNavigate={() => {}} />} />
          
          <Route path="/dashboard/analyzer" element={userLoggedIn ? <AnalyzerView /> : <Navigate to="/login" />} />
          <Route path="/dashboard/history" element={userLoggedIn ? <HistoryView history={history} onDeleteItems={handleDeleteHistoryItems} /> : <Navigate to="/login" />} />
          
          <Route path="/admin" element={userLoggedIn ? <AdminView /> : <Navigate to="/login" />} />
          <Route path="/admin/datasets" element={userLoggedIn ? <DatasetsView datasets={datasets} onAddDataset={handleAddDataset} onDeleteDataset={handleDeleteDataset} /> : <Navigate to="/login" />} />
          <Route path="/admin/evaluations" element={userLoggedIn ? <EvaluationsView evaluations={evaluations} /> : <Navigate to="/login" />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer onNavigate={() => {}} />

    </div>
  );
}
