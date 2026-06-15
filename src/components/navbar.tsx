import { Link } from "react-router-dom";
import { useCarrinho } from '../context/carrinhoContext';
import { useTema } from '../context/TemaContext';


export const Navbar = () => {
    const { carrinho } = useCarrinho();
    const { nomeTema, proximoTema } = useTema();
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/produtos">Produtos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/contato">Contato</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item me-2">
                            <button className="btn btn-outline-primary btn-sm" type="button" onClick={proximoTema}>
                                Mudar tema ({nomeTema})
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active position-relative" aria-current="page" to="/carrinho">
                                <span className="position-relative d-inline-block">
                                    <i className="bi-cart me-3 fs-5"></i>
                                    <span id="contador-carrinho" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger me">
                                        {carrinho.length}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};