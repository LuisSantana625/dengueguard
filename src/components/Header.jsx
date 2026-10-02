function Header() {
  return (
    <header className="header">
      <div className="header-orb header-orb-1"></div>
      <div className="header-orb header-orb-2"></div>

      <div className="header-conteudo">
        <div className="header-topo">
          <div className="marca">
            <div className="marca-icone" aria-hidden="true">
              🦟
            </div>

            <div>
              <span className="marca-nome">
                DengueGuard
              </span>

              <span className="marca-ai">
                AI
              </span>
            </div>
          </div>

          <div className="status-sistema">
            <span className="status-ponto"></span>
            Sistema online
          </div>
        </div>

        <div className="hero">
          <div className="hero-badge">
            Vigilância epidemiológica • Saúde digital
          </div>

          <h1>
            Informação que ajuda a
            <span> prevenir e cuidar.</span>
          </h1>

          <p>
            Consulte a situação epidemiológica da dengue
            em seu município e realize uma triagem
            educativa de sintomas em uma única plataforma.
          </p>

          <div className="hero-acoes">
            <button
              type="button"
              className="hero-btn hero-btn-principal"
              onClick={() =>
                document
                  .getElementById("epidemiologia")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Consultar minha região
              <span>→</span>
            </button>

            <button
              type="button"
              className="hero-btn hero-btn-secundario"
              onClick={() =>
                document
                  .getElementById("triagem")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Realizar triagem
            </button>
          </div>

          <div className="hero-informacoes">
            <div>
              <strong>Dados públicos</strong>
              <span>InfoDengue + ViaCEP</span>
            </div>

            <div className="hero-divisor"></div>

            <div>
              <strong>Atualização dinâmica</strong>
              <span>
                Última semana disponível
              </span>
            </div>

            <div className="hero-divisor"></div>

            <div>
              <strong>Triagem educativa</strong>
              <span>
                Sintomas e sinais de alarme
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;