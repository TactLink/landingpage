# Supabase Setup for Strapi

This guide will help you configure Strapi to use Supabase (PostgreSQL) instead of SQLite to prevent data loss during Render restarts.

## Prerequisites

1. Create a Supabase account at https://supabase.com
2. Create a new project in Supabase
3. Get your database connection details from the Supabase dashboard

## Environment Variables

Add these environment variables to your Render deployment:

```bash
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DATABASE_HOST=db.[YOUR-PROJECT-REF].supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=[YOUR-PASSWORD]
DATABASE_SSL=true
DATABASE_SCHEMA=public

# Strapi Configuration (generate these values)
JWT_SECRET=[YOUR-JWT-SECRET]
ADMIN_JWT_SECRET=[YOUR-ADMIN-JWT-SECRET]
API_TOKEN_SALT=[YOUR-API-TOKEN-SALT]
APP_KEYS=[YOUR-APP-KEYS]
TRANSFER_TOKEN_SALT=[YOUR-TRANSFER-TOKEN-SALT]

# For production
NODE_ENV=production
```

## Getting Supabase Connection Details

1. Go to your Supabase project dashboard
2. Navigate to Settings > Database
3. Copy the connection string and replace `[YOUR-PASSWORD]` with your database password
4. The `[YOUR-PROJECT-REF]` is in your connection string

## Generating Strapi Secrets

You can generate the required secrets using these commands:

```bash
# JWT Secret
openssl rand -base64 32

# Admin JWT Secret
openssl rand -base64 32

# API Token Salt
openssl rand -base64 32

# App Keys (generate 4 keys)
openssl rand -base64 32
openssl rand -base64 32
openssl rand -base64 32
openssl rand -base64 32

# Transfer Token Salt
openssl rand -base64 32
```

## Render Deployment Steps

1. In your Render dashboard, go to your Strapi service
2. Navigate to Environment > Environment Variables
3. Add all the environment variables listed above
4. Redeploy your application

## Database Migration

After setting up the environment variables:

1. Your Strapi will automatically create the necessary tables on first startup
2. If you have existing data in SQLite, you'll need to export and re-import it
3. The data will now persist across Render restarts

## Troubleshooting

- Make sure your Supabase database is accessible from Render's IP addresses
- Verify that SSL is enabled for Supabase connections
- Check that all environment variables are correctly set
- Monitor the logs in Render for any connection errors 