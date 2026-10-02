import { useEffect, useState } from "react";
import { buscarEnderecoPorCep } from "../services/viaCepService";
import { buscarDadosDengueMaisRecentes } from "../services/infoDengueService";


// ======================================================
// INTERPRETAÇÃO DO NÍVEL DE ALERTA DO INFODENGUE
// ======================================================

function interpretarNivel(nivel) {
  const niveis = {
    1: {
      nome: "Verde",
      emoji: "🟢",
      descricao: "Baixo risco epidemiológico",
    },

    2: {
      nome: "Amarelo",
      emoji: "🟡",
      descricao: "Condições favoráveis à transmissão",
    },

    3: {
      nome: "Laranja",
      emoji: "🟠",
      descricao: "Transmissão aumentada",
    },

    4: {
      nome: "Vermelho",
      emoji: "🔴",
      descricao: "Alta incidência",
    },
  };

  return (
    niveis[Number(nivel)] || {
      nome: "Indisponível",
      emoji: "⚪",
      descricao: "Nível epidemiológico não informado",
    }
  );
}


// ======================================================
// INTERPRETAÇÃO DA RECEPTIVIDADE CLIMÁTICA
// ======================================================

function interpretarReceptividade(receptivo) {
  const niveis = {
    0: {
      titulo: "Condições desfavoráveis",
      emoji: "🟢",
      classe: "clima-desfavoravel",
      descricao:
        "As condições climáticas do período apresentam baixa receptividade para a transmissão da dengue.",
    },

    1: {
      titulo: "Condições favoráveis",
      emoji: "🟡",
      classe: "clima-favoravel",
      descricao:
        "As condições climáticas do período estão favoráveis à atividade do vetor e podem contribuir para a transmissão da dengue.",
    },

    2: {
      titulo: "Condições favoráveis persistentes",
      emoji: "🟠",
      classe: "clima-persistente",
      descricao:
        "As condições climáticas estão favoráveis nesta semana e também estiveram favoráveis na semana anterior.",
    },

    3: {
      titulo: "Condições favoráveis há pelo menos 3 semanas",
      emoji: "🔴",
      classe: "clima-muito-favoravel",
      descricao:
        "As condições climáticas permanecem favoráveis há pelo menos três semanas, período suficiente para completar um ciclo de transmissão.",
    },
  };

  return (
    niveis[Number(receptivo)] || {
      titulo: "Receptividade não informada",
      emoji: "⚪",
      classe: "clima-indisponivel",
      descricao:
        "O InfoDengue não disponibilizou o indicador de receptividade climática para este período.",
    }
  );
}


// ======================================================
// CONVERSÃO DA SEMANA EPIDEMIOLÓGICA PARA DATA
// ======================================================

function obterPeriodoSemanaEpidemiologica(ano, semana) {
  const primeiroDiaAno = new Date(ano, 0, 1);
  const inicioPrimeiraSemana = new Date(primeiroDiaAno);

  inicioPrimeiraSemana.setDate(
    primeiroDiaAno.getDate() -
      primeiroDiaAno.getDay()
  );

  const inicioSemana =
    new Date(inicioPrimeiraSemana);

  inicioSemana.setDate(
    inicioPrimeiraSemana.getDate() +
      (semana - 1) * 7
  );

  const fimSemana =
    new Date(inicioSemana);

  fimSemana.setDate(
    inicioSemana.getDate() + 6
  );

  const formatador =
    new Intl.DateTimeFormat("pt-BR");

  return {
    inicio: formatador.format(inicioSemana),
    fim: formatador.format(fimSemana),
  };
}


// ======================================================
// FORMATAÇÃO DOS NÚMEROS
// ======================================================

function formatarNumero(valor, casas = 0) {
  if (
    valor === null ||
    valor === undefined ||
    valor === "" ||
    Number.isNaN(Number(valor))
  ) {
    return "Não informado";
  }

  return Number(valor).toLocaleString(
    "pt-BR",
    {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas,
    }
  );
}


// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

function ConsultaRegiao() {
  const [cep, setCep] = useState("");

  const [resultado, setResultado] =
    useState(null);

  const [carregando, setCarregando] =
    useState(false);

  const [erro, setErro] =
    useState("");

  const [modalAberto, setModalAberto] =
    useState(false);

  const [tooltipAberto, setTooltipAberto] =
    useState(null);


  // ====================================================
  // FECHAR MODAL COM ESC
  // ====================================================

  useEffect(() => {
    function fecharComEsc(event) {
      if (event.key === "Escape") {
        setModalAberto(false);
        setTooltipAberto(null);
      }
    }

    if (modalAberto) {
      document.addEventListener(
        "keydown",
        fecharComEsc
      );

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        fecharComEsc
      );

      document.body.style.overflow = "";
    };
  }, [modalAberto]);


  // ====================================================
  // FORMATAÇÃO DO CEP
  // ====================================================

  function formatarCep(valor) {
    const numeros = valor
      .replace(/\D/g, "")
      .slice(0, 8);

    if (numeros.length > 5) {
      return `${numeros.slice(
        0,
        5
      )}-${numeros.slice(5)}`;
    }

    return numeros;
  }


  // ====================================================
  // CONSULTA
  // ====================================================

  async function verificarRegiao() {
    setErro("");
    setResultado(null);
    setModalAberto(false);
    setTooltipAberto(null);

    const cepLimpo =
      cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setErro(
        "Por favor, digite um CEP válido com 8 dígitos."
      );

      return;
    }

    setCarregando(true);

    try {
      // Consulta ViaCEP
      const endereco =
        await buscarEnderecoPorCep(
          cepLimpo
        );

      const codigoIbge =
        endereco.ibge;

      // Consulta InfoDengue
      const dadosDengue =
        await buscarDadosDengueMaisRecentes(
          codigoIbge
        );

      let periodoDados = null;
      let semanaEpidemiologica = null;
      let anoEpidemiologico = null;

      if (dadosDengue) {
        const codigoSE = String(
          dadosDengue.SE ??
          dadosDengue.se
        );

        anoEpidemiologico =
          Number(
            codigoSE.slice(0, 4)
          );

        semanaEpidemiologica =
          Number(
            codigoSE.slice(-2)
          );

        periodoDados =
          obterPeriodoSemanaEpidemiologica(
            anoEpidemiologico,
            semanaEpidemiologica
          );
      }

      setResultado({
        bairro:
          endereco.bairro ||
          "Região geral",

        cidade:
          endereco.localidade,

        uf:
          endereco.uf,

        codigoIbge,

        dengue:
          dadosDengue,

        semanaEpidemiologica,
        anoEpidemiologico,
        periodoDados,
      });

      setModalAberto(true);

    } catch (error) {
      console.error(
        "Erro durante a consulta:",
        error
      );

      if (
        error.message ===
        "CEP_NAO_ENCONTRADO"
      ) {
        setErro(
          "CEP não encontrado na base de dados."
        );

      } else if (
        error.message ===
        "CEP_INVALIDO"
      ) {
        setErro(
          "Digite um CEP válido."
        );

      } else if (
        error.message?.startsWith(
          "INFODENGUE"
        )
      ) {
        setErro(
          "O município foi identificado, mas não foi possível consultar os dados do InfoDengue."
        );

      } else {
        setErro(
          "Não foi possível concluir a consulta neste momento."
        );
      }

    } finally {
      setCarregando(false);
    }
  }


  // ======================================================
  // INTERFACE
  // ======================================================

  return (
    <>
      <section
        id="epidemiologia"
        className="card-secao secao-epidemiologia"
      >

        <div className="titulo-secao">

          <div className="icone-secao">
            🌍
          </div>

          <div>

            <h2>
              Situação Epidemiológica na sua Região
            </h2>

            <p>
              Consulte os dados epidemiológicos
              mais recentes disponíveis para o
              seu município.
            </p>

          </div>

        </div>


        {/* CONSULTA DO CEP */}

        <div className="cep-box">

          <input
            type="text"
            value={cep}
            placeholder="Digite seu CEP (ex: 20000-000)"
            maxLength="9"
            aria-label="CEP"

            onChange={(event) =>
              setCep(
                formatarCep(
                  event.target.value
                )
              )
            }

            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                verificarRegiao();
              }
            }}
          />


          <button
            type="button"
            onClick={verificarRegiao}
            disabled={carregando}
          >

            {carregando
              ? "Consultando..."
              : "Consultar Região"}

          </button>

        </div>


        {/* ERRO */}

        {erro && (

          <div
            className="mensagem-erro"
            role="alert"
          >
            ⚠️ {erro}
          </div>

        )}

      </section>


      {/* ==================================================
          MODAL DO RESULTADO EPIDEMIOLÓGICO
      ================================================== */}

      {resultado && modalAberto && (

        <div
          className="modal-epidemiologia-overlay"
          role="presentation"

          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setModalAberto(false);
              setTooltipAberto(null);
            }
          }}
        >

          <div
            className="modal-epidemiologia"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-epidemiologia"
          >

            <div className="modal-epidemiologia-barra" />


            {/* BOTÃO X */}

            <button
              type="button"
              className="modal-epidemiologia-fechar"

              onClick={() => {
                setModalAberto(false);
                setTooltipAberto(null);
              }}

              aria-label="Fechar resultado epidemiológico"
            >
              ×
            </button>


            {/* CABEÇALHO */}

            <div className="modal-epidemiologia-cabecalho">

              <div className="modal-epidemiologia-icone">
                🌍
              </div>

              <div>

                <span className="modal-epidemiologia-rotulo">
                  CONSULTA CONCLUÍDA
                </span>

                <h2 id="titulo-modal-epidemiologia">
                  Situação Epidemiológica
                </h2>

                <p>
                  Dados mais recentes disponíveis
                  para a região consultada.
                </p>

              </div>

            </div>


            {/* LOCALIZAÇÃO */}

            <div className="modal-localizacao">

              <div className="modal-localizacao-principal">

                <span className="rotulo-resultado">
                  📍 LOCALIZAÇÃO
                </span>

                <h3>
                  {resultado.cidade}
                  {" - "}
                  {resultado.uf}
                </h3>

                <p>
                  {resultado.bairro}
                </p>

              </div>


              {resultado.periodoDados && (

                <div className="periodo-dados">

                  <span>
                    📅 Dados referentes a
                  </span>

                  <strong>
                    {
                      resultado
                        .periodoDados
                        .inicio
                    }

                    {" a "}

                    {
                      resultado
                        .periodoDados
                        .fim
                    }
                  </strong>

                  <small>
                    Semana Epidemiológica{" "}
                    {
                      resultado
                        .semanaEpidemiologica
                    }
                    /
                    {
                      resultado
                        .anoEpidemiologico
                    }
                  </small>

                </div>

              )}

            </div>


            {resultado.dengue ? (

              <>

                {/* =====================================
                    SITUAÇÃO EPIDEMIOLÓGICA
                ===================================== */}

                <div className="modal-epidemiologia-secao">

                  <div className="modal-secao-titulo">

                    <span>
                      📊
                    </span>

                    <div>
                      <small>
                        MONITORAMENTO
                      </small>

                      <h3>
                        Situação Epidemiológica
                      </h3>
                    </div>

                  </div>


                  <div className="alerta-epidemiologico">

                    <span className="alerta-emoji">
                      {
                        interpretarNivel(
                          resultado.dengue.nivel
                        ).emoji
                      }
                    </span>


                    <div className="indicador-conteudo">

                      <div className="rotulo-com-ajuda">

                        <span className="alerta-label">
                          Nível de alerta
                        </span>


                        <div
                          className="ajuda-indicador"

                          onMouseEnter={() =>
                            setTooltipAberto(
                              "alerta"
                            )
                          }

                          onMouseLeave={() =>
                            setTooltipAberto(
                              null
                            )
                          }
                        >

                          <button
                            type="button"
                            className="botao-ajuda"

                            aria-label="Entenda o nível de alerta"

                            aria-expanded={
                              tooltipAberto ===
                              "alerta"
                            }

                            onClick={() =>
                              setTooltipAberto(
                                tooltipAberto ===
                                  "alerta"
                                  ? null
                                  : "alerta"
                              )
                            }

                            onFocus={() =>
                              setTooltipAberto(
                                "alerta"
                              )
                            }

                            onBlur={() =>
                              setTooltipAberto(
                                null
                              )
                            }
                          >
                            i
                          </button>


                          {tooltipAberto ===
                            "alerta" && (

                            <div
                              className="tooltip-cientifico"
                              role="tooltip"
                            >

                              <span className="tooltip-tag">
                                INDICADOR INFODENGUE
                              </span>

                              <strong>
                                Sobre o nível de alerta
                              </strong>

                              <p>
                                A classificação apresentada
                                utiliza o nível informado pelo
                                InfoDengue para a semana
                                epidemiológica consultada.
                              </p>

                              <p className="tooltip-nota">
                                Ela deve ser interpretada junto
                                aos demais indicadores
                                epidemiológicos apresentados.
                              </p>

                            </div>

                          )}

                        </div>

                      </div>


                      <strong>
                        {
                          interpretarNivel(
                            resultado.dengue.nivel
                          ).nome
                        }
                      </strong>

                      <p>
                        {
                          interpretarNivel(
                            resultado.dengue.nivel
                          ).descricao
                        }
                      </p>

                    </div>

                  </div>


                  <div className="grade-indicadores">

                    <div className="indicador-card">

                      <span>
                        Casos notificados
                      </span>

                      <strong>
                        {formatarNumero(
                          resultado.dengue.casos
                        )}
                      </strong>

                      <small>
                        na semana epidemiológica
                      </small>

                    </div>


                    <div className="indicador-card">

                      <span>
                        Casos estimados
                      </span>

                      <strong>
                        {formatarNumero(
                          resultado.dengue.casos_est
                        )}
                      </strong>

                      <small>
                        estimativa InfoDengue
                      </small>

                    </div>


                    <div className="indicador-card">

                      <span>
                        Incidência
                      </span>

                      <strong>
                        {formatarNumero(
                          resultado.dengue.p_inc100k ??
                          resultado.dengue.inc,
                          1
                        )}
                      </strong>

                      <small>
                        por 100 mil habitantes
                      </small>

                    </div>

                  </div>

                </div>


                {/* =====================================
                    CONDIÇÕES CLIMÁTICAS
                ===================================== */}

                <div className="modal-epidemiologia-secao modal-secao-clima">

                  <div className="modal-secao-titulo">

                    <span>
                      🌦️
                    </span>

                    <div>

                      <small>
                        AMBIENTE
                      </small>

                      <h3>
                        Condições Climáticas
                        para Transmissão
                      </h3>

                      <p>
                        Indicadores ambientais
                        correspondentes ao período
                        epidemiológico consultado.
                      </p>

                    </div>

                  </div>


                  {/* RECEPTIVIDADE CLIMÁTICA */}

                  <div
                    className={`interpretacao-climatica ${
                      interpretarReceptividade(
                        resultado.dengue.receptivo
                      ).classe
                    }`}
                  >

                    <span className="clima-status-emoji">
                      {
                        interpretarReceptividade(
                          resultado.dengue.receptivo
                        ).emoji
                      }
                    </span>


                    <div className="indicador-conteudo">

                      <div className="rotulo-com-ajuda">

                        <span className="clima-status-label">
                          Receptividade climática
                        </span>


                        <div
                          className="ajuda-indicador"

                          onMouseEnter={() =>
                            setTooltipAberto(
                              "receptividade"
                            )
                          }

                          onMouseLeave={() =>
                            setTooltipAberto(
                              null
                            )
                          }
                        >

                          <button
                            type="button"
                            className="botao-ajuda"

                            aria-label="Entenda a receptividade climática"

                            aria-expanded={
                              tooltipAberto ===
                              "receptividade"
                            }

                            onClick={() =>
                              setTooltipAberto(
                                tooltipAberto ===
                                  "receptividade"
                                  ? null
                                  : "receptividade"
                              )
                            }

                            onFocus={() =>
                              setTooltipAberto(
                                "receptividade"
                              )
                            }

                            onBlur={() =>
                              setTooltipAberto(
                                null
                              )
                            }
                          >
                            i
                          </button>


                          {tooltipAberto ===
                            "receptividade" && (

                            <div
                              className="tooltip-cientifico tooltip-clima"
                              role="tooltip"
                            >

                              <span className="tooltip-tag">
                                INDICADOR INFODENGUE
                              </span>

                              <strong>
                                Como interpretar?
                              </strong>

                              <p>
                                A classificação de
                                receptividade climática
                                apresentada é fornecida pelo
                                InfoDengue para a semana
                                epidemiológica consultada.
                              </p>

                              <div className="tooltip-destaque">
                                <span>🌡️</span>

                                <p>
                                  Temperatura e umidade são
                                  informações ambientais
                                  complementares e,
                                  isoladamente, não determinam
                                  esta classificação.
                                </p>
                              </div>

                            </div>

                          )}

                        </div>

                      </div>


                      <strong>
                        {
                          interpretarReceptividade(
                            resultado.dengue.receptivo
                          ).titulo
                        }
                      </strong>

                      <p>
                        {
                          interpretarReceptividade(
                            resultado.dengue.receptivo
                          ).descricao
                        }
                      </p>

                    </div>

                  </div>


                  {/* CONDIÇÕES OBSERVADAS */}

                  <div className="condicoes-observadas">

                    <div className="condicoes-observadas-cabecalho">

                      <div>
                        <span>
                          DADOS AMBIENTAIS
                        </span>

                        <h4>
                          Condições observadas no período
                        </h4>
                      </div>

                      <span className="selo-complementar">
                        Informação complementar
                      </span>

                    </div>


                    <div className="grade-clima">

                      <div className="clima-card">

                        <span className="clima-icone">
                          🌡️
                        </span>

                        <div>

                          <span>
                            Temperatura média
                          </span>

                          <strong>
                            {
                              resultado
                                .dengue
                                .tempmed != null

                                ? `${formatarNumero(
                                    resultado
                                      .dengue
                                      .tempmed,
                                    1
                                  )} °C`

                                : "Não informada"
                            }
                          </strong>

                        </div>

                      </div>


                      <div className="clima-card">

                        <span className="clima-icone">
                          💧
                        </span>

                        <div>

                          <span>
                            Umidade média
                          </span>

                          <strong>
                            {
                              resultado
                                .dengue
                                .umidmed != null

                                ? `${formatarNumero(
                                    resultado
                                      .dengue
                                      .umidmed,
                                    1
                                  )}%`

                                : "Não informada"
                            }
                          </strong>

                        </div>

                      </div>

                    </div>


                    <p className="nota-condicoes-observadas">
                      <span>ⓘ</span>

                      Estes valores descrevem as
                      condições ambientais observadas
                      no período e não devem ser
                      utilizados isoladamente para
                      interpretar a receptividade
                      climática.
                    </p>

                  </div>

                </div>


                {/* =====================================
                    FONTE
                ===================================== */}

                <div className="modal-epidemiologia-fonte">

                  <span className="modal-fonte-icone">
                    ℹ️
                  </span>

                  <div>

                    <strong>
                      Sobre estes dados
                    </strong>

                    <p>
                      Dados epidemiológicos,
                      ambientais e indicador de
                      receptividade climática:
                      InfoDengue. Localização do
                      município: ViaCEP. As
                      informações correspondem à
                      semana epidemiológica mais
                      recente disponível.
                    </p>

                  </div>

                </div>

              </>

            ) : (

              <div className="sem-dados">

                <strong>
                  ⚠️ Dados epidemiológicos
                  indisponíveis
                </strong>

                <p>
                  Não foram encontrados dados
                  recentes do InfoDengue para
                  o município consultado.
                </p>

              </div>

            )}


            {/* RODAPÉ DO MODAL */}

            <div className="modal-epidemiologia-rodape">

              <div className="modal-atualizacao">
                <span>●</span>
                Consulta realizada com dados públicos
              </div>

              <button
                type="button"
                className="btn-fechar-epidemiologia"

                onClick={() => {
                  setModalAberto(false);
                  setTooltipAberto(null);
                }}
              >
                Fechar resultado
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default ConsultaRegiao;

