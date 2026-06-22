import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Funcionarios from './pages/Funcionarios'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/funcionarios" element={<Funcionarios />}/>
            </Routes>
        </BrowserRouter>
    );
}
export default App; 