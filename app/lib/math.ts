export function fitContent(
    containerWidth: number,
    containerHeight: number,
    contentWidth: number,
    contentHeight: number,
) {
    const scale = Math.max(containerWidth / contentWidth, containerHeight / contentHeight);

    const width = contentWidth * scale;
    const height = contentHeight * scale;

    const x = (containerWidth - width) / 2;
    const y = (containerHeight - height) / 2;

    return { x, y, width, height };
}

export function remap(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
    clamp: boolean = false,
) {
    let t = (value - inMin) / (inMax - inMin);
    if (clamp) {
        t = Math.max(0, Math.min(1, t));
    }
    return t * (outMax - outMin) + outMin;
}
