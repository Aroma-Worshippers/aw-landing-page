import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <section className="overflow-x-hidden bg-gray-100 min-h-auto" id="home">
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
        >
          <SwiperSlide>
            <div className="relative">
              <video
                src="/videos/jw.mp4"
                className="w-full"
                autoPlay
                loop
                muted
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
              <img
                src="/assets/Video play.png"
                alt="Overlay"
                className="absolute top-0 z-10 w-full h-full opacity-80"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <video
                autoPlay
                loop
                muted
                preload="auto"
                src="/videos/herovid.mp4"
                className="w-full"
              ></video>
              <img
                src="/assets/Video play.png"
                alt="Overlay"
                className="absolute top-0 z-10 w-full h-full opacity-80"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
