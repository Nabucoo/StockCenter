import Header from "../components/Header";
import Footer from "../components/Footer";
import FuncionarioCard from "../components/cards/FuncionarioCard";
import ModalAddFuncionario from "../components/modals/ModalAddFuncionario";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import axios from 'axios';

import '../styles/pages/Funcionarios.css'
import { useNavigate } from 'react-router-dom';

function Funcionarios() {
    const [modalAddFuncionario, setModalAddFuncionario] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);
    const [mensagem, setMensagem] = useState({ type: "", text: "" });

    function mostrarFeedback(novaMensagem) {
        setMensagem(novaMensagem);
    }

    function limparFeedback() {
        setMensagem({ type: "", text: "" });
    }

    async function getFuncionarios() {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(
                'http://localhost:3000/funcionarios/listar',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setFuncionarios(res.data.funcionarios); 
                            
        } catch (error) {
            mostrarFeedback({
                type: "Alert",
                text: error.response?.data?.mensagem || "Erro ao carregar funcionários!"
            });
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        
        async function isAdm() {
            const token = localStorage.getItem('token');

            if (!token) return;

            try {
                await axios.get(
                    'http://localhost:3000/verify/adm',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch {
                navigate('/home');
            }
        }

    isAdm();
}, [navigate]);

    useEffect(() => {
        let cancelado = false;
        const token = localStorage.getItem('token');

        axios.get(
            'http://localhost:3000/funcionarios/listar',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                if (!cancelado) {
                    setFuncionarios(res.data.funcionarios);
                }
            })
            .catch((error) => {
                if (!cancelado) {
                    setMensagem({
                        type: "Alert",
                        text: error.response?.data?.mensagem || "Erro ao carregar funcionários!"
                    });
                }
            });

        return () => {
            cancelado = true;
        };
    }, []);


    return (
        <div id="funcionarios-page">
            <Header />
            
            <div id="funcionarios-body">
                <div id="funcionarios-cabecalho">
                    <h1 id="funcionario-title">Funcionários</h1>
                    <button id="btn-add-funcionario" className="" onClick={() => setModalAddFuncionario(true)}>Adicionar Funcionário</button>
                </div>

                <Alert mensagem={mensagem} onClose={limparFeedback} />
  
                
                <div id='funcionarios-cards'>
                    {funcionarios.map(funcionario => (
                            <FuncionarioCard
                                key={funcionario.id}
                                id={funcionario.id}
                                nome={funcionario.nome}
                                email={funcionario.email}
                                senha={funcionario.senha}
                                atualizarFuncionarios={getFuncionarios}
                                mostrarFeedback={mostrarFeedback}
                            />
                        ))}
                </div>
            
                
                <ModalAddFuncionario show={modalAddFuncionario} onHide={() => setModalAddFuncionario(false)} atualizarFuncionarios={getFuncionarios} mostrarFeedback={mostrarFeedback}/>
            </div>
            <Footer />
        </div>
    )
}

export default Funcionarios;
