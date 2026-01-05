# 🚀 Render Environment Variables Guide

## ❓ Question: Which Environment Variables Need to Be Added Manually in Render?

---

## ✅ **Answer: You Need to Add ONLY 2 Variables Manually**

Looking at your `render.yaml` file, here's what's configured:

```yaml
envVars:
  - key: NODE_ENV
    value: production        ← Already set in render.yaml
  - key: MONGO_URI
    sync: false             ← YOU MUST ADD THIS MANUALLY
  - key: JWT_SECRET
    sync: false             ← YOU MUST ADD THIS MANUALLY
  - key: PORT
    value: 5000             ← Already set in render.yaml
```

---

## 📋 **What You Need to Do in Render Dashboard:**

### **Variables Already Set (No Action Needed):**
✅ `NODE_ENV` = `production` (set in render.yaml)  
✅ `PORT` = `5000` (set in render.yaml)

### **Variables You MUST Add Manually:**
❗ `MONGO_URI` = Your MongoDB Atlas connection string  
❗ `JWT_SECRET` = Your secret key

---

## 🎯 **Step-by-Step: Adding Variables in Render**

### **Step 1: Go to Render Dashboard**
1. Log in to [Render](https://dashboard.render.com/)
2. Click on your **helpdesk-mern** service
3. Click **"Environment"** in the left sidebar

### **Step 2: Add MONGO_URI**
Click **"Add Environment Variable"**

| Field | Value |
|-------|-------|
| **Key** | `MONGO_URI` |
| **Value** | `mongodb+srv://luffy:mani123@cluster0.adaumbv.mongodb.net/helpdesk?retryWrites=true&w=majority&appName=Cluster0` |

### **Step 3: Add JWT_SECRET**
Click **"Add Environment Variable"** again

| Field | Value |
|-------|-------|
| **Key** | `JWT_SECRET` |
| **Value** | `helpdesk-secret-key-2026-change-this-in-production` |

### **Step 4: Save Changes**
Click **"Save Changes"** button

Render will automatically redeploy your application with the new environment variables.

---

## 📊 **Complete Environment Variables Summary**

| Variable | Value | How It's Set | Action Required? |
|----------|-------|--------------|------------------|
| `NODE_ENV` | `production` | render.yaml | ❌ No (automatic) |
| `PORT` | `5000` | render.yaml | ❌ No (automatic) |
| `MONGO_URI` | Your MongoDB connection string | Manual | ✅ **YES - Add manually** |
| `JWT_SECRET` | Your secret key | Manual | ✅ **YES - Add manually** |

---

## 🔍 **Why PORT is Already Set:**

In your `render.yaml`:
```yaml
- key: PORT
  value: 5000
```

This means `PORT=5000` is **automatically set** by the render.yaml file.

**You do NOT need to add PORT manually in the dashboard!**

---

## ⚠️ **Important Notes:**

### **About PORT:**
- Render **automatically assigns a port** for web services
- Your app should use `process.env.PORT` (which it does in `server.js`)
- The `PORT=5000` in render.yaml is a fallback, but Render will override it
- **You don't need to worry about PORT** - it's handled automatically

### **About MONGO_URI:**
- This contains your **real MongoDB password**
- That's why it has `sync: false` (not stored in the file)
- You **must add it manually** in the Render dashboard

### **About JWT_SECRET:**
- This is your **secret key** for JWT tokens
- Should be a long, random string
- You **must add it manually** in the Render dashboard
- Consider using a stronger secret for production!

---

## 🎯 **Quick Checklist for Render Deployment:**

- [ ] Push your code to GitHub
- [ ] Create Web Service on Render
- [ ] Connect your GitHub repository
- [ ] Render detects `render.yaml` automatically
- [ ] Go to **Environment** tab
- [ ] Add `MONGO_URI` with your MongoDB Atlas connection string
- [ ] Add `JWT_SECRET` with your secret key
- [ ] Click **Save Changes**
- [ ] Wait for deployment to complete
- [ ] Test your application!

---

## 📝 **Example: What Your Render Environment Tab Should Look Like**

After adding the variables manually, you should see:

```
Environment Variables (4)

NODE_ENV          production                    [From Blueprint]
PORT              5000                          [From Blueprint]
MONGO_URI         mongodb+srv://luffy:mani...   [Manual]
JWT_SECRET        helpdesk-secret-key-2026...   [Manual]
```

---

## 🔐 **Security Tip:**

For production, consider generating a stronger `JWT_SECRET`:

**Option 1: Online Generator**
Visit: https://randomkeygen.com/

**Option 2: Command Line (if you have OpenSSL)**
```bash
openssl rand -base64 32
```

**Option 3: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then use the generated string as your `JWT_SECRET` on Render.

---

## ✅ **Final Answer:**

**Do you need to add PORT manually?**  
❌ **NO** - PORT is already set in `render.yaml`

**What do you need to add manually?**  
✅ **ONLY 2 variables:**
1. `MONGO_URI`
2. `JWT_SECRET`

---

Hope this clears up the confusion! 🚀
