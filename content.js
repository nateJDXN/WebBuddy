// listen for copy events in the browser
document.addEventListener('copy', function(event) {
    // get the selected text
    const selectedText = window.getSelection().toString();
    // if text was selected, save it to the history
    if (selectedText) { 
        chrome.runtime.sendMessage({ text: selectedText });
    }
});