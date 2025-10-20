# Google OAuth Setup for Pi-Guard

Follow these steps to enable Google Sign-In for your Pi-Guard application.

---

## Step 1: Access Google Cloud Console

1. Open: https://console.cloud.google.com/
2. Sign in with your Google account

---

## Step 2: Create or Select a Project

### Option A: Create New Project
1. Click the project dropdown at the top
2. Click **"NEW PROJECT"**
3. Enter project name: **"Pi-Guard"**
4. Click **"CREATE"**
5. Wait for project creation (takes a few seconds)
6. Select the new project from the dropdown

### Option B: Use Existing Project
1. Click the project dropdown at the top
2. Select your existing project

---

## Step 3: Configure OAuth Consent Screen

1. In the left sidebar, go to: **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** (for testing with any Google account)
3. Click **"CREATE"**

### Fill in the required fields:

**App information:**
- **App name:** `Pi-Guard`
- **User support email:** Your email address
- **App logo:** (Optional - skip for now)

**App domain:** (Optional - skip for now)

**Developer contact information:**
- **Email addresses:** Your email address

4. Click **"SAVE AND CONTINUE"**

### Scopes (Step 2):
1. Click **"ADD OR REMOVE SCOPES"**
2. Select these scopes:
   - ✅ `.../auth/userinfo.email`
   - ✅ `.../auth/userinfo.profile`
   - ✅ `openid`
3. Click **"UPDATE"**
4. Click **"SAVE AND CONTINUE"**

### Test users (Step 3):
1. Click **"ADD USERS"**
2. Add your Gmail address (and any other test users)
3. Click **"ADD"**
4. Click **"SAVE AND CONTINUE"**

### Summary (Step 4):
1. Review your settings
2. Click **"BACK TO DASHBOARD"**

---

## Step 4: Create OAuth 2.0 Credentials

1. In the left sidebar, go to: **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**

### Application type:
- Select: **"Web application"**

### Name:
- Enter: `Pi-Guard Web Client`

### Authorized JavaScript origins:
Click **"+ ADD URI"** and add these TWO URLs:
```
http://localhost:5173
```
```
https://yabdjisglehtswuvoyky.supabase.co
```

### Authorized redirect URIs:
Click **"+ ADD URI"** and add these TWO URLs:
```
http://localhost:5173
```
```
https://yabdjisglehtswuvoyky.supabase.co/auth/v1/callback
```

**IMPORTANT:** The redirect URI must include `/auth/v1/callback` for Supabase!

4. Click **"CREATE"**

---

## Step 5: Copy Your Credentials

A popup will appear with your credentials:

1. **Copy the Client ID** (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
2. **Copy the Client Secret** (looks like: `GOCSPX-abc123xyz`)

⚠️ **Keep these safe!** You'll need them for the next step.

---

## Step 6: Configure Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/yabdjisglehtswuvoyky

2. Click **"Authentication"** in the left sidebar

3. Click **"Providers"** tab

4. Find **"Google"** in the list

5. Toggle it **ON** (enable it)

6. Paste your credentials:
   - **Client ID (for OAuth):** [Paste from Step 5]
   - **Client Secret (for OAuth):** [Paste from Step 5]

7. Click **"Save"**

---

## Step 7: Test the Integration

1. Make sure your Pi-Guard application is running:
   - Server: http://localhost:5000
   - Client: http://localhost:5173

2. Open http://localhost:5173 in your browser

3. Click **"Sign In with Google"**

4. You should see Google's sign-in popup

5. Select your Google account

6. Grant permissions

7. You should be redirected back to Pi-Guard, now logged in!

---

## ✅ Success Indicators

When it works correctly, you'll see:
- ✅ Google sign-in popup appears
- ✅ You can select your Google account
- ✅ After authorization, you're redirected back
- ✅ Your profile picture/name appears in the header
- ✅ "Sign Out" button is available

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
**Fix:** Check that your redirect URIs in Google Cloud Console EXACTLY match:
- `http://localhost:5173`
- `https://yabdjisglehtswuvoyky.supabase.co/auth/v1/callback`

### Error: "Access blocked: This app's request is invalid"
**Fix:** 
1. Make sure OAuth consent screen is configured
2. Add your email as a test user
3. Verify all required scopes are selected

### Error: "Invalid client"
**Fix:** 
1. Double-check Client ID and Secret in Supabase
2. Make sure there are no extra spaces when copying
3. Re-save in Supabase

### Sign-in popup doesn't appear
**Fix:**
1. Check browser console for errors (F12)
2. Disable popup blockers for localhost:5173
3. Try in incognito/private mode
4. Clear browser cache and cookies

---

## 📝 Quick Reference

**Your Supabase Project URL:**
```
https://yabdjisglehtswuvoyky.supabase.co
```

**Required Redirect URI:**
```
https://yabdjisglehtswuvoyky.supabase.co/auth/v1/callback
```

**Local Development URL:**
```
http://localhost:5173
```

---

## 🎯 Next Steps After Setup

Once Google OAuth is working:
1. Test signing in and out
2. Verify your profile appears in the header
3. Try accessing all features
4. Test on different browsers
5. Consider deploying to production

---

**Need Help?** Check the browser console (F12) for error messages and refer to the Troubleshooting section above.
