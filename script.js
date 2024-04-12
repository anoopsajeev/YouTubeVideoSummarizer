function summarizeVideo() {
    var videoURL = document.getElementById("videoURL").value;
    // Validate video URL (you can add more robust validation)
    if (!videoURL.includes("youtube.com/watch?v=")) {
        document.getElementById("errorMessage").innerHTML = "Please enter a valid YouTube video URL.";
        document.getElementById("errorMessage").style.display = "block";
        return;
    }

    // Hide any previous error messages or summaries
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("summary").style.display = "none";

    // Show loading message
    document.getElementById("loading").style.display = "block";

    fetch('/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: videoURL }),
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
