import { useState, useEffect } from 'react';

interface Depoimento {
  id: number;
  name: string;
  email: string;
  body: string;
}

export const Depoimentos = () => {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
        if (!resposta.ok) throw new Error('Erro ao carregar depoimentos');
        const dados = await resposta.json();
        setDepoimentos(dados);
      } catch (erro) {
        console.error('Erro ao carregar depoimentos:', erro);
      }
    }

    carregar();
  }, []);

  return (
    <div className="container mt-5">
      <h2>O que nossos clientes dizem</h2>
      <div className="row">
        {depoimentos.map((depoimento) => (
          <div className="col-md-4 mb-3" key={depoimento.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{depoimento.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{depoimento.email}</h6>
                <p className="card-text">{depoimento.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};