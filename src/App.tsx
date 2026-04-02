import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
// Pages
import { HomePage } from './pages/HomePage';
import { PainPointPage } from './pages/PainPointPage';
import { SituationPage } from './pages/SituationPage';
import { LiffInitPage } from './pages/LiffInitPage';
import { LiffWelcomePage } from './pages/LiffWelcomePage';
import { LiffFriendRequiredPage } from './pages/LiffFriendRequiredPage';
import { ContractPage } from './pages/ContractPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/path/:painId" element={<PainPointPage />} />
        <Route path="/path/:painId/:optionId" element={<SituationPage />} />
        <Route path="/liff" element={<LiffInitPage />} />
        <Route path="/liff/welcome" element={<LiffWelcomePage />} />
        <Route path="/liff/friend-required" element={<LiffFriendRequiredPage />} />
        <Route path="/contract" element={<ContractPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
