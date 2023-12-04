chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message) {  
        let ds = encodeURIComponent(JSON.stringify({data:message}))

        const url = `Data/data.html?data=${ds}`;

        chrome.tabs.create({ url: url }, (newTab) => {
            
        });
    }
});
