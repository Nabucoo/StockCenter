import Header from "../components/Header";
import Footer from "../components/Footer";

import estoqueImg from "../assets/images/estoque.png"
import vendasImg from "../assets/images/vendas.png"
import dashboardImg from "../assets/images/dashboard.png"

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/pages/Home.css'
function Home() {

    const navigate = useNavigate();
    
    useEffect(() => {
        async function isLogged() {
            const token = localStorage.getItem('token');

            try {
                await axios.get(
                    'http://localhost:3000/verify',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            } catch (error) {
                navigate('/')
                localStorage.removeItem('token');
            }
        }

        isLogged();
    }, [navigate]);

    return (
        <div id="div-home">
            <Header />
            <main>
                <div id="estoque-card" className="card w-100" style={{ width: "18rem" }}>
                    <img src={estoqueImg} className="card-img-top" alt="Estoque" />
                    <div className="card-body">
                        <p className="card-text">
                            Controle total das suas mercadorias em tempo real. Esta área permite acompanhar os níveis de produtos, gerenciar entradas e saídas, organizar o armazenamento e garantir que o seu negócio nunca sofra com a falta de itens essenciais ou com excessos desnecessários.
                        </p>
                    </div>
                </div>

                <div id="vendas-card" className="card w-100" style={{ width: "18rem" }}>
                    <img src={vendasImg} className="card-img-top" alt="Vendas" />
                    <div className="card-body">
                        <p className="card-text">
                            O motor comercial do seu negócio. Uma interface dinâmica e ágil projetada para registrar transações de forma rápida, processar pagamentos, emitir comprovantes e garantir que a jornada de compra do cliente seja concluída com eficiência e segurança.
                        </p>
                    </div>
                </div>

                <div id="dashboard-card" className="card w-100" style={{ width: "18rem" }}>
                    <img src={dashboardImg} className="card-img-top" alt="Dashboard" />
                    <div className="card-body">
                        <p className="card-text">
                            A mente estratégica do sistema. Centraliza os indicadores mais importantes de vendas e estoque em gráficos e painéis visuais de fácil leitura. Ideal para monitorar o desempenho do negócio, identificar tendências e apoiar tomadas de decisão rápidas e precisas.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;

