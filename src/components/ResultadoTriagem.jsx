import { useEffect } from "react";
import { gerarRelatorioPDF } from "../utils/gerarRelatorioPDF";

function ResultadoTriagem({ resultado, onClose }) {
  const { classificacao, sintomas, data } = resultado;

  const configuracoes = {
    vermelho: {
      classe: "resultado-vermelho",
      icone: "🚨",
      rotulo: "ATENÇÃO NECESSÁRIA",
      titulo: "Sinais de alarme identificados",
      descricao:
        "Foram relatados um ou mais sinais que justificam avaliação profissional com prioridade.",
    },

    amarelo: {
      classe: "resultado-amarelo",
      icone: "⚠️",
      rotulo: "ATENÇÃO",
      titulo: "Sintomas compatíveis com quadro suspeito",
      descricao:
        "Foram relatados múltiplos sintomas que podem ocorrer em quadros de dengue.",
    },

    verde: {
      classe: "resultado-verde",
      icone: "✓",
      rotulo: "RESULTADO DA TRIAGEM",
      titulo: "Poucos sintomas específicos relatados",
      descricao:
        "Foram relatados poucos sintomas específicos nesta triagem.",
    },
  };

  const config = configuracoes[classificacao];

  useEffect(() => {
    const teclaEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", teclaEsc);

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        teclaEsc
      );

      document.body.style.overflow =
        overflowAnterior;
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={`modal-triagem ${config.classe}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-resultado-triagem"
        aria-describedby="descricao-resultado-triagem"
      >
        <div className="modal-barra-status"></div>

        <button
          type="button"
          className="modal-fechar"
          onClick={onClose}
          aria-label="Fechar resultado da triagem"
        >
          ×
        </button>

        <div className="modal-conteudo">
          <div className="resultado-cabecalho">
            <div className="resultado-icone">
              {config.icone}
            </div>

            <div>
              <span className="resultado-rotulo">
                {config.rotulo}
              </span>

              <h2 id="titulo-resultado-triagem">
                {config.titulo}
              </h2>

              <p id="descricao-resultado-triagem">
                {config.descricao}
              </p>
            </div>
          </div>

          {classificacao === "vermelho" && (
            <div className="orientacao-resultado orientacao-urgente">
              <div className="orientacao-icone">
                🏥
              </div>

              <div>
                <strong>
                  O que fazer agora?
                </strong>

                <p>
                  Procure uma unidade de saúde para
                  avaliação clínica. A presença de sinais
                  de alarme merece atenção profissional.
                </p>
              </div>
            </div>
          )}

          {classificacao === "amarelo" && (
            <div className="orientacao-resultado orientacao-atencao">
              <div className="orientacao-icone">
                💧
              </div>

              <div>
                <strong>
                  Cuide-se e acompanhe os sintomas
                </strong>

                <p>
                  Mantenha hidratação adequada e procure
                  avaliação profissional caso os sintomas
                  persistam, piorem ou novos sinais apareçam.
                </p>
              </div>
            </div>
          )}

          {classificacao === "verde" && (
            <div className="orientacao-resultado orientacao-observacao">
              <div className="orientacao-icone">
                👁️
              </div>

              <div>
                <strong>
                  Continue observando
                </strong>

                <p>
                  Acompanhe sua condição e procure atendimento
                  caso haja piora ou apareçam novos sintomas.
                </p>
              </div>
            </div>
          )}

          {sintomas.length > 0 && (
            <div className="resultado-sintomas">
              <div className="resultado-sintomas-titulo">
                <div>
                  <span>
                    SINTOMAS INFORMADOS
                  </span>

                  <h3>
                    Resumo da sua seleção
                  </h3>
                </div>

                <span className="quantidade-sintomas">
                  {sintomas.length}
                </span>
              </div>

              <ul>
                {sintomas.map((sintoma) => (
                  <li key={sintoma}>
                    <span className="sintoma-check">
                      ✓
                    </span>

                    <span>
                      {sintoma}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-acoes">
            <button
              type="button"
              className="btn-fechar-resultado"
              onClick={onClose}
            >
              Voltar para a triagem
            </button>

            {classificacao !== "verde" && (
              <button
                type="button"
                className="btn-pdf-modal"
                onClick={() => {
                  console.log("BOTÃO PDF CLICADO");

                  console.log("Dados enviados:", {
                    sintomas,
                    data,
                    classificacao,
                  });

                  gerarRelatorioPDF({
                    sintomas,
                    data,
                    classificacao,
                  });

              console.log("Função gerarRelatorioPDF executada");
          }}
              >
                <span>📄</span>

                Gerar resumo da triagem
              </button>
            )}
          </div>

          <div className="aviso-medico-modal">
            <span>ⓘ</span>

            <p>
              Esta ferramenta possui caráter informativo,
              não realiza diagnóstico médico e não substitui
              avaliação por profissional de saúde.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResultadoTriagem;