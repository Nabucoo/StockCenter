import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Alert from '../Alert';

import '../../styles/components/ModalRemoverProduto.css';


function ModalRemoverProduto( { show, onHide, id, atualizarProdutos, mostrarFeedback } ) {
    const token = localStorage.getItem('token');

    const [quantidade, setQuantidade] = useState("");
    const [mensagem, setMensagem] = useState({ type: "", text: "" });

    function limparMensagem() {
        setMensagem({ type: "", text: "" });
    }

    function handleClose() {
        limparMensagem();
        onHide();
    }

    async function handleRemoverProduto(e) {
        e.preventDefault();
        try {
            const res = await axios.patch(
                `http://localhost:3000/produtos/remover/${id}`,
                {
                    quantidade: Number(quantidade)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.status === 200) {
                mostrarFeedback?.({
                    type: "Success",
                    text: res.data?.mensagem || "Produto removido com sucesso!"
                });
                setQuantidade("");
                atualizarProdutos();
                handleClose();
            }
            
        } catch (error) {
            setMensagem({
                type: "Alert",
                text: error.response?.data?.mensagem || "Erro ao remover produto!"
            });
        }
    };

    return (
    <Modal show={show} onHide={handleClose}>
       <Form onSubmit={handleRemoverProduto}>
            <Modal.Header closeButton>
                <Modal.Title>Remover Produto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Quantidade:</Form.Label>
                    <Form.Control
                        type="number"
                        id="quantidade-remover"
                        name="quantidadeRemover"
                        value={quantidade}
                        required
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </Form.Group>

                <Alert mensagem={mensagem} />
            </Modal.Body>

            <Modal.Footer>
                <Button type="button" id="btn-cancelar" onClick={handleClose}>Cancelar</Button>
                <Button type="submit" id="btn-rmv"> Remover produto</Button>
            </Modal.Footer>
        </Form> 
    </Modal>
    );
}

export default ModalRemoverProduto;
