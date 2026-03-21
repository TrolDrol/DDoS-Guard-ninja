export default function Modal({ open, title, children, footer, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        {title ? (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            {onClose ? (
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Закрыть окно"
              >
                ×
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
}
