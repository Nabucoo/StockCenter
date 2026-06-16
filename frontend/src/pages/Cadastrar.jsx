import '../styles/pages/Cadastrar.css';
import logo from '../assets/images/logo.png';

function Cadastrar() {
    return (
        <div id='cadastrar-div'>
            <div id='cadastrar-title'>
                <img src={logo} alt="Logo StockCenter"/>
                <h1>STOCKCENTER</h1>
            </div>

            <form id='form-cadastrar'>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name-input" placeholder="name@example.com"/>
                    <label htmlFor="name-input">Nome</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email-input" placeholder="name@example.com"/>
                    <label htmlFor="email-input">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password-input" placeholder="name@example.com"/>
                    <label htmlFor="password-input">Senha</label>
                </div>

                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>

            <a href="#" className='stretched-link'>Login</a>
        </div>
    );
}

export default Cadastrar;