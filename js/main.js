import { initProdutos } from './produtos.js';
import { initCarrinho } from './carrinho.js';
import { initDepoimentos } from './depoimentos.js';
import { initContatos } from './contatos.js';

function inicializarPagina() {
  if (document.getElementById('lista-produtos')) {
    initProdutos();
  }

  if (document.getElementById('lista-carrinho')) {
    initCarrinho();
  }

  if (document.getElementById('lista-depoimentos')) {
    initDepoimentos();
  }

  if (
    document.getElementById('form-contato') ||
    document.getElementById('btnEnviar')
  ) {
    initContatos();
  }
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
