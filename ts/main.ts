import '../styles.scss';
import { initProdutos } from './produtos.ts';
import { initCarrinho } from './carrinho.ts';
import { initDepoimentos } from './depoimentos.ts';
import { initContatos } from './contatos.ts';
import { initProdutoModal, initThemeToggle } from './ui.ts';

function inicializarPagina() {
  initThemeToggle();
  if (document.getElementById('lista-produtos')) {
    initProdutos();
  }

  initCarrinho();

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
