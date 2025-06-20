import { Link } from "react-router-dom";
import RegistrationPage from "../pages/RegisterPage";

export default function Events() {
  return (
    <>
      <section className="p-12 bg-white border-b" id="events">
        <h2 className="pt-12 text-4xl font-bold uppercase">Events</h2>
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
            className="px-6 py-2 my-4 text-white bg-[#00B425] font-semibold rounded inline-block w-auto"
          >
            Register Now
          </Link>
        </section>
        <section className="p-4 mt-4">
          <img src="/assets/MMC (2).png" className="justify-center w-full"/>
              </section>
      </section>
    </>
  );
}
