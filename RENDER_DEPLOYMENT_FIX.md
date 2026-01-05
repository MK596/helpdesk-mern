# 🚀 Render Deployment Guide - Login Fix

## Problem
Login not working on Render deployment due to API configuration and CORS issues.

## ✅ Solutions Applied

### 1. API Configuration
- Created `frontend/src/config/api.js` to handle different environments
- Updated `AuthContext.jsx` to use the API base URL
- This allows the app to work both locally and on Render

### 2. CORS Configuration
- Updated `backend/server.js` with proper CORS settings
- Configured to handle production environment correctly
- Supports both same-domain and separate deployments

### 3. Environment Variables
- Created `frontend/.env.example` for frontend configuration

---

## 📋 Render Deployment Steps

### Option A: Single Service (Recommended)
Deploy frontend and backend together on one Render service.

#### 1. Set Environment Variables on Render
Go to your Render dashboard → Environment → Add:

```
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
```

#### 2. Build & Start Commands
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

#### 3. Deploy
- Push to GitHub
- Render will auto-deploy
- Frontend will be served from `/frontend/dist`
- API endpoints will be at `/api/*`

**No need to set VITE_API_URL** - it will use relative paths.

---

### Option B: Separate Services
If you deploy frontend and backend separately:

#### Backend Service
1. Set environment variables:
```
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
FRONTEND_URL=https://your-frontend-url.onrender.com
```

2. Build Command: `npm install --prefix backend`
3. Start Command: `npm start --prefix backend`

#### Frontend Service
1. Set environment variable:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

2. Build Command: `npm run build --prefix frontend`
3. Start Command: Use Render's static site hosting

---

## 🔧 Troubleshooting

### Login Still Not Working?

#### Check 1: Browser Console
Open DevTools (F12) → Console tab
Look for errors like:
- `CORS error` → Check CORS configuration
- `Network error` → Check if backend is running
- `404 Not Found` → Check API URL configuration

#### Check 2: Network Tab
Open DevTools (F12) → Network tab
- Click login button
- Look for `/api/users/login` request
- Check the request URL - should point to your backend
- Check response status code

#### Check 3: Backend Logs
On Render dashboard:
- Go to your service
- Click "Logs"
- Look for errors when login is attempted

#### Check 4: Environment Variables
Verify on Render:
- `MONGO_URI` is set correctly
- `JWT_SECRET` is set
- `NODE_ENV=production`

#### Check 5: MongoDB Connection
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Or add Render's IP addresses to whitelist

---

## 🎯 Common Issues & Fixes

### Issue: "Network Error"
**Fix**: Backend is not running or URL is wrong
- Check Render logs
- Verify `VITE_API_URL` if using separate services

### Issue: "CORS Error"
**Fix**: CORS not configured properly
- Ensure `FRONTEND_URL` is set in backend env vars (if separate)
- Check backend CORS configuration in `server.js`

### Issue: "Invalid credentials" (but they're correct)
**Fix**: Database connection issue
- Check `MONGO_URI` in Render env vars
- Verify MongoDB Atlas network access settings

### Issue: Login works locally but not on Render
**Fix**: Environment mismatch
- Ensure `NODE_ENV=production` is set on Render
- Check that build completed successfully
- Verify all env vars are set on Render

---

## ✨ Testing Your Deployment

1. **Create a test account**
   - Go to `/register`
   - Create a new account
   - Should redirect to login

2. **Test login**
   - Use the credentials you just created
   - Should redirect to home page
   - Check if user info appears in header

3. **Test protected routes**
   - Try accessing `/tickets`
   - Should work if logged in
   - Should redirect to login if not logged in

---

## 📞 Still Having Issues?

If login still doesn't work after following this guide:

1. Check Render logs for errors
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure MongoDB connection is working
5. Try creating a new user and logging in with that

---

## 🔐 Security Notes

- Never commit `.env` files to Git
- Use strong `JWT_SECRET` (random string, 32+ characters)
- Keep `MONGO_URI` secret
- Enable MongoDB Atlas IP whitelist in production
- Consider adding rate limiting for login attempts

---

## 📝 Quick Checklist

- [ ] Environment variables set on Render
- [ ] MongoDB Atlas allows Render connections
- [ ] Build completed successfully
- [ ] Backend is running (check logs)
- [ ] CORS configured correctly
- [ ] Frontend can reach backend API
- [ ] Test user can register
- [ ] Test user can login
- [ ] Protected routes work after login

---

Good luck with your deployment! 🚀
