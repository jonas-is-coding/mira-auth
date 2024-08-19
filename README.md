# 🛡️ Mira-Auth

## Simple and Secure Authentication System

**Mira-Auth** is a powerful and easy-to-use authentication library designed to integrate secure sessions, password hashing, and user management into your application. With minimal setup, you can create sessions, manage users, and securely handle passwords.

## Features

- 🌟 **Secure JWT Token Generation and Validation**: Create and validate JWT tokens for secure user sessions.
- 🔐 **Password Hashing and Comparison**: Hash passwords for storage and compare user input with stored hashes using bcrypt.
- 🛠️ **Simple Setup**: Easy to configure with straightforward commands and TypeScript support.
- 🔑 **User Management**: Create and retrieve user records with built-in Prisma integration.
- 🚀 **Sign In Functionality**: Automatically verifies user existence and compares passwords.

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

   Generate a secret and store it in a `.env` file:

   Using npm:

   ```bash
   npx mira-auth secret
   ```

   Using Yarn:

   ```bash
   yarn mira-auth secret
   ```

   This command will create a `.env` file with a secret key (`MIRA_SECRET`) needed for JWT token generation.

3. **Initialize Mira Instance**

   Create a file `@/lib/mira.ts` and initialize **Mira** there:

   ```typescript
   import { Mira } from 'mira-auth';
   export const mira = new Mira();
   ```

   Use this instance throughout your application.

## Usage

### Creating and Managing Sessions

- **`createSession(userId: string, email?: string, role?: string)`**: Creates a JWT token for the specified user.

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

- **`comparePasswords(submittedPassword: string, storedPassword: string)`**: Compares an input password with a stored hashed password.

  ```typescript
  import { mira } from '@/lib/mira';

  const isMatch = await mira.comparePasswords('mysecurepassword', hashedPassword);
  console.log(isMatch); // true or false
  ```

### Creating and Retrieving Users

- **`createUser(data: { email: string, password: string, role?: string })`**: Creates a new user. The password is automatically hashed during creation.

  ```typescript
  import { mira } from '@/lib/mira';

  const user = await mira.createUser({ email: 'user@example.com', password: 'mypassword' });
  console.log(user.id); // ID of the newly created user
  ```

- **`getUserById(userId: string)`**: Retrieves user data by ID.

  ```typescript
  import { mira } from '@/lib/mira';

  const user = await mira.getUserById('user123');
  console.log(user); // User data
  ```

- **`getUserByEmail(email: string)`**: Retrieves user data by email.

  ```typescript
  import { mira } from '@/lib/mira';

  const user = await mira.getUserByEmail('user@example.com');
  console.log(user); // User data
  ```

### Sign In and Sign Out

- **`signIn(email: string, password: string)`**: Authenticates a user by checking if the user exists and verifying the password. Creates a session if authentication is successful.

  ```typescript
  import { mira } from '@/lib/mira';

  const response = await mira.signIn('user@example.com', 'mypassword');
  console.log(response); // Success or error message
  ```

- **`signOut()`**: Signs out a user by clearing the session cookie.

  ```typescript
  import { mira } from '@/lib/mira';

  const response = await mira.signOut();
  console.log(response); // Success message
  ```

### Database Integration

**Mira-Auth** uses Prisma for ORM functionality, and the Prisma client is integrated into the package. The Prisma schema for user management is embedded in **Mira-Auth**:

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

### Future Support for Drizzle

Support for Drizzle, a lightweight ORM, is planned for a future update. Drizzle offers a simpler API and may be more suitable for smaller applications.

## Architecture

**Mira-Auth** uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for token generation and validation, and [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing. The library is written in TypeScript for a clear and simple API.

## Folder Structure

```
mira-auth/
├── dist/
│   ├── bin/
│   │   └── mira.js        # Transpiled CLI commands
│   ├── db.js              # Transpiled database logic
│   ├── errors.js          # Transpiled error handling logic
│   ├── handlers.js        # Transpiled request handlers
│   ├── index.js           # Main entry point
│   ├── middleware.js      # Transpiled middleware
│   ├── mira.js            # Transpiled main module logic
│   ├── provider.js        # Transpiled provider logic
│   └── types/
│       ├── bin/
│       │   └── mira.d.ts  # TypeScript declaration for CLI commands
│       ├── db.d.ts        # TypeScript declaration for database logic
│       ├── errors.d.ts    # TypeScript declaration for error handling
│       ├── handlers.d.ts  # TypeScript declaration for request handlers
│       ├── index.d.ts     # TypeScript declaration for main entry point
│       ├── middleware.d.ts# TypeScript declaration for middleware
│       ├── mira.d.ts      # TypeScript declaration for main module logic
│       └── provider.d.ts  # TypeScript declaration for provider logic
├── package.json           # npm configuration file
├── LICENSE.md             # License file
├── README.md              # This file
└── CONTRIBUTING.md        # Contribution guidelines
```

## Contributing

We welcome contributions! Please check our [CONTRIBUTING.md](https://github.com/jonas-is-coding/mira-auth/blob/main/CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/jonas-is-coding/mira-auth/blob/main/LICENSE.md) file for more information.

## Package Status

[![npm version](https://badge.fury.io/js/mira-auth.svg)](https://www.npmjs.com/package/mira-auth)

## Contact

- **Github**: [jonas-is-coding](https://github.com/jonas-is-coding)
- **Email**: jonasbrahmst@gmail.com