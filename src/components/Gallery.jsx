//Make gallery to fetch images from an endpoint.
//Store images in the cloud
//Have a gallery page that opens onclick of 'show more'
//Update the backend to have a gallery endpoint

export default function Gallery() {
  return (
    <section className="px-4 py-12 bg-white">
      <h2 className="mb-8 text-2xl font-bold text-center uppercase md:text-4xl">
        Gallery
      </h2>

      {/* Mobile carousel */}
      <div className="flex gap-4 overflow-x-auto md:hidden snap-x snap-mandatory scrollbar-hide">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 overflow-hidden rounded-lg w-72 h-60 snap-center group"
          >
            <div className="absolute inset-0 z-0 transition-all duration-300 bg-white rounded-lg opacity-0 group-hover:opacity-50 blur-lg" />
            <img
              src={`/assets/gallery${i + 1}.png`}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              className="relative z-10 object-cover w-full h-full transition duration-300 ease-in-out rounded-lg group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="hidden max-w-6xl grid-cols-1 gap-4 mx-auto md:grid md:grid-cols-3">
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
