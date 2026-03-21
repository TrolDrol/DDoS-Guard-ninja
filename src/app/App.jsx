import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';
import TutorialButton from '../features/tutorial/components/TutorialButton';
import TutorialModal from '../features/tutorial/components/TutorialModal';
import { useImageLoader } from '../features/game/hooks/useImageLoader';

export default function App() {
  const { images, loading, error } = useImageLoader({
    green: '/images/green.jpg',
    red: '/images/red.jpg',
    mixed: '/images/mixed.jpg'
  });
  return (
    <>
      <TutorialButton />
      <TutorialModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage images={images} />} />
      </Routes>
    </>
  );
}
