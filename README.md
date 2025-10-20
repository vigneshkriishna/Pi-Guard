### GitHub Copilot: # 🛡️ Pi-Guard Project Summary

## 📌 What is Pi-Guard?

**Pi-Guard** is a comprehensive cybersecurity platform that helps users scan URLs, files, domains, IPs, and hashes for potential threats using industry-standard APIs and AI-powered analysis.

---

## 🎯 Key Features

### 1. **Threat Scanner (CyberGuard)**
- Scan URLs, domains, IP addresses, and file hashes
- Real-time threat detection using VirusTotal API
- AI-powered analysis using Google Gemini
- Safety score calculation
- Detailed threat reports

### 2. **File Scanner**
- Upload files for virus scanning
- Supports up to 50MB files
- VirusTotal integration
- AI-based threat assessment
- Store scan history in database

### 3. **Threat Dashboard**
- Visualize security statistics
- View scan history
- Charts and graphs powered by Chart.js
- Real-time data updates

### 4. **Parental Monitor**
- Monitor and protect children online
- Track online activity
- Safety controls

### 5. **Community Posts**
- Share cybersecurity tips
- Discuss security topics
- Community engagement

### 6. **Cybersecurity News**
- Latest security news
- Stay updated with threats
- Industry updates

---

## 🏗️ Technology Stack

### **Frontend (Client)**
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Chart.js** - Data visualization
- **Lucide React** - Icons
- **React Router** - Navigation

### **Backend (Server)**
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **Multer** - File uploads
- **Axios** - HTTP requests

### **APIs & Services**
- **Supabase** - Database & Authentication
- **VirusTotal API** - Threat scanning
- **Google Gemini AI** - AI-powered analysis
- **Google OAuth** - User authentication

---

## 📁 Project Structure

```
Pi-Guard/
├── Client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── CyberGuard.jsx          # Main scanner
│   │   │   ├── ThreatDashboard.jsx     # Analytics
│   │   │   ├── ParentalMonitor.jsx     # Monitoring
│   │   │   ├── CommunityPosts.jsx      # Community
│   │   │   ├── Login.jsx               # Authentication
│   │   │   └── layout/                 # Layout components
│   │   ├── contexts/         # React Context (Theme)
│   │   ├── hooks/            # Custom hooks
│   │   └── supabase.js       # Supabase client
│   ├── .env                  # Client config (PRIVATE)
│   └── package.json          # Dependencies
│
├── Server/                    # Backend API
│   ├── index.js              # Main server file
│   ├── .env                  # Server config (PRIVATE)
│   └── package.json          # Dependencies
│
├── Documentation Files:
│   ├── README.md             # Main documentation
│   ├── SETUP_GUIDE.md        # Detailed setup instructions
│   ├── QUICK_START.md        # 5-minute quick start
│   ├── SETUP_CHECKLIST.md    # Setup progress tracker
│   ├── TROUBLESHOOTING.md    # Common issues & fixes
│   ├── GOOGLE_OAUTH_SETUP.md # Google OAuth guide
│   ├── database_setup.sql    # Database schema
│   └── start.ps1             # Launch script
│
└── .gitignore                # Git ignore rules
```

---

## 🔑 Configuration

### **Server Environment Variables** (.env)
```env
PORT=5000
SUPABASE_URL=https://yabdjisglehtswuvoyky.supabase.co
SUPABASE_KEY=[configured]
VIRUSTOTAL_API_KEY=[configured]
GEMINI_API_KEY=[configured]
```

### **Client Environment Variables** (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=[configured]
VITE_SUPABASE_ANON_KEY=[configured]
VITE_GEMINI_API_KEY=[configured]
```

---

## 🗄️ Database Schema

### **Tables in Supabase:**

1. **scan_insights** - Stores URL/Domain/IP/Hash scan results
   - id, input, type, is_safe, safety_score
   - vt_stats (VirusTotal data)
   - gemini_insights (AI analysis)
   - created_at

2. **file_insights** - Stores file scan results
   - id, filename, is_safe, safety_score
   - vt_stats, vt_full_data
   - gemini_insights
   - created_at

---

## 🚀 How It Works

### **Scanning Flow:**
1. User enters URL/domain/IP/hash or uploads file
2. Frontend sends request to backend API
3. Backend queries VirusTotal API for threat data
4. Backend sends data to Google Gemini for AI analysis
5. Results are saved to Supabase database
6. Frontend displays comprehensive threat report
7. User sees safety score, threats, and recommendations

### **Authentication Flow:**
1. User can sign in with Google OAuth
2. Or continue as guest (limited features)
3. Supabase handles authentication
4. User session is maintained across visits

---

## 📊 Current Status

### ✅ **Completed:**
- Project structure set up
- All dependencies installed
- Environment variables configured
- Database tables created
- Backend server running (port 5000)
- Frontend client running (port 5173)
- API integrations connected
- Documentation created

### ⏳ **Pending:**
- Google OAuth configuration (optional)
- Production deployment (optional)
- Custom domain setup (optional)

---

## 🌐 Access URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Network Access:** http://10.184.215.139:5173
- **Supabase Dashboard:** https://supabase.com/dashboard/project/yabdjisglehtswuvoyky

---

## 💰 Cost

**Total Cost: $0/month**

All services use free tiers:
- Supabase (500MB DB, 50K users/month)
- VirusTotal (15.5K requests/month)
- Google Gemini (1M requests/month)
- Google OAuth (Unlimited)

---

## 🔒 Security Features

- Environment variables for sensitive data
- .gitignore prevents credential exposure
- CORS protection
- Supabase authentication
- Input validation
- Rate limiting (VirusTotal)

---

<<<<<<< HEAD
## 👨‍💻 Author

**Vignesh**
- GitHub: [@vigneshkriishna](https://github.com/vigneshkriishna)
- Project: [Pi-Guard](https://github.com/vigneshkriishna/Pi-Guard)

## 🤝 Contributing
=======
## 🎨 UI/UX Features
>>>>>>> 1afbc7dd1304e1775dfa5482379f05e1451d29e6

- Dark/Light theme toggle
- Responsive design (mobile-friendly)
- Smooth animations (Framer Motion)
- Loading states
- Error handling
- Real-time updates

---

## 📝 Recent Changes

- Project renamed from "Pi-Net" to "Pi-Guard"
- All branding updated across files
- Comprehensive documentation added
- Setup guides created
- Environment templates provided
- Database schema finalized

---

## 🎯 Use Cases

1. **Personal Security** - Check URLs before clicking
2. **File Safety** - Scan downloads for malware
3. **Educational** - Learn about cybersecurity
4. **Portfolio Project** - Showcase your skills
5. **Small Business** - Protect team from threats

---🛡️
