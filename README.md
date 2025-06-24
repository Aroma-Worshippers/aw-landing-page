
# AW Landing Page

A responsive, modern landing page for the Aroma Worshippers Music Ministry Intl, built with Vite, React, and Tailwind CSS.

---

## 📦 Features

- Fully responsive design (desktop, tablet, mobile)
- Hero section with video carousel (Swiper)
- Gallery with lazy-loading and hover effects
- Sections: About, Gallery, Events, Register, Footer
- Global `Header` and navigation across multiple pages
- Form with validation and integration-ready structure
- Node.js-ready API layer (`src/services/api.js`)
- Git LFS support for large assets (e.g. media files)

---

## 🛠️ Tech Stack

- **Front-end**: React, Vite, Tailwind CSS v4, Swiper
- **Form handling**: Controlled components with validation
- **API**: `src/services/api.js` stub (mock, ready for Node.js backend)
- **Assets**: Managed via Git LFS (.mp4, images, etc.)
- **Version control**: Git with `.gitattributes` and `.gitignore`

---

## 🚀 Getting Started

1. Clone the repo:

    ```bash
    git clone https://github.com/Aroma-Worshippers/aw-landing-page.git
    cd aw-landing-page
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Track large files with Git LFS (if not already set up):

    ```bash
    git lfs install
    git lfs track "*.mp4"
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Visit the app at `http://localhost:5173`

---

## 🧩 Project Structure

```text
.
├── public/                  # Static assets like images, videos, and overlay logos
├── src/
│   ├── components/          # Shared UI: Header, Gallery, VideoSwiper, etc.
│   ├── pages/               # Route pages: LandingPage.jsx, RegisterPage.jsx
│   ├── services/
│   │   └── api.js           # API abstraction (swap mock for real backend)
│   ├── App.jsx              # Main layout and Router setup
│   └── main.jsx             # Entrypoint including BrowserRouter
├── .gitattributes           # Git LFS settings
├── .gitignore
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🧪 Simulating the API

The frontend calls `registerUser` from `src/services/api.js`, which currently returns a mock response. 

```js
// src/services/api.js

export const registerUser = async (data) => {
  // mock: simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: "Registered (mock)" }), 1000);
  });
};
```

---

## ✅ Validation & UX

The registration form includes:

- Required fields check
- Email format validation
- Inline error messages
- UI states: success message, scrolling to top, form reset

---

## 🧭 Deployment

Suitable for platforms like Vercel, Netlify, or Surge:

```bash
npm run build
npm run preview  # to verify production build locally
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
