// wait for DOM to load before execution
document.addEventListener('DOMContentLoaded', function(){
    // get references to DOM elements
    const fullHistory = document.getElementById('fullHistory');
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById("clearButton");

    // displays all clipboard items
    function displayAllClips(clips) {
        // clear current content for new display
        fullHistory.innerHTML = '';

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

    }

})