# 🚀 Step-by-Step Implementation Guide: Google Tools Setup

## 1. 🏪 **Google My Business Setup (15 minutes)**

### **Step 1: Create Your Google My Business Account**

1. **Go to**: https://business.google.com
2. **Click**: "Start now" or "Manage now"
3. **Sign in**: Use your Google account (create one if needed)

### **Step 2: Add Your Business**

1. **Business Name**: Enter "Malric Pharma"
2. **Business Category**: Select "Pharmacy" or "Health and Medical"
3. **Location**:
   - Enter your actual physical address in Nairobi
   - Example: "123 Kimathi Street, Nairobi, Kenya"
4. **Service Area**:
   - Select "I deliver goods and services to my customers"
   - Add areas: Nairobi, Kiambu, Machakos (your delivery zones)

### **Step 3: Contact Information**

```
Business Name: Malric Pharma
Phone: +254-700-000-000 (use your actual number)
Website: https://malricpharma.co.ke
Category: Pharmacy
```

### **Step 4: Verification**

1. **Choose verification method**:

   - Phone call (fastest - 2 minutes)
   - Text message
   - Postcard (takes 1-2 weeks)

2. **Phone Verification**:
   - Google will call your business number
   - Answer and enter the verification code
   - ✅ **DONE!** Your listing is now live

### **Step 5: Complete Your Profile**

**Essential Information to Add:**

```
Hours:
- Monday-Sunday: 24/7 (if online)
- Or your actual pharmacy hours

Description:
"Kenya's leading online pharmacy offering quality medicines and health products. Licensed by Kenya Pharmacy Board. Free same-day delivery in Nairobi."

Services:
- Prescription medicines
- Over-the-counter drugs
- Health supplements
- Medicine delivery
- Online pharmacy consultation

Photos:
- Logo
- Store front (if physical)
- Product photos
- Staff photos
```

---

## 2. 📊 **Google Search Console Setup (10 minutes)**

### **Step 1: Access Search Console**

1. **Go to**: https://search.google.com/search-console
2. **Sign in**: Use the same Google account as GMB
3. **Click**: "Start now"

### **Step 2: Add Your Property**

1. **Choose**: "URL prefix" (not domain)
2. **Enter**: `https://malricpharma.co.ke`
3. **Click**: "Continue"

### **Step 3: Verify Ownership**

**Method 1: HTML Meta Tag (Recommended)**

1. **Copy the meta tag** Google provides (looks like):

   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

2. **Add to your index.html**:

   - Location: `public/index.html`
   - Place in the `<head>` section

3. **Deploy your website** with this meta tag

4. **Click "Verify"** in Search Console

**Method 2: HTML File Upload**

1. **Download the verification file** from Google
2. **Upload to**: `public/` folder of your website
3. **Deploy** and click "Verify"

### **Step 4: Submit Your Sitemap**

1. **Go to**: "Sitemaps" in left sidebar
2. **Enter**: `sitemap.xml`
3. **Click**: "Submit"
4. **Status should show**: "Success" ✅

### **Step 5: Initial Setup Complete**

- **Monitor**: Index coverage, performance, mobile usability
- **Check weekly**: New keywords, click-through rates, errors

---

## 3. 📈 **Google Analytics 4 Setup (10 minutes)**

### **Step 1: Create GA4 Property**

1. **Go to**: https://analytics.google.com
2. **Sign in**: Same Google account
3. **Click**: "Start measuring"
4. **Account name**: "Malric Pharma"
5. **Property name**: "Malric Pharma Website"
6. **Time zone**: "Kenya"
7. **Currency**: "Kenyan Shilling (KES)"

### **Step 2: Set Up Data Stream**

1. **Choose**: "Web"
2. **Website URL**: `https://malricpharma.co.ke`
3. **Stream name**: "Malric Pharma Website"
4. **Click**: "Create stream"

### **Step 3: Get Tracking Code**

1. **Copy the Measurement ID** (format: G-XXXXXXXXXX)
2. **Google will provide tracking code** like:

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

### **Step 4: Add to Your Website**

**Option A: Direct in index.html**

```html
<!-- Add to public/index.html in <head> section -->
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Malric Pharma</title>

  <!-- Google Analytics -->
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX");
  </script>
</head>
```

**Option B: Environment-based (Recommended)**

1. Create `.env` file in root:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Add to your main component:

```typescript
// src/utils/analytics.ts
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initializeGA = () => {
  if (GA_MEASUREMENT_ID) {
    // Add gtag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }
};
```

### **Step 5: Enhanced E-commerce Setup**

**For tracking purchases and conversions:**

```typescript
// Track purchases
export const trackPurchase = (
  transactionId: string,
  value: number,
  items: any[]
) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "purchase", {
      transaction_id: transactionId,
      value: value,
      currency: "KES",
      items: items,
    });
  }
};

// Track add to cart
export const trackAddToCart = (
  itemId: string,
  itemName: string,
  value: number
) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "add_to_cart", {
      currency: "KES",
      value: value,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          currency: "KES",
          price: value,
        },
      ],
    });
  }
};
```

---

## 🎯 **Quick Implementation Commands**

### **For Google Search Console Verification:**

1. **Add meta tag to index.html**:

```bash
# Edit public/index.html
# Add the Google verification meta tag in <head>
```

2. **Deploy and verify**:

```bash
npm run build
npm run preview
# Then click "Verify" in Search Console
```

### **For Google Analytics:**

1. **Add tracking code**:

```bash
# Edit public/index.html
# Add GA4 tracking code in <head>
```

2. **Test implementation**:

```bash
npm run dev
# Open browser developer tools
# Check for Google Analytics requests
```

---

## ✅ **Verification Checklist**

### **Google My Business**

- [ ] Business created and verified
- [ ] All information completed (hours, description, services)
- [ ] Photos uploaded (logo, products, store)
- [ ] Categories selected (Pharmacy, Health)
- [ ] Website URL set to https://malricpharma.co.ke

### **Google Search Console**

- [ ] Property added for https://malricpharma.co.ke
- [ ] Verification meta tag added to website
- [ ] Sitemap submitted (sitemap.xml)
- [ ] No errors in coverage report
- [ ] Mobile usability passed

### **Google Analytics 4**

- [ ] Property created with correct timezone/currency
- [ ] Data stream set up for website
- [ ] Tracking code added to all pages
- [ ] Real-time reports showing data
- [ ] E-commerce tracking configured (optional)

---

## 📈 **Expected Results Timeline**

### **Week 1**

- **GMB**: Local visibility improves immediately
- **Search Console**: Website starts appearing in search results
- **GA4**: Traffic data collection begins

### **Month 1**

- **GMB**: 20-40% increase in local search visibility
- **Search Console**: 50+ pages indexed, keyword data available
- **GA4**: Complete user behavior insights

### **Month 3**

- **GMB**: Top 3 local pack rankings for "pharmacy near me"
- **Search Console**: 100+ keywords tracked, featured snippets
- **GA4**: Conversion optimization data available

---

## 🆘 **Troubleshooting**

### **Common Issues & Solutions**

**GMB Verification Failed:**

- Double-check phone number format
- Try postcard verification if phone fails
- Ensure business address is accurate

**Search Console Verification Failed:**

- Check meta tag is in `<head>` section
- Ensure website is deployed with meta tag
- Try alternative verification methods

**GA4 Not Tracking:**

- Check tracking code is in all pages
- Verify Measurement ID is correct
- Use browser developer tools to check requests

**Need Help?**

- Google Support: https://support.google.com/business/
- Search Console Help: https://support.google.com/webmasters/
- Analytics Help: https://support.google.com/analytics/

---

## 🎯 **Next Steps After Setup**

1. **Monitor daily** for first week
2. **Submit URL inspection** for key pages in Search Console
3. **Set up conversion goals** in GA4
4. **Add more photos** to GMB regularly
5. **Respond to reviews** on GMB
6. **Create weekly reports** from all three tools

**Success Indicators:**

- GMB shows in local search results
- Search Console shows indexed pages
- GA4 shows real-time visitors

**Ready to dominate Kenya's pharmacy search results!** 🚀
