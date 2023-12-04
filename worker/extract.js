
function extractImages() {
  const imageUrls = new Set();

  function addImageUrl(img) {
    const imageUrl = img.src;
    if (imageUrl) {
      imageUrls.add(imageUrl);
    }
  }
  
  Array.from(document.images).forEach(img => {
    addImageUrl(img);
  });
  
  document.querySelectorAll('img').forEach(img => {
    if (!imageUrls.has(img.src)) {
      addImageUrl(img);
    }
  });
  console.log('Valid Image URLs:', Array.from(imageUrls));
  return Array.from(imageUrls)
}

function extractFonts(){
    const allFonts = new Set();
document.querySelectorAll('*').forEach(element => {
  const fontFamily = window.getComputedStyle(element).getPropertyValue('font-family');
  if (fontFamily) {
    allFonts.add(fontFamily);
  }
});
console.log('All Fonts:', Array.from(allFonts));
return Array.from(allFonts)
}

function extractBackgroundImages() {
  const bgImages = new Set();

  document.querySelectorAll('*').forEach(element => {
    const backgroundImage = window.getComputedStyle(element).getPropertyValue('background-image');
    const match = backgroundImage.match(/url\(["']?(.*?)["']?\)/);

    if (match) {
      const imageUrl = match[1];
      

      bgImages.add(imageUrl);
    
    }
  });

  console.log('Valid BG-Image URLs:', Array.from(bgImages));
  return Array.from(bgImages)
}