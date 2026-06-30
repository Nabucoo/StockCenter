import '../styles/components/DangerAlert.css';

const variants = {
    Success: "success",
    success: "success",
    Alert: "danger",
    Error: "danger",
    Danger: "danger",
    danger: "danger",
    Warning: "warning",
    warning: "warning",
    Info: "info",
    info: "info"
};

function Alert({ mensagem, onClose }) {
    if (!mensagem?.text) return null;

    const variant = variants[mensagem.type] || "danger";
    const dismissible = Boolean(onClose);

    return (
        <div
            className={`alert alert-${variant} feedback-alert ${dismissible ? "alert-dismissible fade show" : ""}`}
            role="alert"
            aria-live="polite"
        >
            {mensagem.text}
            {dismissible && (
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Fechar"
                    onClick={onClose}
                />
            )}
        </div>
    );
}

export default Alert;
