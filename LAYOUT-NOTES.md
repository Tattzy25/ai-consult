# Where the products go — decision note

**Shipped:** `facetime-shopping.html` (single file, zero deps, works offline / in-app preview).
**Tested:** `smoke.js` — 19 runtime assertions, all passing (`NODE_PATH=<jsdom> node smoke.js`).

## The call I made for you

Your image-4 Canva mock puts a 12-item grid in the middle of the call face. That's the one
thing I changed, because during a live call the center is *the host's face / the shared 3D
object* — a permanent center grid covers the reason people are on the call, and it can't
adapt when a batch has 4 items or 40.

Instead, products live in three escalating layers, all rendering **4 at a time**:

| Layer | What | When |
|---|---|---|
| 1 · **Live Shelf** | Glass strip docked above the call controls. 4 compact cards, dots + arrows + 8s auto-rotate (pauses on hover / when an overlay is open). | Always. Zero obstruction of blob + host tile. |
| 2 · **Detail sheet** | Tap a card → centered sheet: big thumb, stars, price, add-to-bag. Backdrop-blur, call still visible behind. | "Tell me about this one." |
| 3 · **Browse overlay** | Bag button → your Canva grid as a *state*: 4 bigger cards per page (desc + add button), paginated. Esc / ✕ returns to the call. | "I want to shop, not watch." |

Why the bottom dock wins: thumb-reach zone on a tablet, never covers faces, reads as part of
the call UI (same glass language as the control pill), and it degrades gracefully — with 4
items it's one row, with 400 it's just more dots.

## Alternatives I considered (swap if you disagree — all are ~20-line CSS changes)

- **Left/right vertical rail** (TikTok Live style): good for portrait phones, wasteful on a
  16:10 landscape stage; eats width from the blob.
- **Center grid (your Canva mock, literal)**: fine only as the browse *overlay* — which is
  exactly where I put it.
- **Picture-in-picture card over the host tile**: highest urgency feel, but covers the host;
  use later for "host just pinned this item" moments, not for the whole catalog.

## Feeding it real, unknown data (global search / any storefront / generative UI)

```js
window.ShopRenderer.push(batchArrayOrSingleItem)  // append; auto-chunked into pages of 4
window.ShopRenderer.clear()
window.ShopRenderer.state                          // { items, cart, page, pages }
```

The normalizer is schema-agnostic on purpose, because you don't know who installs the app:
`title|name|product_name|heading`, `price|amount|current_price|sale_price` (number or
`"$19.99"`), `compareAt|original_price|list_price`, `currency`, `rating|stars` (0–5, 0–10 or
0–100), `reviews|review_count`, `badge|tag`, `image|img|image_url|thumbnail`,
`description|desc`. Unknown fields ignored.

**Generative-UI fallbacks** (the "we don't know what's coming" insurance):
no image → deterministic gradient (hashed from title) + category emoji; no price → `—`;
no rating → stars hidden; long titles → 2-line clamp; SALE badge auto-derived when
`compare > price`. So even a bare `{title}` object renders a decent card.

## Hooking your renderer

Wherever your 4-at-a-time batches arrive (websocket, SSE, AI tool call), just call
`ShopRenderer.push(batch)`. The `+ batch` chip top-left of the stage is a stand-in for that
call during demos — it pushes deliberately inconsistent schemas to prove the normalizer.
