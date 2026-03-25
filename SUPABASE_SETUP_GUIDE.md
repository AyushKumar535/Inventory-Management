# 🚀 NovaTrack Supabase Setup Guide

Since you want this project to be completely yours, you need your own database and authentication system instead of using your friend's. 
This project is built using [Supabase](https://supabase.com), which is a free backend-as-a-service. Follow these steps to set yours up in about 5 minutes:

## Part 1: Create Your Supabase Project

1. Go to [Supabase](https://supabase.com/) and click **Start your project**.
2. Sign in with GitHub or your Email, and click **New Project**.
3. Fill in the details:
   - **Name**: NovaTrack Inventory (or whatever you prefer)
   - **Database Password**: Create a strong password and save it somewhere safe.
   - **Region**: Choose the one closest to you.
4. Click **Create new project** (It will take a couple of minutes to provision the database).

## Part 2: Setup Database Tables

Your friend's project came with a `supabase-schema.sql` file. This tells Supabase exactly what tables to create (Users, Items, Assignments).

1. In your new Supabase dashboard, look at the left sidebar and click on **SQL Editor** (it looks like a terminal icon `>_`).
2. Click **New Query**.
3. Open the file `supabase-schema.sql` from your project folder in VS Code, copy **ALL** of its contents, and paste it into the Supabase SQL Editor.
4. Click the **Run** button at the bottom right. This will instantly create all the required tables and security rules for your project!

## Part 3: Get Your Credentials

Now you need to connect the code to your new database.

1. In the Supabase dashboard sidebar, click on **Project Settings** (the gear icon `⚙️` at the very bottom).
2. Click on **API** in the menu.
3. You will see your **Project URL** and your **Project API Keys** (`anon` `public`).

## Part 4: Connect the Code

1. In your project folder (`inventory-management-system`), find the `.env.local` file. If it doesn't exist, create a new file and name it exactly `.env.local`.
2. Open it and add your URL and Key like this:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```
*(Replace `your_project_url_here` and `your_anon_key_here` with the values you copied from step 3).*

## Part 5: Auth Settings (Important)
1. Go to **Authentication** -> **Providers** in Supabase and ensure that **Email** is enabled.
2. If you want Google Login, refer to the `GOOGLE_AUTH_SETUP.md` file in the project!

---
🎉 **That's it!** You now have a 100% independent project with your very own database and authentication. Start the app by running `npm run dev` and create your first account!
