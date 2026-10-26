# Languages

English uses the original routes. Romanian uses `/ro/` and Russian `/ru/`; all 17 content pages are statically generated in each language. Language links preserve the current route, query string and section anchor. Reloading a localized URL keeps its language. No translation service, browser storage or tracking is used.

The supplied LIM seal remains unchanged. The accompanying wordmark switches between English, Romanian and Russian in both the header and footer. Cyrillic font subsets are included.

`src/i18n/messages.json` maps English source messages to `[Romanian, Russian]`. `Text` renders translated text without adding DOM elements; localized link, image and accessibility helpers translate their appropriate attributes. Internal links preserve the language. Form option values remain stable, while labels, validation, review choices and completion messages are translated. Free-text user entries are never translated. Dates and contribution amounts use `Intl` formatting.

`LocaleDocument` renders the correct HTML language during static rendering and updates it during client navigation. Localized pages include translated metadata and alternate-language links. The existing native page transitions remain active.

PDF downloads remain the original English sample documents, explicitly identified as English in Romanian and Russian download labels. They are examples, not official publications. Translations are prototype copy and should receive organisational language review before official use.

Add new messages to both translation columns and render them through the helpers. Keep route slugs and submission values language-independent. `tests/i18n.spec.ts` checks all localized routes, metadata, responsive widths, representative accessibility scans, language switching and translated form journeys.
