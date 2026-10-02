import { useEffect } from "react";

function InformacoesLegais({ onClose }) {
  useEffect(() => {
    function fecharComEsc(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const overflowAnterior =
      document.body.style.overflow;

    document.addEventListener(
      "keydown",
      fecharComEsc
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        fecharComEsc
      );

      document.body.style.overflow =
        overflowAnterior;
    };
  }, [onClose]);

  return (
    <div
      className="modal-legal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="modal-legal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-informacoes-legais"
      >
        <div className="modal-legal-barra" />

        <button
          type="button"
          className="modal-legal-fechar"
          onClick={onClose}
          aria-label="Fechar informações"
        >
          ×
        </button>

        <div className="modal-legal-conteudo">

          {/* CABEÇALHO */}

          <div className="legal-cabecalho">
            <div className="legal-icone-principal">
              🛡️
            </div>

            <div>
              <span className="legal-eyebrow">
                TRANSPARÊNCIA E SEGURANÇA
              </span>

              <h2 id="titulo-informacoes-legais">
                Privacidade, fontes e termos
              </h2>

              <p>
                Saiba como o DengueGuard utiliza as
                informações, de onde vêm os dados e quais
                são os limites desta ferramenta.
              </p>
            </div>
          </div>

          {/* AVISO PRINCIPAL */}

          <div className="legal-destaque">
            <span>ⓘ</span>

            <p>
              O DengueGuard foi desenvolvido como uma
              ferramenta educativa, informativa e auxiliar.
              Ele não realiza diagnóstico médico e não
              substitui consulta, avaliação clínica ou
              orientação de profissional de saúde.
            </p>
          </div>

          {/* SOBRE */}

          <article className="legal-bloco">
            <div className="legal-bloco-icone legal-azul">
              🩺
            </div>

            <div>
              <span className="legal-bloco-rotulo">
                SOBRE A FERRAMENTA
              </span>

              <h3>
                Apoio informativo, não diagnóstico
              </h3>

              <p>
                A triagem do DengueGuard considera
                exclusivamente os sintomas selecionados
                pelo próprio usuário e apresenta uma
                orientação geral a partir dessas
                informações.
              </p>

              <p>
                O resultado não constitui diagnóstico,
                consulta, prescrição, laudo, prontuário,
                atestado ou qualquer outro documento
                médico e não estabelece relação
                profissional-paciente.
              </p>

              <p>
                Diante de agravamento dos sintomas,
                persistência do quadro ou presença de
                sinais de alarme, recomenda-se procurar
                avaliação em um serviço de saúde.
              </p>
            </div>
          </article>

          {/* PRIVACIDADE */}

          <article className="legal-bloco">
            <div className="legal-bloco-icone legal-verde">
              🔒
            </div>

            <div>
              <span className="legal-bloco-rotulo">
                PRIVACIDADE E PROTEÇÃO DE DADOS
              </span>

              <h3>
                Minimização de informações
              </h3>

              <p>
                A triagem foi estruturada sem solicitar
                nome, CPF, telefone, e-mail ou outros
                dados diretamente identificadores para
                realizar a análise dos sintomas.
              </p>

              <p>
                Na versão atual da ferramenta, os sintomas
                selecionados são utilizados no próprio
                funcionamento da aplicação para calcular
                o resultado da triagem e gerar o resumo
                solicitado pelo usuário.
              </p>

              <p>
                O DengueGuard busca adotar uma abordagem
                de minimização de dados, limitando a
                utilização das informações ao necessário
                para o funcionamento das funcionalidades
                apresentadas.
              </p>

              <div className="legal-nota">
                <strong>
                  Lei Geral de Proteção de Dados
                </strong>

                <p>
                  A Lei nº 13.709/2018 (LGPD) estabelece
                  regras para o tratamento de dados
                  pessoais e prevê proteção especial para
                  dados referentes à saúde quando
                  relacionados a uma pessoa natural.
                  Princípios como finalidade, adequação,
                  necessidade, transparência, segurança
                  e prevenção orientam o tratamento
                  responsável dessas informações.
                </p>
              </div>
            </div>
          </article>

          {/* FONTES */}

          <article className="legal-bloco">
            <div className="legal-bloco-icone legal-ciano">
              📊
            </div>

            <div className="legal-bloco-conteudo">
              <span className="legal-bloco-rotulo">
                FONTES E CRÉDITOS
              </span>

              <h3>
                De onde vêm os dados?
              </h3>

              <p>
                O DengueGuard integra serviços externos
                para identificar o município consultado e
                apresentar informações epidemiológicas
                disponíveis.
              </p>

              <div className="legal-fontes">

                {/* INFODENGUE */}

                <div className="legal-fonte-card">
                  <div className="legal-fonte-topo">
                    <div className="legal-fonte-icone">
                      🦟
                    </div>

                    <span>
                      DADOS EPIDEMIOLÓGICOS
                    </span>
                  </div>

                  <h4>
                    InfoDengue / AlertaDengue
                  </h4>

                  <p>
                    Os indicadores epidemiológicos,
                    ambientais e de receptividade
                    utilizados na consulta regional são
                    obtidos por meio dos serviços
                    disponibilizados pelo InfoDengue.
                  </p>

                  <p>
                    O InfoDengue é fruto de parceria entre
                    a Fundação Oswaldo Cruz (Fiocruz) e a
                    Escola de Matemática Aplicada da
                    Fundação Getulio Vargas (EMAp/FGV),
                    com participação de uma rede
                    multidisciplinar dedicada à vigilância
                    de arboviroses.
                  </p>

                  <a
                    href="https://info.dengue.mat.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar InfoDengue ↗
                  </a>

                  <a
                    href="https://info.dengue.mat.br/equipe/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conhecer projeto e equipe ↗
                  </a>
                </div>

                {/* VIACEP */}

                <div className="legal-fonte-card">
                  <div className="legal-fonte-topo">
                    <div className="legal-fonte-icone">
                      📍
                    </div>

                    <span>
                      LOCALIZAÇÃO
                    </span>
                  </div>

                  <h4>
                    ViaCEP
                  </h4>

                  <p>
                    O ViaCEP é utilizado para consultar o
                    CEP informado e obter informações
                    necessárias à identificação do
                    município, incluindo o respectivo
                    código IBGE utilizado pela consulta
                    epidemiológica.
                  </p>

                  <p>
                    O ViaCEP disponibiliza um webservice
                    gratuito para consulta de Códigos de
                    Endereçamento Postal do Brasil.
                  </p>

                  <a
                    href="https://viacep.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar ViaCEP ↗
                  </a>
                </div>

              </div>

              <div className="legal-credito-aviso">
                <span>ℹ️</span>

                <p>
                  A referência às instituições e serviços
                  externos tem finalidade de atribuição e
                  transparência das fontes utilizadas.
                  Não implica participação, certificação,
                  aprovação ou endosso do DengueGuard por
                  essas instituições.
                </p>
              </div>
            </div>
          </article>

          {/* DADOS EPIDEMIOLÓGICOS */}

          <article className="legal-bloco">
            <div className="legal-bloco-icone legal-laranja">
              🔄
            </div>

            <div>
              <span className="legal-bloco-rotulo">
                ATUALIZAÇÃO DOS DADOS
              </span>

              <h3>
                Informações sujeitas a revisão
              </h3>

              <p>
                Os dados epidemiológicos apresentados
                correspondem às informações mais recentes
                encontradas pela aplicação na fonte
                consultada.
              </p>

              <p>
                Dados de vigilância epidemiológica podem
                ser atualizados ou revisados posteriormente.
                Por isso, valores apresentados em momentos
                diferentes podem sofrer alterações.
              </p>
            </div>
          </article>

          {/* REFERÊNCIAS */}

          <article className="legal-bloco">
            <div className="legal-bloco-icone legal-violeta">
              ⚖️
            </div>

            <div>
              <span className="legal-bloco-rotulo">
                REFERÊNCIAS
              </span>

              <h3>
                Proteção de dados e transparência
              </h3>

              <p>
                Entre as referências consideradas para a
                política de transparência e privacidade
                da ferramenta está a Lei nº 13.709, de
                14 de agosto de 2018 — Lei Geral de
                Proteção de Dados Pessoais (LGPD).
              </p>

              <a
                className="legal-link-destaque"
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar texto oficial da LGPD ↗
              </a>
            </div>
          </article>

          {/* RESPONSABILIDADE */}

          <div className="legal-responsabilidade">
            <span>⚕️</span>

            <div>
              <strong>
                Uso responsável
              </strong>

              <p>
                As informações apresentadas pelo
                DengueGuard destinam-se a apoio educativo
                e informativo. Em situações de urgência,
                agravamento clínico ou sinais de alarme,
                procure atendimento de saúde.
              </p>
            </div>
          </div>

          {/* RODAPÉ */}

          <div className="legal-rodape">
            <div>
              <span className="legal-status-ponto" />

              <span>
                Transparência • Privacidade • Uso responsável
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
            >
              Entendi
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}

export default InformacoesLegais;