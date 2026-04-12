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

function carregarProdutos() {
  const container = document.getElementById('lista-produtos');
  if (!container) return;

  container.innerHTML = '';

  produtos.forEach((produto) => {
    const card = `
      <div class="col-md-4">
        <div class="card" style="width: 20rem;">
          <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
          <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">${produto.descricao}</p>
            <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
            <input class="qtd-produto form-control mb-2" type="number" value="1" min="1">
            <button class="btn btn-primary w-100" onclick="adicionarCarrinho('${produto.nome}', ${produto.preco}, this.closest('.card').querySelector('.qtd-produto').value)">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>`;

    container.innerHTML += card;
  });
}

carregarProdutos();
