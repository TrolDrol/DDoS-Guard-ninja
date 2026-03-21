export function validateRegistration(values) {
  const errors = {};

  const name = values.name?.trim() ?? '';
  const phone = values.phone?.trim() ?? '';

  if (name.length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа';
  }

  if (name.length > 30) {
    errors.name = 'Имя должно быть не длиннее 30 символов';
  }

  if (!/^\+?[0-9()\-\s]{10,18}$/.test(phone)) {
    errors.phone = 'Введите корректный номер телефона';
  }

  if (!values.consent) {
    errors.consent = 'Нужно подтвердить согласие на обработку данных';
  }

  return errors;
}
