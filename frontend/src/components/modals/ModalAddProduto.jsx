import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from 'axios';
import Alert from "../Alert";

function ModalAddProduto({ show, onHide, atualizarProdutos, mostrarFeedback }) {

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [precoCompra, setPrecoCompra] = useState("");
    const [precoVenda, setPrecoVenda] = useState("");
    const [departamento, setDepartamento] = useState("");
    
    // Estado para mensagens de sucesso/erro (usado no <Alert />)
    const [mensagem, setMensagem] = useState({ text: "", type: "" });

    const token = localStorage.getItem('token');

    function limparMensagem() {
        setMensagem({ text: "", type: "" });
    }

    function handleClose() {
        limparMensagem();
        onHide();
    }

    // Função para lidar com o envio dos dados
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/produtos/cadastrar", 
                { 
                    nome,
                    quantidade,
                    precoCompra,
                    precoVenda,
                    departamento
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            const sucesso = {
                text: res.data?.mensagem || "Produto criado com sucesso!",
                type: "Success"
            };

            setNome("");
            setQuantidade("");
            setPrecoCompra("");
            setPrecoVenda("");
            setDepartamento("");

            atualizarProdutos();
            mostrarFeedback?.(sucesso);
            handleClose();

        } catch (error) {
            setMensagem({ 
                text: error.response?.data?.mensagem || "Erro ao adicionar produto.", 
                type: "Alert" 
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header id="header" closeButton>
                    <Modal.Title>Adicionar Produto</Modal.Title>
                </Modal.Header>

                <Modal.Body id="body">
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Preço de Compra</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={precoCompra}
                            onChange={(e) => setPrecoCompra(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Preço de Venda</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={precoVenda}
                            onChange={(e) => setPrecoVenda(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Control
                            type="text"
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
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

                    <Button
                        id="adicionar-produto"
                        type="submit"
                    >
                        Adicionar produto
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalAddProduto;
