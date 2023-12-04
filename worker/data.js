const urlParams = new URLSearchParams(window.location.search);
const rawDataParam = urlParams.get('data');
let imgNo = document.querySelector('.imgNo');
let SvgNo = document.querySelector('.SvgNo');
let Total = document.querySelector('.Total');
let TotalImg = 0
let TotalSvg= 0
function update(){
    SvgNo.textContent = `${TotalSvg} Svg in Console` 
    imgNo.textContent = `${TotalImg} Images`
    let sum =  TotalSvg + TotalImg
      Total.textContent = `Total ${sum}`
}

if (rawDataParam) {
    const data = JSON.parse(rawDataParam);

    console.log(data);
      
let image = data.data.result.BgImg
let nonBG = data.data.result.Img
let font = data.data.result.Fonts

for(let i=0; i<image.length;i++){
    if(image[i].startsWith("data:image/svg xml;charset=utf-8,<svg")){
        console.log(decodeURIComponent(image[i])) 
         TotalSvg += 1
         update()
    }else{
        TotalImg += 1
        update()
        document.querySelector('.image-wrapper').innerHTML += ` <div class="property-card">
        <img src="${image[i]}" alt="">
        <button class="download" data-url="${image[i]}">Download</button>
        </div>`    
    }
}



for(let i=0; i<nonBG.length;i++){
    TotalImg += 1
    update()
    document.querySelector('.image-wrapper').innerHTML += ` <div class="property-card">
    <img src="${nonBG[i]}" alt="">
    <button class="download" data-url="${nonBG[i]}">Download</button>
    </div>`    
}

document.querySelectorAll('.download').forEach((data)=>{
    data.addEventListener('click',(event)=>{
        const imageUrl =  event.currentTarget.getAttribute('data-url');
        downloadImage(imageUrl)
    })
})



function downloadImage(imageUrl) {
   let fileName

   if(imageUrl.startsWith('data:image')){
    const ext = imageUrl.split(';')[0].split('/')[1];
    const newExt = ext.replace('xml','')
    fileName = `image.${newExt}`
    console.log(fileName)
   }else{
    const decodedUrl = decodeURIComponent(imageUrl);
    const urlParts = decodedUrl.split('/');
    fileName = urlParts[urlParts.length - 1];
   }

    chrome.downloads.download({
        url: imageUrl,
        filename: fileName,
        conflictAction: 'uniquify',
    });
}


for (const data in font) {
    if (font.hasOwnProperty(data)) {
        document.querySelector('.Fonts').innerHTML += `   
            <li>${font[data]}</li>`;
    }
}

let li = document.querySelectorAll('.Fonts li')

li.forEach(data=>{
    data.addEventListener('click',()=>{
        navigator.clipboard.writeText(data.textContent)
        let realText = data.textContent
        data.textContent = 'Copied to Clipboard'
        setTimeout(() => {
            data.textContent = realText
        }, 1000);
    })
})


document.querySelector('.download-all').addEventListener('click',async()=>{
    const downloadButtons = document.querySelectorAll('.download');
    for(const data of downloadButtons){
     await new Promise((resolve)=>{
        data.click()
        setTimeout(resolve,1300)
    })
    }
})


    console.log(data.data.result);
  }
  
 

