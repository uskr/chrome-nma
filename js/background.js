var settings = new Store("settings", {});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg == "gpmeGetOptions") {
    	sendResponse(settings.toObject());
    }
  });