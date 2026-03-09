function calcularTotal() {
    const checkboxes = document.querySelectorAll('.item-produto input[type="checkbox"]');
    const qtds = document.querySelectorAll('.qtd-produto');

    let total = 0;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const valor = parseFloat(checkbox.value);
            const qtd = parseInt(qtds[index].value);
            total += valor * qtd;
        }
    });

    const totalElemento = document.getElementById('valor-total');

    if (totalElemento) {
        totalElemento.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

const checkboxes = document.querySelectorAll('.item-produto input[type="checkbox"]');
const qtds = document.querySelectorAll('.qtd-produto');

checkboxes.forEach(cb => cb.addEventListener('change', calcularTotal));
qtds.forEach(qtd => qtd.addEventListener('change', calcularTotal));

calcularTotal();


function calcularTotalCarrinho() {

    let total = 0;

    carrinho.forEach(produto => {
        total += (produto.preco);
    });

    const totalElemento = document.getElementById("total-carrinho");

    if (totalElemento) {
        totalElemento.innerText =
            total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

}



let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarCarrinho(nome, preco) {

    const produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
}


function mostrarCarrinho() {

    let lista = document.getElementById("lista-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {

        total += Number(produto.preco);

        let card = `
        <div class="card mb-3 text-center" style="max-width: 50rem; margin: 20px auto;">
            <div class="card-header">
                <h3>${produto.nome}</h3>
            </div>
            <div class="card-body">
                <h5>R$ ${produto.preco.toFixed(2)}</h5>
            </div>
            <div class="text-end">
                <button class="btn btn-danger" onclick="removerItem(${index})">Remover</button>
            </div>

        </div>
        `;

        lista.innerHTML += card;

    });

    calcularTotalCarrinho();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
    mostrarCarrinho();
}


function atualizarCarrinho() {

    let contador = document.getElementById("contador-carrinho");

    if (contador) {
        contador.innerText = carrinho.length;
    }

}


document.addEventListener("DOMContentLoaded", function () {

    atualizarCarrinho();
    mostrarCarrinho();

});


async function carregarDepoimento() {
    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3")

        const dados = await resposta.json();
        const lista = document.getElementById("lista-depoimentos");

        dados.forEach(depoimento => {

            const card = `
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${depoimento.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${depoimento.email}</h6>
              <p class="card-text">${depoimento.body}</p>
            </div>
          </div>
        </div>
        `;
            lista.innerHTML += card;
        });
    } catch (erro) {
    console.error("Erro ao carregar depoimentos:", erro);
    }
}

carregarDepoimento();