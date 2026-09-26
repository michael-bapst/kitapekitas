# Kita Pekitas – Website

Statische Website der Kita Pekitas, Kilchberg ZH. Nur HTML, CSS und JS, kein Framework, kein Build-Schritt, kein Backend.

- **Live (Test):** https://michael-bapst.github.io/kitapekitas/
- **Ziel-Domain:** https://kitapekitas.ch/
- **Hosting:** GitHub Pages, Deploy from branch `main` / `(root)`

## Struktur

| Pfad | Inhalt |
|---|---|
| `*.html` | Deutsche Seiten (Standardsprache) |
| `en/*.html` | Englische Seiten |
| `es/*.html` | Spanische Seiten |
| `css/style.css` | Gesamtes Styling. Farben, Abstände und Radien als Tokens in `:root` |
| `js/main.js` | Öffnungsstatus, Formulare, Galerie-Lightbox, Bewertungs-Karussell, „Weiterlesen“ |
| `img/` | Alle Bilder als WebP in mehreren Grössen (`-xs`, `-sm`, `-md`, `-lg`) |
| `fonts/` | Averia Serif Libre und Open Sans, lokal eingebunden (keine Google-Verbindung) |
| `404.html` | Fehlerseite (deutsch, mit Links zu EN und ES) |
| `sitemap.xml`, `robots.txt` | SEO, alle drei Sprachen mit `hreflang` |
| `.nojekyll` | GitHub Pages liefert die Dateien unverändert aus |

### Seiten und Dateinamen

| Deutsch | Englisch | Spanisch |
|---|---|---|
| `index.html` | `en/index.html` | `es/index.html` |
| `ueber-uns.html` | `en/about-us.html` | `es/sobre-nosotros.html` |
| `team.html` | `en/team.html` | `es/equipo.html` |
| `betreuung.html` | `en/care.html` | `es/cuidado.html` |
| `infrastruktur.html` | `en/infrastructure.html` | `es/instalaciones.html` |
| `tarife.html` | `en/prices.html` | `es/tarifas.html` |
| `galerie.html` | `en/gallery.html` | `es/galeria.html` |
| `kontakt.html` | `en/contact.html` | `es/contacto.html` |
| `datenschutz.html` | `en/privacy.html` | `es/privacidad.html` |

## Wie umgesetzt

- **Mobile first:** Unten eine Tab-Navigation, deren Button „Mehr“ ein Menü mit allen Seiten öffnet (natives `popover`, kein JS). Ab 1024 px Navigation oben.
- **Sprachen:** Umschalter DE | EN | ES im Header. Er führt immer auf dieselbe Seite in der anderen Sprache.
- **Formulare** (Tarife → Platz anfragen, Kontakt): Senden per `fetch` an **FormSubmit** (`https://formsubmit.co/ajax/info@kitapekitas.ch`).
  - Die Feldnamen gehen immer auf Deutsch an die Kita (`data-key`). Dazu kommen ein Feld „Sprache“ und eine Antwortadresse (Reply-To).
  - Spam-Schutz über ein verstecktes Honeypot-Feld (`_honey`).
  - Der Endpoint steht als `ENDPOINT` oben in `js/main.js`.
- **Cache:** CSS und JS werden mit Versionsnummer eingebunden (`style.css?v=…`), damit Besucher Änderungen sofort sehen.
- **Performance:** WebP-Bilder mit `srcset`, Lazy-Loading, vorgeladene Schriften und Hero-Bild, keine Drittanbieter. Lighthouse Mobile: Speed 90–100, Barrierefreiheit, Best Practices und SEO je 100.

## Inhalte ändern

- **Text ändern:** direkt in der HTML-Datei, und zwar **in allen drei Sprachen** (DE, EN, ES). Header und Footer stehen in jeder Datei.
- **CSS oder JS geändert:** In allen HTML-Dateien die Versionsnummer `?v=…` bei `style.css` und `main.js` ändern (Suchen und Ersetzen), sonst sehen Besucher bis zu 10 Minuten die alte Version.
- **Neues Bild:** als WebP in `img/` ablegen, möglichst in zwei Grössen (`name-sm.webp` ca. 640 px, `name-lg.webp` ca. 1280 px), und `width`/`height` im `<img>` angeben.
- **Öffnungszeiten:** in den HTML-Dateien (Footer, Kontakt) **und** in `js/main.js` (`HOURS`, für „Jetzt geöffnet“) anpassen.
- **Tarife:** in `tarife.html`, `en/prices.html` und `es/tarifas.html`.

## Für die Produktion zu tun

1. **Formulare aktivieren (einmalig):** In der Mail von FormSubmit an info@kitapekitas.ch auf „Activate Form“ klicken (auch den Spam-Ordner prüfen). Bis dahin sehen Besucher beim Absenden einen Hinweis mit der E-Mail-Adresse.
2. **Domain kitapekitas.ch verbinden:**
   - GitHub → Settings → Pages → Custom domain: `kitapekitas.ch` eintragen.
   - Bei Hoststar im DNS:
     - `A`-Records für `kitapekitas.ch` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     - `AAAA`-Records → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
     - `CNAME` für `www` → `michael-bapst.github.io`
   - Wenn der Haken grün ist: **Enforce HTTPS** aktivieren.
   - Danach FormSubmit eventuell nochmals aktivieren (neue Domain).
3. **Alte Adressen umleiten (empfohlen):** Die alte Seite hatte andere Pfade (`/über-uns`, `/kontakt`, `/tarife-anmeldung`, `/galerie`, `/en/home` …). GitHub Pages kann nicht serverseitig umleiten. Für wichtige alte Links kleine Weiterleitungsseiten anlegen oder akzeptieren, dass sie auf die 404-Seite führen.
4. **Google Search Console:** Domain bestätigen und `https://kitapekitas.ch/sitemap.xml` einreichen.
5. **Alte Website abschalten:** Den Hoststar-Baukasten (BaseKit) erst nach erfolgreicher DNS-Umstellung beenden. Der frühere Login-Bereich „Fotos 2025“ wurde nicht übernommen.
6. **Inhalte gegenlesen:** neue Überschriften wie „Faire Tarife, alles inklusive“ und „Aus einem Traum wurde Pekitas“, die Übersetzungen (EN, ES) und die Datenschutzerklärung (rechtlich prüfen lassen).
