export async function buscarDepoimentos() {
  const resposta = await fetch(
    'https://jsonplaceholder.typicode.com/comments?_limit=3'
  );
  if (!resposta.ok) {
    throw new Error('Erro ao carregar depoimentos');
  }
  return resposta.json();
}

export async function enviarContato(dados) {
  const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  return resposta;
}

export async function buscarEnderecoPorCep(cep) {
  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar o CEP');
  }

  const dados = await resposta.json();
  if (dados.erro) {
    throw new Error('CEP inválido');
  }

  return dados;
}
