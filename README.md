# Gia Phả Việt - Next.js Version

This is a Next.js 14 conversion of the original PHP CMS for Vietnamese family genealogy management.

## Features

- **Homepage**: Displays slides, catalogs, and latest announcements/news
- **Static Pages**: Dynamic pages from the PAGE database table
- **News/Articles**: Article details from TITLE/CATALOG tables
- **Contact Form**: Submit messages to the MESSAGES table
- **Donations**: Display donation list from DONATE table
- **API Endpoints**: RESTful APIs for form submissions and health checks

## Technology Stack

- **Next.js 14** with App Router
- **Prisma ORM** for MySQL database connection
- **TypeScript** for type safety
- **Server Components** for SEO-friendly rendering
- **Client Components** for interactive forms

## Database Schema

The application maintains full compatibility with the existing database structure including:
- ALBUM, CATALOG, CONTACT, DONATE, GROUP
- INFO_PERSON (genealogy), LINK, MEDIA, MEDIA_GROUP
- MESSAGES, PAGE, SITE_INFO, SLIDE, TITLE, USER

## Setup Instructions

### 1. Environment Configuration

Copy `.env.example` to `.env` and configure your database connection:

```bash
cp .env.example .env
```

Update the following in `.env`:
```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Database Setup

The application expects an existing MySQL database with the original PHP CMS structure. 
No migration is needed as the Prisma schema maps directly to existing tables.

### 5. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### 6. Production Build

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

## API Endpoints

- `GET /api/health` - Database health check and statistics
- `POST /api/messages` - Submit contact form messages

## File Structure

```
/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx              # Main layout
│   ├── globals.css             # Global styles
│   ├── contact/
│   │   ├── page.tsx            # Contact page
│   │   └── send-contact-form.tsx # Contact form component
│   ├── donate/
│   │   └── page.tsx            # Donations page
│   ├── page/[id]/
│   │   └── page.tsx            # Static pages
│   ├── tin/[tid]/
│   │   └── page.tsx            # Article details
│   └── api/
│       ├── messages/route.ts    # Contact form API
│       └── health/route.ts      # Health check API
├── lib/
│   └── prisma.ts               # Prisma client
├── prisma/
│   └── schema.prisma           # Database schema
├── package.json
├── next.config.js
└── .env.example
```

## Key Features

### URL Compatibility
- Static pages: `/page/page-name-{id}`
- Articles: `/tin/article-title-{tid}`
- Maintains URL structure similar to original PHP version

### Database Integration
- Direct mapping to existing database tables
- No migration required
- Preserves all existing data

### Responsive Design
- Mobile-friendly layout
- CSS based on original design
- Modern responsive techniques

### SEO Optimization
- Server-side rendering
- Dynamic metadata generation
- Semantic HTML structure

## Migration Notes

This Next.js version maintains compatibility with:
- Existing database structure (no schema changes needed)
- URL patterns for SEO continuity
- HTML content rendering (using `dangerouslySetInnerHTML`)
- Original styling and layout

## Future Enhancements (Phase 2)

- Admin panel for content management
- User authentication system
- File upload functionality
- Advanced search features
- Family tree visualization
- Photo gallery management

## Development Notes

- Uses Prisma for type-safe database operations
- Server Components for data fetching
- Client Components only for interactive features
- Follows Next.js 14 best practices with App Router