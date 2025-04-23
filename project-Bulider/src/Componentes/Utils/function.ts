/**
 * 
 * @param {string} text - the text to be sliced
 * @param {number} maxLength  - the maximum length of the text
 * @returns   the sliced text
 */


export function textSlice(text: string, maxLength: 50) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}