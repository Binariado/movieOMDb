import {PropsResize} from '../utils/autoResize';

/**
 * Conserva la relación de aspecto de la región original
 *
 * @param {Number} srcWidth ancho de la imagen de origen
 * @param {Number} srcHeight altura de la imagen de origen
 * @param {Number} maxWidth ancho máximo disponible
 * @param {Number} maxHeight altura máxima disponible
 * @param {Number} orientation orientación de la imagen
 * @return {Object} { width, height }
 */
export function calculateAspectRatioFit({
  srcWidth,
  srcHeight,
  maxWidth,
  maxHeight,
  orientation,
}: PropsResize) {
  if (srcHeight > maxHeight || srcWidth > maxWidth) {
    const position =
      orientation === 8 || orientation === 6
        ? [maxHeight, maxWidth]
        : [maxWidth, maxHeight];

    const ratio = Math.min(position[0] / srcWidth, position[1] / srcHeight);
    return {width: srcWidth * ratio, height: srcHeight * ratio};
  }
  return {width: srcWidth, height: srcHeight};
}
type CalImgProps = {
  h: number;
  w: number;
};

export function CalImg(width: number, {h, w}: CalImgProps) {
  const calWidth = width > w ? w : width;
  const calHeight = (h / 100) * ((calWidth * 100) / w);
  return {
    calWidth,
    calHeight,
  };
}
