export function compressPic(imageData,imageSize) {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.src = imageData;
    image.onload = function () {
      // 压缩图片（大于300000 byte才压缩）
      if (imageSize > 300000) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var imageLength = image.src.length;
        var width = image.width;
        var height = image.height;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        var quality = 0.7;//图片质量（范围：0<quality<=1，根据实际需求调正）
        var newImageData = canvas.toDataURL("image/jpeg", quality);//压缩后的图片
        resolve(newImageData);
      } else {
        resolve(imageData);
      }
    }
    image.onerror = function () {
      resolve(imageData);
    }
  })
}
export function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}