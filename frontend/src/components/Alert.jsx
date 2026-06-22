import '../styles/components/DangerAlert.css';

function Alert({ mensagem }) {

    const classe =
        mensagem.type === "Success"
            ? "alert alert-success"
            : "alert alert-danger";

    return (
        <div
            id="div-danger-alert"
            className={classe}
            role="alert"
        >
            {mensagem.text}
        </div>
    );
}

export default Alert;