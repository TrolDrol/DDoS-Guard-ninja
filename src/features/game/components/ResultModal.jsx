// import Modal from '../../../shared/components/Modal';
// import Button from '../../../shared/components/Button';

// export default function ResultModal({
//   open,
//   score,
//   isSuccess,
//   isSubmitting,
//   submitError,
//   onRetry,
//   onHome,
// }) {
//   const imageSrc = isSuccess ? '/images/success.svg' : '/images/fail.svg';

//   return (
//     <Modal
//       open={open}
//       title="Результат партии"
//       footer={
//         <div className="modal-actions">
//           <Button onClick={onRetry}>Играть ещё</Button>
//           <Button className="btn-secondary" onClick={onHome}>
//             На главную
//           </Button>
//         </div>
//       }
//     >
//       <div className="result-content">
//         <img src={imageSrc} alt="Результат игры" className="result-image" />
//         <div className="result-score">
//           Итоговый счёт: <strong>{score}</strong>
//         </div>
//         <div className="result-status">
//           {isSubmitting
//             ? 'Отправляем результат на сервер...'
//             : submitError
//               ? 'Результат не удалось сохранить'
//               : 'Результат сохранён'}
//         </div>
//         {submitError ? <div className="error-block">{submitError}</div> : null}
//       </div>
//     </Modal>
//   );
// }

import Modal from '../../../shared/components/Modal';
import Button from '../../../shared/components/Button';

export default function ResultModal({
  open,
  score,
  isSuccess,
  isSubmitting,
  submitError,
  onRetry,
  onHome,
}) {
  const imageSrc = isSuccess ? '/images/success.svg' : '/images/fail.svg';

  return (
    <Modal
      open={open}
      title="Результат партии"
      footer={
        <div className="modal-actions">
          <Button onClick={onRetry}>Играть ещё</Button>
          <Button className="btn-secondary" onClick={onHome}>
            На главную
          </Button>
        </div>
      }
    >
      <div className="result-content">
        <img src={imageSrc} alt="Результат игры" className="result-image" />
        <div className="result-score">
          Итоговый счёт: <strong>{score}</strong>
        </div>
        <div className="result-status">
          {isSubmitting
            ? 'Отправляем результат на сервер...'
            : submitError
              ? 'Результат не удалось сохранить'
              : 'Результат сохранён'}
        </div>
        {submitError ? <div className="error-block">{submitError}</div> : null}
      </div>
    </Modal>
  );
}