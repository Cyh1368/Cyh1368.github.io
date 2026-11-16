# Cyh1368.github.io

Personal site: a static `index.html` and `src/styles.css`, deployed to `gh-pages` by `.github/workflows/deploy.yml`.

The previous al-folio/Jekyll site is kept in `_archive/jekyll-site/` (not published). It is also recoverable from git tag `pre-revision-v1` and branch `archive/pre-revision-v1`.

The Home, Research, and Contacts tabs share animated navigation, including when
opened directly as local files. After editing page content, run
`python3 tools/build_page_cache.py` to refresh `src/pages.js`. Deployment also
regenerates this bundle automatically.
