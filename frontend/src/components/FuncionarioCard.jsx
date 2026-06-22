import '../styles/components/FuncionarioCard.css';
import ModalEditarFuncionario from '../components/ModalEditarFuncionario';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { useState } from 'react';

function FuncionarioCard({ id, nome, email, senha, atualizarFuncionarios }) {    
    const [modalEditarFuncionario, setModalEditarFuncionario] = useState(false);
    const token = localStorage.getItem('token');

    async function handleRemoveFuncionario(id) {
        try {
            const res = await axios.delete(
                `http://localhost:3000/funcionarios/remover/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.status === 200) {
                alert('Funcionário removido com sucesso!');
                atualizarFuncionarios();
            }

            } catch (error) {
                console.error(
                    error.response?.data?.mensagem ||
                    'Erro ao remover funcionário'
                );
            }
        }

    return (
        <div className="card" id="card">
            <div className="card-header">
                <h5 className="card-title">{ nome }</h5>
            </div>

            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        ID: { id }
                    </li>

                    <li className="list-group-item">
                        Email: { email }
                    </li>

                    <li className="list-group-item">
                        Senha: { senha }
                    </li>
                </ul>
            </div>

            <div className="card-body d-flex justify-content-end gap-2">
                <button type="button" id="btn-editar-funcionario" className="btn" onClick={() => setModalEditarFuncionario(true)}>
                    ✏️ Editar
                </button>
                <ModalEditarFuncionario show={modalEditarFuncionario} onHide={() => setModalEditarFuncionario()} id={id} atualizarFuncionarios={atualizarFuncionarios}/>
                <button type="button" id="btn-rmv-funcionario" className="btn" onClick={() => {handleRemoveFuncionario(id)}}>
                    🗑️ Remover
                </button>
            </div>
        </div>
    )
}

export default FuncionarioCard;