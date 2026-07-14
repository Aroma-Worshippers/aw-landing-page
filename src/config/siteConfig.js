

export const SITE = {
  name: "Aroma Worshippers Music Ministry",
  shortName: "Aroma Worshippers",
  url: "https://www.aromaworshippers.com",
  defaultTitle: "Aroma Worshippers Music Ministry | Raising Godly Music Ministers",
  defaultDescription:
    "Aroma Worshippers Music Ministry equips music ministers with character, anointing and skill through the Music Ministers' Conference (MMC), Monthly School of Worship, and mentorship led by Rev. Emmanuel 'GodsOracle' Nwobodo in Enugu, Nigeria.",
  defaultImage: "https://www.aromaworshippers.com/assets/og-default.png",
  locale: "en_NG",
  email: "aromaworshippers@gmail.com",
  phone: "+234 706 846 9754",
  location: {
    locality: "Enugu",
    country: "NG",
  },
  socials: {
    facebook: "https://www.facebook.com/share/1GC5cwEqzN/",
    instagram: "https://www.instagram.com/aromaworshippers",
    youtube: "https://youtube.com/@godsoracle",
  },
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/assets/logo%20png%201%201.png`,
    sameAs: Object.values(SITE.socials),
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.locality,
      addressCountry: SITE.location.country,
    },
    founder: {
      "@type": "Person",
      name: "Rev. Emmanuel Nwobodo",
      alternateName: "GodsOracle",
    },
  };
}

export function mmcEventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Music Ministers' Conference (MMC) 2026",
    startDate: "2026-07-24",
    endDate: "2026-07-26",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Enugu, Nigeria",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.location.locality,
        addressCountry: SITE.location.country,
      },
    },
    image: [`${SITE.url}/assets/mmclandscape.png`],
    description:
      "A 3-day conference designed to equip and empower music ministers for kingdom advancement, hosted by Aroma Worshippers Music Ministry in Enugu, Nigeria.",
    organizer: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/register.html`,
      availability: "https://schema.org/InStock",
    },
  };
}
