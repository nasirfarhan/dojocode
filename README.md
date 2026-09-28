This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

```bash 
For the first time usage:

Step 1: npm install
Step 2: Get these for your .env 
    DATABASE_URL=mongodb
    NEXTAUTH_URL="http://localhost:3000"
    AUTH_SECRET # Added by ⁠ npx auth ⁠. 
    GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET
    GITHUB_ID
    GITHUB_SECRET
Step 3: npx prisma generate
Step 4: npx prisma db push

```
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Full guide will be out once the development is complete
