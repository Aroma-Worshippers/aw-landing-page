// About.jsx - Balanced image size with text
export default function About() {
  return (
    <section id="about" className="px-4 py-12 m-auto max-w-7xl">
      <div className="grid content-center grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
        {/* Text Content - Takes more space */}
        <div className="order-2 space-y-6 md:space-y-8 md:order-1">
          {/* About Section */}
          <div>
            <h2 className="mb-2 text-xl font-bold uppercase md:text-2xl decoration-[#00B425] underline underline-offset-4">
              About Us
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 md:text-base lg:text-lg">
              The Aroma Worshippers are a team dedicated to seeing to the
              all-round growth of music ministers and advancing the kingdom of
              heaven through music. We believe that every minister must have{" "}
              <b className="underline decoration-[#00B425]">character</b>,{" "}
              <b className="underline decoration-[#00B425]">anointing</b> and{" "}
              <b className="underline decoration-[#00B425]">skill</b>.
            </p>
          </div>

          {/* Vision Section */}
          <div>
            <h2 className="mb-2 text-xl font-bold uppercase md:text-2xl decoration-[#00B425] underline underline-offset-4">
              Our Vision
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 md:text-base lg:text-lg">
              To raise godly and skilled music ministers with excellent
              character for the advancement of the kingdom through inspired
              music.
            </p>
          </div>
        </div>

        <div className="flex items-start justify-center order-1 md:order-2">
          <img
            src="/assets/aboutimg.png"
            alt="Aroma Worshippers Music Ministry Team"
            className="w-3/4 max-w-[280px] md:max-w-[320px] lg:max-w-[380px] rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
