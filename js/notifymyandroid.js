function sendNMA(notification) {
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
		// TODO: do something here based on failure/success.
		if (req.readyState == 4) {
			if (req.status == 200) {
			}
		}
		console.log(req)
	};

	var params = 'apikey='+ encodeURIComponent(notification.apikey) +
	'&application='+ encodeURIComponent('Chrome') +
	'&event='+ encodeURIComponent(notification.name) +
	'&url='+ encodeURIComponent(notification.url) +
	'&description='+ encodeURIComponent(notification.text);

	req.open('POST', 'https://notifymyandroid.appspot.com/publicapi/notify?' + params, true);
	req.send(null);
}

var options;
chrome.extension.sendMessage({msg: "gpmeGetOptions"}, function(theOptions) {
	options = theOptions;
	load();
});

function $(x) { return document.getElementById(x); }

function load() {
	if (options['apikey']) {
		chrome.tabs.getSelected(null, function (tab) {
			var urlmsg = $('urlid');

			urlmsg.value = tab.url;
			chrome.tabs.sendMessage(tab.id, {method: "getSelection"}, function(response){
				var txt = $('freetext');
				txt.innerHTML = response.data;
		  });

		});
	} else {
		$('msg').innerHTML = 'API key not configured.';
	}
}
function sendURL() {
	var txt = $('urlid');
	sendMessage("Click the URL below to open...", txt.value);
}
function sendText() {
	var txt = $('freetext');
	sendMessage(txt.value, "");
}
function sendBoth() {
	var txt2 = $('urlid');
	var txt = $('freetext');
	sendMessage(txt.value, txt2.value);
}
function sendMessage(text, urlt) {
	var notification = {
		'apikey': options['apikey'],
		'name': "NotifyMyAndroid Extension",
		'text': text,
		'url': urlt
	};
	$('msg').innerHTML = 'Sending notification.';
	sendNMA(notification);
	$('msg').innerHTML = 'Sent.';            
	$('inputs').style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() { 
	document.querySelector('#sendURL').addEventListener('click', sendURL);
	document.querySelector('#sendText').addEventListener('click', sendText);
	document.querySelector('#sendBoth').addEventListener('click', sendBoth);
 });