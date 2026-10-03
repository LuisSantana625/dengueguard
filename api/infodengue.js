export default async function handler(request, response) {
  // Aceita somente requisições GET
  if (request.method !== "GET") {
    return response.status(405).json({
      erro: "Método não permitido.",
    });
  }

  const {
    geocode,
    disease = "dengue",
    format = "json",
    ew_start = "1",
    ew_end = "53",
    ey_start,
    ey_end,
  } = request.query;

  // Verifica os parâmetros obrigatórios
  if (!geocode || !ey_start || !ey_end) {
    return response.status(400).json({
      erro: "Parâmetros obrigatórios não informados.",
    });
  }

  const parametros = new URLSearchParams({
    geocode: String(geocode),
    disease: String(disease),
    format: String(format),
    ew_start: String(ew_start),
    ew_end: String(ew_end),
    ey_start: String(ey_start),
    ey_end: String(ey_end),
  });

  const urlInfoDengue =
    `https://info.dengue.mat.br/api/alertcity?${parametros.toString()}`;

  try {
    const respostaInfoDengue = await fetch(
      urlInfoDengue,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!respostaInfoDengue.ok) {
      const textoErro =
        await respostaInfoDengue.text();

      console.error(
        "Erro retornado pelo InfoDengue:",
        respostaInfoDengue.status,
        textoErro
      );

      return response
        .status(respostaInfoDengue.status)
        .json({
          erro:
            "Não foi possível consultar o InfoDengue.",
          status: respostaInfoDengue.status,
        });
    }

    const dados =
      await respostaInfoDengue.json();

    return response.status(200).json(dados);

  } catch (error) {
    console.error(
      "Erro na comunicação com o InfoDengue:",
      error
    );

    return response.status(502).json({
      erro:
        "Falha na comunicação com o InfoDengue.",
    });
  }
}