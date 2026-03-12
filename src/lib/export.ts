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

function createExportSandbox(node: HTMLElement) {
  const { nodeWidth, nodeHeight } = getNodeSize(node);
  const sandbox = document.createElement("div");
  const clone = node.cloneNode(true) as HTMLElement;

  sandbox.setAttribute("data-export-sandbox", "true");
  sandbox.style.position = "fixed";
  sandbox.style.left = "0";
  sandbox.style.top = "0";
  sandbox.style.width = `${nodeWidth}px`;
  sandbox.style.height = `${nodeHeight}px`;
  sandbox.style.padding = "0";
  sandbox.style.margin = "0";
  sandbox.style.opacity = "1";
  sandbox.style.pointerEvents = "none";
  sandbox.style.transform = "translate(-200vw, 0)";
  sandbox.style.isolation = "isolate";
  sandbox.style.zIndex = "2147483647";
  sandbox.style.overflow = "visible";
  sandbox.style.background = "transparent";

  clone.style.width = `${nodeWidth}px`;
  clone.style.height = `${nodeHeight}px`;
  clone.style.margin = "0";

  sandbox.append(clone);
  document.body.append(sandbox);

  return {
    sandbox,
    clone,
    nodeWidth,
    nodeHeight,
    cleanup: () => sandbox.remove(),
  };
}

async function renderCardToPng(node: HTMLElement) {
  const sandbox = createExportSandbox(node);

  try {
    await waitForStableLayout(sandbox.clone);

    const canvas = await html2canvas(sandbox.clone, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      logging: false,
      width: sandbox.nodeWidth,
      height: sandbox.nodeHeight,
      windowWidth: sandbox.nodeWidth,
      windowHeight: sandbox.nodeHeight,
    });

    return canvas.toDataURL("image/png");
  } catch {
    return toPng(sandbox.clone, {
      cacheBust: true,
      pixelRatio: 3,
      canvasWidth: sandbox.nodeWidth * 3,
      canvasHeight: sandbox.nodeHeight * 3,
      skipAutoScale: true,
      backgroundColor: "transparent",
    });
  } finally {
    sandbox.cleanup();
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
