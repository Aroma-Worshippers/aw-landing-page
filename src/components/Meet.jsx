// Meet.jsx - Better typography
export default function Meet() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-8 text-xl font-bold underline md:text-2xl decoration-[#00B425] underline-offset-4">
          Meet Our President
        </h2>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/assets/G.O image.png"
              alt="Rev. Emmanuel Nwobodo (GodsOracle)"
              className="w-full max-w-sm rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Bio Text */}
          <div className="space-y-4 text-base leading-relaxed text-gray-700 md:text-lg">
            <p>
              <span className="font-bold text-gray-900">
                Rev. Emmanuel Nwobodo
              </span>
              , popularly known as
              <span className="font-semibold text-[#00B425]"> GodsOracle</span>,
              is an ordained minister of the gospel and the senior pastor of
              RGI-Grace City Church in Enugu. He is a graduate of the Enugu
              State University of Science and Technology, where he served as the
              President of the Joint Campus Christian Body and currently the
              JCCB ESUT Alumni Chairman.
            </p>
            <p>
              He is also the founder and president of{" "}
              <span className="font-semibold">
                Aroma Worshippers Music Ministry
              </span>
              , a platform dedicated to spreading the message of the gospel
              through inspired music.
            </p>
            <p>
              Known for his electrifying and energetic praise and worship
              sessions, GodsOracle has made a significant impact in the
              Christian music community. He is happily married to
              <span className="font-semibold"> Mrs. Esther Nwobodo</span> and
              their 5-year+ marriage is blessed with a set of twin boys.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
