import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Funcionarios from './pages/Funcionarios'
import Estoque from './pages/Estoque';
import Movimentacoes from './pages/Movimentacoes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/funcionarios" element={<Funcionarios />}/>
                <Route path="/estoque" element={<Estoque />}/>
                <Route path="/movimentacoes" element={<Movimentacoes/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default App; 