// listen for copy events in the browser
document.addEventListener('copy', function(event) {

    console.log("Detected a copy event");
    // get the selected text
    const selectedText = window.getSelection().toString();
    // if text was selected, save it to the history
    if (selectedText) { 
        console.log("Sending copied text");
        chrome.runtime.sendMessage({ text: selectedText });
    }
});