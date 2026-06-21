// ARMATIS 107 — canonical yacht data shared across every landing variant.

export const ARMATIS_107 = {
  brand: "ARMATIS",
  model: "ARMATIS 107",
  modelNumber: "107",
  loa: "30.07 m",
  beam: "7.80 m",
  draught: "1.65 m",
  guests: 10,
  crew: 5,
  engines: "Quad IPS1200 / Quad IPS1350",
  maxSpeed: "24 / 26 kn",
  fuel: "10 t",
  builtIn: "Italy",
  shipyard: "Brindisi, IT",
  headquarters: "Milano, IT",
  latitude: "40.63° N",
  web: "armatisyachts.com",
  email: "info@armatisyachts.com",
  vat: "14497620964",
  euDesign: "015141162 - 0001",
  // TODO: confirm official LinkedIn URL with client (placeholder for now).
  linkedin: "https://www.linkedin.com/company/armatis-yachts",
} as const;

// Render library (served from /public/assets).
export const RENDERS = {
  heroProfile: "/assets/renders/05.jpg", // dramatic low-angle side profile
  profileGolden: "/assets/renders/01_A.jpg",
  aerial: "/assets/renders/02.jpg",
  aerialBW: "/assets/renders/02-bw.jpg", // black & white aerial
  sterns: "/assets/renders/07.jpg", // stern with ARMATIS 107 badge
  beachPlatform: "/assets/renders/04.jpg",
  foredeckSpa: "/assets/renders/09.jpg",
  bowOn: "/assets/renders/10.jpg",
  sideStatic: "/assets/renders/06.jpg",
  interiorSalon: "/assets/renders/MS1.jpg",
  interiorMaster: "/assets/renders/MSC1.jpg",
  interiorGuest: "/assets/renders/GSC1.jpg",
  interiorBeachClub: "/assets/renders/BC1.jpg",
} as const;

export const GALLERY_ORDER: (keyof typeof RENDERS)[] = [
  "heroProfile",
  "profileGolden",
  "aerial",
  "foredeckSpa",
  "beachPlatform",
  "interiorBeachClub",
  "interiorSalon",
  "interiorMaster",
  "interiorGuest",
  "sterns",
  "bowOn",
  "sideStatic",
];
