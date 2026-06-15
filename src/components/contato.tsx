import { useState } from 'react';

interface FormData {
  nome: string;
  email: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  mensagem: string;
}

const dadosIniciais: FormData = {
  nome: '',
  email: '',
  cep: '',
  rua: '',
  bairro: '',
  cidade: '',
  estado: '',
  mensagem: '',
};

export const Contato = () => {
  const [form, setForm] = useState<FormData>(dadosIniciais);
  const [alerta, setAlerta] = useState<{ msg: string; tipo: string } | null>(null);

  const mostrarAlerta = (msg: string, tipo: string) => {
    setAlerta({ msg, tipo });
    setTimeout(() => setAlerta(null), 4000);
  };

  const handleChange = (campo: keyof FormData, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleCepChange = (valor: string) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 8);
    const formatado = numeros.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    handleChange('cep', formatado);
  };

  const buscarEndereco = async () => {
    const cep = form.cep.replace(/\D/g, '');
    if (!cep) return;

    if (cep.length !== 8) {
      mostrarAlerta('CEP inválido. Use 8 dígitos.', 'warning');
      return;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!resposta.ok) throw new Error('Erro ao buscar o CEP');

      const dados = await resposta.json();
      if (dados.erro) throw new Error('CEP inválido');

      setForm((prev) => ({
        ...prev,
        rua: dados.logradouro || '',
        bairro: dados.bairro || '',
        cidade: dados.localidade || '',
        estado: dados.uf || '',
      }));
      mostrarAlerta('Endereço preenchido automaticamente.', 'success');
    } catch (erro) {
      mostrarAlerta('CEP não encontrado. Digite manualmente.', 'danger');
      console.error(erro);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nome.trim() || !form.email.trim()) {
      mostrarAlerta('Por favor, preencha nome e email.', 'warning');
      return;
    }

    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (resposta.status === 201) {
        mostrarAlerta('Mensagem enviada com sucesso!', 'success');
        setForm(dadosIniciais);
      } else {
        mostrarAlerta('Erro ao enviar! Tente novamente.', 'danger');
      }
    } catch (erro) {
      mostrarAlerta('Falha na requisição! Verifique sua conexão.', 'danger');
      console.error(erro);
    }
  };

  return (
    <div>
      {alerta && (
        <div
          className={`alert alert-${alerta.tipo} shadow`}
          style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050, maxWidth: '360px' }}
        >
          {alerta.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="container mt-5">
        <div className="mb-3">
          <label htmlFor="nomeCliente" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nomeCliente"
            placeholder="Seu Nome"
            required
            value={form.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailCliente" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="emailCliente"
            placeholder="nome@gmail.com"
            required
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="cepCliente" className="form-label">CEP</label>
            <input
              type="text"
              className="form-control"
              id="cepCliente"
              placeholder="00000-000"
              maxLength={9}
              inputMode="numeric"
              pattern="\d{5}-?\d{3}"
              title="Digite um CEP válido, apenas números"
              value={form.cep}
              onChange={(e) => handleCepChange(e.target.value)}
              onBlur={buscarEndereco}
            />
          </div>
          <div className="col-md-8 mb-3">
            <label htmlFor="ruaCliente" className="form-label">Rua</label>
            <input
              type="text"
              className="form-control"
              id="ruaCliente"
              placeholder="Rua"
              value={form.rua}
              onChange={(e) => handleChange('rua', e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="bairroCliente" className="form-label">Bairro</label>
            <input
              type="text"
              className="form-control"
              id="bairroCliente"
              placeholder="Bairro"
              value={form.bairro}
              onChange={(e) => handleChange('bairro', e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cidadeCliente" className="form-label">Cidade</label>
            <input
              type="text"
              className="form-control"
              id="cidadeCliente"
              placeholder="Cidade"
              value={form.cidade}
              onChange={(e) => handleChange('cidade', e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="estadoCliente" className="form-label">Estado</label>
            <input
              type="text"
              className="form-control"
              id="estadoCliente"
              placeholder="UF"
              maxLength={2}
              value={form.estado}
              onChange={(e) => handleChange('estado', e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="obsCliente" className="form-label">Obs</label>
          <textarea
            className="form-control"
            id="obsCliente"
            rows={3}
            value={form.mensagem}
            onChange={(e) => handleChange('mensagem', e.target.value)}
          ></textarea>
        </div>

        <div>
          <button id="btnEnviar" className="btn btn-primary" type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};