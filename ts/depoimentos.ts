import { buscarDepoimentos } from './api.ts';
import { renderDepoimentos } from './ui.ts';

export async function initDepoimentos() {
  const lista = document.getElementById('lista-depoimentos');
  if (!lista) return;

  try {
    const depoimentos = await buscarDepoimentos();
    renderDepoimentos(lista, depoimentos);
  } catch (erro) {
    console.error('Erro ao carregar depoimentos:', erro);
  }
}
