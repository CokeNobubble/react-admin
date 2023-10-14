const useImage = () => {
  function handleImage(name: string): string {
    return new URL(`../assets/images/${name}`, import.meta.url).href
  }

  return {
    handleImage
  }
}

export {
  useImage
}
