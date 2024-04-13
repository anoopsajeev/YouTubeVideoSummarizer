from flask import Flask, request, jsonify
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
genai.configure(api_key = os.getenv("GOOGLE_API_KEY"))

prompt = """You are a YouTube summary generator. You will take the transcript text of a youtube video and give the summary of entire video in points (No text formatting like bold). 
Please provide the summary of the following transcript: """

def extract_transcript_details(youtube_video_url):

    try:
        video_id = youtube_video_url.split("=")[1]
        transcript_text = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = ""
        for i in transcript_text:
            transcript += " " + i["text"]
        return transcript

    except Exception as e:
        raise e

def generate_gemini_content(transcript_text, prompt):

    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt + transcript_text)
    return response.text

def generate_summary(link):
    transcript = extract_transcript_details(link)
    return generate_gemini_content(transcript, prompt)

@app.route('/summarize', methods=['POST'])  # Specify POST method

def summarize_video():
    data = request.get_json()
    video_url = data['video_url']
    summary = generate_summary(video_url)
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(host='127.0.0.2', port=6000)
    
