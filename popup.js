// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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

var queryInfo = {
  };

var gartner_ids = "";

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    for (tab in tabs){
      var url = tabs[tab].url;
      var pattern = /([document\v/]|[research\v/]){9}[0-9]{5,10}/g;
      if(url.indexOf("gartner") != -1){
        var url_match = url.match(pattern)[0];
        if(url_match != ""){
          var doc_type = url_match.split("/");
          if(gartner_ids == ""){
            gartner_ids = doc_type[1];
          }
          else{
            if(gartner_ids.indexOf(doc_type[1]) == -1){
              gartner_ids += " OR " + doc_type[1];
            }
          }
        }
      }
    copyToClipboard(gartner_ids);
  }
});