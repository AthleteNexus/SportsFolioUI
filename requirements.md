# SportsFolio UI Requirements

## Overview
Build a **social media style application for sports enthusiasts** called **SportsFolio**, using the following modern frontend stack. Also refer to provided package.json for version and dependencies.

---

## 🧠 Tech Stack

- **React:** 19.1.0  
- **TypeScript:** 5.8.3  
- **Tailwind CSS:** 4.1.10 (with PostCSS and Autoprefixer)  
- **ShadCN UI:** 3.5.0 (for accessible, themeable components built on Radix Primitives)
- **Vite:** 5.x (for development and build)
- **Axios:** for future backend integrations
- **React Router DOM:** for client-side routing
- **Context API:** for state management
- **Lucide React:** for icons

---

## ⚙️ Development Setup

1. Initialize a Vite project with React + TypeScript.
2. Configure **TailwindCSS v4** as per official docs (with PostCSS plugin syntax).
3. Install and configure **ShadCN UI** (no need to run `npx shadcn add` every time — preconfigure reusable components).
4. Use **Axios** with a centralized instance under `/src/api/axios.ts` for mocked API calls.
5. Use a local **`mock-data.json`** file for backend-like data simulation.

---

## 🔐 Authentication Module

- **Signup**
  - Fields: `username`, `email`, `password`
  - Validation: username and email must be unique.
- **Login**
  - Fields: `username`, `password`
  - If incorrect, show error message.
- **Password Reset**
  - User enters email.
  - Mock OTP generation and verification (email-based OTP simulation using mock data).

---

## 🏠 After Login (Home / Newsfeed)

- Display posts from friends and user themself.
- Show posts in descending order of creation.
- Post structure: `id`, `userId`, `content`, `images?`, `likes`, `comments`.

---

## 👤 Profile Module

- View and edit profile.
- Fields: name, bio, password, sports played.
- For each sport, user can:
  - Add **equipment used**
  - Add **achievements** (Hall of Fame)
  - Mark **primary sport**
- Users can **endorse** others for a sport.

---

## 🏆 Tournament Module

- User can **create tournaments**:
  - Define: `name`, `sport`, `format` (`league`, `knockout`, `league + knockout`)
  - Add participants (users).
  - Invite other users (they must accept to join).
  - Assign organisers (multiple allowed).
  - Create fixtures automatically based on tournament format.

- Users can **request to join** an existing tournament.

---

## 📝 Posts Module

- Users can:
  - Create a post (text + optional image)
  - Save as draft or publish
  - Like or comment on others’ posts

---

## 👥 Friends Module

- Users can:
  - Send friend requests
  - Accept or reject requests
  - View list of friends
- Only friends’ posts appear in the newsfeed.

---

## 🧩 Mock Backend

- All dynamic data should initially come from `/src/mock-data/data.json`
  - Example: `users`, `posts`, `tournaments`, `achievements`
- Use Axios functions for fetching mock data to simulate backend calls.
- Prepare reusable services:
  - `authService.ts`
  - `postService.ts`
  - `profileService.ts`
  - `tournamentService.ts`

---

## 🎨 UI / Styling Guidelines

- Use **TailwindCSS** for all styling.
- Use **ShadCN UI components** where possible (e.g., buttons, forms, dialogs, modals, dropdowns).
- Maintain a **consistent dark/light theme** switch (ShadCN supports this).
- Keep UI minimal, accessible, and responsive.

---

## 🚀 Expected Deliverables

1. Fully functional frontend built with mocked backend.
2. All major screens (login, feed, profile, tournaments).
3. Clean modular code using React 19 features (`use`, concurrent rendering, etc.).
4. Ready-to-integrate Axios API layer for future backend connection.

---

## ✅ Acceptance Criteria

- Project builds and runs via `npm run dev`.
- Navigation works across all pages.
- State management is functional for auth, feed, and tournaments.
- Mock data persists correctly for UI interactions.
