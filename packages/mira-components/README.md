Verstanden! Hier ist eine kürzere Version für die `README.md`-Datei für das `@mira-auth/components`-Paket:

---

# @mira-auth/components

## Overview

`@mira-auth/components` provides reusable React components styled with Tailwind CSS. Written in TypeScript, these components are flexible and customizable via class names.

## Features

- **Reusable Components:** Easily integrate reusable UI elements into your project.
- **TypeScript:** Built with TypeScript for type safety.
- **Tailwind CSS:** Styled using Tailwind for responsive and customizable designs.
- **Customizable:** Flexible styling through class names.

## Installation

Install the package via npm or yarn:

```bash
npm install @mira-auth/components
```

or

```bash
yarn add @mira-auth/components
```

## Usage

Here’s a quick example:

```tsx
import { Button } from '@mira-auth/components';

const MyComponent = () => (
  <div className="p-4">
    <Button variant={"outline"} size={"sm"} className="rounded-full">
        Click me
    </Button>
  </div>
);

export default MyComponent;
```