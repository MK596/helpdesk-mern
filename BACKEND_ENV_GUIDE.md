# 🔧 Backend .env File Guide

## 📍 File Location
`backend/.env` (This file is for LOCAL development only!)

---

## ✅ What Your `backend/.env` Should Look Like

### **For Local Development:**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://luffy:mani123@cluster0.adaumbv.mongodb.net/helpdesk?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=my-super-secret-jwt-key-12345-change-this
```

### **Explanation of Each Variable:**

| Variable | What It Does | Example Value |
|----------|-------------|---------------|
| `NODE_ENV` | Sets the environment mode | `development` (local) or `production` (Render) |
| `PORT` | Port number for the backend server | `5000` |
| `MONGO_URI` | MongoDB connection string | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens | Any random long string (32+ chars) |

---

## 🎯 Your Actual Values (Based on Your Setup)

Copy this **EXACTLY** into your `backend/.env` file:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://luffy:mani123@cluster0.adaumbv.mongodb.net/helpdesk?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=helpdesk-secret-key-2026-change-this-in-production
```

---

## ⚠️ Important Notes

### **1. NO Quotes Needed**
❌ **WRONG:**
```env
MONGO_URI="mongodb+srv://..."
JWT_SECRET="my-secret"
```

✅ **CORRECT:**
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=my-secret
```

### **2. NO Spaces Around `=`**
❌ **WRONG:**
```env
PORT = 5000
MONGO_URI = mongodb+srv://...
```

✅ **CORRECT:**
```env
PORT=5000
MONGO_URI=mongodb+srv://...
```

### **3. NO Empty Lines Between Variables (Optional)**
Both work, but cleaner without:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=my-secret
```

### **4. Comments Start with `#`**
```env
# This is a comment
NODE_ENV=development  # This is also valid
```

---

## 🚀 For Render Deployment

**DO NOT** push `backend/.env` to GitHub!

Instead, add these same variables in **Render Dashboard → Environment**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` ← **Change to production!** |
| `PORT` | `5000` |
| `MONGO_URI` | `mongodb+srv://luffy:mani123@cluster0.adaumbv.mongodb.net/helpdesk?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | `helpdesk-secret-key-2026-change-this-in-production` ← **Use a stronger secret!** |

---

## 🔐 Security Tips

1. **Never commit `.env` to Git** - It should be in `.gitignore`
2. **Use different secrets for production** - Change `JWT_SECRET` on Render
3. **Keep your MongoDB password secure** - Don't share it publicly
4. **Use strong JWT secrets** - Generate with: `openssl rand -base64 32`

---

## ✅ Quick Checklist

- [ ] `backend/.env` file exists
- [ ] All 4 variables are set (NODE_ENV, PORT, MONGO_URI, JWT_SECRET)
- [ ] No quotes around values
- [ ] No spaces around `=` signs
- [ ] MongoDB connection string includes database name (`/helpdesk`)
- [ ] `.env` is in `.gitignore` (not pushed to GitHub)

---

## 🧪 Test Your Configuration

After updating your `.env` file:

1. **Stop your backend server** (Ctrl+C)
2. **Restart it:**
   ```bash
   cd backend
   npm run dev
   ```
3. **Look for this message:**
   ```
   MongoDB Connected: cluster0.adaumbv.mongodb.net
   Server started on port 5000
   ```

If you see that, your `.env` is configured correctly! ✅

---

## 🆘 Common Issues

### Issue: "Cannot connect to MongoDB"
**Fix:** Check your `MONGO_URI` - make sure:
- Username and password are correct
- Database name is included (`/helpdesk`)
- No extra quotes or spaces

### Issue: "JWT_SECRET is not defined"
**Fix:** Make sure `JWT_SECRET` is in your `.env` file

### Issue: "dotenv is not defined"
**Fix:** Install dotenv:
```bash
npm install dotenv
```

---

Need help? Just ask! 🚀
