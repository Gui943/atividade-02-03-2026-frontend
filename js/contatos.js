import { enviarContato } from './api.js';
import { mostrarAlerta } from './ui.js';

function lerDadosFormulario() {
  const nome = document.getElementById('nomeCliente');
  const email = document.getElementById('emailCliente');
  const mensagem = document.getElementById('obsCliente');

  if (!nome || !email || !mensagem) return null;

  return {
    nome: nome.value.trim(),
    email: email.value.trim(),
    mensagem: mensagem.value.trim(),
  };
}

function limparFormulario() {
  const nome = document.getElementById('nomeCliente');
  const email = document.getElementById('emailCliente');
  const mensagem = document.getElementById('obsCliente');

  if (nome) nome.value = '';
  if (email) email.value = '';
  if (mensagem) mensagem.value = '';
}

export function initContatos() {
  const form = document.getElementById('form-contato');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = lerDadosFormulario();
    if (!dados) return;

    if (!dados.nome || !dados.email) {
      mostrarAlerta('Por favor, preencha nome e email.', 'warning');
      return;
    }

    try {
      const resposta = await enviarContato(dados);
      if (resposta.status === 201) {
        mostrarAlerta('Mensagem enviada com sucesso!', 'success');
        limparFormulario();
      } else {
        mostrarAlerta('Erro ao enviar! Tente novamente.', 'danger');
      }
    } catch (erro) {
      mostrarAlerta('Falha na requisição! Verifique sua conexão.', 'danger');
      console.error(erro);
    }
  });
}
