const MAX_PHOTO_DIMENSION = 1200;
const PHOTO_QUALITY = 0.86;

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    image.src = url;
  });

export const prepareResumePhoto = async (file: File) => {
  const image = await loadImage(file);
  const scale = Math.min(
    1,
    MAX_PHOTO_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight)
  );
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) throw new Error("Canvas is not available");

  canvas.width = width;
  canvas.height = height;
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  return {
    src: canvas.toDataURL("image/jpeg", PHOTO_QUALITY),
    aspectRatio: width / height
  };
};
