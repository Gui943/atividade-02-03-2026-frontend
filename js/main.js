import { initProdutos } from './produtos.js';
import { initCarrinho } from './carrinho.js';
import { initDepoimentos } from './depoimentos.js';
import { initContatos } from './contatos.js';
import { initProdutoModal, initThemeToggle } from './ui.js';

function inicializarPagina() {
  initThemeToggle();
  if (document.getElementById('lista-produtos')) {
    initProdutos();
  }

  if (document.getElementById('lista-carrinho')) {
    initCarrinho();
  }

  if (document.getElementById('lista-depoimentos')) {
    initDepoimentos();
  }

  if (document.getElementById('produtoModal')) {
    initProdutoModal();
  }

  if (
    document.getElementById('form-contato') ||
    document.getElementById('btnEnviar')
  ) {
    initContatos();
  }
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
