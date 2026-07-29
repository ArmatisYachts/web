# ARMATIS 107 — HQ full-screen gallery

This folder contains the isolated, reversible campaign-image experiment for
the multi-page site. Original source renders remain untouched in
`public/assets/renders/`.

## Structure

- `external/desktop/`: 16:9 external campaign scenes
- `external/mobile/`: matching 9:16 mobile art direction
- `internal/desktop/`: 16:9 internal campaign scenes
- `internal/mobile/`: matching 9:16 mobile art direction

## Generation approach

The built-in OpenAI ImageGen workflow was used with up to five original
ARMATIS renders per scene. Prompts locked the hull, deck count, glazing bands,
hardtop, radar domes, stern platform, material palette, furniture language,
window geometry, and lighting vocabulary. Desktop and mobile files were
generated separately; mobile imagery is not an automated crop.

The source render library remains the technical geometry authority. Generated
campaign images should receive final naval-design review before public
production use.
