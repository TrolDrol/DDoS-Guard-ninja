import Modal from '../../../shared/components/Modal';
import Button from '../../../shared/components/Button';
import { useRegistration } from '../hooks/useRegistration';
import '../../../styles/globals.css';

export default function RegistrationModal({ open }) {
  const { values, errors, isSubmitting, serverError, setField, submit } =
    useRegistration();

  const openTelegramBot = () => {
    window.open("https://t.me/regist_form_bot", "_blank");
  };

  return (
    <Modal
      open={open}
      title="Регистрация игрока"
      footer={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: "12px",
          }}
        >
          <Button
            disabled={isSubmitting}
            onClick={submit}
            style={{ width: "100%", maxWidth: "280px" }}
            className='btnRegister'
          >
            {isSubmitting ? "Сохраняем..." : "Продолжить"}
          </Button>

          <div
            className="divider"
            style={{ width: "100%", textAlign: "center" }}
          >
            <span>или</span>
          </div>

          <Button
            onClick={openTelegramBot}
            className="btn-telegram"
            style={{ width: "100%", maxWidth: "280px" }}
          >
            Войти через Telegram
          </Button>
        </div>
      }
    >
      <div className="form-grid">
        <label className="form-field">
          <span>Имя</span>
          <input
            type="text"
            maxLength={30}
            value={values.name}
            onChange={(event) => setField('full_name', event.target.value)}
            placeholder="Введите имя"
          />
          {errors.name ? <small className="field-error">{errors.name}</small> : null}
        </label>

        <label className="form-field">
          <span>Телефон</span>
          <input
            type="tel"
            value={values.phone}
            onChange={(event) => setField('phone', event.target.value)}
            placeholder="+7 999 123 45 67"
          />
          {errors.phone ? <small className="field-error">{errors.phone}</small> : null}
        </label>

        <label className="consent-row">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => setField('consent_given', event.target.checked)}
          />
          <span>
            Я подтверждаю согласие на обработку персональных данных
          </span>
        </label>
        {errors.consent ? (
          <small className="field-error">{errors.consent}</small>
        ) : null}

        {serverError ? <div className="error-block">{serverError}</div> : null}
      </div>
    </Modal>
  );
}