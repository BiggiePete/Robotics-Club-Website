export {decideAA}


function decideAA() {
    let pixelRatio = window.devicePixelRatio
    if (pixelRatio > 1) {
        return false;
    }
    else {
        return true;
    }
}