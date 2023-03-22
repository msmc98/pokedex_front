import {FastAverageColor} from 'fast-average-color';

export async function getAverageRGB(img) {
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(img)
    return {r: color.value[0], g: color.value[1], b: color.value[2]}
}


// export function getAverageRGB(img) {
//     const context = document.createElement('canvas').getContext('2d',{ willReadFrequently: true});
//     if (typeof img == 'string') {
//         var src = img;
//         img = new Image();
//         img.setAttribute('crossOrigin', ''); 
//         img.src = src;
//     }
//     context.imageSmoothingEnabled = true;
//     context.drawImage(img, 0, 0, 1, 1);
//     console.log(context)
//     let data = context.getImageData(0, 0, 1, 1).data.slice(0,3);
//     console.log(data)
//     console.log(data[0], data[1], data[2])
//     return {r: data[0], g: data[1], b: data[2]};
// }

//======================================================================

// export function get_average_rgb(imgEl) {

//     if (typeof imgEl == 'string') {
//         var src = imgEl;
//         imgEl = new Image();
//         imgEl.setAttribute('crossOrigin', ''); 
//         imgEl.src = src;
//     }

//     var blockSize = 5, // only visit every 5 pixels
//         defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
//         canvas = document.createElement('canvas'),
//         context = canvas.getContext && canvas.getContext('2d'),
//         data, width, height,
//         i = -4,
//         length,
//         rgb = {r:0,g:0,b:0},
//         count = 0;
        
//     if (!context) {
//         return defaultRGB;
//     }
    
//     height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
//     width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
//     context.drawImage(imgEl, 0, 0);
    
//     try {
//         data = context.getImageData(0, 0, width, height);
//     } catch(e) {
//         /* security error, img on diff domain */;
//         return defaultRGB;
//     }
    
//     length = data.data.length;
    
//     while ( (i += blockSize * 4) < length ) {
//         ++count;
//         rgb.r += data.data[i];
//         rgb.g += data.data[i+1];
//         rgb.b += data.data[i+2];
//     }
    
//     // ~~ used to floor values
//     rgb.r = ~~(rgb.r/count);
//     rgb.g = ~~(rgb.g/count);
//     rgb.b = ~~(rgb.b/count);
    
//     return rgb;
// }