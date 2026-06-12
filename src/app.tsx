import {Navbar} from "./components/Navbar"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Home} from "./components/home"
import {Contato} from "./components/contato"
import {Produtos} from "./components/produtos"
import {Carrinho} from "./components/carrinho"

export const App = () => {
    return(
        <BrowserRouter>
            <div>
                <Navbar />
                <main className= "container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="home" element={<Home />} />
                        <Route path="contatos" element={<Contato />} />
                        <Route path="produtos" element={<Produtos />} />
                        <Route path="carrinho" element={<Carrinho />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}