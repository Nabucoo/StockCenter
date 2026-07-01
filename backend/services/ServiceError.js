class ServiceError extends Error {
    constructor(status, mensagem) {
        super(mensagem);
        this.status = status;
        this.mensagem = mensagem;
    }
}

module.exports = ServiceError;
