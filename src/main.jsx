import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { AuthProvider } from './features/auth/AuthContext';
import { TutorialProvider } from './features/tutorial/TutorialContext';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <TutorialProvider>
        <App />
      </TutorialProvider>
    </AuthProvider>
  </BrowserRouter>,
);
