<h1 align="center">Nextjs Starter Kit: The Complete SAAS Toolkit</h1>
<div>
    <div align="center">
        <a href="https://x.com/yelethe1st">
            <img src="https://img.shields.io/badge/X/Twitter-000000?style=for-the-badge&logo=x&logoColor=white" />
        </a>
        </div>

Everything you need to quickly build your SaaS, AI product, or any other web application fast giving you time to focus on what really matters

## Battries Include

- Functional subscription payments via Stripe
- User authentication
- Built in api ratelimiting
- Landing page template
- Dashboard layout & template
- Marketing page template

## Technologies Used

- **Next.js**: A React framework enabling server-side rendering and static site generation for high-performance web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly creating custom designs directly in your markup.
- **Supabase**: An open-source Firebase alternative offering a PostgreSQL database, real-time updates, and authentication.
- **Prisma**: A next-generation ORM for Node.js and TypeScript that simplifies database access and management with an intuitive query API.
- **TanStack Query**: A powerful library for efficient data-fetching and state management in React applications.
- **Clerk Auth**: An easy-to-integrate authentication solution supporting various sign-in methods and user management.
- **Stripe**: A comprehensive payment processing platform for handling online transactions, subscriptions, and invoicing.
- **Upstash**: A serverless database with built-in rate limiting for scalable, low-latency data operations.
- **Shadcn, SyntaxUI, MagicUI, Hover.dev**: Different component/UI libraries used for design

## Getting Started

### Prerequisites

- Ensure Node.js and npm are installed on your machine.
- Obtain API keys from Clerk, Supabase, and Stripe.

### Obtaining API Keys

- **Clerk**: [Generate your Clerk API key here](https://www.clerk.com/).
- **Supabase**: [Get your Supabase API key here](https://www.supabase.com).
- **Stripe**: [Get your Stripe API key here](https://www.stripe.com).

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Yele-the1st/nextjs-starter-kit.git
   ```
2. Install the required dependencies:
   ```
   npm install
   ```
   or
   ```
   bun install
   ```
3. Create a `.env` file in the root of your project and add your API keys:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   WEBHOOK_SECRET=
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   DATABASE_URL=
   DIRECT_URL=
   ```

### Setting up webhooks

You need to setup webhooks for both Clerk Auth & Stripe.

- Clerk auth webhook is /api/auth/webhook. Check clerk's [docs](https://clerk.com/docs/integrations/webhooks/sync-data)
- Stripe payments auth webhook is /api/payments/webhook. Check stripe's [docs](https://docs.stripe.com/webhooks)

### Running the Server

To start the server, execute:

```
npm run dev
```

or

```
yarn dev
```

## Contributing

Contributions to the project are welcome. Feel free to fork the repository, make your changes, and submit a pull request. You can also open issues to suggest improvements or report bugs.

## License

This project is licensed under the MIT License.
