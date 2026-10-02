import { useState } from "react";
import InformacoesLegais from "./InformacoesLegais";

const recursos = [
  {
    id: "epidemiologia",
    numero: "01",
    icone: "🌎",
    titulo: "Epidemiologia",
    descricao:
      "Consulte os dados mais recentes de dengue disponíveis para o seu município.",
    acao: "Consultar região",
    classe: "card-azul",
  },

  {
    id: "dados-oficiais",
    numero: "02",
    icone: "📊",
    titulo: "Dados oficiais",
    descricao:
      "Entenda de onde vêm as informações epidemiológicas e como são utilizadas.",
    acao: "Conhecer as fontes",
    classe: "card-ciano",
  },

  {
    id: "triagem",
    numero: "03",
    icone: "🩺",
    titulo: "Triagem de sintomas",
    descricao:
      "Informe sintomas e identifique sinais que indicam necessidade de avaliação profissional.",
    acao: "Iniciar triagem",
    classe: "card-violeta",
  },
];

function VisaoGeral() {
  const [
    informacoesAbertas,
    setInformacoesAbertas,
  ] = useState(false);

  function navegarPara(id) {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <>
      <section
        className="visao-geral"
        aria-labelledby="titulo-visao-geral"
      >
        <div className="cabecalho-secao">
          <div>
            <span className="eyebrow">
              VISÃO GERAL
            </span>

            <h2 id="titulo-visao-geral">
              Tudo o que você precisa em um só lugar
            </h2>

            <p>
              Acesse rapidamente as principais
              funcionalidades do DengueGuard.
            </p>
          </div>

          <div className="cabecalho-visao-acoes">
            <button
              type="button"
              className="btn-informacoes-legais"
              onClick={() =>
                setInformacoesAbertas(true)
              }
            >
              <span className="btn-informacoes-icone">
                ⓘ
              </span>

              <span>
                Privacidade, fontes e termos
              </span>
            </button>

            <div className="cabecalho-decoracao">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="grade-visao-geral">
          {recursos.map((recurso) => (
            <button
              key={recurso.id}
              type="button"
              className={`card-visao ${recurso.classe}`}
              onClick={() =>
                navegarPara(recurso.id)
              }
            >
              <div className="card-visao-topo">
                <div className="card-visao-icone">
                  {recurso.icone}
                </div>

                <span className="card-visao-numero">
                  {recurso.numero}
                </span>
              </div>

              <div className="card-visao-conteudo">
                <h3>
                  {recurso.titulo}
                </h3>

                <p>
                  {recurso.descricao}
                </p>
              </div>

              <div className="card-visao-acao">
                <span>
                  {recurso.acao}
                </span>

                <span className="seta-card">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {informacoesAbertas && (
        <InformacoesLegais
          onClose={() =>
            setInformacoesAbertas(false)
          }
        />
      )}
    </>
  );
}

export default VisaoGeral;