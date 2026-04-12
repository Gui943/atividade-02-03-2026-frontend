async function carregarDepoimento() {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
    const dados = await resposta.json();
    const lista = document.getElementById('lista-depoimentos');

    if (!lista) return;
    lista.innerHTML = '';

    dados.forEach((depoimento) => {
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
    console.error('Erro ao carregar depoimentos:', erro);
  }
}

document.addEventListener('DOMContentLoaded', carregarDepoimento);
