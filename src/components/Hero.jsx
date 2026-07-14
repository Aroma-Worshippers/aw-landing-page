// Hero.jsx - Simple optimization that keeps both videos working
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState({});
  const videoRefs = useRef({});

  // Lazy load videos when they become active
  useEffect(() => {
    if (!loadedVideos[activeIndex]) {
      // Load video when it becomes active
      setLoadedVideos((prev) => ({ ...prev, [activeIndex]: true }));
    }
  }, [activeIndex, loadedVideos]);

  // Play/pause based on active slide
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (video) {
        if (parseInt(key) === activeIndex && loadedVideos[activeIndex]) {
          video.play().catch((e) => console.log("Playback prevented:", e));
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex, loadedVideos]);

  const videos = [
    { src: "/videos/Jw.mp4", overlay: "/assets/Video play.png" },
    { src: "/videos/Herovid.mp4", overlay: "/assets/Video play.png" },
  ];

  return (
    <section className="overflow-x-hidden bg-gray-100 min-h-auto" id="home">
      {/* The homepage had no h1 anywhere — search engines use it as the
          primary on-page topic signal. sr-only keeps it invisible so the
          video-first visual design is unchanged. */}
      <h1 className="sr-only">
        Aroma Worshippers Music Ministry — Raising Godly, Skilled Music
        Ministers in Enugu, Nigeria
      </h1>
      <div className="mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          className="relative w-full overflow-hidden"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                {loadedVideos[index] ? (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.src}
                    poster={video.overlay}
                    className="w-full"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // Placeholder while video loads
                  <div
                    className="w-full bg-gray-900"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin" />
                    </div>
                  </div>
                )}
                <img
                  src={video.overlay}
                  alt="Overlay"
                  className="absolute top-0 z-10 w-full h-full opacity-50 pointer-events-none"
                  loading="eager"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
