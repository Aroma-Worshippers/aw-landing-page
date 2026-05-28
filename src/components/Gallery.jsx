// Gallery.jsx - Optimized with better UX and typography
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const totalImages = 12; // Update this based on your actual images
  const images = Array.from({ length: totalImages }, (_, i) => ({
    id: i,
    src: `/assets/gallery${i + 1}.png`,
    alt: `Gallery image ${i + 1}`,
  }));

  // Load more images on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (visibleCount < totalImages && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 3, totalImages));
            setIsLoadingMore(false);
          }, 500);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, isLoadingMore]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowLeft") {
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedImage((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="px-4 py-12 bg-gray-50" id="gallery">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-xl font-bold text-gray-900 uppercase md:text-2xl">
            Gallery
          </h2>
          <div className="w-16 h-1 mx-auto mt-2 bg-[#00B425] rounded-full" />
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Capturing moments of worship and fellowship
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {images.slice(0, visibleCount).map((image, idx) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(idx)}
            >
              {/* Image Container with Aspect Ratio */}
              <div className="relative overflow-hidden bg-gray-200 aspect-video">
                {!loadedImages[image.id] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#00B425] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                    loadedImages[image.id] ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(image.id)}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="p-2 bg-white rounded-full">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="flex gap-4 overflow-x-auto md:hidden snap-x snap-mandatory scrollbar-hide">
          {images.slice(0, visibleCount).map((image, idx) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 h-64 overflow-hidden rounded-lg cursor-pointer w-72 snap-center group"
              onClick={() => setSelectedImage(idx)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-30" />
            </div>
          ))}
        </div>

        {/* Loading More Indicator */}
        {visibleCount < totalImages && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-5 h-5 border-2 border-[#00B425] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Loading more...</span>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute text-white transition-colors top-4 right-4 hover:text-gray-300 md:top-6 md:right-6"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute text-white transition-colors left-4 hover:text-gray-300 md:left-6"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev > 0 ? prev - 1 : totalImages - 1
                );
              }}
            >
              <ChevronLeft size={36} />
            </button>

            <button
              className="absolute text-white transition-colors right-4 hover:text-gray-300 md:right-6"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev < totalImages - 1 ? prev + 1 : 0
                );
              }}
            >
              <ChevronRight size={36} />
            </button>

            {/* Image */}
            <div className="max-w-5xl max-h-[90vh] p-4">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />

              {/* Counter */}
              <p className="mt-4 text-sm text-center text-gray-400">
                {selectedImage + 1} / {totalImages}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
