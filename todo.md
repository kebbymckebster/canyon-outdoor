# Canyon Outdoor Interface Revision

- [x] Inspect the supplied Skiper UI reference and record the relevant navigation, hierarchy, and interaction patterns.
- [x] Map the adopted patterns to Canyon Outdoor while preserving its Pacific Monolith brand direction and content scope.
- [x] Implement the revised menu and page-format structure, then verify desktop and mobile behavior.

## Simplified Environmental Redesign

- [x] Inspect the supplied SaaS reference and identify usable environmental UI patterns without adopting its product branding.
- [x] Replace the current display/body typography with a clearer modern system and remove nonessential labels, counts, arrows, and specification language.
- [x] Integrate the Canyon Outdoor logo and full name into the floating menu, removing the separate Start a Project action.
- [x] Generate and apply lusher modern landscape concepts with convincing vegetation and fire or water features.
- [x] Verify the revised desktop and mobile experience, including a more credible before-and-after relationship.

## Visual Editor Follow-up

- [x] Remove the selected decorative marks and line treatments from the branded header and targeted concept panel.
- [x] Rebuild the targeted concept area as a fuller outdoor living presentation with greenery, a pool or water feature, and modern gathering-space elements.
- [x] Verify the manual corrections at desktop and mobile sizes, then save a new checkpoint.

## Menu-First Multi-Page Refactor

- [x] Replace the visible desktop page links with a brand-and-menu-only top bar.
- [x] Move the current single-page sections into dedicated Work, Services, Process, About, and Contact routes reached through the menu.
- [x] Blend the home hero image seamlessly into the page surface and remove em dashes from all updated copy.
- [x] Verify direct route navigation, menu behavior, hero rendering, and mobile layouts before saving a checkpoint.

## Compact Navigation and Distributed Contact

- [x] Reduce the top bar to a compact logo-and-menu control without unused horizontal space.
- [x] Remove Contact from the menu and routing, then replace the standalone contact page with a reusable form component.
- [x] Add the contact form to Home, Work, Services, Process, and About pages with consistent interaction and submission feedback.
- [x] Verify the compact header and form placement across desktop and mobile routes before saving a checkpoint.

## Contact Modal and Legal Pages

- [x] Remove the repeated page-level inquiry forms and add a top-bar contact control beside the Menu button.
- [x] Reintroduce the detailed multi-step inquiry questions in a background-blurring contact modal.
- [x] Write and route readable Privacy Policy and Terms of Service pages, then link both from the footer.
- [x] Verify the contact modal, legal-page routes, footer links, and mobile layout before saving a checkpoint.

## Secure Deployment and Final Content Revision

- [x] Audit frontend and server code for inputs, endpoint exposure, secrets, credentials, file handling, and the current contact flow.
- [x] Add secure server-side inquiry handling with validation, rate limits, safe logging, and clear client error feedback; keep secrets server-only.
- [x] Center the compact top bar, repair contact-modal contrast, and add the non-contractor business-scope disclosure where appropriate.
- [x] Move concise About content onto Home, remove the About page and menu entry, and expand Work with water-slide, grotto, outdoor-kitchen, and swim-up-bar concepts.
- [x] Scan the project for exposed credentials, verify routes and security controls on desktop and mobile, and save a checkpoint.

## Contact Modal Visual-Editor Review

- [x] Inspect and repair unintended inline styling or invalid markup from the applied modal color edit.
- [x] Verify the corrected contact-modal contrast and save a checkpoint.

## Contact Modal Green Color Review

- [x] Clean redundant inline styling and invalid markup from the green modal color edit while preserving the requested #1b2e20 heading color.
- [x] Verify the corrected green heading and save a checkpoint.

## Home Page Green Color Review

- [x] Clean redundant inline styling and invalid markup from the Home About-section color edit while preserving the requested #1b2e20 heading color.
- [x] Verify the cleaned Home section and save a checkpoint.

## Loading, Delivery, and Discoverability Pass

- [x] Audit initial loading, inquiry-delivery configuration, metadata, image delivery, accessibility, and current runtime or build defects.
- [x] Add ghost loading imagery and text states, apply #1b2e20 to all contact-question headings, and optimize image loading behavior.
- [x] Configure server-side inquiry email delivery using a secure provider credential and recipient address, with safe delivery-error handling.
- [x] Add page metadata, canonical URLs, sitemap, robots directives, structured data, and accessibility improvements for search and AI discovery.
- [x] Run comprehensive tests, build, production SSR, and responsive accessibility checks, then save a verified checkpoint.

## Loading Lifecycle Correction

- [x] Keep the ghost loading shell visible until the full initial route is ready, including non-Home routes without a hero image.
- [x] Verify the loading shell lifecycle across Home, Work, Services, Process, Privacy, and Terms without a flash or premature dismissal.

## Updated Inquiry Recipient

- [x] Update the secure inquiry recipient to keanebaggettcanyongroup@gmail.com and activate delivery through the configured Formspree endpoint.

## Formspree Delivery

- [x] Replace the blocked Resend sender dependency with the supplied Formspree endpoint while retaining server-side validation, rate limits, and safe delivery-error handling.
- [x] Validate Formspree delivery configuration and confirm a completed inquiry is accepted by the server without exposing the endpoint in frontend code.

## Evidence-Based Final Validation

- [x] Submit one clearly labeled test inquiry through the actual server inquiry procedure and verify its accepted and delivered security events.
- [x] Verify each public route’s loader removes only after the document and non-lazy images are ready, with no error path that can trap the page.
- [x] Run an explicit static accessibility audit of public routes and document any remaining manual-review items.
- [x] Correct the repeated-primary-heading issue identified by the route audit, preserving one h1 per public route and semantic h2 section headings.

## Production SSR Correction

- [x] Fix the bundled production SSR entry resolution so crawlers receive rendered route content and metadata rather than a client-only shell.
- [x] Defer CANONICAL_ORIGIN until a free published HTTPS address is available; no custom-domain purchase is required, and the setting can be added later for absolute canonical, Open Graph, sitemap, and robots URLs.
