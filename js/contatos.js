function mostrarAlerta(msg, tipo) {
  const container = document.querySelector('.container');
  if (!container) return;

  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} mt-3`;
  alerta.textContent = msg;

  container.prepend(alerta);
  setTimeout(() => alerta.remove(), 4000);
}

async function enviarFormulario(event) {
  event.preventDefault();

  const nome = document.getElementById('nomeCliente');
  const email = document.getElementById('emailCliente');
  const mensagem = document.getElementById('obsCliente');

  if (!nome || !email || !mensagem) return;

  const dados = {
    nome: nome.value.trim(),
    email: email.value.trim(),
    mensagem: mensagem.value.trim(),
  };

  if (!dados.nome || !dados.email) {
    mostrarAlerta('Por favor, preencha nome e email.', 'warning');
    return;
  }

  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (resposta.status === 201) {
      mostrarAlerta('Mensagem enviada com sucesso!', 'success');
      nome.value = '';
      email.value = '';
      mensagem.value = '';
    } else {
      mostrarAlerta('Erro ao enviar! Tente novamente.', 'danger');
    }
  } catch (erro) {
    mostrarAlerta('Falha na requisição! Verifique sua conexão.', 'danger');
    console.error(erro);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const botaoEnviar = document.getElementById('btnEnviar');
  if (botaoEnviar) {
    botaoEnviar.addEventListener('click', enviarFormulario);
  }
});
