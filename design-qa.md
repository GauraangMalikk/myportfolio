**Design QA — Dock Navigation, Social Launcher & Energy Article**

source visual truth path: `/var/folders/1h/jzkc4s554818r0wfvp5d90zw0000gn/T/codex-clipboard-d91f6e66-af70-4b97-b0d0-3f3107c38b1c.png`

current public homepage reference: `/private/tmp/portfolio-before-1024.jpg`

implementation screenshot path: `/private/tmp/portfolio-after-dock-1024.jpg`

combined full-view comparison: `/private/tmp/portfolio-dock-before-after.jpg`

focused dock/mobile comparison: `/private/tmp/dock-reference-vs-mobile.jpg`

research desktop evidence: `/private/tmp/reducing-ai-energy-1440.jpg`

research mobile evidence: `/private/tmp/reducing-ai-energy-320.jpg`

viewport: matched public-before and local-after captures at `1024 × 800 CSS px`, desktop, dark theme, device density 1. Responsive checks also covered `320`, `390`, `768`, `960`, and `1440` CSS px in dark and light themes.

source pixels: supplied dock reference `172 × 1328`; current public homepage reference `1019 × 796`.

implementation pixels: desktop `1019 × 796`; mobile `315 × 768`.

density normalization: the public-before and local-after homepage images have identical pixel dimensions and were placed side by side without resampling. The supplied dock image is an inspiration crop rather than a same-screen mock; the focused comparison preserves its pixels and evaluates its shared-surface and icon hierarchy instead of claiming literal pixel equivalence.

state: homepage at the top of `/`, dark theme, navigation closed, hero animation settled. Additional states cover the open phone menu, light theme, About route, and the research hero.

**Full-view comparison evidence**

- `/private/tmp/portfolio-dock-before-after.jpg` places the current public homepage and the local implementation together at the same viewport and state.
- The Home circle is gone. About Me now belongs to the Kalkin identity group, while Live Demos, Selected Work, Speaking, and Contact sit in one shared translucent homepage dock. Scrape Me is immediately beside the theme control.
- The homepage-section dock is a single surface with no individual outlined pills. It borrows the reference’s visual grouping without copying desktop chrome or adding fake assets.
- The hero keeps the existing Space Grotesk, Inter, and JetBrains Mono stack, editorial spacing, and cyan-led palette. Type weight, wrapping, line height, and hierarchy remain consistent with the portfolio.
- The social links now use one shared launcher surface and genuine LinkedIn, GitHub, and WhatsApp SVG assets in compact app tiles. Individual outlined cards and duplicated secondary labels are absent.
- At 1440 px, Live Demo cards measure `485px` and Selected Work cards measure `388px`, a `1.25×` ratio. This is visibly larger without dominating the next section.
- Light-theme evidence at `/private/tmp/portfolio-after-dock-light-1024.jpg` confirms that the shared surfaces, shadows, borders, labels, and icons retain contrast without becoming heavy white cards.
- “Reducing AI’s Energy Footprint” replaces the abstract working title in visible copy, metadata, Article JSON-LD, `llms.txt`, About links, and reusable attribution. `— Gauraang Malik` appears directly beneath the H1.

**Focused region comparison evidence**

- `/private/tmp/dock-reference-vs-mobile.jpg` places the supplied macOS dock reference and the 320 px implementation together. Both use one containing surface, consistent icon tiles, compact labels, and strong grouping; the portfolio intentionally remains horizontal and web-native.
- At 320 px, the shared social launcher is `275 × 112`, each destination is approximately `82 × 92`, all three destinations remain visible in one row, and document width remains inside the viewport.
- The phone header contains Kalkin, theme, and menu only. The open menu visibly separates Pages (About Me, Scrape Me) from Homepage Sections (Live Demos, Selected Work, Speaking, Contact).
- At 768 and 960 px, About Me and Scrape Me remain visible in the header while the homepage dock moves into the menu. At 1024 px, all three navigation groups fit without overlap.
- `/private/tmp/reducing-ai-energy-320.jpg` confirms the longer research title wraps cleanly at 320 px, the byline remains attached to the title, and the lede stays readable without horizontal overflow.
- The About portrait remains an authentic `340 × 340` circle at desktop, matching the homepage portrait language rather than reverting to a stretched rectangle.

**Required fidelity surfaces**

- Fonts and typography: existing font families and optical hierarchy preserved; no clipped or truncated navigation, social, demo, or research-title text at tested widths.
- Spacing and layout rhythm: identity, homepage dock, and utility actions read as three groups; the social launcher has a single shared boundary; demo-to-project scale is controlled at 1.25× on wide desktop.
- Colors and tokens: existing cyan, muted text, surface, border, dark, and light tokens are reused; focus rings remain cyan and visible.
- Image quality and asset fidelity: supplied social SVGs, portfolio logo, demo concept WebPs, project media, and portrait remain intact. No placeholder, CSS-drawn icon, emoji, or fabricated screenshot was introduced.
- Copy and content: page labels match their routes; the article title explicitly communicates AI energy reduction and includes Gauraang Malik’s byline.

**Findings**

- No actionable P0, P1, or P2 findings remain.
- Accepted intentional difference: the supplied image is a vertical operating-system dock, while the site needs a responsive horizontal navigation and social launcher. The implementation carries over grouping, translucency, icon hierarchy, and shared-surface logic rather than cloning device chrome.
- P3: the homepage-section dock uses an `18px` radius to echo the reference. It can be squared further later if a sharper editorial treatment is preferred, but it no longer reads as multiple circular buttons.

**Comparison history**

1. Initial state.
   - P2: the circular Home control made the homepage look like a peer page rather than the parent of the section links.
   - P2: social destinations were three rigid outlined panels, which did not match the supplied app-dock grouping.
   - P2: the two-column Live Demo grid was roughly 1.5× the width of Selected Work cards on wide screens and remained visually dominant.
   - P2: “Intelligence in Place” did not state the article’s AI-energy purpose, and the author was not directly attached to the title.
2. Fixes made.
   - Removed the Home circle, moved About Me beside Kalkin, grouped homepage anchors in one dock, and placed Scrape Me beside the theme control.
   - Rebuilt social destinations as one app-style launcher with genuine brand assets and retained full-link hit areas.
   - Constrained the demo grid to `1000px`, producing a measured 1.25× desktop ratio against Selected Work.
   - Renamed the article “Reducing AI’s Energy Footprint” and added `— Gauraang Malik` immediately below the H1 across visible and machine-readable interfaces.
3. Post-fix visual evidence.
   - `/private/tmp/portfolio-dock-before-after.jpg`, `/private/tmp/dock-reference-vs-mobile.jpg`, `/private/tmp/reducing-ai-energy-1440.jpg`, and `/private/tmp/reducing-ai-energy-320.jpg` show the resolved desktop, phone, navigation, social, scale, and title states.
   - Result: no actionable P0/P1/P2 mismatch remains.

**Primary interactions tested**

- Desktop navigation at 1024 and 1440 px; tablet/mobile collapse at 960, 768, 390, and 320 px.
- Mobile menu open state, labels, scrolling bounds, close control, and page/section grouping.
- Dark/light theme switching and light-theme surface contrast.
- Full-card demo anchors, pointer cursor, `target="_blank"`, `rel="noopener noreferrer"`, and visible keyboard focus (`3px` cyan outline).
- Social-link destinations, new-tab attributes, and visible keyboard focus (`3px` cyan outline).
- About and Scrape Me current-page states, circular About portrait, local anchors, sitemap, `llms.txt`, CSS, JS, SVGs, and all edited routes.
- Reduced-motion CSS remains present. Static no-JavaScript navigation rules expose the homepage dock and page links while hiding the inoperable menu control.
- Browser console checked on the final local homepage: no console errors. Below-fold unloaded images were confirmed to be intentional `loading="lazy"` assets, and every referenced local asset returned HTTP 200.

**Implementation Checklist**

- [x] Remove the Home circle.
- [x] Place About Me beside Kalkin.
- [x] Group homepage-only anchors inside one shared dock.
- [x] Place Scrape Me beside the theme control.
- [x] Replace the social card rail with one app-style launcher surface.
- [x] Keep genuine social logos and full clickable destinations.
- [x] Make Live Demos only modestly larger than Selected Work.
- [x] Rename the research article and place Gauraang Malik’s byline below the H1.
- [x] Preserve routes, anchors, imagery, themes, reduced motion, semantic HTML, and machine-readable discovery.
- [x] Verify desktop, tablet, phone, dark, light, focus, overflow, links, and browser diagnostics.

**Follow-up Polish**

- P3: if the shared homepage dock should feel even more editorial, reduce its radius from `18px` to `14px`; no usability fix is required.

final result: passed
