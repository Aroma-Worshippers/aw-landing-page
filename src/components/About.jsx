export default function About() {
  return (
    <section id="about" className="px-12 py-12 m-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 place-items-center md:grid-cols-2 md:gap-12">
        
        {/* Text Content - FIRST on mobile (order-1), LEFT on desktop */}
        <div className="order-1 space-y-6 md:order-1">
          
          {/* About Section */}
          <div>
            <h2 className="mb-2 text-xl font-bold uppercase md:text-2xl decoration-[#00B425] underline underline-offset-4">
              About Us
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 md:text-base lg:text-lg">
              The Aroma Worshippers are a team dedicated to seeing to the 
              all-round growth of music ministers and advancing the kingdom 
              of heaven through music. We believe that every minister must have{" "}
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
              character for the advancement of the kingdom through inspired music.
            </p>
          </div>
        </div>

        {/* Image - SECOND on mobile (order-2), RIGHT on desktop */}
        <div className="flex justify-center order-2 md:order-2">
          <img
            src="/assets/aboutimg.png"
            alt="Aroma Worshippers Music Ministry Team"
            className="w-full max-w-sm rounded-lg shadow-md md:max-w-md"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}