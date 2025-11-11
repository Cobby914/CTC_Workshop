# Neon Members Practice (Yarn Version)

Simple full-stack example connecting a React frontend to a Neon PostgreSQL database via an Express API.
Uses the `"Simple_Members".members` table.

## Quick Start

From the root directory:

```bash
yarn install  # Installs dependencies for root, client, and server
yarn start    # Starts both client and server concurrently
```

Server runs on **http://localhost:4000**  
Frontend runs on **http://localhost:5173**

## Individual Setup (Optional)

If you prefer to run them separately:

### Backend
```bash
cd server
yarn install
yarn dev
```

### Frontend
```bash
cd client
yarn install
yarn dev
```

Or from the root:
```bash
yarn server  # Run server only
yarn client   # Run client only
```
