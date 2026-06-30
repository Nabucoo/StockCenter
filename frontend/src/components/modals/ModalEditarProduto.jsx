import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import Alert from '../Alert';
import { useState } from 'react';

function ModalEditarProduto({ show, onHide, id, atualizarProdutos, mostrarFeedback }) {
    const [novoNome, setNovoNome] = useState("");
    const [novaQuantidade, setNovaQuantidade] = useState("");
    const [novoPrecoCompra, setNovoPrecoCompra] = useState("");
    const [novoPrecoVenda, setNovoPrecoVenda] = useState("");
    const [novoDepartamento, setNovoDepartamento] = useState("");

    const [mensagem, setMensagem] = useState({ text: "", type: "" });

    const token = localStorage.getItem('token');

    function limparMensagem() {
        setMensagem({ text: "", type: "" });
    }

    function handleClose() {
        limparMensagem();
        onHide();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.patch(`http://localhost:3000/produtos/editar/${id}`,
                { 
                    novoNome,
                    novaQuantidade,
                    novoPrecoCompra,
                    novoPrecoVenda,
                    novoDepartamento
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
             
            const sucesso = {
                text: res.data?.mensagem || "Produto atualizado com sucesso!",
                type: "Success"
            };

            setNovoNome("");
            setNovaQuantidade("");
            setNovoPrecoCompra("");
            setNovoPrecoVenda("");
            setNovoDepartamento("");

            atualizarProdutos();
            mostrarFeedback?.(sucesso);
            handleClose();

        } catch (error) {
            setMensagem({ 
                text: error.response?.data?.mensagem || "Erro ao editar produto.", 
                type: "Alert" 
            });
        }
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header id="header" closeButton>
                    <Modal.Title>Editar Produto</Modal.Title>
                </Modal.Header>

                <Modal.Body id="body">
                    <Form.Group className="mb-3">
                        <Form.Label>Novo Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={novoNome}
                            onChange={(e) => setNovoNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nova Quantidade</Form.Label>
                        <Form.Control
                            type="number"
                            value={novaQuantidade}
                            onChange={(e) => setNovaQuantidade(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Novo Preço de Compra</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={novoPrecoCompra}
                            onChange={(e) => setNovoPrecoCompra(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Novo Preço de Venda</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={novoPrecoVenda}
                            onChange={(e) => setNovoPrecoVenda(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Novo Departamento</Form.Label>
                        <Form.Control
                            type="text"
                            value={novoDepartamento}
                            onChange={(e) => setNovoDepartamento(e.target.value)}
                        />
                    </Form.Group>

                    {mensagem.text && (
                        <Alert mensagem={mensagem} />
                    )}
                </Modal.Body>

                <Modal.Footer id="footer">
                    <Button
                        id="fechar-modal"
                        type="button"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>

                    <Button id="editar-produto" type="submit">Editar produto</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalEditarProduto;
