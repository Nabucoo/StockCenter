// ModalAddFuncionario.jsx
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Alert from "./Alert"; 
import '../styles/components/ModalAddFuncionario.css';
import axios from "axios";

function ModalAddFuncionario({ show, onHide, atualizarFuncionarios }) {

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState({
        type: "",
        text: ""
    });
    const token = localStorage.getItem('token');    

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const res = await axios.post(
                'http://localhost:3000/funcionarios/cadastrar',
                {
                    nome,
                    email,
                    senha
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
                
            );

            if (res.status === 201) {
                setMensagem({
                    type: "Success",
                    text: "Funcionário cadastrado com sucesso!"
                });
            }
            
            atualizarFuncionarios();
            onHide();


        } catch(error) {
                setMensagem({
                    type: "Alert",
                    text: error.response?.data?.mensagem || "Erro ao cadastrar funcionário"
                });
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header id="header" closeButton>
                    <Modal.Title>Adicionar Funcionário</Modal.Title>
                </Modal.Header>

                <Modal.Body id="body">
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
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
                        onClick={onHide}
                    >
                        Fechar
                    </Button>

                    <Button
                        id="adicionar-funcionario"
                        type="submit"
                    >
                        Adicionar funcionário
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalAddFuncionario;