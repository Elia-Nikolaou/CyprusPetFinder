# Cyprus Pet Rescue

A comprehensive Firebase-powered pet missing/found reporting platform designed specifically for Cyprus wildfire victims, providing a critical connection point for reuniting lost pets with their families.

## 🚨 Emergency Pet Rescue Platform

This website helps families reunite with their beloved pets during the Cyprus wildfire emergency.

### Features

- **Report Missing Pets**: Easy-to-use form for reporting lost pets with photo uploads
- **Report Found Pets**: Help others by reporting pets you've found
- **Search & Filter**: Advanced search capabilities by pet type, location, and date
- **Photo Gallery**: Visual pet identification with Firebase Storage
- **Real-time Updates**: Live data synchronization with Firebase Firestore
- **Status Management**: Mark pets as found/reunited

### Pages

1. **Home**: Landing page with emergency information and quick stats
2. **Report**: Form to report missing or found pets
3. **Missing Pets**: Gallery of missing pets with search filters
4. **Found Pets**: Gallery of found pets with search filters

## 🔥 Firebase Configuration

This project uses Firebase for:
- **Firestore**: Real-time database for pet reports
- **Storage**: Photo upload and storage
- **Hosting**: Production deployment

### Required Environment Variables

Create a `.env` file with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🚀 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch**: Triggers automatic deployment
2. **GitHub Actions**: Builds and deploys the static site
3. **Firebase Integration**: All data operations work on GitHub Pages

### Deployment Steps

1. Fork this repository
2. Add your Firebase configuration to GitHub Secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
3. Enable GitHub Pages in repository settings
4. Push changes to main branch
5. Site will be available at `https://yourusername.github.io/repository-name`

## 🛠️ Development

### Local Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

- `client/`: Frontend React application
- `server/`: Express.js backend (for local development)
- `shared/`: Shared TypeScript schemas
- `dist/public/`: Built static files for deployment

## 🎨 Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Build**: Vite
- **Deployment**: GitHub Pages

## 📱 Responsive Design

Fully responsive design optimized for:
- Mobile devices (pet owners on the go)
- Tablets (rescue workers)
- Desktop computers (coordination centers)

## 🔒 Firebase Security

Configure Firebase Security Rules for production:

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /petReports/{document} {
      allow read, write: if true; // Adjust for production
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /pet-photos/{allPaths=**} {
      allow read, write: if true; // Adjust for production
    }
  }
}
```

## 🆘 Emergency Context

This platform was created specifically for the Cyprus wildfire emergency to help:
- Families find their missing pets
- Coordinate rescue efforts
- Share found pet information
- Connect with animal rescue organizations

## 📞 Emergency Resources

- **Animal Rescue Cyprus**: [animalrescuecyprus.com](https://animalrescuecyprus.com)
- **Take Me Home Cyprus**: [takemehome.com.cy](https://takemehome.com.cy)
- **Animal Welfare Commissioner**: Contact for injured animals

## 🤝 Contributing

In emergency situations, contributions are welcome:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with emergency fixes or improvements

## 📄 License

MIT License - Created during wildfire emergency to help reunite families with their pets.

---

**⚠️ Emergency Notice**: This platform is designed for emergency use during the Cyprus wildfire crisis. All pet reports are publicly visible to facilitate quick reunification.