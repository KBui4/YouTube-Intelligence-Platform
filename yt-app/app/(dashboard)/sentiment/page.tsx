export default function SentimentPage() {
  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Sentiment Analysis Dashboard
      </h1>

      <div className="space-y-4">
        <div className="border p-4 rounded-md bg-white shadow text-black">
          <h2 className="font-semibold">Video Title 1</h2>
          <p>Sentiment: Positive 😊</p>
        </div>

        <div className="border p-4 rounded-md bg-white shadow text-black">
          <h2 className="font-semibold">Video Title 2</h2>
          <p>Sentiment: Negative 😡</p>
        </div>

        <div className="border p-4 rounded-md bg-white shadow text-black">
          <h2 className="font-semibold">Video Title 3</h2>
          <p>Sentiment: Neutral 😐</p>
        </div>
      </div>
    </div>
  );
}
