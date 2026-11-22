// Pop-up box. Pass onConfirm to show a Yes/No confirmation instead of a single OK.
export default function Modal({ message, onClose, onConfirm }) {
  if (!message) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="actions">
          {onConfirm ? (
            <>
              <button className="danger" onClick={onConfirm}>Yes</button>
              <button className="secondary" onClick={onClose}>No</button>
            </>
          ) : (
            <button autoFocus onClick={onClose}>OK</button>
          )}
        </div>
      </div>
    </div>
  );
}
