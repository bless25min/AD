import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HomePageB } from './pages/HomePageB';
import { LiffInitPage } from './pages/LiffInitPage';
import { LiffWelcomePage } from './pages/LiffWelcomePage';
import { LiffFriendRequiredPage } from './pages/LiffFriendRequiredPage';
import { ContractPage } from './pages/ContractPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/b" element={<HomePageB />} />
        <Route path="/liff" element={<LiffInitPage />} />
        <Route path="/liff/welcome" element={<LiffWelcomePage />} />
        <Route path="/liff/friend-required" element={<LiffFriendRequiredPage />} />
        <Route path="/contract" element={<ContractPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
