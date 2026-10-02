import { useState } from "react";
import ResultadoTriagem from "./ResultadoTriagem";

const sintomas = [
  {
    id: "febre",
    nome: "Febre alta súbita (> 38.5°C)",
  },
  {
    id: "corpo",
    nome: "Dores intensas nos músculos e articulações",
  },
  {
    id: "olhos",
    nome: "Dor atrás dos olhos",
  },
  {
    id: "manchas",
    nome: "Manchas vermelhas na pele (exantema)",
  },
  {
    id: "cabeca",
    nome: "Dor de cabeça intensa",
  },
  {
    id: "alarme_dor_abdominal",
    nome: "Dor abdominal intensa e contínua",
  },
  {
    id: "alarme_vomito",
    nome: "Vômitos persistentes",
  },
  {
    id: "alarme_sangue",
    nome: "Sangramento de nariz, gengiva ou fezes",
  },
  {
    id: "alarme_letargia",
    nome: "Tontura severa, desmaio ou muita sonolência",
  },
  {
    id: "alarme_respiracao",
    nome: "Dificuldade para respirar",
  },
];

function TriagemSintomas() {
  const [selecionados, setSelecionados] = useState([]);
  const [resultado, setResultado] = useState(null);

  function alterarSintoma(id) {
    setSelecionados((anteriores) => {
      if (anteriores.includes(id)) {
        return anteriores.filter(
          (sintoma) => sintoma !== id
        );
      }

      return [...anteriores, id];
    });

    setResultado(null);
  }

  function executarTriagem() {
    const temAlarme = selecionados.some((id) =>
      id.startsWith("alarme_")
    );

    const quantidadeComuns = selecionados.filter(
      (id) => !id.startsWith("alarme_")
    ).length;

    const sintomasSelecionados = sintomas
      .filter((sintoma) =>
        selecionados.includes(sintoma.id)
      )
      .map((sintoma) => sintoma.nome);

    let classificacao;

    if (temAlarme) {
      classificacao = "vermelho";
    } else if (quantidadeComuns >= 2) {
      classificacao = "amarelo";
    } else {
      classificacao = "verde";
    }

    setResultado({
      classificacao,
      sintomas: sintomasSelecionados,
      data: new Date().toLocaleDateString("pt-BR"),
    });
  }

  function fecharResultado() {
    setResultado(null);
  }

  function limparTriagem() {
    setSelecionados([]);
    setResultado(null);
  }

  return (
    <>
      <section
        id="triagem"
        className="card-secao secao-triagem"
      >
        <div className="triagem-cabecalho">
          <div className="triagem-icone">
            🩺
          </div>

          <div>
            <span className="eyebrow">
              TRIAGEM EDUCATIVA
            </span>

            <h2>
              Como você está se sentindo?
            </h2>

            <p>
              Selecione os sintomas que você apresentou
              recentemente. Você pode marcar mais de uma opção.
            </p>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            executarTriagem();
          }}
        >
          <div className="triagem-instrucao">
            <div>
              <span className="triagem-instrucao-icone">
                ✨
              </span>

              <div>
                <strong>
                  Selecione seus sintomas
                </strong>

                <span>
                  Marque todas as opções que correspondem
                  ao que você está sentindo.
                </span>
              </div>
            </div>

            <span className="contador-sintomas">
              {selecionados.length} selecionado
              {selecionados.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grade-sintomas">
            {sintomas.map((sintoma) => {
              const selecionado =
                selecionados.includes(sintoma.id);

              return (
                <label
                  key={sintoma.id}
                  className={`sintoma-card ${
                    selecionado
                      ? "sintoma-selecionado"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selecionado}
                    onChange={() =>
                      alterarSintoma(sintoma.id)
                    }
                  />

                  <span className="checkbox-personalizado">
                    {selecionado ? "✓" : ""}
                  </span>

                  <span className="sintoma-nome">
                    {sintoma.nome}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="triagem-rodape">
            <div className="triagem-privacidade">
              <span>🔒</span>

              <p>
                As informações selecionadas são utilizadas
                somente para gerar o resultado desta triagem.
              </p>
            </div>

            <div className="triagem-acoes">
              {selecionados.length > 0 && (
                <button
                  type="button"
                  className="btn-limpar-triagem"
                  onClick={limparTriagem}
                >
                  Limpar
                </button>
              )}

              <button
                type="submit"
                className="btn-avaliar"
                disabled={selecionados.length === 0}
              >
                <span>
                  Analisar sintomas
                </span>

                <span>
                  →
                </span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {resultado && (
        <ResultadoTriagem
          resultado={resultado}
          onClose={fecharResultado}
        />
      )}
    </>
  );
}

export default TriagemSintomas;