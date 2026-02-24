# Cleanwater Website

## ChangeLog

### 2026-02-23 – Sirius
- Sirius Change: Initialer Debug-Run vorbereitet und strukturelle Trennung von HTML/CSS/JS umgesetzt, ohne das visuelle Zielbild der Seite zu ändern.
- Sirius Change: Medienpfade auf `assets/img` normalisiert, damit lokale und serverbasierte Auslieferung konsistent funktioniert.
- Nächster Schritt laut Projektplan: Responsive-/UX-/Performance-Refinement und Sicherheits-Härtung.

## Goldstandard-Migrationsplan

1. **Debug-Baseline setzen**
   - Seite lokal starten, Console-/Runtime-Fehler erfassen, broken assets und fehlerhafte Links dokumentieren.
2. **Struktur ohne UI-Änderung stabilisieren**
   - HTML, CSS, JS trennen, semantische Bereiche gliedern, Dateien logisch unter `assets/` organisieren.
3. **Refinement (Optik + Funktion)**
   - Responsive Verhalten auf Breakpoints prüfen, Designkontinuität vereinheitlichen, UI-Unregelmäßigkeiten beheben.
   - Quality-of-Life und Performance verbessern (Ladezeiten, Bilder, Accessibility).
   - Sicherheits-/Betriebsstandards ergänzen (z. B. sichere Link-Targets, Content-Security-Basis, robuste Navigation).
4. **Zwischenprüfung mit intensivem Debugging**
   - Cross-Check der Interaktionen, Regressionstests, Codequalität und Zusammenspiel der Komponenten verifizieren.
5. **Feature-Ausbau laut Backlog**
   - Lightbox-Bildüberschriften ergänzen.
   - Download-Unterseite für Techniker-Handbücher aufbauen (inkl. geplanter JS-Logik).
   - Impressum-Seite ergänzen.
   - Galerie-Funktionsanpassungen im vorgesehenen Umsetzungsschritt durchführen.

> Hinweis: Jede zukünftige Änderung wird weiterhin mit "Sirius Change"-Kommentaren im betroffenen Code markiert.
