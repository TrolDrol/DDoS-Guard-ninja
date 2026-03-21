import { Link } from 'react-router-dom';
import RegistrationModal from '../features/auth/components/RegistrationModal';
import { useAuth } from '../features/auth/AuthContext';
import { useLeaderboard } from '../features/leaderboard/hooks/useLeaderboard';
import LeaderboardList from '../features/leaderboard/components/LeaderboardList';
import MyRankCard from '../features/leaderboard/components/MyRankCard';
import Loader from '../shared/components/Loader';
import ErrorBlock from '../shared/components/ErrorBlock';
import Button from '../shared/components/Button';
import { scrollToId } from '../shared/utils/scroll';

export default function HomePage() {
  const { isAuthorized } = useAuth();
  const { data, isLoading, error } = useLeaderboard();

  return (
    <main className="page page-home">
      <RegistrationModal open={!isAuthorized} />

      <section className="hero-card glass-panel hero-card--rich">
        <div className="hero-copy">
          <span className="hero-chip">Mobile-first rhythm defense</span>
          <h1>Лови момент, закрывай дорожки и пробивайся в топ-100</h1>
          <p>
            Зеленые шарики лучше пропускать, красные — перекрывать щитом. На
            телефоне можно играть касанием по полю или по клавишам пианино.
          </p>
        </div>
          <img src="/images/hero.svg" alt="Главная картинка игры" className="hero-image" />
      </section>

      {/* {isLoading ? <Loader text="Загружаем таблицу лидеров..." /> : null} */}
      {error ? <ErrorBlock message={error} /> : null}
      {!isLoading && !error ? (
        <>
          {/* <LeaderboardList top={data.top} me={data.me} />

          {data.me?.rank > 100 ? (
            <section className="card jump-card glass-panel">
              <p>
                Ты пока не в топ-100. Нажми кнопку ниже, чтобы перейти к своей
                позиции в списке результатов.
              </p>
              <Button className="btn-secondary" onClick={() => scrollToId('my-rank')}>
                Показать мою позицию
              </Button>
            </section>
          ) : null} */}

          <MyRankCard me={data.me} />
        </>
      ) : null}

      <div className="sticky-playbar">
        <Link to="/game" className={`btn sticky-playbar__button ${!isAuthorized ? 'btn-disabled-link' : ''}`}>
          Играть
        </Link>
      </div>
    </main>
  );
}
