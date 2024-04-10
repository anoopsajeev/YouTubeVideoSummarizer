function summarizeVideo() {
    var videoUrl = document.getElementById("videoURL").value;
    // Validate video URL (you can add more robust validation)
    if (!videoUrl.includes("youtube.com/watch?v=")) {
        document.getElementById("errorMessage").innerHTML = "Please enter a valid YouTube video URL.";
        document.getElementById("errorMessage").style.display = "block";
        return;
    }

    // Hide any previous error messages or summaries
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("summary").style.display = "none";

    // Show loading message
    document.getElementById("loading").style.display = "block";

    // Here you would make an API request to your backend to summarize the video
    // Example:
    // fetch('/summarize', {
    //   method: 'POST',
    //   body: JSON.stringify({ videoUrl: videoUrl }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Process the summarized data and update the UI
    // });

    // For demonstration purposes, we'll just show a static summary
    var summaryText = "This is a sample summary of the video content.";
    var fullTranscriptLink = "https://www.example.com/full-transcript";
    var originalVideoLink = videoUrl;

    // Hide loading message
    document.getElementById("loading").style.display = "none";

    // Display the summary
    document.getElementById("summaryText").innerText = summaryText;
    document.getElementById("fullTranscriptLink").href = fullTranscriptLink;
    document.getElementById("originalVideoLink").href = originalVideoLink;
    document.getElementById("summary").style.display = "block";
}
