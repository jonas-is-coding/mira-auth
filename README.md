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
- npm oder Yarn

### Schritte zur Installation

1. **Bibliothek installieren**

   Installiere `mira-auth` über npm oder Yarn:

   Mit npm:

   ```bash
   npm install mira-auth
   ```

   Mit Yarn:

   ```bash
   yarn add mira-auth
   ```

2. **Secret erstellen**

   Verwende den folgenden Befehl, um ein Secret zu generieren und in einer `.env`-Datei zu speichern:

   Mit npm:

   ```bash
   npx mira-auth secret
   ```

   Mit Yarn:

   ```bash
   yarn mira-auth secret
   ```

   Dieser Befehl erstellt eine `.env`-Datei im aktuellen Verzeichnis mit einem geheimen Schlüssel (`MIRA_SECRET`), den du für die JWT-Token-Generierung benötigst.

## Verwendung

### Erstellen und Verwalten von Sessions

Erstelle eine Instanz der `Mira`-Klasse und verwende die folgenden Methoden:

- **`createSession(userId: string)`**: Erstellt ein JWT-Token für den angegebenen Benutzer.

  ```typescript
  import { Mira } from 'mira-auth';
  export const mira = new Mira();

  const session = await mira.createSession({ userId: 'user123' });
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
├── dist/
│   ├── bin/
│   │   └── mira.js        # Transpilierte CLI-Befehle
│   ├── db.d.ts            # TypeScript Deklarationsdatei für die Datenbank
│   ├── db.js              # Transpilierte Datenbanklogik
│   ├── errors.d.ts        # TypeScript Deklarationsdatei für Fehler
│   ├── errors.js          # Transpilierte Fehlerbehandlungslogik
│   ├── handlers.d.ts      # TypeScript Deklarationsdatei für Request-Handler
│   ├── handlers.js        # Transpilierte Request-Handler
│   ├── mira.d.ts          # TypeScript Deklarationsdatei für das Hauptmodul
│   ├── mira.js            # Transpilierte Hauptmodul-Logik
│   ├── middleware.d.ts    # TypeScript Deklarationsdatei für Middleware
│   └── middleware.js      # Transpilierte Middleware
├── package.json           # npm Konfigurationsdatei
├── LICENSE.md             # Lizenzdatei
├── README.md              # Diese Datei
└── CONTRIBUTING.md        # Anleitung zum Mitwirken
```

## Mitwirken

Wir freuen uns über Beiträge! Bitte lese unsere [CONTRIBUTING.md](https://github.com/jonas-is-coding/purenotes/CONTRIBUTING.md) für weitere Informationen darüber, wie du beitragen kannst.

## Lizenz

Dieses Projekt steht unter der MIT Lizenz. Weitere Informationen findest du in der [LICENSE](https://github.com/jonas-is-coding/mira-auth/LICENSE.md) Datei.

## Package Status

[![npm version](https://badge.fury.io/js/mira-auth.svg)](https://www.npmjs.com/package/mira-auth)

## Kontakt

- **Github**: [jonas-is-coding](https://github.com/jonas-is-coding)
- **Email**: jonasbrahmst@gmail.com