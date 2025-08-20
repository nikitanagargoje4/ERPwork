# Overview

This is a comprehensive Enterprise Resource Planning (ERP) system built with modern web technologies. The application provides a centralized platform for managing various business functions including finance, human resources, supply chain, customer relationship management, manufacturing, project management, and system settings. The system features a modular architecture with dedicated sections for each business domain, enabling organizations to streamline their operations through a unified interface.

## Recent Updates

**Finance Dashboard Implementation (January 2025)**
- Created responsive Finance Overview dashboard with real-time data visualization
- Implemented JSON-based data fetching for financial metrics (revenue, expenses, profit)
- Added interactive charts: Revenue vs Expenses line chart and Department Expenses bar chart
- Successfully migrated from Bolt to Replit environment with wouter routing system
- All navigation and component rendering now fully functional

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using **React with TypeScript** and follows a component-based architecture pattern:

- **UI Framework**: React 18 with TypeScript for type safety and better developer experience
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for authentication and global state management
- **Data Visualization**: Recharts library for charts and analytics dashboards
- **Form Handling**: React Hook Form with Zod validation schemas

The frontend is organized into modular sections with each business domain (Finance, HR, CRM, etc.) having its own component hierarchy. The layout system includes responsive sidebar navigation, header, and mobile menu components.

## Backend Architecture

The backend follows a **Node.js/Express** pattern with TypeScript:

- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the full stack
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Storage Abstraction**: Interface-based storage layer allowing for pluggable storage implementations
- **Development Setup**: Vite for fast development builds and hot module replacement

The server implements a middleware-based architecture with request logging, JSON parsing, and error handling built into the request pipeline.

## Data Storage Solutions

The application uses a hybrid storage approach:

- **Database**: PostgreSQL as the primary database with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database serverless PostgreSQL for cloud deployment
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development and testing

The storage layer is abstracted through interfaces, allowing easy switching between different storage backends.

## Authentication and Authorization

Authentication is handled through a store-based system:

- **State Management**: Zustand store for authentication state
- **User Roles**: Role-based access control with multiple user types (Administrator, Manager, Finance, HR, Sales, Operations, Employee)
- **Permissions**: Granular permission system for feature-level access control
- **Session Management**: Client-side session handling with automatic authentication checks

## Module Organization

The application is organized into distinct business modules:

- **Finance**: Accounting, budgeting, payroll, and financial reporting
- **Human Resources**: Employee management, recruitment, training, and performance
- **Supply Chain**: Procurement, inventory, vendor management, and logistics
- **Customer Relationship**: Customer management, sales, marketing, and support
- **Manufacturing**: Production planning, quality control, maintenance, and reporting
- **Project Management**: Project tracking, task management, resource allocation, and calendar
- **Settings**: User preferences, integrations, notifications, and system configuration

Each module follows a consistent structure with overview dashboards, detailed management interfaces, and reporting capabilities.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database ORM and query builder
- **Drizzle Kit**: Database migration and schema management tool

## UI and Styling Libraries
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library based on Radix UI and Tailwind
- **Lucide React**: Icon library for consistent iconography

## Data and Visualization
- **Recharts**: React charting library for data visualization
- **TanStack Query**: Data fetching and caching library
- **Date-fns**: Date manipulation and formatting utilities

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type system for JavaScript
- **ESBuild**: JavaScript bundler for production builds
- **Replit Plugins**: Development environment integration tools

## Form and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: TypeScript-first schema validation
- **Drizzle Zod**: Integration between Drizzle ORM and Zod validation

## Additional Utilities
- **Class Variance Authority**: Utility for managing conditional CSS classes
- **CLSX**: Utility for constructing className strings
- **Nanoid**: URL-friendly unique ID generator
- **Wouter**: Lightweight React router