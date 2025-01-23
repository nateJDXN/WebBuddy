// keep track of last copied text to avoid duplicates
let previousClip = '';

// save new text to clipboard history
function saveClip(text) {
    // skip is text is a duplicate
    if (text === previousClip) return;

    // get current clips from storage
    chrome.storage.local.get(['clips'], function(result) {
        const clips = result.clips || [];

        // add new clip to the beginning of the array
        clips.unshift({
            text: text,
            timestamp: new Date().toISOString()
        });

        // limit to 50 stored clips - remove oldest when necessary
        if (clips.length > 50) {
            clips.pop();
        }

        // save updated clip list to storage
        chrome.storage.local.set({ clips });
        // update previousClip to avoid duplicates
        previousClip = text;
    });
}

// listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request) {
    console.log("listening...")
    if (request.text) {
        saveClip(request.text);
    }
});

