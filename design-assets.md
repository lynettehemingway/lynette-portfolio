# Koi portfolio artwork

## Interactive 3D pond

- Entry: the koi button in the intro, opening a full-viewport dialog.
- Renderer: `src/components/ImmersivePond/pondScene.js`, loaded on demand with Three.js.
- Koi bodies, fins, lilies, lotus flowers, stones, water and caustics are procedural geometry/shaders; no external models or image services are needed at runtime.
- Reflections are original writing inspired by Lynette's stated INFJ type, Virgo sign, and interest in people. Each koi has its own conversational prompt.
- Supports touch feeding, orbit/pinch navigation, keyboard-accessible controls, reduced-motion pause, and a fallback when WebGL is unavailable.

## Botanical portrait

- Source portrait: `src/assets/me.jpg` (preserved).
- Supporting artwork: `src/assets/koi-cutout.png`.
- Website asset: `src/assets/lynette-botanical.png`.
- Prepared with the built-in image-generation tool; inspected before use.

Prompt:

> Use case: identity-preserve and compositing. Edit target image 1: the real portrait of Lynette. Supporting artwork image 2: her illustrated sage and cream koi. Create an editorial portfolio portrait collage, portrait 4:5 format. Preserve the woman EXACTLY as photographed: identical face, eyes, smile, skin tone, hairstyle, pose, black blazer and white shirt. Do not beautify, redraw, change clothing, change pose, or change identity. Use the original photographic person, cropped from head to waist, large and central. Replace ONLY the tree/wooded background with warm ivory paper (#f0ede5), a softly irregular watercolor sage-green shape behind her, subtle hand-painted lotus leaves and pale cream/pink lotus flowers along the bottom left edge, delicate flowing pond lines, and a small version of the provided koi illustration at the lower right outside the person's body. Sophisticated restrained cream and sage botanical collage. Soft organic edges at the bottom of the torso merge with paper. Her entire head and hair must remain intact and unobscured. The person remains photorealistic, botanical surroundings are watercolor and fine ink. Do not add any text, letters, labels, stamps, logos, or watermarks. This is a portrait asset, not a website screenshot.

## Koi cutout

- Source supplied by the user: `C:/Users/dolph/Downloads/koilh.png`
- Website asset: `src/assets/koi-cutout.png`
- Prepared with the built-in image-generation tool (background extraction).
- Output checked as RGBA with transparent and opaque pixels. The original file was preserved.

Prompt:

> Use case: background-extraction. Edit target: the provided koi illustration. Remove ONLY the surrounding white paper background and return a genuinely transparent RGBA PNG cutout. Preserve the entire koi exactly: same pose, fins, whiskers, pencil/ink contours, muted sage green and warm cream watercolor fills, proportions and texture. Keep the light-colored interior of the fish opaque. Crop excess surrounding empty space leaving a small transparent margin around every fin and whisker. No new objects, no shadow, no text, no water, no background.
