export async function buscarEnderecoPorCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    throw new Error("CEP_INVALIDO");
  }

  const response = await fetch(
    `https://viacep.com.br/ws/${cepLimpo}/json/`
  );

  if (!response.ok) {
    throw new Error("ERRO_CONEXAO");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP_NAO_ENCONTRADO");
  }

  return data;
}