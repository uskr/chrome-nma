chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.method == "getSelection") {
  		sendResponse({data: window.getSelection().toString()});
    }
});
