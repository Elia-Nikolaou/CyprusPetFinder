# Cyprus Pet Rescue - Replit Project Guide

## Overview

This is a full-stack web application designed to help reunite families with their pets during the Cyprus wildfire emergency. The application allows users to report missing pets, search for found pets, and facilitates the reunion of pets with their families during this crisis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Data Storage**: Firebase Firestore (client-side integration)
- **File Storage**: Firebase Storage for pet photos
- **Session Management**: Memory-based storage with extensible interface

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured via Drizzle)
- **Alternative Storage**: Firebase Firestore (currently implemented)
- **File Storage**: Firebase Storage for pet images
- **Session Storage**: In-memory storage with interface for future database integration

## Key Components

### Core Features
1. **Pet Reporting System**: Users can report missing or found pets with detailed information
2. **Search & Filter**: Advanced search capabilities with filters by type, location, date, etc.
3. **Photo Upload**: Image storage and display for pet identification
4. **Status Management**: Track pet reports from active to reunited
5. **Emergency Context**: Designed specifically for wildfire emergency response

### UI Components
- **Navigation**: Responsive navigation with emergency alert banner
- **Pet Cards**: Detailed pet information display with action buttons
- **Search Filters**: Comprehensive filtering system for pet searches
- **Stats Dashboard**: Statistics showing missing, found, and reunited pets
- **Forms**: Validated forms for pet reporting with photo upload

### Data Models
- **Pet Reports**: Core entity with fields for pet details, contact info, location, and status
- **Statistics**: Aggregated data for dashboard display
- **User Management**: Basic user structure (extensible)

## Data Flow

1. **Pet Reporting**: Users submit pet information → Validation → Firebase/Database storage → Real-time updates
2. **Search Process**: User filters → Query processing → Results display with pagination
3. **Status Updates**: Admin actions → Database updates → UI refresh → Notifications
4. **Photo Management**: File upload → Firebase Storage → URL generation → Database reference

## External Dependencies

### Core Libraries
- **UI Framework**: React ecosystem with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Validation**: Zod for schema validation and type safety
- **HTTP Client**: Native fetch with TanStack Query wrapper
- **Styling**: Tailwind CSS with Radix UI primitives

### Firebase Integration
- **Authentication**: Firebase Auth (configured but not fully implemented)
- **Database**: Firestore for real-time data synchronization
- **Storage**: Firebase Storage for pet photo management
- **Configuration**: Environment-based config with fallback values

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: ESLint and TypeScript for type checking
- **Database Migration**: Drizzle Kit for schema management
- **Development Server**: Express with Vite middleware integration

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Automatic reloading for both frontend and backend changes
- **Database**: Local PostgreSQL or Firebase Firestore for development
- **Environment Variables**: Local .env file configuration

### Production Build
- **Frontend**: Vite production build with optimized assets
- **Backend**: ESBuild compilation to single output file
- **Static Assets**: Served through Express static middleware
- **Database**: Production PostgreSQL with Drizzle migrations

### Architecture Considerations
- **Scalability**: Modular design allows for easy feature additions
- **Performance**: Image optimization and lazy loading for pet photos
- **Reliability**: Error boundaries and proper error handling throughout
- **Accessibility**: ARIA labels and keyboard navigation support
- **SEO**: Meta tags and Open Graph integration for social sharing

The application is specifically designed for emergency response scenarios, with emphasis on quick pet reporting, efficient search capabilities, and clear visual hierarchy to help families find their pets during the Cyprus wildfire crisis.

## Recent Changes

### July 25, 2025
- **Complete Website Development**: Built full-stack Cyprus Pet Rescue website for wildfire emergency
- **Four-Page Architecture**: Landing page, report form, missing pets gallery, found pets gallery
- **Firebase Integration**: Connected with user's actual Firebase project (cypruspetsfinder)
- **Emergency Design**: Orange/red color scheme with wildfire emergency alert banner
- **Photo Upload**: Firebase Storage integration for pet photos
- **Search & Filters**: Advanced filtering by type, location, date range
- **Status Management**: Mark pets as found/reunited functionality
- **UI Bug Fixes**: Fixed Select component errors by using "all" instead of empty strings
- **Content Updates**: Removed emergency vet info and social media links per user request
- **GitHub Pages Setup**: Created complete deployment configuration for static hosting
  - GitHub Actions workflow for automatic deployment
  - Environment variable configuration for Firebase secrets
  - Production build optimization
  - Documentation and setup guides