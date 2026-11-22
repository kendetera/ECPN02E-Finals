import { CircleCheck, TriangleAlert } from 'lucide-react';

// Pop-up box. Pass onConfirm to show a Yes/No confirmation instead of a single OK.
export default function Modal({ message, onClose, onConfirm, confirmLabel = 'Yes, delete' }) {
  if (!message) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role={onConfirm ? 'alertdialog' : 'dialog'} aria-modal="true" aria-label={message} onClick={(e) => e.stopPropagation()}>
        {onConfirm ? (
          <span className="modal-icon"><TriangleAlert size={28} aria-hidden="true" /></span>
        ) : (
          <span className="modal-icon ok"><CircleCheck size={30} aria-hidden="true" /></span>
        )}
        <p>{message}</p>
        <div className="actions">
          {onConfirm ? (
            <>
              <button className="secondary" onClick={onClose} autoFocus>Cancel</button>
              <button className="danger" onClick={onConfirm}>{confirmLabel}</button>
            </>
          ) : (
            <button autoFocus onClick={onClose}>OK</button>
          )}
        </div>
      </div>
    </div>
  );
}
