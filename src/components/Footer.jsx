import React from "react";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import {
  LuFacebook,
  LuInstagram,
  LuMail,
  LuMap,
  LuMapPin,
  LuPhone,
  LuYoutube,
} from "react-icons/lu";

export default function Footer() {
  return (
    <>
      <footer id="contact" className="p-8 mt-10 text-white bg-green-950">
        <section className="p-8">
          <section className="flex justify-between mb-4">
            <div>
              <h2 className="mb-2 text-4xl font-bold">CONTACT INFORMATION</h2>
              <p className="text-xl font-semibold">
                For more details, please contact
              </p>
            </div>
            <div>
              <img src="/assets/AW LOGO 2b 2.png" alt="Logo" className="text-sm"></img>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-8 mt-8 text-xl md:grid-cols-2">
            <div>
              <div className="flex py-2">
                <LuMail/>
                <p className="ml-2 hover:underline">
                  <a href="mailto:aromaworshippers@gmail.com">
                    aromaworshippers@gmail.com
                  </a>
                </p>
              </div>
              <div className="flex py-2">
                <LuPhone/>
                <p className="ml-2">
                  +234 706 846 9754, +234 706 793 3625
                </p>
              </div>
              <div className="flex py-2">
                <LuInstagram/>
                <p className="ml-2 hover:underline">
                  <a href="https://www.instagram.com/aromaworshippers">
                    Aroma Worshippers Music Ministry
                  </a>
                </p>
              </div>
              <div className="flex py-2">
                <BsFacebook/>
                <p className="ml-2 hover:underline">
                  <a href="https://www.facebook.com/AWMuicMinistry">
                    @aromaworshippers
                  </a>
                </p>
              </div>
              <div className="flex py-2">
                <LuMapPin/>
                <p className="ml-2">Enugu, Nigeria</p>
              </div>
            </div>
            <div className="p-4">
              <h2 className="mb-2 text-xl font-bold">MEDIA</h2>
              <div className="flex py-2">
                <LuYoutube/>
                <p className="ml-2 hover:underline">
                  <a href="https://www.youtube.com/goodsoracel">
                    www.youtube.com/@godsoracle
                  </a>
                </p>
              </div>
              <div className="flex py-2">
                <BsFacebook/>
                <p className="ml-2 hover:underline">
                  <a href="https://www.facebook.com/AWMuicMinistry">
                    @aromaworshippers
                  </a>
                </p>
              </div>
              <div className="flex py-2">
                <LuInstagram/>
                <p className="ml-2 hover:underline">
                  <a href="https://www.instagram.com/aromaworshippers">
                    Aroma Worshippers Music Ministry
                  </a>
                </p>
              </div>
            </div>
          </section>
        </section>
      </footer>
    </>
  );
}
