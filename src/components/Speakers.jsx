// Speakers.jsx - Better typography
export default function Speakers() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 text-xl font-bold underline md:text-2xl decoration-[#00B425] underline-offset-4">
          Speakers
        </h2>
        <div className="flex justify-center">
          <img
            src="/assets/Speakers.png"
            alt="MMC 2025 Speakers"
            className="w-full max-w-4xl rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
