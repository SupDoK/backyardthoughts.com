# 🌻 Backyard Thoughts

A static, hand-tended Jekyll blog. Drop a markdown file in a folder, `git push`, done.

---

## 1. First-time setup

1. **Create a repo on GitHub.**
   - For a personal site at `https://yourusername.github.io`: name the repo **`yourusername.github.io`**.
   - For a project site at `https://yourusername.github.io/backyardthoughts`: name the repo whatever you want and open `_config.yml` and set `baseurl: "/backyardthoughts"`.
2. **Push these files into it:**
   ```bash
   git init
   git add .
   git commit -m "🌱 plant the garden"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourrepo.git
   git push -u origin main
   ```
3. **Turn on Pages:** GitHub → your repo → **Settings → Pages** → "Build and deployment" → Source: **Deploy from a branch** → Branch: **main**, folder: **/ (root)** → Save.
4. Wait ~1 minute. Your site appears at the URL Pages shows you. GitHub builds Jekyll automatically — no GitHub Actions needed.
5. **Custom domain (`backyardthoughts.com`):**
   - In Pages settings, add the custom domain.
   - At your domain registrar, point an `A` record to GitHub's Pages IPs (or a `CNAME` to `yourusername.github.io`). GitHub's docs cover this.
   - Once it resolves, set `url:` in `_config.yml` to `https://backyardthoughts.com` and commit.

---

## 2. Adding a new article

> The whole game: **drop a `.md` file into the right folder, push, done.**

### Folders → categories

| Folder       | Category          |
| ------------ | ----------------- |
| `_recipes/`  | Recipes           |
| `_beauty/`   | Beauty            |
| `_eats/`     | Places to Eat     |
| `_thoughts/` | Everyday Thoughts |

### File name

Use `YYYY-MM-DD-some-slug.md`, e.g. `2026-06-01-strawberry-jam.md`. The slug becomes part of the URL.

### Front matter (the bit at the top between `---` lines)

Minimum:

```yaml
---
title: My post title
date: 2026-06-01
tags: [tag-one, tag-two]
---
```

Optional but nice:

```yaml
cover_image: /assets/images/my-photo.jpg
cover_alt: A short description of the image for accessibility.
cover_caption: A small caption shown under the image.
excerpt: A 1–2 sentence teaser shown on listings. (Otherwise pulled from the first paragraph.)
```

Below the closing `---`, write your post in plain markdown. Headings, lists, links, images, blockquotes — all standard.

### Images

Put image files in `assets/images/` (or a subfolder). Reference them like:

```markdown
![Alt text](/assets/images/my-photo.jpg)
```

The cover image (used at the top of the post and on the listing card) is set via the `cover_image:` front-matter field above.

---

## 3. Posting to "Everyday Thoughts"

`_thoughts/` posts need **one extra field**: `subcategory`. The five allowed values are:

| `subcategory:` value   | Shows up under     |
| ---------------------- | ------------------ |
| `tiny-luxuries`        | Tiny Luxuries      |
| `adoro`                | Adoro              |
| `my-go-to-orders`      | My Go-To Orders    |
| `let-me-explain`       | Let Me Explain     |
| `movie-suggestions`    | Movie Suggestions  |

Example:

```yaml
---
title: A linen pillowcase
date: 2026-06-01
subcategory: tiny-luxuries
tags: [home, sleep]
---
```

### 🌻 Sunflower rating (movie suggestions only)

For `subcategory: movie-suggestions`, add a `sunflowers:` field with a number from **1 to 5**:

```yaml
---
title: Amélie
date: 2026-06-01
subcategory: movie-suggestions
sunflowers: 5
tags: [french, comfort]
---
```

The rating renders as filled / outlined sunflowers next to the title — both on the post page and on the listing cards. It only appears for movie posts; everything else ignores the field.

---

## 4. Editing the look

- **Colors and fonts:** `assets/css/main.scss` — top of the file has CSS variables (`--cream`, `--pink`, `--green`, etc.). Change them globally from there.
- **Header text / logo:** `_includes/header.html`.
- **Footer copy:** `_includes/footer.html`.
- **Cursor flowers (variety, color, frequency):** `assets/js/cursor-flowers.js`. The array of inline SVGs at the top is what gets spawned.

---

## 5. Local preview (optional)

You don't have to do this — GitHub will build for you on every push — but if you want a local preview:

```bash
# macOS: brew install ruby
# (use a Ruby manager like rbenv/asdf so you're not on system Ruby)

bundle install
bundle exec jekyll serve --livereload
# open http://localhost:4000
```

---

## 6. Folder map

```
.
├── _config.yml              ← site config + collections
├── Gemfile                  ← for local preview only
├── index.html               ← homepage
├── _layouts/                ← page templates (default, post, category)
├── _includes/               ← reusable bits (header, footer, cards, sunflower rating)
├── assets/
│   ├── css/main.scss
│   ├── js/cursor-flowers.js
│   └── images/              ← put your post images here
├── _recipes/                ← drop a .md file here → Recipes
├── _beauty/                 ←                       → Beauty
├── _eats/                   ←                       → Places to Eat
├── _thoughts/               ←                       → Everyday Thoughts (set subcategory in front matter)
├── recipes/index.html       ← /recipes listing page
├── beauty/index.html        ← /beauty
├── eats/index.html          ← /eats
└── thoughts/                ← /thoughts and its 5 subcategory pages
    ├── index.html
    ├── tiny-luxuries.html
    ├── adoro.html
    ├── my-go-to-orders.html
    ├── let-me-explain.html
    └── movie-suggestions.html
```

Grow slowly, with sunlight. 🌻
