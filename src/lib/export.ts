import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

function sanitizeFileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "");
}

async function renderCardToPng(node: HTMLElement) {
  await document.fonts.ready;

  const exportWidth = 1260;
  const exportHeight = Math.round((node.scrollHeight / node.scrollWidth) * exportWidth);

  return toPng(node, {
    cacheBust: true,
    pixelRatio: 2.5,
    canvasWidth: exportWidth,
    canvasHeight: exportHeight,
    style: {
      width: "900px",
      margin: "0",
    },
  });
}

export async function exportCardSideToPng(
  node: HTMLElement,
  fileNameBase: string,
  side: "front" | "back",
) {
  const dataUrl = await renderCardToPng(node);
  const anchor = document.createElement("a");
  anchor.download = `${sanitizeFileName(fileNameBase)}-${side}.png`;
  anchor.href = dataUrl;
  anchor.click();
}

export async function exportCardSetToPdf(
  frontNode: HTMLElement,
  backNode: HTMLElement,
  fileNameBase: string,
) {
  const [frontDataUrl, backDataUrl] = await Promise.all([
    renderCardToPng(frontNode),
    renderCardToPng(backNode),
  ]);

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [55, 90],
    compress: true,
  });

  pdf.addImage(frontDataUrl, "PNG", 0, 0, 90, 55, undefined, "FAST");
  pdf.addPage([55, 90], "landscape");
  pdf.addImage(backDataUrl, "PNG", 0, 0, 90, 55, undefined, "FAST");
  pdf.save(`${sanitizeFileName(fileNameBase)}-full-set.pdf`);
}
