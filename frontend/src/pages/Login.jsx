import '../styles/pages/Login.css';
import logo from '../assets/images/logo.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        async function isLogged() {
            const token = localStorage.getItem('token');

            if (!token) return;

            try {
                await axios.get(
                    'http://localhost:3000/verify',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                navigate('/home');
            } catch {
                localStorage.removeItem('token');
            }
        }

        isLogged();
    }, [navigate]);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState({
        type: "",
        text: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:3000/login',
                {
                    email,
                    senha
                }
            );

            localStorage.setItem(
                'token',
                res.data.token
            );

            navigate('/home');

        } catch (error) {
            setMensagem({
                type: "Alert",
                text: error.response?.data?.mensagem || "Erro ao realizar login"
            });
        }
    }

    return (
        <div id="login-div">
            <div id="login-title">
                <img src={logo} alt="Logo StockCenter" />
                <h1>STOCKCENTER</h1>
            </div>

            <Form id="form-login" onSubmit={handleSubmit}>

                {mensagem.text && (
                    <Alert mensagem={mensagem} />
                )}

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

                <Button type="submit">
                    Logar
                </Button>

            </Form>
        </div>
    );
}

export default Login;
