export default function PlaceholderPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600 shadow-lg">
      <div className="bg-white p-8 shadow-md rounded-xl text-center w-96">
        <h1 className="text-3xl font-bold mb-4">firehose</h1>
        <p className="text-gray-700">
          firehose is a way to pull all your online creations into one place so
          you own your content. It's awesome and coming soon.
        </p>
        <p className="mt-8">
          Email{" "}
          <a href="mailto:jb@lot23.com" className="underline">
            jb@lot23.com
          </a>{" "}
          with questions.
        </p>
      </div>
    </div>
  );
}
