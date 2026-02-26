export function getColor(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

export function getColorRatio(r_px, g_px, b_px) {
    const total = Math.max(r_px + g_px + b_px, 255);
    const red_ratio = r_px / total;
    const green_ratio = g_px / total;
    const blue_ratio = b_px / total;
    return getColor(Math.floor(red_ratio * 255), Math.floor(green_ratio * 255), Math.floor(blue_ratio * 255));
}

export function formatNumber(number) {
    const abbrList = ['k', 'm', 'b', 't', 'q', 'Q']
    let abbrIdx = -1;
    while (number >= 1000.0) {
        number /= 1000.0;
        abbrIdx++;
    }
    const abbr = abbrIdx > -1? abbrList[abbrIdx]: '';
    number = Math.round(number * 1000) / 1000.0;
    return number + abbr;
}