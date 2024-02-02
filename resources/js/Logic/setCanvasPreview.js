const getCropValues = (crop, scaleX, scaleY, pixelRatio) => {
    const cropX = crop.x * scaleX * pixelRatio;
    const cropY = crop.y * scaleY * pixelRatio;
    const cropWidth = crop.width * scaleX * pixelRatio;
    const cropHeight = crop.height * scaleY * pixelRatio;

    return {
        x: cropX,
        y: cropY,
        width: cropWidth,
        height: cropHeight,
    };
};

const setCanvasPreview = (
    image, // HTMLImageElement
    canvas, // HTMLCanvasElement
    crop // PixelCrop
) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("No 2d context");
    }

    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const { x, y, width, height } = getCropValues(
        crop,
        scaleX,
        scaleY,
        pixelRatio
    );

    // Move the crop origin to the canvas origin (0,0)
    ctx.translate(-x, -y);
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
    );

    ctx.restore();

    return { x, y, width, height };
};
export default setCanvasPreview;
