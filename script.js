function summarizeVideo() {
    var videoURL = document.getElementById("videoURL").value;
    var regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    var match = videoURL.match(regExp);
    // Validate video URL (you can add more robust validation)
    if (!match) {
        document.getElementById("errorMessage").innerHTML = "Please enter a valid YouTube video URL.";
        document.getElementById("errorMessage").style.display = "block";
        return;
    }
    var videoID = match[1];

    // Hide any previous error messages or summaries
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("summary").style.display = "none";

    // Show loading message
    document.getElementById("loading").style.display = "block";

    fetch('http://127.0.0.1:5000/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_ID: videoID }),
    })
    .then(response => response.json())
    .then(data => {
        // Update the UI with the generated summary
        document.getElementById("loading").style.display = "none";
        document.getElementById('summaryText').innerText = data.summary;
        document.getElementById('summary').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMessage').innerText = 'An error occurred. Please try again.';
    });
}
