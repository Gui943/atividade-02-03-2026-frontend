import { useCarrinho } from '../context/carrinhoContext';

export const Carrinho = () => {
    const { carrinho, removerItem, total } = useCarrinho();

    return (
        <div className="container">
            <h1 className="text-center mt-5">Carrinho de Compras</h1>

            <div className="container">
                {carrinho.length === 0 ? (
                    <p className="text-center">Seu carrinho está vazio.</p>
                ) : (
                    carrinho.map((produto, index) => (
                        <div className="card mb-3" style={{ maxWidth: '50rem', margin: '20px auto' }} key={index}>
                            <div className="card-header text-center">
                                <h3>{produto.nome}</h3>
                            </div>
                            <div className="card-body text-center">
                                <p className="mb-1">
                                    Preço: {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                                <p className="mb-1">Quantidade: {produto.quantidade}</p>
                            </div>
                            <div className="card-footer text-end bg-transparent border-top-0">
                                <button className="btn btn-danger btn-sm" onClick={() => removerItem(index)}>
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="container alert alert-info text-center" style={{ marginTop: '100px' }}>
                Valor Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>

            <div className="container text-center">
                <a className="btn btn-primary w-100" style={{ padding: '15px' }} href="">
                    Confirmar Compra!
                </a>
            </div>
        </div>
    );
};