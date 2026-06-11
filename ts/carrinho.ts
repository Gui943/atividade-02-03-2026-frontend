const CART_KEY = 'carrinho';
let carrinho = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');

function salvarCarrinho() {
  localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
}

function calcularTotalCarrinho() {
  const total = carrinho.reduce(
    (soma: number, produto: any) =>
      soma + Number(produto.preco) * Number(produto.quantidade || 1),
    0
  );
  const totalElemento = document.getElementById('total-carrinho');
  if (totalElemento) {
    totalElemento.innerText = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}

export function adicionarCarrinho(
  nome: string,
  preco: number,
  quantidade: number = 1
) {
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

function removerItem(index: number) {
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

  carrinho.forEach((produto: any, index: number) => {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.style.maxWidth = '50rem';
    card.style.margin = '20px auto';
    card.innerHTML = `
      <div class="card-header text-center">
        <h3>${produto.nome}</h3>
      </div>
      <div class="card-body text-center">
        <p class="mb-1">Preço: ${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p class="mb-1">Quantidade: ${produto.quantidade}</p>
      </div>
      <div class="card-footer text-end bg-transparent border-top-0">
        <button class="btn btn-danger btn-sm" data-index="${index}">Remover</button>
      </div>
    `;

    lista.appendChild(card);
  });

  calcularTotalCarrinho();
}

function atualizarCarrinho() {
  const contador = document.getElementById('contador-carrinho');
  if (contador) {
    contador.innerText = carrinho.length;
  }
}

export function initCarrinho() {
  atualizarCarrinho();
  mostrarCarrinho();

  const lista = document.getElementById('lista-carrinho');
  if (!lista) return;

  lista.addEventListener('click', (event: any) => {
    const botao = event.target.closest('button[data-index]');
    if (!botao) return;
    const index = Number(botao.dataset.index);
    removerItem(index);
  });
}
