import Header from "./components/Header";
import VisaoGeral from "./components/VisaoGeral";
import ConsultaRegiao from "./components/ConsultaRegiao";
import TriagemSintomas from "./components/TriagemSintomas";
import SobreDados from "./components/SobreDados";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main className="container">
        <VisaoGeral />

        <ConsultaRegiao />

        <TriagemSintomas />

        <SobreDados />
      </main>

      <Footer />
    </>
  );
}

export default App;