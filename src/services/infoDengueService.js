const API_URL = "/api-infodengue/api/alertcity";

export async function buscarDadosDengueMaisRecentes(codigoIbge) {
  const anoAtual = new Date().getFullYear();

  const parametros = new URLSearchParams({
    geocode: String(codigoIbge),
    disease: "dengue",
    format: "json",
    ew_start: "1",
    ew_end: "53",
    ey_start: String(anoAtual),
    ey_end: String(anoAtual),
  });

  const url = `${API_URL}?${parametros.toString()}`;

  console.log("Consultando InfoDengue:", url);

  try {
    const response = await fetch(url);

    console.log("Status InfoDengue:", response.status);

    if (!response.ok) {
      throw new Error(
        `INFODENGUE_HTTP_${response.status}`
      );
    }

    const dados = await response.json();

    console.log("Resposta InfoDengue:", dados);

    if (!Array.isArray(dados)) {
      throw new Error("RESPOSTA_INFODENGUE_INVALIDA");
    }

    if (dados.length === 0) {
      return null;
    }

    const dadosValidos = dados.filter((registro) => {
      const semana = registro.SE ?? registro.se;

      return semana !== undefined && semana !== null;
    });

    if (dadosValidos.length === 0) {
      return null;
    }

    dadosValidos.sort((a, b) => {
      const semanaA = Number(a.SE ?? a.se);
      const semanaB = Number(b.SE ?? b.se);

      return semanaB - semanaA;
    });

    return dadosValidos[0];

  } catch (error) {
    console.error(
      "Erro detalhado ao consultar InfoDengue:",
      error
    );

    throw error;
  }
}