import '../styles/components/Header.css'
import logo from '../assets/images/logo.png'

import { useNavigate, Link } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
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
                            <Link className="nav-link" to="/home">Início</Link>
                            <Link className="nav-link" to="/home">Estoque</Link>
                            <Link className="nav-link" to="/home">Vendas</Link>
                            <Link className="nav-link" to="/home">Dashboard</Link>
                            <Link className="nav-link" to="/funcionarios">Funcionários</Link>
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