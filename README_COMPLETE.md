# SportsFolio UI - Complete Documentation

## 📱 Overview

**SportsFolio** is a modern social media platform designed specifically for sports enthusiasts. It allows users to create profiles, share posts, manage friends, participate in tournaments, and build their sports portfolio. The application is built with a modern tech stack and provides a seamless user experience.

---

## 🏗️ Architecture Overview

```
SportsFolio
├── Frontend (React + TypeScript)
│   ├── Authentication (Context API)
│   ├── State Management (Redux Toolkit + Context API)
│   ├── Routing (React Router v7)
│   ├── UI Components (ShadCN UI + Tailwind CSS)
│   └── API Layer (Axios)
└── Mock Backend (Local JSON)
    └── data.json (simulates database)
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.1.0 | UI library |
| **TypeScript** | 5.8.3 | Type safety |
| **Vite** | 6.3.5 | Build tool & dev server |
| **Tailwind CSS** | 4.1.10 | Styling framework |
| **ShadCN UI** | 3.5.0 | Pre-built accessible components |
| **React Router DOM** | 7.6.2 | Client-side routing |
| **Redux Toolkit** | 2.8.2 | State management |
| **Axios** | 1.10.0 | HTTP client |
| **Lucide React** | 0.513.0 | Icon library |
| **Radix Primitives** | Latest | Accessible component primitives |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── AuthContext.tsx           # Authentication context (login/logout state)
│   ├── axios.ts                  # Axios instance configuration
│   ├── hooks.ts                  # Custom hooks
│   └── store.ts                  # Redux store configuration
├── api/
│   ├── authService.ts            # Authentication endpoints
│   ├── postService.ts            # Post management endpoints
│   ├── profileService.ts         # Profile endpoints
│   ├── friendsService.ts         # Friends endpoints
│   ├── tournamentService.ts      # Tournament endpoints
│   ├── userService.ts            # User endpoints
│   └── axios.ts                  # Axios configuration
├── components/
│   ├── Layout.tsx                # Main layout wrapper
│   ├── NavBar.tsx                # Navigation bar
│   ├── Footer.tsx                # Footer
│   ├── Home.tsx                  # Home page
│   └── ui/                       # ShadCN UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── alert.tsx
│       ├── spinner.tsx
│       └── separator.tsx
├── features/
│   ├── auth/
│   │   ├── LoginForm.tsx         # Login page
│   │   ├── SignupForm.tsx        # Signup page
│   │   ├── PasswordResetForm.tsx # Password reset page
│   │   ├── PrivateRoute.tsx      # Protected route wrapper
│   │   └── authSlice.ts          # Redux auth slice
│   ├── feed/
│   │   └── Feed.tsx              # Newsfeed/timeline
│   ├── posts/
│   │   └── PostForm.tsx          # Create post form
│   ├── profile/
│   │   └── Profile.tsx           # User profile page
│   ├── friends/
│   │   └── Friends.tsx           # Friends management
│   └── tournament/
│       └── Tournament.tsx         # Tournament listing
├── models/
│   ├── User.ts                   # User interface
│   ├── Post.ts                   # Post interface
│   └── Tournament.ts             # Tournament interface
├── mock-data/
│   └── data.json                 # Mock database
├── lib/
│   └── utils.ts                  # Utility functions
├── App.tsx                       # Main app component
├── routes.tsx                    # Route definitions
├── main.tsx                      # Entry point
└── index.css                     # Global styles
```

---

## 🔐 Authentication System

### Overview
The application uses **JWT-based authentication** with access and refresh tokens.

### Login Flow
```
1. User enters username & password
2. POST request sent to /auth/login
3. Backend validates and returns:
   - Access Token (15 min expiry)
   - Refresh Token (7 days expiry)
4. Tokens stored in localStorage
5. User redirected to /feed
```

### Storage Strategy
- **Access Token**: `localStorage` (used for API requests)
- **Refresh Token**: `localStorage` (used to get new access token)
- **User Data**: `localStorage` (persisted user object)
- **Auth State**: Context API (for component-level access)

### Key Files
- [AuthContext.tsx](src/app/AuthContext.tsx) - Provides `useAuth()` hook
- [PrivateRoute.tsx](src/features/auth/PrivateRoute.tsx) - Route protection
- [authService.ts](src/api/authService.ts) - Auth API calls

### Protected Routes
Marked with `<PrivateRoute>` wrapper:
- `/feed` - Newsfeed
- `/profile` - User profile
- `/post` - Create post
- `/friends` - Friends list
- `/tournament` - Tournaments

---

## ✅ Implemented Features

### 1. **Authentication Module** ✨
- ✅ **Login Form** - Username & password authentication
  - Input validation
  - Password visibility toggle
  - Error message display
  - Loading state indicator
  - Redirects to feed on success

- ✅ **Signup Form** - User registration
  - Username, email, password fields
  - Basic validation
  - Error handling
  - Redirect to login

- ✅ **Password Reset** - Reset password via email
  - Email-based OTP simulation
  - Mock data validation

- ✅ **Session Management**
  - Token persistence across page reloads
  - Automatic logout on token expiry
  - LocalStorage cleanup

### 2. **Feed/Newsfeed Module** ✨
- ✅ **Display Posts**
  - Shows posts from friends in chronological order (newest first)
  - Post structure: ID, user, content, images, likes, comments
  - Loading state while fetching
  - Empty state message
  - Image support (URL-based)

- ✅ **Post Interactions Display**
  - Shows like count
  - Shows comment count
  - Responsive UI

### 3. **Profile Module** ✨
- ✅ **View Profile**
  - Display current user's profile information
  - Shows name, bio, sports list

- ✅ **Edit Profile**
  - Edit name and bio
  - Save changes to localStorage
  - Toggle between view and edit modes
  - Save/Cancel buttons

- ✅ **User Information**
  - Current user data retrieved from AuthContext
  - Sports list with primary sport flag
  - Equipment and achievements display

### 4. **Posts Module** ✨
- ✅ **Create Post Form**
  - Text content input (textarea)
  - Optional image URL support
  - Publish button
  - Save as Draft button
  - Status messages

- ✅ **Post Content Management**
  - Content validation
  - Image URL field
  - Success feedback

### 5. **Friends Module** ✨
- ✅ **View Friends**
  - Display user's friend list
  - List all available users
  - Loading state

- ✅ **Friend Requests**
  - Send friend request button
  - Request sent status tracking
  - Visual feedback

- ✅ **Friends List**
  - View current friends
  - Display friends from user data

### 6. **Tournament Module** ✨
- ✅ **View Tournaments**
  - List all tournaments
  - Display tournament details:
    - Name
    - Sport
    - Format
    - Participant count
  - Loading state
  - Empty state message

### 7. **UI Components** ✨
- ✅ **Navigation Bar**
  - Links to all main sections
  - User logout button
  - Responsive design

- ✅ **Footer**
  - Static footer with app name

- ✅ **Layout**
  - Flex-based responsive layout
  - Header, main content, footer structure

- ✅ **ShadCN UI Components**
  - Button, Card, Input, Label, Alert, Separator, Spinner

---

## ⏳ Pending Features

### High Priority

#### 1. **Tournament Management** 🎯
- [ ] **Create Tournament Form**
  - Tournament name, sport, format (league/knockout/hybrid) input
  - Date range selection
  - Location field
  - Success/error messages

- [ ] **Tournament Fixtures**
  - Auto-generate fixtures based on format
  - Display fixture schedule
  - Record match results

- [ ] **Participant Management**
  - Add/remove participants
  - Participant acceptance/rejection UI
  - Organizer assignment UI
  - Invite other users

- [ ] **Join Tournament**
  - Request to join tournament UI
  - Approval workflow UI

#### 2. **Post Interactions** 📝
- [ ] **Like Posts**
  - Like/unlike button
  - Like count update
  - Visual feedback (filled/unfilled heart)
  - Prevent duplicate likes

- [ ] **Comments**
  - Comment form below posts
  - Display comments with usernames
  - Comment count accuracy
  - Delete/edit own comments

- [ ] **Post Actions**
  - Actually save posts to mock data.json
  - Draft functionality (save unpublished posts)
  - Delete own posts
  - Edit own posts

#### 3. **Advanced Profile Features** 👤
- [ ] **Sport Management**
  - Add/remove sports from profile
  - Mark primary sport
  - Add equipment for each sport
  - Add achievements (Hall of Fame)

- [ ] **Endorsements**
  - Endorse users for sports
  - View endorsements received
  - Visual endorsement display

- [ ] **Profile Completeness**
  - Profile picture upload
  - Cover photo
  - Verification badge UI

#### 4. **Friend Management** 👥
- [ ] **Accept/Reject Requests**
  - Display pending friend requests
  - Accept button
  - Reject button
  - Request list UI

- [ ] **Unfriend**
  - Unfriend button on profile
  - Remove from friends list
  - Update newsfeed accordingly

- [ ] **Friend Suggestions**
  - Recommend users based on sports
  - Mutual friends display

#### 5. **Data Persistence** 💾
- [ ] **Mock Data Updates**
  - Save new posts to data.json
  - Save profile updates to data.json
  - Save friend requests to data.json
  - Implement data versioning

- [ ] **Real Backend Integration**
  - Replace mock endpoints with real API
  - Implement proper error handling
  - Add token refresh mechanism
  - Real database support

#### 6. **Error Handling & Validation** ⚠️
- [ ] **Input Validation**
  - Email format validation
  - Password strength requirements
  - Username uniqueness check
  - File size limits for images

- [ ] **Error Messages**
  - Clear, user-friendly error messages
  - Error logging/tracking
  - Retry mechanisms

- [ ] **API Error Handling**
  - 401 Unauthorized handling
  - 403 Forbidden handling
  - Network error handling
  - Timeout handling

#### 7. **Performance & UX** ⚡
- [ ] **Pagination**
  - Paginate posts in feed
  - Lazy loading for images
  - Infinite scroll support

- [ ] **Search**
  - Search users
  - Search posts
  - Search tournaments

- [ ] **Notifications**
  - Friend request notifications
  - Comment notifications
  - Like notifications
  - Tournament updates

#### 8. **Testing** 🧪
- [ ] **Unit Tests**
  - Auth service tests
  - Component tests
  - Hook tests

- [ ] **Integration Tests**
  - Auth flow tests
  - Data fetch tests

- [ ] **E2E Tests**
  - Complete user workflows

#### 9. **Documentation** 📚
- [ ] **API Documentation**
  - Document mock endpoint structure
  - Document real backend requirements

- [ ] **Component Documentation**
  - Storybook setup
  - Component usage examples

#### 10. **DevOps & Deployment** 🚀
- [ ] **Build Optimization**
  - Code splitting
  - Lazy loading routes
  - Image optimization

- [ ] **CI/CD Pipeline**
  - GitHub Actions setup
  - Automated testing
  - Automated deployment

- [ ] **Environment Configuration**
  - .env file setup
  - Different configs for dev/staging/prod

---

## 📊 Data Models

### User Model
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  bio: string;
  sports: Array<{
    name: string;           // e.g., "Football"
    primary: boolean;       // Is primary sport
    equipment: string[];    // e.g., ["Ball", "Shoes"]
    achievements: string[]; // Hall of Fame
  }>;
  friends: number[];                       // IDs of friends
  endorsements: Array<{
    sport: string;
    by: number;            // User ID who endorsed
  }>;
}
```

### Post Model
```typescript
interface Comment {
  userId: number;
  text: string;
}

interface Post {
  id: number;
  userId: number;
  content: string;
  images?: string[];      // Image URLs
  likes: number[];        // User IDs who liked
  comments: Comment[];
  createdAt: string;      // ISO timestamp
}
```

### Tournament Model
```typescript
interface Tournament {
  id: number;
  name: string;
  sport: string;          // e.g., "Football"
  location: string;
  startDate: string;      // ISO date
  endDate: string;        // ISO date
  participants: number[]; // User IDs
  format?: string;        // "league" | "knockout" | "league+knockout"
  organizers?: number[];  // User IDs
  fixtures?: any[];       // Generated fixtures
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd sportsfolio-ui
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```
Server runs on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm lint
```

### Preview Production Build
```bash
npm run preview
```

---

## 🔄 API Integration

### Mock Backend Setup
Currently, the app uses **mock data** from `/src/mock-data/data.json`. All API calls are intercepted and return mock responses.

### Axios Configuration
[src/app/axios.ts](src/app/axios.ts) - Centralized axios instance with:
- Base URL configuration
- Authentication header handling
- Request/response interceptors
- Error handling

### API Services Location
```
src/api/
├── authService.ts       # Login, Signup, Password Reset
├── postService.ts       # Fetch posts
├── profileService.ts    # Profile operations
├── friendsService.ts    # Friends operations
├── tournamentService.ts # Tournament operations
└── userService.ts       # User operations
```

### Real Backend Integration Steps
1. Update base URL in axios.ts to real backend
2. Update endpoints in each service file
3. Handle real token refresh in axios interceptor
4. Implement proper error responses
5. Add real database endpoints

---

## 🎨 UI Components

### ShadCN/UI Components Used
- **Button** - Primary CTA component
- **Card** - Container for content sections
- **Input** - Text input fields
- **Label** - Form labels
- **Alert** - Notifications and alerts
- **Separator** - Visual dividers
- **Spinner** - Loading indicator

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom CSS** - [src/index.css](src/index.css) for global styles
- **Component CSS** - Collocated with components

### Extending Components
To add new ShadCN components:
```bash
npx shadcn-ui@latest add component-name
```

---

## 🔌 Environment Configuration

Create `.env` file in root directory:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=SportsFolio
VITE_JWT_EXPIRY=900000
```

---

## 📖 Key Concepts

### Context API vs Redux
- **Context API** used for:
  - Authentication state (user, token)
  - Simple global state
  
- **Redux Toolkit** configured for:
  - Potential complex state management
  - Currently minimal implementation
  - Can be extended for app state

### Protected Routes
Routes wrapped with `<PrivateRoute>` check if user is logged in:
```tsx
<PrivateRoute>
  <Feed />
</PrivateRoute>
```

### Custom Hooks
Located in [src/app/hooks.ts](src/app/hooks.ts):
- `useAuth()` - Get current auth state

### Mock Data Flow
```
Component → API Service → Axios → Mock Interceptor → Mock Data (data.json)
```

---

## 🐛 Debugging

### Enable Console Logging
Update axios interceptors in [src/app/axios.ts](src/app/axios.ts)

### Redux DevTools
Install Redux DevTools browser extension to inspect state

### LocalStorage Debugging
Check browser DevTools → Application → Local Storage:
- `token` - JWT access token
- `refreshToken` - JWT refresh token
- `user` - Current user object

---

## 📝 Common Tasks

### Add New Feature
1. Create component in `src/features/`
2. Add route in [src/routes.tsx](src/routes.tsx)
3. Add API service in `src/api/`
4. Add data model in `src/models/`
5. Update mock data in [src/mock-data/data.json](src/mock-data/data.json)
6. Test with `npm run dev`

### Update Mock Data
Edit [src/mock-data/data.json](src/mock-data/data.json) directly. Changes reflect on page reload.

### Add Redux Slice
1. Create file in `src/features/` named `*Slice.ts`
2. Define initial state, reducers, and selectors
3. Add to store in [src/app/store.ts](src/app/store.ts)
4. Use `useSelector()` and `useDispatch()` in components

---

## 🤝 Contributing Guidelines

1. **Branch naming**: `feature/feature-name` or `bugfix/bug-name`
2. **Commit messages**: Clear, descriptive commits
3. **Code style**: Follow existing TypeScript patterns
4. **Components**: Functional components with hooks
5. **Styling**: Use Tailwind utilities, ShadCN components
6. **Testing**: Write tests for new features

---

## 📞 Support & Issues

For issues or questions:
1. Check existing GitHub issues
2. Create detailed issue with steps to reproduce
3. Include browser console errors
4. Attach relevant screenshots

---

## 📄 License

This project is part of the SportsFolio suite of applications.

---

## 🎯 Next Steps (Recommended Priority)

1. **⚡ Critical**: Implement post publish/like/comment functionality
2. **⚡ Critical**: Implement friend request acceptance/rejection
3. **🔧 High**: Implement tournament creation form
4. **🔧 High**: Add proper form validation across all forms
5. **💾 High**: Implement real backend API integration
6. **🧪 Medium**: Add unit tests for auth and main features
7. **📚 Medium**: Add comprehensive error handling
8. **🚀 Medium**: Optimize performance with pagination/lazy loading

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN/UI Documentation](https://ui.shadcn.com)
- [React Router Documentation](https://reactrouter.com)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated**: February 22, 2026  
**Version**: 1.0 (Alpha)  
**Status**: In Active Development 🚧
