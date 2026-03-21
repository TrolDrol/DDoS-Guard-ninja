import { useState } from 'react';
import { authPlayer } from '../../../api/authApi';
import { validateRegistration } from '../validators';
import { useAuth } from '../AuthContext';

const initialValues = {
  name: '',
  phone: '',
  consent: false,
};

export function useRegistration() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const { setAuth } = useAuth();

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    const nextErrors = validateRegistration(values);
    setErrors(nextErrors);
    setServerError('');

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }

    try {
      setIsSubmitting(true);
      const response = await authPlayer(values);
      setAuth(response);
      return true;
    } catch (error) {
      setServerError(error.message || 'Не удалось зарегистрировать игрока');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    serverError,
    setField,
    submit,
  };
}
