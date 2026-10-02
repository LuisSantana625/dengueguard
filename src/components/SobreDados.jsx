function SobreDados() {
  return (
    <section
      id="dados-oficiais"
      className="secao-dados-oficiais"
    >
      <div className="dados-oficiais-intro">
        <span className="eyebrow">
          TRANSPARÊNCIA DOS DADOS
        </span>

        <h2>
          Informação pública transformada em
          informação compreensível
        </h2>

        <p>
          O DengueGuard combina serviços públicos
          distintos para identificar a localização
          informada e apresentar dados epidemiológicos
          disponíveis para o município.
        </p>
      </div>

      <div className="grade-fontes">
        <article className="fonte-card">
          <div className="fonte-card-topo">
            <div className="fonte-icone">
              📍
            </div>

            <span className="fonte-tag">
              LOCALIZAÇÃO
            </span>
          </div>

          <h3>ViaCEP</h3>

          <p>
            Utilizado para identificar município,
            estado, bairro e código IBGE a partir
            do CEP informado pelo usuário.
          </p>

          <div className="fonte-fluxo">
            <span>CEP</span>
            <span>→</span>
            <span>Município</span>
            <span>→</span>
            <span>IBGE</span>
          </div>
        </article>

        <article className="fonte-card fonte-card-destaque">
          <div className="fonte-card-topo">
            <div className="fonte-icone">
              📈
            </div>

            <span className="fonte-tag">
              EPIDEMIOLOGIA
            </span>
          </div>

          <h3>InfoDengue</h3>

          <p>
            Fonte dos indicadores epidemiológicos
            apresentados pelo sistema, incluindo
            informações relacionadas à transmissão
            e condições ambientais disponibilizadas
            pela plataforma.
          </p>

          <div className="fonte-fluxo">
            <span>IBGE</span>
            <span>→</span>
            <span>Dados</span>
            <span>→</span>
            <span>Dashboard</span>
          </div>
        </article>
      </div>

      <div className="nota-dados">
        <div className="nota-dados-icone">
          ℹ️
        </div>

        <div>
          <strong>
            Sobre a atualização
          </strong>

          <p>
            A aplicação procura apresentar a semana
            epidemiológica mais recente disponível na
            fonte consultada. Por isso, a referência dos
            dados pode ser anterior à semana atual.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SobreDados;