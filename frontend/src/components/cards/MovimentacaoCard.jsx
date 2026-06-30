import '../../styles/components/MovimentacaoCard.css';

function MovimentacaoCard({ id, idFuncionario, nomeFuncionario, data, produto, quantidade, valorTotal, tipo }) {

    const dataF = new Date(data).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    return (
        <div id="movimentacao-card" className="col-12 col-lg-6 offset-lg-0 m-0 p-4">
            <div className="card m-0 p-0">
                <div className="card-header">
                    <h5 className="card-title">Id: {id}</h5>
                </div>

                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">funcionário: {nomeFuncionario}({idFuncionario})</li>
                        <li className="list-group-item">data/hora: {dataF}</li>
                        <li className="list-group-item">produto: {produto}</li>
                        <li className="list-group-item">quantidade: {quantidade}</li>
                        <li className="list-group-item">valor total: {valorTotal}</li>
                        <li className="list-group-item">tipo: {tipo}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MovimentacaoCard;
