import '../styles/components/Header.css'
import logo from '../assets/images/logo.png'
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';



function Header() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

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
                setIsAdmin(true);
            } catch {
                setIsAdmin(false);
            }
        }

    isAdm();
    }, [navigate]);
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">

                    <a className="navbar-brand d-flex align-items-center gap-2">
                    <img src={logo} alt="Logo" width="100" />
                    <h1 id="title">StockCenter</h1>
                    </a>

                    <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAltMarkup" 
                    aria-controls="navbarNavAltMarkup" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link" to="/estoque">Estoque</Link>
                            {isAdmin && (<Link className="nav-link" to="/movimentacoes">Movimentações</Link>)}
                            {isAdmin && (<Link className="nav-link" to="/funcionarios">Funcionários</Link>)}
                            <Link className="nav-link" to="/" onClick={() => localStorage.removeItem('token')}>Sair</Link>
                        </div>
                    </div>
                </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;
