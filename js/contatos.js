import { buscarEnderecoPorCep, enviarContato } from './api.js';
import { mostrarAlerta } from './ui.js';

function getCampo(id) {
  return document.getElementById(id);
}

function formatarCep(valor) {
  return valor ? valor.replace(/\D/g, '') : '';
}

function lerDadosFormulario() {
  const nome = getCampo('nomeCliente');
  const email = getCampo('emailCliente');
  const cep = getCampo('cepCliente');
  const rua = getCampo('ruaCliente');
  const bairro = getCampo('bairroCliente');
  const cidade = getCampo('cidadeCliente');
  const estado = getCampo('estadoCliente');
  const mensagem = getCampo('obsCliente');

  if (!nome || !email || !mensagem) return null;

  return {
    nome: nome.value.trim(),
    email: email.value.trim(),
    cep: cep ? formatarCep(cep.value) : '',
    rua: rua ? rua.value.trim() : '',
    bairro: bairro ? bairro.value.trim() : '',
    cidade: cidade ? cidade.value.trim() : '',
    estado: estado ? estado.value.trim() : '',
    mensagem: mensagem.value.trim(),
  };
}

function limparFormulario() {
  [
    'nomeCliente',
    'emailCliente',
    'cepCliente',
    'ruaCliente',
    'bairroCliente',
    'cidadeCliente',
    'estadoCliente',
    'obsCliente',
  ].forEach((id) => {
    const campo = getCampo(id);
    if (campo) campo.value = '';
  });
}

function preencherEndereco(dados) {
  const rua = getCampo('ruaCliente');
  const bairro = getCampo('bairroCliente');
  const cidade = getCampo('cidadeCliente');
  const estado = getCampo('estadoCliente');

  if (rua) rua.value = dados.logradouro || '';
  if (bairro) bairro.value = dados.bairro || '';
  if (cidade) cidade.value = dados.localidade || '';
  if (estado) estado.value = dados.uf || '';
}

async function tentarBuscarEndereco() {
  const cepInput = getCampo('cepCliente');
  if (!cepInput) return;

  const cep = formatarCep(cepInput.value);
  if (!cep) return;
  if (cep.length !== 8) {
    mostrarAlerta('CEP inválido. Use 8 dígitos.', 'warning');
    return;
  }

  try {
    const endereco = await buscarEnderecoPorCep(cep);
    preencherEndereco(endereco);
    mostrarAlerta('Endereço preenchido automaticamente.', 'success');
  } catch (erro) {
    mostrarAlerta('CEP não encontrado. Digite manualmente.', 'danger');
    console.error(erro);
  }
}

export function initContatos() {
  const form = getCampo('form-contato');
  if (!form) return;

  const cepInput = getCampo('cepCliente');
  if (cepInput) {
    cepInput.addEventListener('input', () => {
      const cepFormatado = cepInput.value.replace(/\D/g, '').slice(0, 8);
      cepInput.value = cepFormatado.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    });
    cepInput.addEventListener('blur', tentarBuscarEndereco);
  }

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
