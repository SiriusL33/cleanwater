# Debug-Baseline: `index.html`

Stand: 2026-02-24

## Ziel
Systematische Erstaufnahme für:
1. Browser-Console-Fehler
2. fehlende Assets
3. defekte Anker/Links

## Reproduzierbare Schritte

### 1) Entwicklungsserver starten (Vite)
```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

### 2) Seite im Browser öffnen
- URL: `http://127.0.0.1:4173/`

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

## Messung A – Vor dem Fix

| Metrik | Wert |
|---|---:|
| Console Errors | 1 |
| HTTP 404 Requests (Initial Load) | 1 |
| Defekte Dokument-Links | 3 |
| Defekte Hash-Anker | 1 |

### A) Umgebungsfehler (lokal fehlende Dateien)
1. `cleanwater-infobroschuere.pdf` → 404
2. `installationsanleitung.pdf` → 404
3. `zertifikat.png` → 404

### B) Codefehler (HTML/Asset-Referenzen)
1. Hero-Bild lädt nicht: `../assets/img/Gerät.jpg` → 404
   - im Repository vorhanden ist stattdessen: `assets/img/Cleanwater Gerät.jpg`
2. Footer-Link `#impressum` ist defekt
   - `href="#impressum"` vorhanden, aber kein Element mit `id="impressum"` im Dokument.

---

## Messung B – Nach Bild-/Logo-Fix

### Ergebnis via Vite (`npm run dev`)
| Metrik | Wert |
|---|---:|
| Console Errors | 0 |
| HTTP 404 Requests (Initial Load) | 0 |
| Defekte Hash-Anker | 1 (`#impressum`) |

### Ergebnis via statischem Server (`python3 -m http.server`)
| Metrik | Wert |
|---|---:|
| Fehlende Download-Dateien (404) | 3 |

> Hinweis: Vite liefert unbekannte Routen im Dev-Modus häufig mit `200` zurück (SPA-Fallback). Für echte Dateiverfügbarkeit der Download-Assets daher zusätzlich mit statischem Server gegenprüfen.

## Ergebnis
- **Gelöst:** Logo sichtbar, Hero-Bild lädt korrekt, Galerie-Bilder laden korrekt.
- **Offen (Code):** Hash-Anker `#impressum` zeigt weiterhin auf kein vorhandenes Element.
- **Offen (Umgebung):** Download-Dateien fehlen weiterhin physisch im Projekt.

## Start-Prioritäten (nächster Schritt)
1. **Codefehler offen:**
   - `#impressum` reparieren (Sektion ergänzen oder Link anpassen/entfernen)
2. **Umgebungsfehler offen:**
   - Download-Dateien bereitstellen, falls echte Downloads gewünscht sind.

## Messung C – Quality Gate (Schritt 4)

Ausführung:
```bash
npm run check
```

| Metrik | Baseline (Messung A) | Nach Quality Gate (Messung C) |
|---|---:|---:|
| Console Errors | 1 | 0 |
| HTTP 404 Requests (Initial Load) | 1 | 0 |
| Defekte Dokument-Links | 3 | 0 |
| Defekte Hash-Anker | 1 | 0 |

Ergebnisvergleich: **Alle Fehlerzahlen wurden gegenüber der Baseline reduziert und sind jetzt bei 0.**

## Offene Restpunkte (priorisiert)

### Blocker
- Keine technischen Blocker offen (Quality Gate grün).

### High
- Echte Browser-E2E-Ausführung (inkl. Network-Panel/Console-Monitoring) in CI ergänzen, damit das aktuelle Node-Regressionsskript langfristig durch UI-nahe Tests abgesichert wird.

### Normal
- Rechtstext-Sektionen `Impressum`/`Datenschutz` inhaltlich vollständig ausformulieren (derzeit nur Platzhaltertext für funktionierende Anker-Navigation).
- Download-Button-Texte auf exakte Dateinamen und Versionierung (Dokumentstand) harmonisieren.
