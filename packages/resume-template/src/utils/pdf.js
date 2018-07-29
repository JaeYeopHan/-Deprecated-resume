import html2pdf from "html2pdf.js";

export const exportToPdfFile = async (ref, pdfConfig) => {
  const { margin, owner } = pdfConfig;

  return await html2pdf()
    .from(ref)
    .set({
      margin: margin ? margin : 0.5,
      filename: `${owner}_resume.pdf`,
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .save();
};
