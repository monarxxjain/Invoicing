# INVESTO :: P2P Lending & Invoice Discounting Platform
![1](https://github.com/user-attachments/assets/1c1106fe-eeda-4d30-a5e1-1fbc1712956b)



## Overview

**INVESTO** is a blockchain-based platform designed to provide a secure and transparent P2P lending and invoice discounting solution for Small and Medium Enterprises (SMEs). Leveraging the power of **Solidity, EtherJs, NodeJs, and NextJs** within a **monorepo** architecture, we aim to revolutionize traditional financing processes by introducing **smart contracts** that manage lending and invoice discounting, with the additional benefits of **transparency**, **automation**, and **trust**. 

The platform also includes dashboards for **companies**, **investors**, and **admins** to manage, analyze, and track transactions and collaterals efficiently.
![7](https://github.com/user-attachments/assets/54fd69b5-b9ca-441f-ba0a-e2dbaa0a45cb)
![9](https://github.com/user-attachments/assets/9e481981-460f-452b-ae26-1051cb5da43b)
![8](https://github.com/user-attachments/assets/5be0322f-5ad1-4030-8d90-0fafcd885d18)


## Problem Statement

Traditional invoice discounting processes are **inefficient**, leading to prolonged payment cycles and cash-flow issues for businesses. Lack of **transparency** and **trust** between involved parties often results in **disputes** and **delays**. Blockchain technology addresses these issues by creating a **secure**, **transparent**, and **automated platform** for invoice discounting, improving operational efficiency and trust in financial transactions.

![2](https://github.com/user-attachments/assets/45da9177-cf2d-4463-9669-7b70e7711e77)



## Idea Description

**Invoice Discounting** is a process where businesses (specifically targeting **mid-sized companies**) can receive upfront cash by selling their unpaid invoices to lenders or investors. Instead of waiting for customers to pay, businesses can secure funding quickly, though at a slightly discounted rate. Our platform helps businesses find investors, manage the paperwork securely, and keep everything transparent and organized.

Using blockchain technology adds an extra layer of **security** and **efficiency**. 

### Key Features:

- **Decentralized Invoice Discounting**: Businesses sell their unpaid invoices to investors in exchange for upfront liquidity.
- **Blockchain-powered Smart Contracts**: These ensure **automatic execution** of transactions and secure the process for both businesses and investors.
- **NFT as Collateral**: NFTs can be pledged as collateral for loans, with smart contracts managing liquidation in the case of defaults. If a borrower defaults, the NFT collateral is automatically converted into monetary value and distributed among investors, reducing risks.



## Technical Stack

- **Blockchain**: Solidity, EtherJs
- **Frontend**: NextJs
- **Backend**: NodeJs
- **Database**: Supabase, PostgreSQL
- **Monorepo**: A unified codebase structure for streamlined development and deployment


## Revenue Model

Our platform follows a **commission-based revenue model**, earning a percentage from each successful investment or invoice discounting transaction. This model has already led to a **25% increase in user engagement** by providing seamless investment opportunities to individual investors.



## How It Works

1. **Businesses** upload their invoices to the platform.
2. **Investors** browse available deals and invest in invoices, receiving a return once the invoices are paid.
3. **Smart Contracts** handle the entire process, ensuring transparency, security, and automation of the payments.
4. In case of a **loan default**, NFTs pledged as collateral are automatically liquidated and distributed to investors.

---

## Installation & Setup

### To start 

```bash
pnpm i  
pnpm db:generate
pnpm db:push
```

### To Run

```bash
pnpm dev
```

### Docker

```bash
docker-compose up
```

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
