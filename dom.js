chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

var r_id = document.querySelector('a[data-resid]').getAttribute("data-resid");

 if (request.type == "special")
   	sendResponse({test: "TRY",research_id: r_id});
 else
   	sendResponse({test: "TRY",research_id: "0"});
});