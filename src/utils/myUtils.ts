export const getBase64Image = (src: string) => {
  return new Promise(resolve => {
    const img = new Image()
    img.crossOrigin = ''
    img.src = src
    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, img.width, img.height)
      const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      const dataURL = canvas.toDataURL('image/' + ext)
      resolve(dataURL)
    }
  })
}


