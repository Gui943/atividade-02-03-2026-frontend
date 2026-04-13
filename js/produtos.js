import { adicionarCarrinho } from './carrinho.js';

const produtos = [
  {
    id: 1,
    nome: 'Camiseta',
    preco: 49.9,
    descricao: 'Descrição do item',
    imagem:
      'https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg',
  },
  {
    id: 2,
    nome: 'Tênis',
    preco: 100.0,
    descricao: 'Descrição do item',
    imagem:
      'https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg',
  },
  {
    id: 3,
    nome: 'Calça',
    preco: 69.9,
    descricao: 'Descrição do item',
    imagem:
      'https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg',
  },
];

export function initProdutos() {
  const container = document.getElementById('lista-produtos');
  if (!container) return;

  container.innerHTML = '';

  produtos.forEach((produto) => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card" style="width: 20rem;">
        <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
        <div class="card-body">
          <h5 class="card-title">${produto.nome}</h5>
          <p class="card-text">${produto.descricao}</p>
          <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
          <div class="d-flex gap-2 mb-2">
            <button class="btn btn-outline-primary btn-sm flex-fill" type="button" data-bs-toggle="modal" data-bs-target="#produtoModal" data-nome="${produto.nome}" data-descricao="${produto.descricao}" data-preco="${produto.preco.toFixed(2)}">
              Ver Detalhes
            </button>
            <button class="btn btn-primary btn-sm flex-fill btn-add-cart" type="button" data-nome="${produto.nome}" data-preco="${produto.preco}">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>`;

    container.appendChild(card);
  });

  container.addEventListener('click', (event) => {
    const botao = event.target.closest('.btn-add-cart');
    if (!botao) return;

    const card = botao.closest('.card');
    const quantidadeInput = card.querySelector('.qtd-produto');
    const quantidade = Number(quantidadeInput?.value) || 1;

    adicionarCarrinho(
      botao.dataset.nome,
      Number(botao.dataset.preco),
      quantidade
    );
  });
}
