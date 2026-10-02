import { jsPDF } from "jspdf";

export function gerarRelatorioPDF({
  sintomas = [],
  data = "",
  classificacao = "",
}) {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const margemEsquerda = 20;
    const larguraTexto = 170;

    let y = 20;

    // =====================================================
    // TÍTULO
    // =====================================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);

    doc.text(
      "DengueGuard - Resumo de Triagem",
      margemEsquerda,
      y
    );

    y += 12;

    // =====================================================
    // DATA
    // =====================================================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(
      `Data da avaliação: ${
        data || "Não informada"
      }`,
      margemEsquerda,
      y
    );

    y += 8;

    // =====================================================
    // CLASSIFICAÇÃO
    // =====================================================

    const classificacoes = {
      vermelho:
        "Sinais de alarme identificados",

      amarelo:
        "Sintomas compatíveis com quadro suspeito",

      verde:
        "Poucos sintomas específicos relatados",
    };

    const textoClassificacao =
      classificacoes[classificacao] ||
      "Classificação não informada";

    doc.setFont("helvetica", "bold");

    doc.text(
      "Resultado da triagem:",
      margemEsquerda,
      y
    );

    y += 7;

    doc.setFont("helvetica", "normal");

    const linhasClassificacao =
      doc.splitTextToSize(
        textoClassificacao,
        larguraTexto
      );

    doc.text(
      linhasClassificacao,
      margemEsquerda,
      y
    );

    y +=
      linhasClassificacao.length * 6 +
      7;

    // =====================================================
    // SINTOMAS
    // =====================================================

    doc.setFont("helvetica", "bold");

    doc.text(
      "Sintomas informados:",
      margemEsquerda,
      y
    );

    y += 8;

    doc.setFont("helvetica", "normal");

    if (
      !Array.isArray(sintomas) ||
      sintomas.length === 0
    ) {
      doc.text(
        "Nenhum sintoma específico selecionado.",
        margemEsquerda + 5,
        y
      );

      y += 8;
    } else {
      sintomas.forEach((sintoma) => {
        const linhas =
          doc.splitTextToSize(
            `- ${sintoma}`,
            160
          );

        if (
          y + linhas.length * 6 >
          250
        ) {
          doc.addPage();
          y = 20;
        }

        doc.text(
          linhas,
          margemEsquerda + 5,
          y
        );

        y +=
          linhas.length * 6 + 2;
      });
    }

    y += 7;

    // =====================================================
    // ORIENTAÇÃO
    // =====================================================

    doc.setFont("helvetica", "bold");

    doc.text(
      "Orientação:",
      margemEsquerda,
      y
    );

    y += 8;

    doc.setFont("helvetica", "normal");

    let orientacao = "";

    if (classificacao === "vermelho") {
      orientacao =
        "Foram relatados sinais que justificam atenção. " +
        "Procure uma unidade de saúde para avaliação clínica. " +
        "A presença de sinais de alarme merece avaliação profissional.";
    } else if (
      classificacao === "amarelo"
    ) {
      orientacao =
        "Foram relatados sintomas que podem ocorrer em quadros de dengue. " +
        "Mantenha hidratação adequada e procure avaliação profissional " +
        "caso os sintomas persistam, piorem ou novos sinais apareçam.";
    } else {
      orientacao =
        "Continue observando sua condição. Procure atendimento " +
        "caso haja piora ou apareçam novos sintomas.";
    }

    const linhasOrientacao =
      doc.splitTextToSize(
        orientacao,
        larguraTexto
      );

    doc.text(
      linhasOrientacao,
      margemEsquerda,
      y
    );

    y +=
      linhasOrientacao.length * 6 +
      14;

    // =====================================================
    // RODAPÉ — PRIVACIDADE E USO RESPONSÁVEL
    // =====================================================

    if (y > 225) {
      doc.addPage();
      y = 20;
    }

    doc.setDrawColor(
      220,
      230,
      236
    );

    doc.line(
      margemEsquerda,
      y,
      190,
      y
    );

    y += 9;

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(9);

    doc.text(
      "Privacidade e uso responsável",
      margemEsquerda,
      y
    );

    y += 6;

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(8.5);

    const avisoFinal =
      "O DengueGuard é uma ferramenta informativa e auxiliar, " +
      "não realiza diagnóstico e não substitui avaliação por " +
      "profissional de saúde. A triagem não solicita identificação " +
      "pessoal e as informações inseridas são utilizadas somente " +
      "para o processamento da triagem e geração deste resumo.";

    const linhasAvisoFinal =
      doc.splitTextToSize(
        avisoFinal,
        larguraTexto
      );

    doc.text(
      linhasAvisoFinal,
      margemEsquerda,
      y
    );

    y +=
      linhasAvisoFinal.length * 4.5 +
      6;

    doc.setFontSize(7.5);

    doc.setTextColor(
      100,
      115,
      125
    );

    const notaFinal =
      "Este resumo representa as informações fornecidas pelo usuário " +
      "no momento da triagem e não constitui laudo, prontuário, " +
      "prescrição, atestado ou diagnóstico médico.";

    const linhasNotaFinal =
      doc.splitTextToSize(
        notaFinal,
        larguraTexto
      );

    doc.text(
      linhasNotaFinal,
      margemEsquerda,
      y
    );

    doc.setTextColor(
      0,
      0,
      0
    );

    // =====================================================
    // GERAR PDF
    // =====================================================

    const pdfBlob =
      doc.output("blob");

    const pdfUrl =
      URL.createObjectURL(
        pdfBlob
      );

    // =====================================================
    // ABRIR EM NOVA ABA
    // =====================================================

    const novaAba =
      window.open(
        pdfUrl,
        "_blank"
      );

    if (!novaAba) {
      alert(
        "O navegador bloqueou a abertura do PDF. " +
        "Permita pop-ups para este site e tente novamente."
      );

      URL.revokeObjectURL(
        pdfUrl
      );

      return;
    }

    setTimeout(() => {
      URL.revokeObjectURL(
        pdfUrl
      );
    }, 60000);

  } catch (error) {
    console.error(
      "Erro ao gerar o PDF:",
      error
    );

    alert(
      "Não foi possível gerar o resumo da triagem."
    );
  }
}