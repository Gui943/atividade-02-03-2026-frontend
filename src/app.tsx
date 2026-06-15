import { Navbar } from "./components/navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./components/home"
import { Contato } from "./components/contato"
import { Produtos } from "./components/produtos"
import { Carrinho } from "./components/carrinho"
import { CarrinhoProvider } from './context/carrinhoContext';
import { TemaProvider } from './context/TemaContext';

export const App = () => {
    return (
        <BrowserRouter>
            <TemaProvider>
                <CarrinhoProvider>
                    <div>
                        <Navbar />
                        <main className="container">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="home" element={<Home />} />
                                <Route path="contato" element={<Contato />} />
                                <Route path="produtos" element={<Produtos />} />
                                <Route path="carrinho" element={<Carrinho />} />
                            </Routes>
                        </main>
                    </div>
                </CarrinhoProvider>
            </TemaProvider>
        </BrowserRouter>
    )
}