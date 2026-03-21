export default function Button({
  children,
  className = '',
  disabled = false,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
