"use client";

import { useEffect, useState } from "react";

type Video = {
  title: string;
  sentiment: string;
};

export default function SentimentPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // TEMP MOCK DATA (until API ready)
    const mockData: Video[] = [
      { title: "AI in healthcare", sentiment: "Positive 😊" },
      { title: "Vaccine controversy", sentiment: "Negative 😡" },
      { title: "Mental health awareness", sentiment: "Neutral 😐" },
    ];

    setVideos(mockData);
  }, []);

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">
        Sentiment Analysis Dashboard
      </h1>

      <div className="space-y-4">
        {videos.map((video, index) => (
          <div
            key={index}
            className="border p-4 rounded-md bg-white shadow"
          >
            <h2 className="font-semibold">{video.title}</h2>
            <p>Sentiment: {video.sentiment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}