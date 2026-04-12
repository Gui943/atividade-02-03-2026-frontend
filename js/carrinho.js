const CART_KEY = 'carrinho';
let carrinho = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function salvarCarrinho() {
  localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
}

function calcularTotalCarrinho() {
  const total = carrinho.reduce((soma, produto) => soma + Number(produto.preco) * Number(produto.quantidade || 1), 0);
  const totalElemento = document.getElementById('total-carrinho');

  if (totalElemento) {
    totalElemento.innerText = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}

function adicionarCarrinho(nome, preco, quantidade = 1) {
  const produto = {
    nome,
    preco: Number(preco),
    quantidade: Number(quantidade) || 1,
  };

  carrinho.push(produto);
  salvarCarrinho();
  atualizarCarrinho();
  mostrarCarrinho();
}

function removerItem(index) {
  if (index < 0 || index >= carrinho.length) {
    return;
  }

  carrinho.splice(index, 1);
  salvarCarrinho();
  atualizarCarrinho();
  mostrarCarrinho();
}

function mostrarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  if (!lista) return;

  lista.innerHTML = '';

  if (carrinho.length === 0) {
    lista.innerHTML = '<p class="text-center">Seu carrinho está vazio.</p>';
    calcularTotalCarrinho();
    return;
  }

  carrinho.forEach((produto, index) => {
    const card = `
      <div class="card mb-3 text-center" style="max-width: 50rem; margin: 20px auto;">
        <div class="card-header">
          <h3>${produto.nome}</h3>
        </div>
        <div class="card-body">
          <p class="mb-1">Preço: ${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <p class="mb-1">Quantidade: ${produto.quantidade}</p>
        </div>
        <div class="text-end mb-3">
          <button class="btn btn-danger" onclick="removerItem(${index})">Remover</button>
        </div>
      </div>
    `;

    lista.innerHTML += card;
  });

  calcularTotalCarrinho();
}

function atualizarCarrinho() {
  const contador = document.getElementById('contador-carrinho');
  if (contador) {
    contador.innerText = carrinho.length;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  atualizarCarrinho();
  mostrarCarrinho();
});

window.adicionarCarrinho = adicionarCarrinho;
window.removerItem = removerItem;
