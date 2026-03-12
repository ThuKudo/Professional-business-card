import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

function sanitizeFileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "");
}

async function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll("img"));

  await Promise.all(
    images.map(async (image) => {
      if (image.complete) {
        return;
      }

      if (typeof image.decode === "function") {
        try {
          await image.decode();
          return;
        } catch {
          return;
        }
      }

      await new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );
}

async function waitForStableLayout(node: HTMLElement) {
  if ("fonts" in document) {
    await document.fonts.ready;
  }

  await waitForImages(node);
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
}

function getNodeSize(node: HTMLElement) {
  const nodeWidth = node.offsetWidth || node.scrollWidth;
  const nodeHeight = node.offsetHeight || node.scrollHeight;

  if (!nodeWidth || !nodeHeight) {
    throw new Error("Card node is not measurable for export.");
  }

  return { nodeWidth, nodeHeight };
}

async function renderCardToPng(node: HTMLElement) {
  await waitForStableLayout(node);

  const { nodeWidth, nodeHeight } = getNodeSize(node);

  try {
    const canvas = await html2canvas(node, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      logging: false,
      width: nodeWidth,
      height: nodeHeight,
      windowWidth: nodeWidth,
      windowHeight: nodeHeight,
      foreignObjectRendering: true,
    });

    return canvas.toDataURL("image/png");
  } catch {
    return toPng(node, {
      cacheBust: true,
      pixelRatio: 3,
      canvasWidth: nodeWidth * 3,
      canvasHeight: nodeHeight * 3,
      skipAutoScale: true,
      backgroundColor: "transparent",
    });
  }
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
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
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
