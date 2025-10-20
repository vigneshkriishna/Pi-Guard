# 🔧 Pi-Guard Troubleshooting Guide

Common issues and their solutions.

---

## Server Issues

### ❌ "Cannot find module 'cors'" or similar dependency errors

**Cause:** Dependencies not installed

**Solution:**
```powershell
cd Server
npm install
```

---

### ❌ "Error: listen EADDRINUSE: address already in use :::5000"

**Cause:** Port 5000 is already in use by another application

**Solutions:**

**Option 1 - Change Port:**
Edit `Server\.env` and change:
```env
PORT=5001
```

**Option 2 - Kill Process on Port 5000:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F
```

---

### ❌ "Supabase connection failed" or "Invalid API key"

**Cause:** Incorrect Supabase credentials

**Solution:**
1. Go to your Supabase project: https://app.supabase.com/
2. Click Settings → API
3. Copy the correct values:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - anon/public key (starts with `eyJ...`)
4. Update `Server\.env` and `Client\.env`
5. Restart both servers

---

### ❌ "VirusTotal API error" or "429 Too Many Requests"

**Cause:** API rate limit exceeded (Free tier: 4 requests/minute)

**Solution:**
- Wait 1 minute before trying again
- Check your API key is valid at https://www.virustotal.com/gui/my-apikey
- Consider upgrading to premium if you need more requests

---

### ❌ "Gemini API error" or "API key not valid"

**Cause:** Invalid or missing Gemini API key

**Solution:**
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key or copy existing one
3. Update `GEMINI_API_KEY` in `Server\.env`
4. Restart the server

---

## Client Issues

### ❌ "Failed to fetch" or "Network error"

**Cause:** Backend server not running or CORS issue

**Solution:**
1. Ensure backend server is running on port 5000
2. Check server console for errors
3. Verify `http://localhost:5000` is accessible
4. Check CORS settings in `Server\index.js`

---

### ❌ "Supabase URL or Anon Key missing in .env file"

**Cause:** Missing client environment variables

**Solution:**
1. Create `Client\.env` file if it doesn't exist
2. Add:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```
3. Restart the client: `npm run dev`

---

### ❌ Page loads but features don't work

**Cause:** Environment variables not loaded

**Solution:**
1. Make sure `.env` files exist in both Client and Server folders
2. Restart both servers completely
3. Clear browser cache (Ctrl + Shift + Delete)
4. Hard refresh (Ctrl + F5)

---

## Database Issues

### ❌ "relation 'scan_insights' does not exist"

**Cause:** Database tables not created

**Solution:**
1. Go to Supabase → SQL Editor
2. Run the SQL from `database_setup.sql`
3. Verify tables exist in Table Editor

---

### ❌ "new row violates row-level security policy"

**Cause:** Row Level Security enabled without proper policies

**Solution:**

**Option 1 - Disable RLS (for development):**
```sql
ALTER TABLE scan_insights DISABLE ROW LEVEL SECURITY;
ALTER TABLE file_insights DISABLE ROW LEVEL SECURITY;
```

**Option 2 - Add Policies:**
```sql
CREATE POLICY "Allow all operations" ON scan_insights
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations" ON file_insights
  FOR ALL USING (true) WITH CHECK (true);
```

---

## Authentication Issues

### ❌ Google Sign-In not working

**Cause:** Google OAuth not configured properly

**Solution:**
1. In Supabase: Authentication → Providers → Google
2. Verify Client ID and Secret are correct
3. Check Redirect URI matches: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
4. Ensure OAuth consent screen is configured in Google Cloud Console
5. Clear cookies and try again

---

### ❌ "User already registered" but can't sign in

**Cause:** Account exists but credentials are wrong

**Solution:**
- Use Google Sign-In instead
- Or request password reset if using email/password
- Check Supabase → Authentication → Users to see registered accounts

---

## Installation Issues

### ❌ "npm install" fails with permission errors

**Cause:** Insufficient permissions

**Solution:**
```powershell
# Run PowerShell as Administrator
# Then:
cd Server
npm install

cd ..\Client
npm install
```

---

### ❌ "node: command not found" or "npm: command not found"

**Cause:** Node.js not installed or not in PATH

**Solution:**
1. Download Node.js: https://nodejs.org/
2. Install it (check "Add to PATH" during installation)
3. Restart PowerShell
4. Verify: `node --version`

---

## Build/Deployment Issues

### ❌ Build fails with "out of memory" error

**Cause:** Insufficient memory for build process

**Solution:**
```powershell
# Increase Node.js memory limit
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

### ❌ Production deployment can't connect to backend

**Cause:** CORS not configured for production URL

**Solution:**
1. Edit `Server\index.js`
2. Update CORS configuration:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-production-url.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

---

## General Debugging Tips

### 🔍 Check Browser Console
1. Press F12 in browser
2. Go to Console tab
3. Look for errors (red text)

### 🔍 Check Server Console
Look at the terminal where server is running for error messages

### 🔍 Verify Environment Variables
```powershell
# In Server folder
Get-Content .env

# In Client folder  
Get-Content .env
```

### 🔍 Test API Endpoints Manually
```powershell
# Test if server is running
curl http://localhost:5000/api/insights

# Test Supabase connection (use your URL)
curl https://your-project.supabase.co/rest/v1/
```

### 🔍 Clear Everything and Start Fresh
```powershell
# Remove node_modules and reinstall
cd Server
Remove-Item node_modules -Recurse -Force
npm install

cd ..\Client
Remove-Item node_modules -Recurse -Force
npm install
```

---

## Still Having Issues?

1. ✅ Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. ✅ Review the [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
3. ✅ Check Supabase status: https://status.supabase.com/
4. ✅ Check VirusTotal API status
5. ✅ Review error messages carefully
6. ✅ Search for the error message online

---

## Common Error Messages Reference

| Error Message | Likely Cause | Quick Fix |
|--------------|--------------|-----------|
| `ECONNREFUSED` | Server not running | Start server |
| `EADDRINUSE` | Port already in use | Change port or kill process |
| `MODULE_NOT_FOUND` | Dependencies not installed | Run `npm install` |
| `Invalid API key` | Wrong API key | Check and update .env |
| `CORS error` | CORS misconfigured | Update CORS settings |
| `401 Unauthorized` | Auth issue | Check Supabase credentials |
| `429 Too Many Requests` | Rate limit hit | Wait and try again |
| `Network error` | Backend down | Check server is running |

---

**Remember:** Most issues are caused by missing or incorrect environment variables! Always double-check your `.env` files first.
