import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LiffInitPage } from './pages/LiffInitPage';
import { LiffWelcomePage } from './pages/LiffWelcomePage';
import { LiffFriendRequiredPage } from './pages/LiffFriendRequiredPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/liff" element={<LiffInitPage />} />
        <Route path="/liff/welcome" element={<LiffWelcomePage />} />
        <Route path="/liff/friend-required" element={<LiffFriendRequiredPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
