import Header from "../components/Header";
import Footer from "../components/Footer";
import FuncionarioCard from "../components/FuncionarioCard";
import ModalAddFuncionario from "../components/ModalAddFuncionario";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

import '../styles/pages/Funcionarios.css'
import { useNavigate } from 'react-router-dom';

function Funcionarios() {
    const [modalAddFuncionario, setModalAddFuncionario] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);

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
            console.log(error);
            console.log("erro ao carregar funcionários!");
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        
        async function isLogged() {
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
            } catch (error) {
                console.log("não autorizado!")
                navigate('/home');
            }
        }

    isLogged();
}, [navigate]);

    useEffect(() => {
        getFuncionarios();
    }, []);


    return (
        <div id="funcionarios-page">
            <Header />
            <div id="funcionarios-body">
                <h1 id="funcionario-title">Funcionários</h1>
                <div id='funcionarios-cards'>
                    {funcionarios.map(funcionario => (
                            <FuncionarioCard
                                key={funcionario.id}
                                id={funcionario.id}
                                nome={funcionario.nome}
                                email={funcionario.email}
                                senha={funcionario.senha}
                                atualizarFuncionarios={getFuncionarios}
                            />
                        ))}
                </div>
            
                <button id="btn-add-funcionario" className="" onClick={() => setModalAddFuncionario(true)}>Adicionar Funcionário</button>
                <ModalAddFuncionario show={modalAddFuncionario} onHide={() => setModalAddFuncionario(false)} atualizarFuncionarios={getFuncionarios}/>
            </div>
            <Footer />
        </div>
    )
}

export default Funcionarios;