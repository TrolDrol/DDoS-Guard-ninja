import { useEffect, useState } from 'react';
import { getScores } from '../../../api/scoresApi';
import { useAuth } from '../../auth/AuthContext';

export function useLeaderboard() {
  const { auth, isAuthorized } = useAuth();
  const [data, setData] = useState({ top: [], me: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getScores(auth?.user_id);
      setData(response);
    } catch (err) {
      setError(err.message || 'Не удалось получить рейтинг');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [auth?.user_id]);

  return {
    data,
    isLoading,
    error,
    reload: load,
  };
}
