export interface ImageUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadNoteImage(
  file: File,
  noteId: string
): Promise<ImageUploadResult> {
  return {
    success: false,
    error: "Image uploading is not supported in static mode. Please add images to your repository and reference them.",
  };
}

export function getImageFromClipboard(
  event: ClipboardEvent
): File | null {
  const items = event.clipboardData?.items;
  if (!items) return null;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.indexOf("image") !== -1) {
      return item.getAsFile();
    }
  }

  return null;
}

export function insertImageMarkdown(
  textarea: HTMLTextAreaElement,
  imageUrl: string,
  altText: string = "image"
): void {
  const cursorPos = textarea.selectionStart;
  const textBefore = textarea.value.substring(0, cursorPos);
  const textAfter = textarea.value.substring(cursorPos);

  // Add newlines if not at start of line
  const needsNewlineBefore = textBefore.length > 0 && !textBefore.endsWith("\n");
  const needsNewlineAfter = textAfter.length > 0 && !textAfter.startsWith("\n");

  const imageMarkdown = `${needsNewlineBefore ? "\n" : ""}![${altText}](${imageUrl})${needsNewlineAfter ? "\n" : ""}`;

  const newValue = textBefore + imageMarkdown + textAfter;
  textarea.value = newValue;

  // Trigger input event to update React state
  const inputEvent = new Event("input", { bubbles: true });
  textarea.dispatchEvent(inputEvent);

  // Move cursor to end of inserted markdown
  const newCursorPos = cursorPos + imageMarkdown.length;
  textarea.setSelectionRange(newCursorPos, newCursorPos);
  textarea.focus();
}
