# Canyon Outdoor Accessibility Review

**Review date:** August 17, 2026

The public routes were checked through production-rendered HTML and a headless-browser runtime pass. The automated checks confirmed that every public route has a page title, meta description, canonical URL, Open Graph title, loading shell, skip-to-main-content link, one `main` landmark, exactly one `h1`, and alternative text attributes on all rendered images. The runtime pass further confirmed that the loading shell is dismissed after the route becomes ready on Home, Work, Services, Process, Privacy, and Terms.

| Confirmed control | Coverage |
| --- | --- |
| Skip navigation | Links to `#main-content` on every public route |
| Landmark structure | One `main#main-content` landmark on every public route |
| Heading structure | Exactly one `h1` per public route |
| Image text alternatives | All currently rendered `img` elements include an `alt` attribute |
| Loading state | Runtime dismissal verified on all six public routes |
| Responsive review | Desktop and mobile route screenshots reviewed |

## Remaining Manual Review Before Publication

Before publishing, conduct a keyboard-only pass on the final public domain to confirm visible focus treatment and logical tab order for the menu and multi-step inquiry modal. Test the inquiry success and validation messages with a screen reader, including the focus placement when the modal opens and closes. Finally, recheck color contrast whenever photography, copy, or branded color tokens change, and have counsel review the Privacy Policy and Terms of Service for business-specific legal requirements.
