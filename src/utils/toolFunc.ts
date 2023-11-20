function isImage(file: File) {
    console.log(file, "file");
    return file.type.startsWith('image/')
}



export {
    isImage
}