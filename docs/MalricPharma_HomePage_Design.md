# 🏠 Home Page Design – Malric Pharma

This document outlines the structure, purpose, and reasoning behind the design of the **Home Page** for the Malric Pharma application. It also explains why a footer should be included on every page.

---

## 📋 Overview

| Page              | Purpose                                  |
|-------------------|------------------------------------------|
| Home              | Welcome, featured drugs, banner          |
| Products          | List/search/filter drugs                 |
| Product Details   | Drug info, dosage, side effects, etc.    |
| Cart              | Review cart items                        |
| Checkout          | Enter shipping info, confirm order       |
| Login/Register    | Auth pages                               |
| Dashboard         | Admin panel to manage products/orders    |
| Orders            | Customer order history                   |

---

## 🏗️ Home Page Structure

```tsx
<HomePage />
├── HeroBanner           // Big welcome message + CTA
├── FeaturedProducts     // Show top or trending drugs
├── Categories (optional)// Explore by pain, flu, etc.
├── Testimonials         // What people say (trust)
├── CallToAction         // "Shop Now" / "Sign Up" / "Get Started"
├── Footer               // Present on every page
```

---

## 🧩 Section Breakdown & Purpose

### 1. 🟦 HeroBanner

**Description**:  
A big, visual welcome section that includes:

- A strong message: _"Affordable health at your doorstep"_
- A Call-To-Action (CTA) button: _"Shop Now"_
- Banner image or artwork

**Purpose**:  
Grabs user attention and pushes them toward action quickly.

---

### 2. 🟩 Featured Products

**Description**:  
Display 4–6 popular or trending drugs using cards that include:

- Drug name
- Image
- Price
- "Add to cart" button

**Purpose**:  
Instant content for users to interact with → increases engagement and conversions.

---

### 3. 🟨 Categories (Optional)

**Description**:  
Organize products into categories such as:

- Pain Relief
- Cold & Flu
- Supplements
- Skincare

**Purpose**:  
Makes browsing easier for users who don’t know exact drug names.

---

### 4. 🟪 Testimonials

**Description**:  
Short quotes from users to build trust:

- “This app saved my mum’s life!”
- “Affordable and fast delivery.”

**Purpose**:  
Trust signals are especially important in healthcare.

---

### 5. 🟥 Call-To-Action (CTA)

**Description**:  
A strong message section at the bottom of the page, e.g.:

- _“Need medicine now? Browse Products →”_
- _“Create an account to get started”_

**Purpose**:  
Helps convert casual visitors into users or customers.

---

### 6. ⚫ Footer (Yes, Include It)

**Why a Footer Is Important**:

| Benefit                 | Reason                                  |
|-------------------------|------------------------------------------|
| Navigation              | Quick links to important pages          |
| Contact Info            | Email, phone, social media              |
| Legal Info              | Privacy Policy, Terms of Service        |
| Branding                | Reinforce site identity                 |

**✅ Always include the footer on every page.**

---

## ✅ Summary

| Section          | Purpose                                     |
|------------------|---------------------------------------------|
| HeroBanner       | First impression + CTA                      |
| FeaturedProducts | Promote top/trending meds                   |
| Categories       | Help users explore faster                   |
| Testimonials     | Build trust for new users                   |
| CallToAction     | Guide user to next step                     |
| Footer           | Must-have: nav, contact, legal, trust       |

---

With this structure, your home page will be user-friendly, functional, and conversion-optimized 🎯
