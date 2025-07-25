import { Link } from "react-router-dom";

export default function Events() {
  return (
    <>
      <section className="p-5 bg-white border-b" id="events">
        <h2 className="pt-12 text-xl font-bold uppercase md:text-4xl">Events</h2>
        <p className="underline decoration-[#00B425] text-xl">
          Find out about our latest and upcoming events
        </p>
        <section className="mt-5 font-semibold">
          <h3 className="py-6 text-xl uppercase">
            Music Ministers' Conference (MMC)
          </h3>
          <p className="text-lg">
            A 3 days conference, coming up on the 24th to the 26th of July 2025.
            Find full details in the flier.
          </p>
          <p className="text-lg">
            To attend this event, kindly click the button to register and fill
            out your details. We will be delighted to have you at MMC 2025.
          </p>
          <Link
            to="/register"
            className="hidden px-4 py-2 text-white bg-[#00B425] rounded md:inline-block hover:shadow-xl mt-4"
          >
            Register Now
          </Link>
        </section>
        <section className="p-4 mt-4">
          <img src="/assets/MMC (2).png" className="justify-center w-full" />
        </section>
      </section>
    </>
  );
}
