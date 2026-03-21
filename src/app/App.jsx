import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';
import TutorialButton from '../features/tutorial/components/TutorialButton';
import TutorialModal from '../features/tutorial/components/TutorialModal';

export default function App() {
  return (
    <>
      <TutorialButton />
      <TutorialModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </>
  );
}
