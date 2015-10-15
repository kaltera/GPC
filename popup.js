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

// Input for chrome.tabs.query
var queryInfo = {
  };

// Creating variable which will contain the PC query
var gartner_ids = "";

// Callback function on the tabs
chrome.tabs.query(queryInfo, function(tabs) {

  // Pattern to identify the Document ID in the URL
  var pattern = /([document\v/]|[research\v/]){9}[0-9]{5,10}/g;

  // For each tab in the current browser
  for (tab in tabs){

    // variable to get the url of the tab
    var url = tabs[tab].url;

    // If the page is on a Gartner Document
    if(url.indexOf("gartner.com/document") != -1){

      // We get the document ID through the regular expression
      var url_match = url.match(pattern)[0];

      // If the document ID is not empty
      if(url_match != ""){

        // I store the ID in the variable doc_type
        var doc_type = url_match.split("/");

        // If the list of Documents is empty, then it's the first document
        if(gartner_ids == ""){
          gartner_ids = doc_type[1];
        }

        // Else, I add the document ID with a preceding "OR". The indexOf makes sure that this ID has not been added already
        else{
          if(gartner_ids.indexOf(doc_type[1]) == -1){
            gartner_ids += " OR " + doc_type[1];
          }
        }
      }
    }

  // Once the list of Document IDs is complete, I launch the copyToClipboard function
  copyToClipboard(gartner_ids);
  }
});