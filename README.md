# Compete - Competitive Intelligence Platform

A competitive intelligence SaaS application for B2B SaaS companies built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Create a new project
3. Go to Settings > API to get your project URL and anon key
4. Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
```

### 3. Set up Database Schema

In your Supabase dashboard, go to the SQL Editor and run this schema:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    company_id UUID REFERENCES companies(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own company" ON companies
    FOR SELECT USING (auth.uid() IN (
        SELECT id FROM users WHERE company_id = companies.id
    ));

CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);
```

### 4. Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Make sure "Enable email confirmations" is enabled
3. Configure your email templates as needed

### 5. Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
compete/
├── app/
│   ├── (auth)/           # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/      # Dashboard pages
│   │   ├── competitors/
│   │   ├── battlecards/
│   │   ├── alerts/
│   │   ├── digest/
│   │   └── settings/
│   └── api/auth/callback/ # Auth callback
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   └── dashboard/        # Dashboard components
└── lib/
    └── supabase/         # Supabase integration
```

## 🔧 Features

- **Authentication**: Sign up, login, logout with Supabase Auth
- **Dashboard**: Complete dashboard with sidebar navigation
- **Responsive Design**: Mobile-friendly interface
- **Dark Mode**: Built-in dark mode support
- **Form Validation**: React Hook Form with Zod validation
- **Type Safety**: Full TypeScript support
- **Component Library**: shadcn/ui components
- **Toast Notifications**: User feedback with Sonner

## 🧪 Testing the Application

1. **Sign Up**: Create a new account with company name, email, and password
2. **Email Verification**: Check your email and verify your account
3. **Login**: Sign in with your credentials
4. **Dashboard**: Explore the different sections:
   - Overview: Dashboard home with metrics cards
   - Competitors: Manage tracked competitors (empty state)
   - Battlecards: Competitive intelligence cards (empty state)
   - Alerts: Competitive alerts (empty state)
   - Weekly Digest: Configure digest preferences
   - Settings: Manage account settings

## 🔄 Next Steps

This is the foundation of your competitive intelligence platform. Here are the recommended next steps:

1. **Onboarding Flow**: Add competitor onboarding
2. **Apify Integration**: Connect web scraping for competitor data
3. **AI Analysis**: Implement competitive analysis features
4. **Email System**: Set up email notifications and digests
5. **Advanced Features**: Add battlecards, alerts, and reporting

## 🛠️ Built With

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Supabase**: Backend as a service (auth, database)
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Sonner**: Toast notifications
- **Lucide React**: Icons

## 📝 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 🔒 Environment Variables

Make sure to set these in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚨 Important Notes

- Never commit your `.env.local` file with real credentials
- The database schema must be set up in Supabase before the app will work
- Email verification is required by default - check your email after signup
- All dashboard routes are protected by authentication middleware

---

Your competitive intelligence platform is ready to go! 🎉
