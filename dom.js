chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var r_id = document.getElementsByClassName("sans-serif condensed")[3].getAttribute("data-resid");
 if (request.type == "research")
   sendResponse({test: "TRY",research_id: r_id});
 else
   sendResponse({dom:"0"}); // Send nothing..
});