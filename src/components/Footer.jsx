function Footer() {
  return (
    <footer className="footer">
      <div className="footer-conteudo">
        <div className="footer-marca">
          <div className="footer-logo">
            🦟
          </div>

          <div>
            <strong>
              DengueGuard AI
            </strong>

            <p>
              Monitoramento epidemiológico e
              triagem educativa.
            </p>
          </div>
        </div>

        <div className="footer-tecnologias">
          <span>React</span>
          <span>Vite</span>
          <span>ViaCEP</span>
          <span>InfoDengue</span>
        </div>

        <p className="footer-aviso">
          Ferramenta de caráter informativo e
          educacional. Não substitui avaliação
          realizada por profissional de saúde.
        </p>
      </div>
    </footer>
  );
}

export default Footer;