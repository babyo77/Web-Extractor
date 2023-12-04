const extract = document.querySelector('#Extract');
const colorPicker = document.querySelector('#Color')
const logo = document.querySelector('.logo')
const gradientText = document.querySelector('.gradient-text')
logo.onclick=()=>{
  chrome.tabs.create({ url: 'https://tanmay-seven.vercel.app/' }, (newTab) => {
            
        });
}
gradientText.onclick=()=>{
  chrome.tabs.create({ url: 'https://tanmay-seven.vercel.app/' }, (newTab) => {
            
        });
}
let eyeDropper = new EyeDropper();

    colorPicker.addEventListener('click', e => {
        eyeDropper.open()
        .then(colorSelectionResult => {
          navigator.clipboard.writeText(colorSelectionResult.sRGBHex)
          colorPicker.textContent = `${colorSelectionResult.sRGBHex} Copied!`
          setTimeout(() => {
            colorPicker.textContent = "Color Picker"
          }, 1700);
        })
        .catch(error => {
            
        });
    });

extract.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: ExtractData,
    },
    async (result) => {
      try {
        const data = await result[0];
        console.log(data)
        chrome.runtime.sendMessage(data);
      } catch (error) {
        console.log(error)
      }

    }
  );
});


async function ExtractData(){
  const images = new Set();

  document.querySelectorAll('*').forEach(element => {
    const backgroundImage = window.getComputedStyle(element).getPropertyValue('background-image');
    const match = backgroundImage.match(/url\(["']?(.*?)["']?\)/);

    if (match) {
      const imageUrl = match[1];
      

      images.add(imageUrl);
    
    }
  });

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


  const allFonts = new Set();
  document.querySelectorAll('*').forEach(element => {
    const fontFamily = window.getComputedStyle(element).getPropertyValue('font-family');
    if (fontFamily) {
      allFonts.add(fontFamily);
    }
  });

  
  console.log({BgImg: Array.from(images),Img: Array.from(imageUrls),Fonts: Array.from(allFonts)})
return {BgImg: Array.from(images),Img: Array.from(imageUrls),Fonts: Array.from(allFonts)}

}


