# 🚀 Pi-Guard - Quick Start (5 Minutes)

## Step 1: Install Dependencies (2 min)

```powershell
# Install Server dependencies
cd Server
npm install

# Install Client dependencies
cd ..\Client
npm install
cd ..
```

## Step 2: Get Your API Keys (2 min)

1. **Supabase** (Database & Auth)
   - Go to https://supabase.com/ → Create new project
   - Copy: Project URL + anon key from Settings → API

2. **VirusTotal** (Threat Scanning)
   - Go to https://www.virustotal.com/ → Sign up
   - Copy: API key from profile

3. **Google Gemini** (AI Analysis)
   - Go to https://makersuite.google.com/app/apikey
   - Copy: API key

## Step 3: Create Environment Files (1 min)

**Create `Server\.env`:**
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
VIRUSTOTAL_API_KEY=your_virustotal_key
GEMINI_API_KEY=your_gemini_key
```

**Create `Client\.env`:**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Step 4: Setup Supabase Database

In Supabase SQL Editor, run:

```sql
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
```

## Step 5: Run the Application

**Terminal 1:**
```powershell
cd Server
npm start
```

**Terminal 2:**
```powershell
cd Client
npm run dev
```

## ✅ Done!

Open http://localhost:5173 in your browser!

---

Need detailed setup? See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
