import '../styles/pages/Login.css';
import logo from '../assets/images/logo.png';

function Login() {
    return (
        <div id='login-div'>
            <div id='login-title'>
                <img src={logo} alt="Logo StockCenter"/>
                <h1>STOCKCENTER</h1>
            </div>

            <form id='form-login'>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email-input" placeholder="name@example.com"/>
                    <label htmlFor="email-input">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password-input" placeholder="name@example.com"/>
                    <label htmlFor="password-input">Senha</label>
                </div>

                <button type="submit" className="btn btn-primary">Logar</button>
            </form>

            <a href="#" className='stretched-link'>Cadastrar</a>
        </div>
    );
}

export default Login;