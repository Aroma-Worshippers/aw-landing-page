export default function Gallery() {
  return (
    <section className="px-4 py-12 bg-white">
      <h2 className="mb-8 text-4xl font-bold text-center uppercase">Gallery</h2>
      <div className="grid max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-3">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg group">
            <div className="absolute inset-0 z-0 transition-all duration-300 bg-white rounded-lg opacity-0 group-hover:opacity-50 blur-lg" />

            <img
              src={`/assets/gallery${i + 1}.png`}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              className="relative z-10 object-cover w-full transition duration-300 ease-in-out rounded-lg h-60 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
