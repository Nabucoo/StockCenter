import { useState } from 'react';
import ModalRemoverProduto from '../modals/ModalRemoverProduto';
import ModalEditarProduto from '../modals/ModalEditarProduto';
import '../../styles/components/ProdutoCard.css'
import { Button } from 'react-bootstrap';

function ProdutoCard({ id, nome, quantidade, precoCompra, precoVenda, departamento, atualizarProdutos, mostrarFeedback }) {
    const [modalRmvProduto, setModalRmvProduto] = useState(false);
    const [modalEditarProduto, setModalEditarProduto] = useState(false);

    return (
        <div className="card card-produto">
            <div className="card-header">
                <h5 className="card-title">{nome}</h5>
            </div>

            <div className="card-body">
                <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                        Id: {id}
                    </li>

                    <li className="list-group-item">
                        Quantidade: {quantidade}
                    </li>

                    <li className="list-group-item">
                        Preço de compra: R$ {precoCompra}
                    </li>

                    <li className="list-group-item">
                        Preço de venda: R$ {precoVenda}
                    </li>

                    <li className="list-group-item">
                        Departamento: {departamento}
                    </li>
                </ul>
            </div>

            <div className="card-body d-flex justify-content-end gap-2">
                {/* Botão Editar */}
                <Button 
                    id='btn-editar-produto'
                    type="button" 
                    className=""
                    onClick={() => setModalEditarProduto(true)} 
                >
                    ✏️ Editar
                </Button>

                {/* Botão Remover */}
                <Button 
                    id='btn-rmv-produto'
                    type="button" 
                    className="" 
                    onClick={() => setModalRmvProduto(true)}
                >
                    🗑️ Remover
                </Button>
            </div>

            <ModalEditarProduto show={modalEditarProduto} onHide={() => setModalEditarProduto(false)} id={id} atualizarProdutos={atualizarProdutos} mostrarFeedback={mostrarFeedback}/>
            <ModalRemoverProduto show={modalRmvProduto} onHide={() => setModalRmvProduto(false)} id={id} atualizarProdutos={atualizarProdutos} mostrarFeedback={mostrarFeedback}/>
        </div>
    );
};

export default ProdutoCard;
