// Company/platform facts shared across pages. Values (units, figures, tags)
// live here; all prose lives in messages/ so EN and IT never diverge.

export const SUSTAINABILITY = {
  solar: "7.5 kW",
  generatorReduction: "75–80%",
} as const;

export const INNOVATION_METRICS = {
  interiorInstallReduction: ">70%",
  weightReductionTarget: "8–10%",
} as const;

// Three-facility production model. `key` indexes the messages namespaces
// (homeTeasers.manufacturing.facilities / manufacturing.facilities.items).
export const FACILITIES = [
  { key: "mould", index: "01", tags: ["5-AXIS CNC", "3D PRINTING", "COMPOSITE MOULDS"] },
  { key: "lamination", index: "02", tags: ["HULL", "SUPERSTRUCTURE", "DECK"] },
  { key: "assembly", index: "03", tags: ["PROPULSION", "SYSTEMS", "INTERIORS"] },
] as const;

// Industry 4.0 capabilities. Keys index `manufacturing.tech.items`.
export const TECHNOLOGIES = [
  "printing",
  "robotics",
  "cnc",
  "cadcam",
  "planning",
] as const;

// Process-innovation pillars. Keys index `manufacturing.innovation.items`.
export const PROCESS_INNOVATIONS = [
  "interiors",
  "harness",
  "composites",
  "lab",
] as const;

// Platform range (the 30 is the ARMATIS 107, in production).
export const PLATFORMS = [
  { key: "p24", size: "24", status: "development" },
  { key: "p30", size: "30", status: "production" },
  { key: "p38", size: "38", status: "development" },
] as const;
