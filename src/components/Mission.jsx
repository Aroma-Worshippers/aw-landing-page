import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineMusicNote } from "react-icons/hi";
export default function Mission() {
  return (
    <>
      <section className="p-12 bg-[#EDEDED80]">
        <h2 className="p-2 text-4xl font-bold text-center uppercase">
          Our Missions and Objectives
        </h2>
        <p className="text-lg font-semibold text-center">
          To accomplish this vision, we have set the following objectives
        </p>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4">
          <div className="p-6 text-center rounded bg-[#00B425] text-white">
            <FaRegCalendarAlt className="text-4xl" />
            <p className="mt-6 text-lg font-bold">
              To organise a monthly school of worship
            </p>
          </div>
          <div className="p-4 text-center text-white rounded bg-[#00B425]">
            <FaRegUser className="text-4xl font-bold" />
            <p className="mt-6 text-lg font-bold text-justify">
              To get seasoned, established and successful music ministers to
              speak at every school of worship
            </p>
          </div>
          <div className="p-4 text-center text-white rounded bg-[#00B425]">
            <TbMicrophone2 className="text-4xl" />
            <p className="mt-6 text-lg font-bold text-justify">
              To have practical sessions with a vocal coach in every school of
              worship organised.
            </p>
          </div>
          <div className="p-4 text-center rounded text-white bg-[#00B425]">
            <HiOutlineMusicNote className="text-4xl" />
            <p className="mt-6 text-lg font-bold text-justify">
              To reach out to music teams in various churches to help build them
              musically
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
