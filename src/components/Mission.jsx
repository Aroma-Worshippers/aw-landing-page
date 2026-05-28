// Mission.jsx - Better typography
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineMusicNote } from "react-icons/hi";

export default function Mission() {
  const objectives = [
    {
      icon: FaRegCalendarAlt,
      title: "To organise a monthly school of worship",
      color: "bg-[#00B425]",
    },
    {
      icon: FaRegUser,
      title:
        "To get seasoned, established and successful music ministers to speak at every school of worship",
      color: "bg-[#00B425]",
    },
    {
      icon: TbMicrophone2,
      title:
        "To have practical sessions with a vocal coach in every school of worship organised.",
      color: "bg-[#00B425]",
    },
    {
      icon: HiOutlineMusicNote,
      title:
        "To reach out to music teams in various churches to help build them musically",
      color: "bg-[#00B425]",
    },
  ];

  return (
    <section className="py-12 px-4 bg-[#EDEDED80]">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-2 text-xl font-bold text-center uppercase md:text-2xl">
          Our Missions and Objectives
        </h2>
        <p className="mb-8 text-base text-center text-gray-700 md:text-lg">
          To accomplish this vision, we have set the following objectives
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {objectives.map((item, index) => (
            <div
              key={index}
              className="p-6 text-center text-white transition-transform duration-300 rounded-lg hover:scale-105 bg-[#00B425]"
            >
              <item.icon className="mx-auto text-4xl" />
              <p className="mt-4 text-base font-semibold leading-relaxed">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
