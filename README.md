# anass.ch

Source for my bilingual portfolio. It is built with [Hugo](https://gohugo.io/) and [Blowfish](https://blowfish.page/). My blog is deployed separately at [blog.anass.ch](https://blog.anass.ch/).

## Requirements

- Hugo Extended `0.162.0` or later

## Run locally

Clone the repository with its theme:

```bash
git clone --recurse-submodules https://github.com/4nass/portfolio.git
cd portfolio
hugo server
```

If the repository is already cloned:

```bash
git submodule update --init --recursive
hugo server
```

## Project structure

- `content/`: bilingual pages, introduction and projects;
- `assets/css/custom.css`: typography, animated background, cards and visual refinements;
- `assets/img/`: profile image, Open Graph card and portfolio assets;
- `layouts/`: local Hugo overrides for the homepage, About, Projects, header, SEO, sitemap and robots;
- `static/`: favicon and other static assets;
- `themes/blowfish/`: the Blowfish theme, tracked as a Git submodule.

## Theme customisation

I use Hugo’s override mechanism for site-specific changes: files in `layouts/`, `assets/` and `static/` take precedence over the corresponding theme files.

These overrides cover:

- visual identity: Bricolage Grotesque, a Caveat signature, a light default theme, animated background and favicon;
- the homepage, About and Projects pages;
- GitHub cards and repository links;
- SEO: titles, descriptions, Open Graph, JSON-LD, `hreflang`, sitemap and `robots.txt`.

After a major Blowfish update, I check the overrides in `layouts/` and generate a production build before deploying.

## Update Blowfish

```bash
git submodule update --remote --merge themes/blowfish
hugo --environment production --minify
```

Then review the local rendering, especially the header, About and Projects pages, and the SEO metadata.

## Production build

```bash
hugo --environment production --minify
```

Hugo generates `robots.txt`, which references the root sitemap: `https://anass.ch/sitemap.xml`.
