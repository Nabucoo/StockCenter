import '../styles/components/Footer.css'

function Footer() {
    return (
        <div>
            <footer className="py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5>StockCenter</h5>
                        <p className="">
                            Gestão inteligente e eficiente para o seu estoque.
                        </p>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5>Desenvolvedores</h5>
                        <ul className="list-unstyled">
                            <li>Lucas Henrique</li>
                            <li>Luiz Gustavo</li>
                            <li>Ryquelme Maciel</li>
                            <li>Jean Wander</li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5>Suporte</h5>
                        <p>Dúvidas? Entre em contato com nossa equipe de desenvolvimento.</p>
                        <small className="">© 2026 StockCenter - Todos os direitos reservados.</small>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    )
}

export default Footer;