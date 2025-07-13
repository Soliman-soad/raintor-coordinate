# Raintor Coordinate - User Directory

A modern user directory application built with Next.js, featuring infinite scrolling, interactive maps, and real-time updates.

## Features

- **User Directory**: Browse and search through users with infinite scrolling
- **Interactive Maps**: View user locations on interactive maps using Leaflet
- **Real-time Updates**: Live updates using SignalR
- **Responsive Design**: Optimized for desktop and mobile devices
- **Performance Optimized**: Efficient rendering with skeleton loading states
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Maps**: Leaflet with React Leaflet
- **Real-time**: SignalR
- **UI Components**: Custom components with Lucide React icons

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

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

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── userA/          # User A specific page
│   ├── userB/          # User B specific page
│   └── users/          # Main users directory page
├── components/         # React components
│   ├── layout/         # Layout components
│   ├── maps/           # Map-related components
│   ├── providers/      # Context providers
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Components

- **UserList**: Main user directory with infinite scrolling
- **UserCard**: Individual user display component
- **UserAMap/UserBMap**: Interactive map components
- **LoadingSpinner**: Loading state component
- **ErrorMessage**: Error handling component

## API Integration

The application integrates with external APIs for:
- User data fetching with pagination
- Real-time updates via SignalR
- Map data and coordinates

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Redux Toolkit](https://redux-toolkit.js.org/) - state management
- [Leaflet](https://leafletjs.com/) - interactive maps
- [SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr) - real-time communication
- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS framework


