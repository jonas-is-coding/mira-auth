# 🛡️ Mira-Auth

## Simple and Secure Authentication System

**Mira-Auth** is a powerful and easy-to-use authentication library that helps you integrate secure sessions and password hashing into your application. With just a few commands, you can create a secret, manage sessions, and securely store passwords.

## Features

- 🌟 **Secure JWT Token Generation and Validation**
- 🔐 **Password Hashing with bcrypt**
- 🛠️ **Simple Setup and User-Friendly Commands**

## Installation

### Prerequisites

- Node.js
- npm or Yarn

### Installation Steps

1. **Install the Library**

   Install `mira-auth` via npm or Yarn:

   Using npm:

   ```bash
   npm install mira-auth
   ```

   Using Yarn:

   ```bash
   yarn add mira-auth
   ```

2. **Create a Secret**

   Use the following command to generate a secret and store it in a `.env` file:

   Using npm:

   ```bash
   npx mira-auth secret
   ```

   Using Yarn:

   ```bash
   yarn mira-auth secret
   ```

   This command creates a `.env` file in the current directory with a secret key (`MIRA_SECRET`) needed for JWT token generation.

3. **Initialize Mira Instance**

   Create a file `@/lib/mira.ts` and initialize **Mira** there:

   ```typescript
   import { Mira } from 'mira-auth';
   export const mira = new Mira();
   ```

   You can then use this instance throughout your application.

## Usage

### Creating and Managing Sessions

Import the **Mira** instance and use the following methods:

- **`createSession(userId: string)`**: Creates a JWT token for the specified user.

  ```typescript
  import { mira } from '@/lib/mira';

  const session = await mira.createSession({ userId: 'user123' });
  console.log(session.id); // JWT Token
  ```

- **`validateSession(token: string)`**: Validates the JWT token and returns the decoded information.

  ```typescript
  import { mira } from '@/lib/mira';

  try {
    const decoded = await mira.validateSession(token);
    console.log(decoded); // Decoded user data
  } catch (error) {
    console.error(error.message); // Error handling
  }
  ```

### Password Hashing

- **`hashPassword(password: string)`**: Hashes a password for secure storage.

  ```typescript
  import { mira } from '@/lib/mira';

  const hashedPassword = await mira.hashPassword('mysecurepassword');
  console.log(hashedPassword); // Hashed password
  ```

### Creating a New User

- **`createUser(data: { email: string, password: string })`**: Creates a new user with an email and hashed password.

  ```typescript
  import { mira } from '@/lib/mira';

  const user = await mira.createUser({ email: 'user@example.com', password: 'mypassword' });
  console.log(user.id); // ID of the newly created user
  ```

## Database Integration

Mira-Auth currently supports Prisma as an ORM for managing the user database. The Prisma client is already integrated into **Mira-Auth**, so you don't need to configure it yourself. The following Prisma schema is embedded in **Mira-Auth**:

### Prisma Schema

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### User Management with Prisma

Since the Prisma client is already integrated into **Mira-Auth**, you can interact directly with the User model. For example, you can create a new user in the database with the `mira.createUser()` method:

```typescript
import { mira } from '@/lib/mira';

const user = await mira.createUser({
  email: 'user@example.com',
  password: 'mypassword',
});
console.log(user.id); // ID of the newly created user
```

### Future Support for Drizzle

We are working on adding support for Drizzle in a future update. Drizzle is a lightweight ORM that offers a simple and intuitive API, suitable for smaller applications. Stay tuned for more updates!

## Architecture

**Mira-Auth** uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for token generation and validation, and [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing. The code is written in TypeScript, providing a clear and simple API for authentication.

## Folder Structure

```
mira-auth/
├── dist/
│   ├── bin/
│   │   └── mira.js        # Transpiled CLI commands
│   ├── db.d.ts            # TypeScript declaration file for database
│   ├── db.js              # Transpiled database logic
│   ├── errors.d.ts        # TypeScript declaration file for errors
│   ├── errors.js          # Transpiled error handling logic
│   ├── handlers.d.ts      # TypeScript declaration file for request handlers
│   ├── handlers.js        # Transpiled request handlers
│   ├── mira.d.ts          # TypeScript declaration file for the main module
│   ├── mira.js            # Transpiled main module logic
│   ├── middleware.d.ts    # TypeScript declaration file for middleware
│   └── middleware.js      # Transpiled middleware
├── package.json           # npm configuration file
├── LICENSE.md             # License file
├── README.md              # This file
└── CONTRIBUTING.md        # Contribution guidelines
```

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](https://github.com/jonas-is-coding/mira-auth/blob/main/CONTRIBUTING.md) for more information on how to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/jonas-is-coding/mira-auth/blob/main/LICENSE.md) file for details.

## Package Status

[![npm version](https://badge.fury.io/js/mira-auth.svg)](https://www.npmjs.com/package/mira-auth)

## Contact

- **Github**: [jonas-is-coding](https://github.com/jonas-is-coding)
- **Email**: jonasbrahmst@gmail.com