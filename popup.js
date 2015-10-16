// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Function to copy text to clipboard
function copyToClipboard( text ){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);

}

// Function to add Research_ID in the query
function add_id( research_id ){
  
    // If the list of Documents is empty, then it's the first document
  if(gartner_ids == ""){
    gartner_ids = research_id;
  }

  // Else, I add the document ID with a preceding "OR". The indexOf makes sure that this ID has not been added already
  else{
    if(gartner_ids.indexOf(research_id) == -1){
      gartner_ids += " OR " + research_id;
    }
  }
  // Once the list of Document IDs is complete, I launch the copyToClipboard function
  copyToClipboard(gartner_ids);
}


// Creating variable which will contain the PC query
var gartner_ids = "";

// Input for chrome.tabs.query
var queryInfo = {
  };

// Callback function on the tabs
chrome.tabs.query(queryInfo, function(tabs) {

  // Pattern to identify the Document ID in the URL
  var pattern = /([document\v/]{9}|[research\v/]{9}|[overview\v/]{9}|[webinar\v/]{8})[0-9]{5,10}/g;

  // For each tab in the current browser
  for (tab in tabs){

    // variable to get the url of the tab
    var url = tabs[tab].url;

    // If the page is on a Gartner Document
    if(url.indexOf("gartner.com/document") != -1 || url.indexOf("exp-reports/research") != -1 || url.indexOf("special-reports/overview") != -1 || url.indexOf("gartner.com/webinar") != -1){

      // We get the document ID through the regular expression
      var url_match = url.match(pattern)[0];

      // If the document ID is not empty
      if(url_match != ""){

        // I store the ID in the variable doc_type
        var doc_type = url_match.split("/");
        var new_id = "";
        var special_type = doc_type[0];

        if(special_type == "research" || special_type == "overview"){
            // Send a request to the content script to get the real Note ID
            chrome.tabs.sendMessage(tabs[tab].id,{type: "special"},function(response) {
              new_id = response.research_id;
              add_id(new_id);
            });
        }
        else{
          new_id = doc_type[1];
          add_id(new_id);
        }

      }
    }
  }
});