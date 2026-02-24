# Debug-Baseline: `index.html`

Stand: 2026-02-24

## Ziel
Systematische Erstaufnahme für:
1. Browser-Console-Fehler
2. fehlende Assets
3. defekte Anker/Links

## Reproduzierbare Schritte

### 1) Lokalen Webserver starten
```bash
python3 -m http.server 4173
```

### 2) Seite im Browser öffnen
- URL: `http://127.0.0.1:4173/index.html`

### 3) Console-Fehler erfassen (DevTools)
1. DevTools öffnen (`F12`)
2. Tab **Console**
3. Seite neu laden
4. Anzahl und Inhalt aller roten Fehler protokollieren

### 4) Fehlende Assets erfassen (DevTools)
1. Tab **Network**
2. Seite neu laden
3. Nach Status `404` filtern
4. Alle fehlgeschlagenen Requests mit URL + Status dokumentieren

### 5) Defekte Links/Anker prüfen
1. Alle `a[href]` prüfen
2. Für Dokument-Links (`.pdf`, `.png`, etc.): HTTP-Status kontrollieren
3. Für Hash-Anker (`#...`): prüfen, ob ein Element mit passender `id` existiert

---

## Baseline-Metriken

| Metrik | Wert |
|---|---:|
| Console Errors | 1 |
| HTTP 404 Requests (Initial Load) | 1 |
| Defekte Dokument-Links | 3 |
| Defekte Hash-Anker | 1 |

## Gefundene Fehler (inkl. Priorisierung)

### A) Umgebungsfehler (lokal fehlende Dateien)
1. `cleanwater-infobroschuere.pdf` → 404
2. `installationsanleitung.pdf` → 404
3. `zertifikat.png` → 404

**Einschätzung:** Diese drei Dateien sind im Projekt-Root nicht vorhanden und blockieren Download-Buttons lokal.

### B) Codefehler (HTML/Asset-Referenzen)
1. Hero-Bild lädt nicht: `../assets/img/Gerät.jpg` → 404
   - im Repository vorhanden ist stattdessen: `assets/img/Cleanwater Gerät.jpg`
   - Ursache: Dateiname/Pfad in HTML stimmt nicht mit realer Datei überein.
2. Footer-Link `#impressum` ist defekt
   - `href="#impressum"` vorhanden, aber kein Element mit `id="impressum"` im Dokument.

---

## Start-Prioritäten (Fix-Reihenfolge)
1. **Codefehler zuerst** (schnell behebbar, direkt sichtbar):
   - Hero-Bildpfad korrigieren
   - fehlende `#impressum`-Sektion ergänzen oder Link entfernen/anpassen
2. **Umgebungsfehler danach**:
   - fehlende Download-Dateien bereitstellen oder Links temporär deaktivieren

## Erfolgskriterien für nächsten Lauf
- Console Errors: **0**
- HTTP 404 (Initial Load): **0**
- Defekte Dokument-Links: **0** (oder bewusst deaktiviert)
- Defekte Hash-Anker: **0**
