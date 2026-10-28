const icons = {
  add: <path d="M12 5v14M5 12h14" />,
  edit: <path d="m15.2 5.2 3.6 3.6M5 19l3.7-.8L19 7.9a2.5 2.5 0 0 0-3.6-3.6L5.8 15.3 5 19Z" />,
  delete: <><path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3" /></>,
}

export default function AdminIconButton({ action, label, onClick }) {
  return (
    <button
      type="button"
      className="admin-icon-button"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {icons[action]}
      </svg>
    </button>
  )
}
