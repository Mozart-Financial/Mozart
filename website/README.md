# Mozart careers site

This isolated site snapshot includes the production marketing page and careers pages.

Edit job titles, summaries, details, and section text in `content/careers.json`. Each object under `roles` is one job description. Set `isOpen` to `false` to remove a role from the listing and generated role pages. `applicationEmail` is `parth@mozart.financial`; role Apply buttons open a Gmail compose page with a prefilled recipient and subject. A role-specific `applyUrl` can override its destination.

After edits, run `npm run build` to regenerate `dist/careers.html` and `dist/careers/*.html`. Run `npm test` for the existing calculator checks.

The full-time compensation ranges in the source PDF were marked placeholders, so they are omitted. The accounting internship did not specify compensation. All locations are NYC.
