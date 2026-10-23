# Temporary image assets

All images are for design review. Replace them with authorised LIM imagery before production. They do not establish any affiliation or document LIM events.

| Asset                                       | Source / purpose                                                                                                                                                 |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/community-illustration.webp` | Built-in imagegen, fictional community gathering; visible AI label on homepage and descriptive alt text throughout.                                              |
| `public/images/volunteer.webp`              | Unsplash photo `1559027615-cd4628902d4a`, a volunteer at an event; illustrative only. [Image source](https://images.unsplash.com/photo-1559027615-cd4628902d4a). |
| `public/images/together.webp`               | Unsplash photo `1529156069898-49953e39b3ac`, friends together outdoors. [Image source](https://images.unsplash.com/photo-1529156069898-49953e39b3ac).            |
| `public/images/architecture.webp`           | Adam Marikar, Alhambra courtyard, Spain. [Unsplash source](https://unsplash.com/photos/VaN-9A3bTjI). Not the National Mosque Project or a proposed design.       |

Images were downloaded to the project and compressed as WebP. No third-party image requests occur at runtime.

## Final hero prompt

Generated with the built-in imagegen tool, not the CLI fallback:

> Use case: photorealistic-natural. Asset: website prototype hero illustration. Create an editorial photograph-style image of a fictional, welcoming Muslim community gathering in a modest leafy courtyard in southeastern Europe. Five adults of varied ages around a simple long wooden table sharing bread, tomatoes, tea and conversation. Two women in understated cream and olive hijabs, men in casual modest linen shirts. Candid natural gestures, relaxed sincere expressions, nobody looking at camera, no posing or exaggerated smiles. Eye-level 50mm lens, quiet premium documentary aesthetic, soft late afternoon light, muted olive foliage and warm limestone, natural skin textures, gentle film grain, accurate hands. Portrait 4:5 composition with the people and table in middle and lower half and leafy trees above, suitable for an arch-shaped crop. No mosque, no luxury decor, no text, no logos, no watermark. These are fictional people, not a real organization or event.

The original generated PNG remains in the Codex generated-images library. The optimized project asset is `public/images/community-illustration.webp`.
