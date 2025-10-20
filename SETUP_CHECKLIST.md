# Pi-Guard Setup Checklist

Use this checklist to track your setup progress!

## Prerequisites
- [ ] Node.js installed (v16+) - Run `node --version` to check
- [ ] npm installed - Run `npm --version` to check
- [ ] Git installed - Run `git --version` to check

## API Keys & Accounts
- [ ] Supabase account created at https://supabase.com/
- [ ] Supabase project created
- [ ] Supabase URL obtained
- [ ] Supabase anon key obtained
- [ ] VirusTotal account created at https://www.virustotal.com/
- [ ] VirusTotal API key obtained
- [ ] Google AI account created at https://makersuite.google.com/
- [ ] Google Gemini API key obtained

## Database Setup
- [ ] Opened Supabase SQL Editor
- [ ] Ran `database_setup.sql` script
- [ ] Verified `scan_insights` table created
- [ ] Verified `file_insights` table created
- [ ] Indexes created successfully

## Google OAuth (Optional)
- [ ] Google Cloud Console project created
- [ ] OAuth 2.0 credentials created
- [ ] Authorized redirect URI configured
- [ ] Google provider enabled in Supabase
- [ ] Client ID and Secret added to Supabase

## Server Setup
- [ ] Navigated to `Server` folder
- [ ] Ran `npm install`
- [ ] Created `Server\.env` file
- [ ] Added PORT to .env
- [ ] Added SUPABASE_URL to .env
- [ ] Added SUPABASE_KEY to .env
- [ ] Added VIRUSTOTAL_API_KEY to .env
- [ ] Added GEMINI_API_KEY to .env

## Client Setup
- [ ] Navigated to `Client` folder
- [ ] Ran `npm install`
- [ ] Created `Client\.env` file
- [ ] Added VITE_SUPABASE_URL to .env
- [ ] Added VITE_SUPABASE_ANON_KEY to .env

## Testing
- [ ] Started server with `cd Server && npm start`
- [ ] Server running on http://localhost:5000
- [ ] Started client with `cd Client && npm run dev`
- [ ] Client running on http://localhost:5173
- [ ] Opened http://localhost:5173 in browser
- [ ] Login page loads correctly
- [ ] Logged in or continued as guest
- [ ] Tested URL scan
- [ ] Tested file upload scan
- [ ] Results display correctly
- [ ] No errors in browser console
- [ ] No errors in server console

## Git & Deployment
- [ ] Committed changes to git
- [ ] Pushed to GitHub repository
- [ ] .env files NOT committed (in .gitignore)
- [ ] README updated with setup instructions

## Production Deployment (Optional)
- [ ] Deployed frontend (Vercel/Netlify)
- [ ] Deployed backend (Render/Railway)
- [ ] Updated CORS settings for production URL
- [ ] Updated environment variables in hosting platform
- [ ] Enabled Row Level Security in Supabase
- [ ] Configured custom domain (optional)
- [ ] SSL certificate active

## Troubleshooting
If you encounter issues:
- [ ] Checked all API keys are correct
- [ ] Verified .env files exist and have correct values
- [ ] Checked Supabase project is active
- [ ] Verified VirusTotal API rate limits
- [ ] Cleared browser cache and cookies
- [ ] Restarted server and client
- [ ] Checked browser console for errors
- [ ] Checked server console for errors

---

## Quick Reference

### Start Development
```powershell
# Terminal 1
cd Server
npm start

# Terminal 2
cd Client
npm run dev
```

### URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Supabase Dashboard: https://app.supabase.com/

### Important Files
- Server config: `Server\.env`
- Client config: `Client\.env`
- Database script: `database_setup.sql`
- Setup guide: `SETUP_GUIDE.md`
- Quick start: `QUICK_START.md`

---

**Last Updated:** [Add date when you complete setup]
