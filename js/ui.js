function getAlertaFlutuanteContainer() {
  let wrapper = document.getElementById('alerta-flutuante-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'alerta-flutuante-wrapper';
    wrapper.style.position = 'fixed';
    wrapper.style.top = '20px';
    wrapper.style.right = '20px';
    wrapper.style.zIndex = '1050';
    wrapper.style.width = 'auto';
    wrapper.style.maxWidth = '360px';
    wrapper.style.pointerEvents = 'none';
    document.body.appendChild(wrapper);
  }
  return wrapper;
}

export function mostrarAlerta(msg, tipo) {
  const wrapper = getAlertaFlutuanteContainer();
  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} shadow`;
  alerta.textContent = msg;
  alerta.style.marginBottom = '10px';
  alerta.style.pointerEvents = 'auto';

  wrapper.appendChild(alerta);
  setTimeout(() => alerta.remove(), 4000);
}

const temas = ['light', 'dark', 'green', 'purple'];

function formatarNomeTema(tema) {
  if (tema === 'green') return 'Verde';
  if (tema === 'purple') return 'Roxo';
  return tema === 'dark' ? 'Escuro' : 'Claro';
}

function aplicarTema(tema) {
  const html = document.documentElement;
  html.classList.remove('theme-green', 'theme-purple');
  html.dataset.bsTheme = tema === 'dark' ? 'dark' : 'light';
  html.dataset.theme = tema;

  if (tema === 'green') {
    html.classList.add('theme-green');
  }

  if (tema === 'purple') {
    html.classList.add('theme-purple');
  }

  localStorage.setItem('tema', tema);

  const botaoTema = document.getElementById('botaoTema');
  if (botaoTema) {
    botaoTema.textContent = `Mudar tema (${formatarNomeTema(tema)})`;
  }
}

function proximoTema() {
  const temaAtual = localStorage.getItem('tema') || 'light';
  const indice = temas.indexOf(temaAtual);
  return temas[(indice + 1) % temas.length];
}

export function initThemeToggle() {
  const botaoTema = document.getElementById('botaoTema');
  if (!botaoTema) return;

  const temaSalvo = localStorage.getItem('tema') || 'light';
  botaoTema.textContent = `Mudar tema (${formatarNomeTema(temaSalvo)})`;

  botaoTema.addEventListener('click', () => {
    aplicarTema(proximoTema());
  });
}

export function renderDepoimentos(lista, depoimentos) {
  if (!lista || !Array.isArray(depoimentos)) return;
  lista.innerHTML = '';

  depoimentos.forEach((depoimento) => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-3';
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${depoimento.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${depoimento.email}</h6>
          <p class="card-text">${depoimento.body}</p>
        </div>
      </div>
    `;

    lista.appendChild(card);
  });
}

export function initProdutoModal() {
  const modal = document.getElementById('produtoModal');
  if (!modal) return;

  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    if (!button) return;

    const nome = button.dataset.nome || '';
    const descricao = button.dataset.descricao || '';
    const preco = button.dataset.preco || '';

    const titulo = modal.querySelector('.modal-title');
    const corpo = modal.querySelector('.modal-body p');

    if (titulo) titulo.textContent = nome;
    if (corpo)
      corpo.textContent = `${descricao} - R$ ${Number(preco).toFixed(2)}`;
  });
}
