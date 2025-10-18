# Pi-Guard - Cybersecurity Platform

A comprehensive cybersecurity platform for URL/file scanning, threat monitoring, and community engagement.

## 🚀 Features

- **Threat Scanner**: Scan URLs, files, domains, IPs, and hashes for threats
- **Parental Monitor**: Monitor and protect children online
- **Threat Dashboard**: Visualize security threats and statistics
- **Community Posts**: Share and discuss cybersecurity topics
- **Cybersecurity News**: Stay updated with latest security news

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- Chart.js (data visualization)
- React Router Dom
- Supabase (auth & database)

### Backend
- Node.js + Express.js
- Socket.IO (real-time communication)
- VirusTotal API (threat scanning)
- Google Gemini AI (analysis)
- Supabase (database)

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **API Keys**:
   - Supabase (URL + Anon Key) - [Get it here](https://supabase.com)
   - VirusTotal API - [Get it here](https://www.virustotal.com/gui/my-apikey)
   - Google Gemini API - [Get it here](https://makersuite.google.com/app/apikey)

## 🔧 Installation & Setup

### 1. Clone or navigate to the project
```bash
cd "c:\Users\vigne\OneDrive\Desktop\Pi-Guard"
```

### 2. Install Server Dependencies
```bash
cd Server
npm install
```

### 3. Install Client Dependencies
```bash
cd ..\Client
npm install
```

### 4. Configure Environment Variables

#### Server (.env file in Server folder)
```env
PORT=5000
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here
VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Client (.env file in Client folder)
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 5. Setup Supabase Database

Create these tables in your Supabase project:

**scan_insights table:**
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
```

**file_insights table:**
```sql
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

## 🎮 Running the Application

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Server:**
```bash
cd Server
npm start
```

**Terminal 2 - Client:**
```bash
cd Client
npm run dev
```

### Option 2: Using PowerShell Commands

From the root Pi-Guard folder:
```powershell
# Start Server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\vigne\OneDrive\Desktop\Pi-Guard\Server'; npm start"

# Start Client
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\vigne\OneDrive\Desktop\Pi-Guard\Client'; npm run dev"
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Network Access**: http://YOUR_LOCAL_IP:5173 (from other devices)

## 📱 Usage

1. Open http://localhost:5173 in your browser
2. Choose to sign in with Google or continue as guest
3. Select if you're a parent (access to all features) or not
4. Start using the features:
   - **Threat Scanner**: Enter URLs, domains, IPs to scan
   - Upload files for virus scanning
   - View threat analysis powered by AI

## 🔒 Security Notes

- Never commit your `.env` files to version control
- Keep your API keys secure
- VirusTotal has rate limits (4 requests/minute for free tier)
- Ensure CORS is properly configured for production

## 🐛 Troubleshooting

### "Cannot find module 'cors'"
```bash
cd Server
npm install cors
```

### Port Already in Use
Change the PORT in `Server/.env` to another port (e.g., 5001)

### Supabase Connection Issues
- Verify your SUPABASE_URL and SUPABASE_KEY are correct
- Check if your Supabase project is active
- Ensure database tables are created

### VirusTotal API Errors
- Verify your API key is valid
- Check rate limits (free tier: 4 requests/minute)
- Ensure you have an active VirusTotal account

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!
