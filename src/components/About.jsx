export default function About() {
    return (
      <>
        <section id="about" className="p-6 m-auto py-auto">
          <div className="grid content-center grid-cols-1 p-4 md:grid-cols-2 ">
            <div className="grid gap-4 p-4">
              <div>
                <h2 className="mb-4 text-4xl font-bold underline uppercase decoration-[#00B425] ">
                  About Us
                </h2>
                <p className="w-full text-xl font-semibold md:w-3/4">
                  The Aroma Worshippers are a team dedicated to seeing to the
                  all-round growth of music minsiters and advancing the kingdom
                  of heaven through music. We believe that every minister must
                  have
                  <b className="underline decoration-[#00B425] ">
                    {" "}
                    character
                  </b>,{" "}
                  <b className="underline decoration-[#00B425] ">
                    anointing
                  </b>{" "}
                  and <b className="underline decoration-[#00B425] ">skill</b>
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-4xl font-bold underline uppercase decoration-[#00B425] ">
                  Our Vision
                </h2>
                <p className="w-full text-xl font-semibold md:w-3/4">
                  To raise godly and skilled music ministers with excellent
                  character for the advancement of the kingdom through inspired
                  music
                </p>
              </div>
            </div>
            <img
              src="/assets/aboutimg.png"
              alt="About Us"
              className="max-w-full justify-self-center"
            />
          </div>
        </section>
      </>
    );
}