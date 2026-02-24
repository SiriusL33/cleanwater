# Cleanwater Website

## ChangeLog

### 2026-02-23 – Sirius
- Sirius Change: Initialer Debug-Run vorbereitet und strukturelle Trennung von HTML/CSS/JS umgesetzt, ohne das visuelle Zielbild der Seite zu ändern.
- Sirius Change: Medienpfade auf `assets/img` normalisiert, damit lokale und serverbasierte Auslieferung konsistent funktioniert.
- Nächster Schritt laut Projektplan: Responsive-/UX-/Performance-Refinement und Sicherheits-Härtung.

### 2026-02-24 – Sirius
- Sirius Change: Bildpfade in `index.html` auf `../assets/img/...` zurückgesetzt, damit die von dir genannte XAMPP/WSL-Struktur mit gemeinsamem `assets`-Ordner korrekt funktioniert.
- Sirius Change: Zusätzliche Inline-Kommentare an den geänderten Stellen ergänzt (Funktion + Kurzbeschreibung).

### 2026-02-24 – Sirius (WSL Setup)
- Sirius Change: Dokumentation um einen klaren WSL-Terminal-Ablauf ergänzt, damit das Projekt reproduzierbar eingerichtet und lokal gestartet werden kann.

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

## WSL-Setup (VS Codium Terminal)

> Ziel: Projekt in WSL sauber anlegen, im Browser lokal testen und optional mit XAMPP-Ordnerstruktur arbeiten.

### 1) WSL aktualisieren und Basis-Tools installieren
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl unzip python3 python3-pip
```

### 2) Projektordner in WSL anlegen
```bash
mkdir -p ~/projects
cd ~/projects
mkdir -p cleanwater
cd cleanwater
```

### 3) Projekt in VS Codium öffnen
```bash
codium .
```

### 4) Benötigte Struktur anlegen
```bash
mkdir -p assets/css assets/js
mkdir -p ../assets/img
```

### 5) Lokalen Testserver starten
```bash
cd ~/projects/cleanwater
python3 -m http.server 4173
```
Dann im Browser öffnen: `http://localhost:4173`

### 6) Optional: XAMPP-htdocs über WSL nutzen
```bash
cd /mnt/c/xampp/htdocs
mkdir -p cleanwater
cd cleanwater
```
Wenn eure Bilder eine Ebene höher liegen sollen, muss die Struktur z. B. so sein:
- `/mnt/c/xampp/htdocs/cleanwater/index.html`
- `/mnt/c/xampp/htdocs/assets/img/...`

### 7) Schneller Debug-Check für fehlende Assets
```bash
# im Projektordner
python3 -m http.server 4173
# in zweitem Terminal
curl -I http://localhost:4173/index.html
curl -I http://localhost:4173/assets/css/styles.css
curl -I http://localhost:4173/assets/js/main.js
```

