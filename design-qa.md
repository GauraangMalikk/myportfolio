**Design QA — Portfolio Refresh**

source visual truth path: `/Users/gauraangmalik/.codex/generated_images/019fc11b-04c9-7cd0-946a-4deea74b8b2e/exec-053098ef-f9aa-4fe9-932e-947acd9c8d0c.png`

supporting media-card reference: `/var/folders/1h/jzkc4s554818r0wfvp5d90zw0000gn/T/codex-clipboard-4cca23b3-5cd2-424f-b1aa-670fe30536b7.png`

implementation screenshot path: `/private/tmp/portfolio-refresh-final-1487-r2.png`

viewport: `1487 × 1058 CSS px`, desktop, device density 1

source pixels: `1487 × 1058`

implementation pixels: `1487 × 1058`

density normalization: source and implementation were compared at identical pixel dimensions and CSS viewport size; no scaling or device-frame normalization was required.

state: homepage at the top of `/`, dark theme, navigation closed, live-demo cards at rest. Demo screenshots show the actual awakened Hugging Face interfaces. The source mock’s illustrative Energy and Astrology images were intentionally superseded by authentic application captures, as required by the implementation brief.

**Full-view comparison evidence**

- The source and final implementation were opened together in one comparison input at `1487 × 1058`.
- Composition now matches the selected direction: compact asymmetric hero, left-aligned identity and three CTAs, quiet research coordinates, immediate Live Demos section, and three image-forward cards.
- Typography uses the project’s existing Space Grotesk, Inter, and JetBrains Mono stack. The source mock’s more stylized display face is not an installed project asset; Space Grotesk preserves the hierarchy without adding a dependency.
- Spacing and layout rhythm preserve the mock’s dark editorial density while giving real 16:9 interface captures enough room to remain legible.
- Colors and tokens retain the existing portfolio cyan/purple system, with purple, cyan, and amber demo borders echoing the source card differentiation.
- Image quality is authentic and sharp: three 1280 × 720 WebP demo captures and five 1280 × 720 WebP Canva posters. No fabricated app screenshot, inline SVG illustration, emoji asset, or placeholder media is used.
- Copy is standalone, evidence-aware, and uses the required Hugging Face wake-up language and visible launch treatment.

**Focused region comparison evidence**

- The supplied speaking-card reference and `/private/tmp/portfolio-refresh-talks-posters.png` were opened together in one comparison input. The implementation preserves the reference’s large 16:9 orange and green presentation media, clear role/title/meta hierarchy, and external destination.
- `/private/tmp/portfolio-refresh-demo-focus.png` confirms a strong full-card cyan keyboard focus ring and equivalent image/arrow emphasis.
- `/private/tmp/portfolio-refresh-menu-390.png` confirms the mobile menu’s focus visibility and reachable links. The overlay was then corrected to cover the full viewport beneath the fixed navigation.
- `/private/tmp/portfolio-refresh-home-light-1024.png`, `/private/tmp/portfolio-refresh-home-768.png`, and `/private/tmp/portfolio-refresh-home-320.png` were reviewed for light-theme contrast, grid collapse, CTA wrapping, and mobile layout.

**Findings**

- No actionable P0, P1, or P2 findings remain.
- Accepted constraint: the exact custom display typeface implied by the generated mock is not part of the existing static portfolio. The installed Space Grotesk treatment maintains the visual hierarchy without violating the no-new-dependency requirement.
- Accepted intentional difference: the final Energy and Astrology cards show verified live interfaces rather than the mock’s illustrative screens.

**Comparison history**

1. First full-view pass — `/private/tmp/portfolio-refresh-home-1440.png`, `1440 × 1024`.
   - Earlier P2: the hero typography and vertical spacing dominated the first viewport, pushing Live Demos too far below the fold.
   - Fix: reduced hero scale and padding, removed inherited margins, left-aligned hero content, strengthened CTA contrast, and moved the live section upward.
   - Post-fix evidence: `/private/tmp/portfolio-refresh-home-1440-compact.png`.
2. Second full-view pass — `/private/tmp/portfolio-refresh-final-1487.png`, `1487 × 1058`.
   - Earlier P2: demo cards were still too inset and vertically loose relative to the selected mock.
   - Fix: widened the desktop demo row, reduced section/card spacing, tightened card copy, and added the source-aligned purple/cyan/amber border differentiation.
   - Post-fix evidence: `/private/tmp/portfolio-refresh-final-1487-r2.png`.
3. Final pass — source and `/private/tmp/portfolio-refresh-final-1487-r2.png` compared together at identical dimensions.
   - Result: no actionable P0/P1/P2 mismatch remained.

**Primary interactions tested**

- Desktop and mobile navigation, mobile menu open/close, Escape/focus containment, and section navigation.
- Dark/light theme persistence and contrast.
- Full demo-card pointer surface, keyboard reachability, visible focus, and declared `target="_blank"`/`rel="noopener noreferrer"` behavior.
- Canva poster click-to-load with mouse; Enter/Space handlers are implemented with scroll prevention and an external-link fallback.
- Existing homepage anchors, About route, Please Scrape Me route, CV, project, speaking, social, and contact destinations.
- Browser console checked on the final local render: no console errors.

**Implementation Checklist**

- [x] Match selected editorial hierarchy and navigation.
- [x] Use authentic demo and presentation media.
- [x] Make live demos unmistakably clickable and keyboard visible.
- [x] Preserve content, routes, anchors, destinations, themes, and reduced motion.
- [x] Verify mobile, tablet, desktop, dark, light, poster loading, and crawl files.

**Follow-up Polish**

- P3: a future brand-font asset could move the display lettering even closer to the mock without changing layout or behavior.

final result: passed
