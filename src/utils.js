import { asArray, asString } from 'ol/color';

// https://stackoverflow.com/questions/28004153/setting-vector-feature-fill-opacity-when-you-have-a-hexadecimal-color
export function colorWithAlpha(color, alpha = 1) {
    const [r, g, b] = Array.from(asArray(color));
    return asString([r, g, b, alpha]);
}