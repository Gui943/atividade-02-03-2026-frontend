import { useState } from 'react';
import { useCarrinho } from '../context/carrinhoContext';

const produtos = [
    {
        id: 1,
        nome: 'Camiseta',
        preco: 49.9,
        descricao: 'Descrição do item',
        imagem: 'https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg',
    },
    {
        id: 2,
        nome: 'Tênis',
        preco: 100.0,
        descricao: 'Descrição do item',
        imagem: 'https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg',
    },
    {
        id: 3,
        nome: 'Calça',
        preco: 69.9,
        descricao: 'Descrição do item',
        imagem: 'https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg',
    },
];

export const Produtos = () => {
    const { adicionarCarrinho } = useCarrinho();
    const [produtoSelecionado, setProdutoSelecionado] = useState<typeof produtos[0] | null>(null);
    return (
        <div>
            <div className="container">
                <div className="row">
                    {produtos.map((produto) => (
                        <div className="col-md-4" key={produto.id}>
                            <div className="card" style={{ width: '20rem' }}>
                                <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
                                <div className="card-body">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <p className="card-text">{produto.descricao}</p>
                                    <p className="card-text">R$ {produto.preco.toFixed(2)}</p>
                                    <div className="d-flex gap-2 mb-2">
                                        <button
                                            className="btn btn-outline-primary btn-sm flex-fill"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#produtoModal"
                                            onClick={() => setProdutoSelecionado(produto)}
                                        >
                                            Ver Detalhes
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm flex-fill"
                                            type="button"
                                            onClick={() => adicionarCarrinho(produto.nome, produto.preco, 1)}
                                        >
                                            Adicionar ao carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="modal fade" id="produtoModal" tabIndex={-1} aria-labelledby="produtoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="produtoModalLabel">{produtoSelecionado?.nome}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>{produtoSelecionado?.descricao}</p>
                            <p>R$ {produtoSelecionado?.preco.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}