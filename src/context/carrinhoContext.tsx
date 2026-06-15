import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Produto {
  nome: string;
  preco: number;
  quantidade: number;
}

interface CarrinhoContextType {
  carrinho: Produto[];
  adicionarCarrinho: (nome: string, preco: number, quantidade?: number) => void;
  removerItem: (index: number) => void;
  total: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

const CART_KEY = 'carrinho';

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>(() => {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarCarrinho = (nome: string, preco: number, quantidade: number = 1) => {
    setCarrinho((prev) => [
      ...prev,
      { nome, preco: Number(preco), quantidade: Number(quantidade) || 1 },
    ]);
  };

  const removerItem = (index: number) => {
    setCarrinho((prev) => prev.filter((_, i) => i !== index));
  };

  const total = carrinho.reduce(
    (soma, produto) => soma + produto.preco * produto.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarCarrinho, removerItem, total }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  }
  return context;
};