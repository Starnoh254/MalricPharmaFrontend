# 🌍 Environment Variables Setup

## 📋 Overview

This project uses environment variables to manage configuration across different environments (development, staging, production). This guide explains how to set up and use `.env` files with Vite.

## 🔧 Vite Environment Variables

### **Important Prefixes**

- **`VITE_`** prefix is **required** for variables accessible in the frontend code
- Variables without `VITE_` prefix are only available in Vite config and build scripts
- Built-in variables: `import.meta.env.DEV`, `import.meta.env.PROD`, `import.meta.env.MODE`

## 📁 Environment Files Structure

```
Frontend/
├── .env.development      # Development environment
├── .env.production       # Production environment
├── .env.example          # Example file (committed to git)
├── .env.local           # Local overrides (gitignored)
└── src/config/env.ts    # Environment configuration
```

### **File Priority (Vite loads in this order)**

1. `.env.local` (always loaded, gitignored)
2. `.env.[mode].local` (gitignored)
3. `.env.[mode]` (committed to git)
4. `.env` (committed to git)

## 🚀 Setup Instructions

### **1. Copy Example File**

```bash
# Copy the example file to create your local configuration
cp .env.example .env.local
```

### **2. Configure Your Variables**

Edit `.env.local` with your personal settings:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Development Settings
VITE_ENABLE_DEBUG=true
VITE_LOG_LEVEL=debug

# Personal API Keys (keep these secret!)
VITE_MPESA_CONSUMER_KEY=your_personal_consumer_key
VITE_MPESA_CONSUMER_SECRET=your_personal_consumer_secret
```

### **3. Available Variables**

#### **API Configuration**

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

#### **Development Settings**

- `VITE_ENABLE_DEBUG` - Enable debug logging (true/false)
- `VITE_LOG_LEVEL` - Log level (debug/info/warn/error)

#### **Payment Configuration**

- `VITE_MPESA_SANDBOX` - Use M-Pesa sandbox (true/false)
- `VITE_MPESA_CONSUMER_KEY` - M-Pesa consumer key
- `VITE_MPESA_CONSUMER_SECRET` - M-Pesa consumer secret

#### **Feature Flags**

- `VITE_ENABLE_ANALYTICS` - Enable analytics (true/false)
- `VITE_ENABLE_CHAT_SUPPORT` - Enable chat support (true/false)

## 💻 Usage in Code

### **Import Environment Configuration**

```typescript
import { env } from "../config/env";

// Use typed environment variables
console.log(env.apiBaseUrl);
console.log(env.isDevelopment);
console.log(env.enableDebug);
```

### **Direct Access (not recommended)**

```typescript
// Direct access (less safe)
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const isDev = import.meta.env.DEV;
const mode = import.meta.env.MODE;
```

## 🛡️ Security Best Practices

### **✅ Safe to Commit**

- `.env.development`
- `.env.production`
- `.env.example`

### **❌ Never Commit**

- `.env.local`
- `.env.*.local`
- Any file with real API keys or secrets

### **🔐 Secret Management**

- Use `.env.local` for personal/sensitive data
- Never put real secrets in committed files
- Use placeholder values in example files
- Consider using external secret management for production

## 🚨 Troubleshooting

### **Variables Not Loading**

1. Ensure variable names start with `VITE_`
2. Restart development server after changing .env files
3. Check file naming (no spaces, correct extensions)

### **Environment Not Detected**

1. Verify `import.meta.env.MODE` matches your environment
2. Check Vite mode with: `npm run dev -- --mode development`

### **TypeScript Errors**

1. Environment types are defined in `src/config/env.ts`
2. Add new variables to the `EnvironmentConfig` interface
3. Update validation logic for required variables

## 📚 Examples

### **Different API URLs per Environment**

```typescript
// Development
VITE_API_BASE_URL=http://localhost:3000/api

// Staging
VITE_API_BASE_URL=https://staging-api.malricpharma.co.ke

// Production
VITE_API_BASE_URL=https://api.malricpharma.co.ke
```

### **Feature Flags**

```typescript
// Enable features based on environment
if (env.enableAnalytics) {
  // Initialize analytics
}

if (env.enableChatSupport) {
  // Load chat widget
}
```

### **Debug Logging**

```typescript
// Conditional logging based on environment
if (env.isDevelopment && env.enableDebug) {
  console.log("Debug info:", data);
}
```

## 🔄 Deployment

### **Development**

```bash
npm run dev
# Loads .env.development
```

### **Production Build**

```bash
npm run build
# Loads .env.production
```

### **Custom Mode**

```bash
npm run dev -- --mode staging
# Loads .env.staging
```

This setup provides a robust, type-safe way to manage environment variables across different deployment environments while keeping sensitive data secure.
