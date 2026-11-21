// Hands a PDF to the iPad share sheet (AirDrop, Print, Messages, Files…),
// or downloads it where sharing files isn't supported. Returns false if the
// person closed the share sheet.
export async function shareOrDownloadPdf(bytes: Uint8Array, filename: string): Promise<boolean> {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const file = new File([blob], filename, { type: "application/pdf" });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: filename });
      return true;
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return false;
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return true;
}
