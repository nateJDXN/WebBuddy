// wait for DOM to load before execution
document.addEventListener('DOMContentLoaded', function(){
    // get references to DOM elements
    const fullHistory = document.getElementById('fullHistory');
    const searchInput = document.getElementById('searchInput');
    const clearAllButton = document.getElementById("clearAllButton");

    // displays all clipboard items
    function displayClips(clips) {
        // clear current content for new display
        fullHistory.innerHTML = '';
        console.log("history cleared");

        // show message if there are no clips to show
        if (!clips || clips.length === 0) {
            fullHistory.innerHTML = '<p class="no clips"> No clipboard history yet!</p>';
            return;
        }

        // iterate through clips and create a UI element
        clips.forEach((clip, index) => {
            // create a container for each clip
            const clipElement = document.createElement('div');
            clipElement.className = 'clip-item';

            // convert timestamp to local date string
            const timestamp = new Date(clip.timestamp).toLocaleString();

            // create the HTML for each clip
            clipElement.innerHTML = `
                <div class="clip-content">
                    <p>${clip.text}</p>
                    <span class="timestamp">${timestamp}</span>
                </div>
                <div class="clip-actions">
                    <button class="copyButton" data-index="${index}">Copy</button>
                    <button class="deleteButton> data-index="${index}">Delete</button>
                </div>
            `;

            // add the clip element to the container
            fullHistory.appendChild(clipElement);
        });

        // set up event handlers for copy button
        document.querySelectorAll('.copyButton').forEach(button => {
            button.addEventListener('click', function() {
                // get the index of each clip to copy
                const index = this.getAttribute('data-index');
                // write the clip text to system clipboard
                navigator.clipboard.writeText(clips[index].text);
                // flash "Copied!" message when successful
                this.textContext = 'Copied!';
                // reset the button text after 1 second
                setTimeout(() => this.textContext = 'Copy', 1000);
            });
        });

        // set up event handlers for delete button
        document.querySelectorAll('.deleteButton').forEach(button => {
            button.addEventListener('click', function() {
                // get the index of the clip to delete
                const index = this.getAttribute('data-index');
                // remove button from the array
                clips.splice(index, 1);
                // update stored clips and refresh display
                chrome.storage.local.set({ clips }, () => {
                    displayClips(clips);
                });
            });
        });
    }


    // load clips from Chrome's storage and display them
    function loadClips() {
        chrome.storage.local.get(['clips'], function(result) {
            // get the clips array or default to empty array
            const clips = result.clips || [];
            displayClips(clips);
        });

        console.log("Clips loaded");
    }

    // Filter clips with search 
    searchInput.addEventListener('input', function() {

        // convert search term to lowercase
        const searchTerm = this.value?.toLowerCase();
        chrome.storage.local.get(['clips'], function(result) {
            const clips = result.clips || [];
            // filter clips to only those containing search term
            const filteredClips = clips.filter(clip =>
                clip.text?.toLowerCase().includes(searchTerm)
            );
            displayClips(filteredClips);
        });
    });

    // add event listener for clear button
    clearAllButton.addEventListener('click', function() {
        console.log("clear button clicked");
        // show confirmation before clearing
        if (confirm('Are you sure you want to clear the clipboard history?')) {
            chrome.storage.local.set({ clips: [] }, () => {
                displayClips([]);
            });
        }
    });

    loadClips();

});