class Produto {
    constructor(nome, quantidade, precoCompra, precoVenda, departamento) {
        this.nome = nome;
        this.quantidade = Number(quantidade);
        this.precoCompra = Number(precoCompra);
        this.precoVenda = Number(precoVenda);
        this.departamento = departamento;
    }
}

module.exports = Produto;