import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MovimentacaoCard from "../components/cards/MovimentacaoCard";
import Alert from "../components/Alert";

import '../styles/pages/Movimentacoes.css'

function Movimentacoes() {

    const token = localStorage.getItem('token');
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [mensagem, setMensagem] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    function mostrarFeedback(novaMensagem) {
        setMensagem(novaMensagem);
    }

    function limparFeedback() {
        setMensagem({ type: "", text: "" });
    }

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
                navigate('/estoque');
            }
        }

    isAdm();
}, [navigate]);

    async function getMovimentacoes() {
        try {
            const res = await axios.get(
                'http://localhost:3000/movimentacoes/listar',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setMovimentacoes(res.data.movimentacoes);
            limparFeedback();
        } catch(error) {
            mostrarFeedback({
                type: "Alert",
                text: error.response?.data?.mensagem || "Erro ao carregar movimentações!"
            });
        }
    }
    
    async function getMovimentacoesFiltroData(e) {
        e.preventDefault();
        
         try {
             const res = await axios.get(
                'http://localhost:3000/movimentacoes/filtrar',
                {
                params: {
                    dataInicial,
                    dataFinal
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
);

             if (res.data.mensagem) {
                 setMovimentacoes([]);
                 mostrarFeedback({
                     type: "Info",
                     text: res.data.mensagem
                 });
                 return;
             }

             setMovimentacoes(res.data.movimentacoes || []);
             mostrarFeedback({
                 type: "Success",
                 text: "Filtro aplicado com sucesso!"
             });
         } catch (error) {
             mostrarFeedback({
                 type: "Alert",
                 text: error.response?.data?.mensagem || "Erro ao filtrar movimentações!"
             });
         }
    }

    async function limparFiltro() {
        setDataInicial("");
        setDataFinal("");
        await getMovimentacoes();
    }

    useEffect(() => {
        let cancelado = false;

        axios.get(
            'http://localhost:3000/movimentacoes/listar',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                if (!cancelado) {
                    setMovimentacoes(res.data.movimentacoes);
                    setMensagem({ type: "", text: "" });
                }
            })
            .catch((error) => {
                if (!cancelado) {
                    setMensagem({
                        type: "Alert",
                        text: error.response?.data?.mensagem || "Erro ao carregar movimentações!"
                    });
                }
            });

        return () => {
            cancelado = true;
        };
    }, [token]);

    return (
        <div id="alteracoes-page" className="container-fluid p-0">
            <Header className='row'/>
                <div id="cabecalho" className="row m-4">
                    <h1>Movimentações</h1>

                    <Alert mensagem={mensagem} onClose={limparFeedback} />
                    
                    <Form onSubmit={getMovimentacoesFiltroData} id="form-filtrar">
                        <div className="row align-items-end g-3">

                            <Form.Group className="col-5 offset-1 col-lg-2 offset-lg-0">
                                <Form.Label className="form-label">Data Inicial</Form.Label>
                                <Form.Control type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value) }></Form.Control>
                            </Form.Group>

                            <Form.Group className="col-5 col-lg-2">
                                <Form.Label className="form-label">Data Final</Form.Label>
                                <Form.Control type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value) }></Form.Control>
                            </Form.Group>

                            <div className="col-5 offset-1 col-lg-2 offset-lg-0">
                                <Button type="submit" className="w-100" id='button-filtrar'>
                                    Filtrar
                                </Button>
                            </div>

                            <div className="col-5 col-lg-2">
                                <Button type="button" className="w-100" id='button-limpar' onClick={limparFiltro}>
                                    Limpar
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>

                <div className="container-fluid row m-0 p-0" id='cards-movimentacoes'>
                    {
                        movimentacoes.map(movimentacao => (
                            <MovimentacaoCard
                                key={movimentacao.id}
                                id={movimentacao.id}
                                idFuncionario={movimentacao.id_funcionario}
                                nomeFuncionario={movimentacao.nome_funcionario}
                                data={movimentacao.data_criacao}
                                produto={movimentacao.produto}
                                quantidade={movimentacao.quantidade}
                                valorTotal={movimentacao.valor_total}
                                tipo={movimentacao.tipo}
                            />
                        ))
                    }
                </div>
            <Footer/>
        </div>
    );
}

export default Movimentacoes;
