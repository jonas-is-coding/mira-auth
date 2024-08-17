# 🛡️ Mira-Auth

## Einfaches und sicheres Authentifizierungssystem

**Mira-Auth** ist eine leistungsstarke und einfach zu verwendende Authentifizierungsbibliothek, die dir dabei hilft, sichere Sessions und Passwort-Hashing in deiner Anwendung zu integrieren. Mit wenigen Befehlen kannst du ein Secret erstellen, Sessions verwalten und Passwörter sicher speichern.

## Features

- 🌟 **Sichere JWT-Token-Generierung und -Validierung**
- 🔐 **Passwort-Hashing mit bcrypt**
- 🛠️ **Einfaches Setup und benutzerfreundliche Befehle**

## Installation

### Voraussetzungen

- Node.js
- npm

### Schritte zur Installation

1. **Bibliothek installieren**

   Installiere `mira-auth` über npm:

   ```bash
   npm install mira-auth
   ```

2. **Secret erstellen**

   Verwende den folgenden Befehl, um ein Secret zu generieren und in einer `.env`-Datei zu speichern:

   ```bash
   npx mira-auth secret
   ```

   Dieser Befehl erstellt eine `.env`-Datei im aktuellen Verzeichnis mit einem geheimen Schlüssel (`MIRA_SECRET`), den du für die JWT-Token-Generierung benötigst.

## Verwendung

### Erstellen und Verwalten von Sessions

Erstelle eine Instanz der `Mira`-Klasse und verwende die folgenden Methoden:

- **`createSession(userId: string)`**: Erstellt ein JWT-Token für den angegebenen Benutzer.

  ```typescript
  import { Mira } from 'mira-auth';

  const mira = new Mira(adapter);

  const session = await mira.createSession('user123');
  console.log(session.id); // JWT-Token
  ```

- **`validateSession(token: string)`**: Validiert das JWT-Token und gibt die dekodierten Informationen zurück.

  ```typescript
  try {
    const decoded = await mira.validateSession(token);
    console.log(decoded); // Dekodierte Nutzerdaten
  } catch (error) {
    console.error(error.message); // Fehlerbehandlung
  }
  ```

### Passwort-Hashing

- **`hashPassword(password: string)`**: Hashes ein Passwort für die sichere Speicherung.

  ```typescript
  const hashedPassword = await mira.hashPassword('mysecurepassword');
  console.log(hashedPassword); // Gehashtes Passwort
  ```

## Architektur

**Mira-Auth** verwendet [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) für die Token-Generierung und -Validierung sowie [bcrypt](https://www.npmjs.com/package/bcrypt) für das Passwort-Hashing. Der Code ist in TypeScript geschrieben und bietet eine klare und einfache API zur Authentifizierung.

## Ordnerstruktur

```
mira-auth/
├── bin/
│   └── mira.js          # CLI-Befehl zum Erstellen des Secrets
├── dist/
│   ├── auth.d.ts        # TypeScript Deklarationsdatei
│   ├── auth.js          # Transpilierte Authentifizierungslogik
│   ├── index.d.ts       # TypeScript Deklarationsdatei für das Hauptmodul
│   ├── index.js         # Transpilierte Hauptmodul
│   ├── middleware.d.ts  # TypeScript Deklarationsdatei für Middleware
│   └── middleware.js    # Transpilierte Middleware
├── src/
│   ├── auth.ts          # Quellcode der Authentifizierungslogik
│   ├── index.ts         # Haupteinstiegspunkt des Moduls
│   └── middleware.ts    # Middleware-Logik (falls vorhanden)
├── package.json         # npm Konfigurationsdatei
└── README.md            # Diese Datei
```

## Mitwirken

Wir freuen uns über Beiträge! Wenn du Verbesserungsvorschläge oder Fehlerbehebungen hast, lade einen Pull-Request hoch oder erstelle ein Issue auf [GitHub](https://github.com/jonas-is-coding/mira-auth).

## Lizenz

Dieses Projekt steht unter der MIT Lizenz. Weitere Informationen findest du in der [LICENSE](https://github.com/jonas-is-coding/mira-auth/blob/main/license.md) Datei.

## Kontakt

- **Github**: [jonas-is-coding](https://github.com/jonas-is-coding)
- **Email**: jonasbrahmst@gmail.com