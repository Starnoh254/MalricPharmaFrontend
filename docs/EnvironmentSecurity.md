# 🔐 Environment Variables Security Guide

## 📋 **What Gets Committed to GitHub?**

### ✅ **SAFE TO COMMIT**

```
.env.development        ✅ (Safe - contains localhost URLs and dev settings)
.env.production         ✅ (Safe - contains placeholders and public config)
.env.example           ✅ (Safe - template for team members)
```

### ❌ **NEVER COMMIT**

```
.env.local             ❌ (Contains your personal secrets)
.env.*.local           ❌ (Contains environment-specific secrets)
.env.production.local  ❌ (Contains REAL production secrets)
```

## 🛡️ **Current Setup**

### **Files in Your Project:**

1. **`.env.production`** (Committed to Git)

   ```bash
   # Safe placeholders
   VITE_MPESA_CONSUMER_KEY=your_production_consumer_key_here
   VITE_MPESA_CONSUMER_SECRET=your_production_consumer_secret_here
   ```

2. **`.env.production.local`** (NOT committed - for real deployment)
   ```bash
   # Real secrets (never commit this)
   VITE_MPESA_CONSUMER_KEY=actual_key_from_safaricom
   VITE_MPESA_CONSUMER_SECRET=actual_secret_from_safaricom
   ```

## 🚀 **Deployment Strategy**

### **For Development Team**

```bash
# Team members clone repo and get placeholders
git clone your-repo
cp .env.example .env.local
# Edit .env.local with their personal dev settings
```

### **For Production Deployment**

#### **Option 1: CI/CD Pipeline (Recommended)**

```yaml
# In GitHub Actions, Vercel, Netlify, etc.
env:
  VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
  VITE_MPESA_CONSUMER_KEY: ${{ secrets.MPESA_CONSUMER_KEY }}
  VITE_MPESA_CONSUMER_SECRET: ${{ secrets.MPESA_CONSUMER_SECRET }}
```

#### **Option 2: Server Environment Variables**

```bash
# On production server
export VITE_API_BASE_URL="https://api.malricpharma.co.ke"
export VITE_MPESA_CONSUMER_KEY="real_production_key"
export VITE_MPESA_CONSUMER_SECRET="real_production_secret"
```

#### **Option 3: Production .local File**

```bash
# On production server only
cp .env.production.local.example .env.production.local
# Edit with real values (this file is gitignored)
```

## 🔍 **Security Best Practices**

### **1. Placeholder Pattern**

```bash
# In committed files, use descriptive placeholders
VITE_MPESA_CONSUMER_KEY=your_production_consumer_key_here
VITE_API_KEY=get_this_from_your_api_provider
VITE_DATABASE_URL=your_database_connection_string
```

### **2. Environment Validation**

```typescript
// Your env.ts already validates required variables
const validateEnvVar = (key: string, value: string | undefined): string => {
  if (!value || value.includes("your_") || value.includes("_here")) {
    throw new Error(`Please set real value for ${key}`);
  }
  return value;
};
```

### **3. Secret Detection**

```bash
# Add to your build process
if [[ "$VITE_MPESA_CONSUMER_KEY" == *"your_"* ]]; then
  echo "❌ Error: Production build with placeholder values!"
  exit 1
fi
```

## 📁 **File Structure Summary**

```
Frontend/
├── .env.development         ✅ Committed (dev config)
├── .env.production          ✅ Committed (prod config with placeholders)
├── .env.example            ✅ Committed (template)
├── .env.local              ❌ Gitignored (your personal config)
├── .env.production.local   ❌ Gitignored (real prod secrets)
└── .gitignore              ✅ Protects *.local files
```

## 🎯 **Recommendation for Your Project**

**YES, commit `.env.production` to GitHub** because:

1. ✅ Contains only placeholders and public configuration
2. ✅ Helps team members understand what variables are needed
3. ✅ Provides a template for production deployment
4. ✅ Documents the application configuration
5. ✅ Real secrets go in `.env.production.local` (gitignored)

## 🚨 **Red Flags (Never Commit These)**

```bash
# Real API keys
VITE_MPESA_CONSUMER_KEY=pk_live_51H7gF2KfG...

# Database URLs with credentials
DATABASE_URL=postgresql://user:password@host:5432/db

# JWT secrets
JWT_SECRET=super_secret_key_dont_share

# Payment gateway keys
STRIPE_SECRET_KEY=sk_live_51H7gF2KfG...
```

Your current setup is **secure and follows best practices!** 🎉
