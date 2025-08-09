# TopSpace 🏆

A modern web app where users can create and vote on Top 5 rankings for any topic. From NBA players to pizza toppings, discover what the community thinks!

## Features

- **Create Topics**: Start new Top 5 ranking topics with custom items
- **Drag & Drop Voting**: Intuitive drag-and-drop interface for ranking items
- **Weighted Scoring**: 1st place = 5 pts, 2nd = 4 pts, etc.
- **Community Consensus**: See aggregated results from all votes
- **Modern UI**: Dark theme with yellow accents (Spotify/Discord style)
- **Responsive Design**: Works on mobile and desktop

## Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4
- **Backend**: Firebase (Auth + Firestore)
- **Deployment**: Vercel
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ (Firebase requires Node 20+ for full features)
- npm or yarn
- Firebase project (for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd TopSpace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (optional for development)
   
   Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com) and add your config to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── browse/            # Browse topics page
│   ├── create/            # Create new topic page
│   ├── login/             # Authentication page
│   ├── topic/[id]/        # Individual topic page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with NavBar
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── NavBar.tsx         # Navigation bar
│   └── RankingForm.tsx    # Drag & drop ranking form
└── lib/                   # Utility libraries
    └── firebase.ts        # Firebase configuration
```

## Current Features

### ✅ Implemented
- Landing page with hero section and feature highlights
- Navigation bar with active state indicators
- Browse page with mock trending topics
- Login page with Google and email authentication UI
- Create topic page with form validation
- Drag & drop ranking form component
- Individual topic page with voting and results
- Responsive design for mobile and desktop
- Dark theme with yellow accent colors

### 🚧 In Progress
- Firebase authentication integration
- Firestore database for topics and votes
- Real-time updates for voting results
- User profiles and voting history

### 📋 Planned
- Search and filtering for topics
- User-generated content moderation
- Social sharing features
- Advanced analytics and insights
- Mobile app version

## Development Notes

### Styling
The app uses a dark theme with:
- Background: `#1E1E1E` (dark grey)
- Accents: `#FFD700` (yellow)
- Text: White and grey variations
- Hover states and transitions for smooth UX

### Components
- **NavBar**: Responsive navigation with active states
- **RankingForm**: Drag & drop interface with validation
- **Topic Cards**: Display topic info and consensus rankings

### Mock Data
Currently using mock data for development. Replace with Firebase calls when backend is ready.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables
Create a `.env.local` file with your Firebase config:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Username Uniqueness

This app reserves usernames in Firestore to ensure they are unique across accounts.

- Collection `users/{uid}` stores per-user profile fields: `username`, `usernameLower`.
- Collection `usernames/{usernameLower}` maps the lowercase username to `{ uid }`.
- All claims/changes are done in Firestore transactions.

Suggested Firestore rules additions under `match /databases/{database}/documents`:

```
match /users/{uid} {
  allow read: if request.auth != null;
  allow create, update: if request.auth != null && request.auth.uid == uid;
}

match /usernames/{usernameLower} {
  allow read: if true;
  // Only the authenticated owner can claim a username doc mapping to their uid.
  allow create, update: if request.auth != null && request.resource.data.uid == request.auth.uid;
  // Allow releasing (deleting) a username only by the owner
  allow delete: if request.auth != null && resource.data.uid == request.auth.uid;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js, React, and Tailwind CSS
