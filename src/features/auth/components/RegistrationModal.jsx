import Modal from '../../../shared/components/Modal';
import Button from '../../../shared/components/Button';
import { useRegistration } from '../hooks/useRegistration';

export default function RegistrationModal({ open }) {
  const { values, errors, isSubmitting, serverError, setField, submit } =
    useRegistration();

  return (
    <Modal
      open={open}
      title="Регистрация игрока"
      footer={
        <Button disabled={isSubmitting} onClick={submit}>
          {isSubmitting ? 'Сохраняем...' : 'Продолжить'}
        </Button>
      }
    >
      <div className="form-grid">
        <label className="form-field">
          <span>Имя</span>
          <input
            type="text"
            maxLength={30}
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
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
            onChange={(event) => setField('consent', event.target.checked)}
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
