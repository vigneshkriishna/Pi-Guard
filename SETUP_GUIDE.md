# 🚀 Pi-Guard - Complete Setup Guide

This guide will help you set up the Pi-Guard cybersecurity platform from scratch.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- ✅ **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- ✅ **Git** - [Download here](https://git-scm.com/)
- ✅ A **Supabase** account - [Sign up here](https://supabase.com/)
- ✅ A **VirusTotal** API key - [Get it here](https://www.virustotal.com/gui/my-apikey)
- ✅ A **Google Gemini** API key - [Get it here](https://makersuite.google.com/app/apikey)

---

## 🔧 Step-by-Step Setup

### Step 1: Install Dependencies

Open PowerShell and navigate to your project:

```powershell
cd "C:\Users\vigne\OneDrive\Desktop\Pi-Guard"
```

**Install Server Dependencies:**
```powershell
cd Server
npm install
cd ..
```

**Install Client Dependencies:**
```powershell
cd Client
npm install
cd ..
```

---

### Step 2: Set Up Supabase

#### 2.1 Create a Supabase Project

1. Go to [Supabase](https://supabase.com/)
2. Click **"New Project"**
3. Fill in project details:
   - **Project Name:** Pi-Guard
   - **Database Password:** (Save this securely!)
   - **Region:** Choose closest to you
4. Wait for project creation (2-3 minutes)

#### 2.2 Get Your API Credentials

1. In your Supabase project dashboard, click **"Settings"** (⚙️)
2. Click **"API"** in the left sidebar
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJhb...`)

#### 2.3 Create Database Tables

1. In Supabase dashboard, click **"SQL Editor"**
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Table for URL/Domain/IP/Hash scan insights
CREATE TABLE scan_insights (
  id BIGSERIAL PRIMARY KEY,
  input TEXT NOT NULL,
  type TEXT NOT NULL,
  is_safe BOOLEAN,
  safety_score INTEGER,
  vt_stats JSONB,
  vt_full_data JSONB,
  gemini_insights TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for file scan insights
CREATE TABLE file_insights (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  is_safe BOOLEAN,
  safety_score INTEGER,
  vt_stats JSONB,
  vt_full_data JSONB,
  gemini_insights TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_scan_insights_created_at ON scan_insights(created_at DESC);
CREATE INDEX idx_scan_insights_type ON scan_insights(type);
CREATE INDEX idx_file_insights_created_at ON file_insights(created_at DESC);
```

4. Click **"Run"** to execute the SQL

#### 2.4 Enable Google Authentication (Optional)

1. In Supabase dashboard, go to **"Authentication"** → **"Providers"**
2. Find **"Google"** and toggle it **ON**
3. Follow instructions to set up Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable **"Google+ API"**
   - Create **OAuth 2.0 credentials**
   - Set **Authorized redirect URI:** `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
   - Copy **Client ID** and **Client Secret** to Supabase

---

### Step 3: Get API Keys

#### 3.1 VirusTotal API Key

1. Go to [VirusTotal](https://www.virustotal.com/)
2. Sign up or log in
3. Go to your profile → **"API Key"**
4. Copy your API key

**Note:** Free tier allows **4 requests per minute**

#### 3.2 Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google
3. Click **"Create API Key"**
4. Select a Google Cloud project or create new
5. Copy your API key

---

### Step 4: Configure Environment Variables

#### 4.1 Server Environment (.env in Server folder)

Create a file: `Server\.env`

```env
# Server Configuration
PORT=5000

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_KEY=your_supabase_anon_key_here

# VirusTotal API
VIRUSTOTAL_API_KEY=your_virustotal_api_key_here

# Google Gemini AI API
GEMINI_API_KEY=your_gemini_api_key_here
```

**Replace the placeholders:**
- `your_supabase_project_url_here` → Your Supabase Project URL
- `your_supabase_anon_key_here` → Your Supabase anon/public key
- `your_virustotal_api_key_here` → Your VirusTotal API key
- `your_gemini_api_key_here` → Your Google Gemini API key

#### 4.2 Client Environment (.env in Client folder)

Create a file: `Client\.env`

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Replace the placeholders** with the same Supabase credentials.

---

### Step 5: Running the Application

#### Option A: Run Both Servers Manually

**Terminal 1 - Start Server:**
```powershell
cd Server
npm start
```

You should see: `Server running on port 5000`

**Terminal 2 - Start Client:**
```powershell
cd Client
npm run dev
```

You should see: `Local: http://localhost:5173/`

#### Option B: Run Both with One Command

From the root Pi-Guard folder:

```powershell
# Start Server in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\vigne\OneDrive\Desktop\Pi-Guard\Server'; npm start"

# Start Client in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\vigne\OneDrive\Desktop\Pi-Guard\Client'; npm run dev"
```

---

### Step 6: Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 🧪 Testing the Setup

### Test 1: Check if Server is Running
```powershell
curl http://localhost:5000/api/insights
```

### Test 2: Scan a URL
1. Open http://localhost:5173
2. Click "Login" or "Continue as Guest"
3. Go to "Threat Scanner" section
4. Enter a URL like: `https://www.google.com`
5. Click "Scan"
6. Wait for results

### Test 3: Upload a File
1. In the Threat Scanner
2. Click "Switch to File Upload"
3. Upload a safe file (like a .txt file)
4. Wait for analysis

---

## 🔒 Security Best Practices

✅ **Never commit `.env` files to Git** (they're already in .gitignore)
✅ **Keep API keys secure** - don't share them publicly
✅ **Use environment variables** for all sensitive data
✅ **Enable Row Level Security (RLS)** in Supabase for production
✅ **Set up proper CORS** for production deployment

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'cors'"
**Solution:**
```powershell
cd Server
npm install
```

### Issue: "Port 5000 already in use"
**Solution:** Change the PORT in `Server\.env` to another port (e.g., 5001)

### Issue: "Supabase connection failed"
**Solution:**
- Verify `SUPABASE_URL` and `SUPABASE_KEY` are correct
- Check if Supabase project is active
- Ensure tables are created

### Issue: "VirusTotal API error"
**Solution:**
- Verify API key is valid
- Check rate limits (free tier: 4 requests/minute)
- Wait a minute if you hit the limit

### Issue: "Gemini API error"
**Solution:**
- Verify API key is valid
- Check if Gemini API is enabled in Google Cloud Console
- Ensure billing is set up (free tier available)

### Issue: "Google Sign-In not working"
**Solution:**
- Verify Google OAuth is configured in Supabase
- Check redirect URIs match exactly
- Clear browser cookies and try again

---

## 📦 Project Structure

```
Pi-Guard/
├── Client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   └── supabase.js   # Supabase client
│   ├── .env              # Client environment variables
│   └── package.json
├── Server/                # Backend Node.js API
│   ├── index.js          # Main server file
│   ├── .env             # Server environment variables
│   └── package.json
└── README.md            # Project documentation
```

---

## 🎯 Next Steps

Once everything is running:

1. ✅ Test all features (URL scan, file scan, dashboard)
2. ✅ Customize the UI to your liking
3. ✅ Set up production deployment (Vercel, Netlify, etc.)
4. ✅ Enable additional Supabase features (RLS, Auth)
5. ✅ Monitor API usage to stay within free tiers

---

## 📞 Need Help?

- Check the main [README.md](./README.md)
- Review Supabase docs: https://supabase.com/docs
- Review VirusTotal docs: https://developers.virustotal.com/
- Review Gemini docs: https://ai.google.dev/docs

---

**Congratulations! 🎉 Your Pi-Guard application is now set up and ready to use!**
