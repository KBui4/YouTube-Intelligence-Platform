import os
import datetime
from googleapiclient.discovery import build

# ---------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------

# Add channel IDs here
CHANNEL_IDS = [
    "UC_x5XG1OV2P6uZZ5FSM9Ttw",  
]

# Number of months to look back
MONTHS_BACK = 6

# ---------------------------------------------------------
# SETUP
# ---------------------------------------------------------

youtube = build("youtube", "v3", developerKey=API_KEY)

def get_uploads_playlist_id(channel_id):
    """Fetch the Uploads playlist ID for a given channel."""
    response = youtube.channels().list(
        part="contentDetails",
        id=channel_id
    ).execute()

    items = response.get("items", [])
    if not items:
        return None

    return items[0]["contentDetails"]["relatedPlaylists"]["uploads"]


def get_recent_videos_from_playlist(playlist_id, published_after):
    """Fetch videos from a playlist uploaded after a specific date."""
    videos = []
    next_page = None

    while True:
        response = youtube.playlistItems().list(
            part="snippet,contentDetails",
            playlistId=playlist_id,
            maxResults=50,
            pageToken=next_page
        ).execute()

        for item in response.get("items", []):
            video_date = item["contentDetails"]["videoPublishedAt"]
            if video_date >= published_after:
                videos.append({
                    "title": item["snippet"]["title"],
                    "videoId": item["contentDetails"]["videoId"],
                    "publishedAt": video_date
                })

        next_page = response.get("nextPageToken")
        if not next_page:
            break

    return videos


def main():
    # Calculate date threshold
    today = datetime.datetime.utcnow()
    cutoff_date = today - datetime.timedelta(days=MONTHS_BACK * 30)
    cutoff_iso = cutoff_date.isoformat("T") + "Z"

    all_results = []

    for channel_id in CHANNEL_IDS:
        print(f"\nChecking channel: {channel_id}")

        playlist_id = get_uploads_playlist_id(channel_id)
        if not playlist_id:
            print("  Could not retrieve uploads playlist.")
            continue

        videos = get_recent_videos_from_playlist(playlist_id, cutoff_iso)

        print(f"  Found {len(videos)} videos in last {MONTHS_BACK} months.")
        all_results.extend(videos)

        for v in videos:
            print(f"    - {v['title']} ({v['publishedAt']}) https://youtu.be/{v['videoId']}")

    print("\nDone.")


if __name__ == "__main__":
    main()