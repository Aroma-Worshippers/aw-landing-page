// Events.jsx - Clean pause on hover/touch, no extra indicators
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Events() {
  // Events array - MMC + School of Worship
  const events = [
    {
      id: 1,
      title: "Music Ministers' Conference (MMC) 2026",
      date: "July 24th - 26th, 2026",
      location: "Enugu, Nigeria",
      description:
        "A 3-day conference designed to equip and empower music ministers for kingdom advancement. Find full details in the flier.",
      image: "/assets/mmclandscape.png",
      registerLink: "/register",
      featured: true,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const hasMultipleEvents = events.length > 1;

  // Auto-play with pause functionality
  useEffect(() => {
    if (!hasMultipleEvents) return;
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, events.length, hasMultipleEvents]);

  // Pause on hover (desktop)
  const handleMouseEnter = () => {
    if (hasMultipleEvents) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (hasMultipleEvents) setIsPaused(false);
  };

  // Pause on touch (mobile)
  const handleTouchStart = () => {
    if (hasMultipleEvents) {
      setIsPaused(true);
      // Resume after 10 seconds of no interaction
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 10000);
    }
  };

  const nextSlide = () => {
    if (!hasMultipleEvents) return;
    setIsPaused(true);
    setCurrentIndex((prev) => (prev + 1) % events.length);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const prevSlide = () => {
    if (!hasMultipleEvents) return;
    setIsPaused(true);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const goToSlide = (index) => {
    setIsPaused(true);
    setCurrentIndex(index);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const currentEvent = events[currentIndex];

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="px-4 py-12 bg-gray-50" id="events">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-xl font-bold text-gray-800 uppercase md:text-2xl">
            Events
          </h2>
          <div className="w-16 h-1 mx-auto mt-2 bg-[#00B425] rounded-full" />
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Find out about our latest and upcoming events
          </p>
        </div>

        {/* Carousel Container with hover/touch events */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        >
          {/* Previous Button */}
          {hasMultipleEvents && (
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 hidden p-2 transition -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 md:block hover:bg-gray-100"
              aria-label="Previous event"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {hasMultipleEvents && (
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 hidden p-2 transition translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 md:block hover:bg-gray-100"
              aria-label="Next event"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Event Card */}
          <div className="transition-all duration-500 ease-in-out">
            <div className="overflow-hidden bg-white shadow-lg rounded-xl">
              <div className="grid md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-[260px] md:h-[320px] lg:h-[360px]">
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  {currentEvent.featured && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white bg-[#00B425] rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-8">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-5 h-5 text-[#00B425]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">
                      {currentEvent.date}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-5 h-5 text-[#00B425]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">
                      {currentEvent.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-gray-800 md:text-2xl">
                    {currentEvent.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-base leading-relaxed text-gray-600">
                    {currentEvent.description}
                  </p>

                  {/* Register Button - Animated on Hover */}
                  {currentEvent.registerLink ? (
                    <Link
                      to={currentEvent.registerLink}
                      className="group relative inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-lg bg-[#00B425] hover:bg-[#009620] hover:shadow-lg hover:-translate-y-0.5 md:text-base overflow-hidden"
                    >
                      <span className="relative z-10">Register Now</span>
                      <svg
                        className="relative z-10 w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>

                      {/* Shine effect on hover */}
                      <span className="absolute inset-0 transition-transform duration-500 transform -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-gray-400 bg-gray-200 rounded-lg cursor-not-allowed md:text-base"
                    >
                      Registration Opening Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          {hasMultipleEvents && (
            <div className="flex justify-center gap-2 mt-6">
              {events.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[#00B425]"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to event ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
