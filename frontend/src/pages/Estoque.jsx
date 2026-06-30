import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalAddProduto from "../components/modals/ModalAddProduto";
import ProdutoCard from "../components/cards/ProdutoCard";
import Alert from "../components/Alert";

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import axios from 'axios';

import '../styles/pages/Estoque.css';

function Estoque() {
    const token = localStorage.getItem('token');
    const [modalAddProduto, setModalAddProduto] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [mensagem, setMensagem] = useState({ type: "", text: "" });

    function mostrarFeedback(novaMensagem) {
        setMensagem(novaMensagem);
    }

    function limparFeedback() {
        setMensagem({ type: "", text: "" });
    }

    async function getProdutos() {
        try {
            const res = await axios.get(
                'http://localhost:3000/produtos/listar',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setProdutos(res.data.produtos); 
                            
        } catch (error) {
            mostrarFeedback({
                type: "Alert",
                text: error.response?.data?.mensagem || "Erro ao carregar produtos!"
            });
        }
    }

    useEffect(() => {
        let cancelado = false;

        axios.get(
            'http://localhost:3000/produtos/listar',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                if (!cancelado) {
                    setProdutos(res.data.produtos);
                }
            })
            .catch((error) => {
                if (!cancelado) {
                    setMensagem({
                        type: "Alert",
                        text: error.response?.data?.mensagem || "Erro ao carregar produtos!"
                    });
                }
            });

        return () => {
            cancelado = true;
        };
    }, [token]);

    return (
        <div id="estoque-page">
            <Header />
                <main id="estoque-body">
                    <div id="estoque-cabecalho">
                        <h1>Controle de Estoque</h1>
                        <Button id="btn-add-produto" type="button" onClick={() => setModalAddProduto(true)}>+ Adicionar Produto</Button>
                    </div>

                    <Alert mensagem={mensagem} onClose={limparFeedback} />

                    <section id="cards">
                        {produtos.map(produto => (
                                <ProdutoCard
                                    key={produto.id}
                                    id={produto.id}
                                    nome={produto.nome}
                                    quantidade={produto.quantidade}
                                    precoCompra={produto.preco_compra}
                                    precoVenda={produto.preco_venda}
                                    departamento={produto.departamento}
                                    atualizarProdutos={getProdutos}
                                    mostrarFeedback={mostrarFeedback}
                                />
                            ))}
                    </section>   
                </main>

            <ModalAddProduto show={modalAddProduto} onHide={() => setModalAddProduto(false)} atualizarProdutos={getProdutos} mostrarFeedback={mostrarFeedback}/>
            <Footer />
        </div>
    );
}

export default Estoque;
