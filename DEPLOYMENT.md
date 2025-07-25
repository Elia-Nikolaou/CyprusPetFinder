# GitHub Pages Deployment Guide

This guide explains how to deploy the Cyprus Pet Rescue website to GitHub Pages.

## 🚀 Automatic Deployment Setup

### Step 1: Fork or Clone the Repository

1. Fork this repository to your GitHub account
2. Clone it to your local machine (optional)

### Step 2: Configure Firebase Secrets

Add your Firebase configuration as GitHub repository secrets:

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following repository secrets:

```
VITE_FIREBASE_API_KEY = your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN = your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = your_project_id
VITE_FIREBASE_STORAGE_BUCKET = your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
VITE_FIREBASE_APP_ID = your_app_id
```

### Step 3: Enable GitHub Pages

1. Go to repository "Settings" → "Pages"
2. Source: "Deploy from a branch"
3. Branch: Select "gh-pages"
4. Folder: "/ (root)"
5. Save

### Step 4: Deploy

1. Push any changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Check the "Actions" tab for deployment status
4. Your site will be available at: `https://yourusername.github.io/repository-name`

## 🔧 Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# The built files are in dist/public/
# Upload these files to any static hosting service
```

## 📁 Project Structure for Deployment

```
dist/public/              # GitHub Pages serves from here
├── index.html           # Main HTML file
├── assets/
│   ├── index-*.js      # Bundled JavaScript
│   └── index-*.css     # Bundled CSS
└── [other static files]
```

## 🔒 Firebase Security Configuration

### Firestore Security Rules

For production deployment, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /petReports/{document} {
      // Allow read access to all (public pet search)
      allow read: if true;
      
      // Allow write access (reporting pets)
      allow write: if true; // Consider adding auth in production
    }
  }
}
```

### Firebase Storage Rules

For pet photo uploads:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /pet-photos/{allPaths=**} {
      // Allow read access to all (public photo viewing)
      allow read: if true;
      
      // Allow write access for photo uploads
      allow write: if true; // Consider adding auth in production
    }
  }
}
```

## 🚨 Emergency Deployment Checklist

For quick emergency deployment:

- [ ] Firebase project created and configured
- [ ] Security rules set to allow public read/write
- [ ] GitHub secrets configured
- [ ] Repository forked/cloned
- [ ] GitHub Pages enabled
- [ ] First push to main branch triggers deployment
- [ ] Site accessible and functional
- [ ] Pet reporting and search working
- [ ] Photo upload functional

## 🔍 Troubleshooting

### Common Issues

1. **Site not loading**: Check GitHub Pages settings and deployment status
2. **Firebase errors**: Verify all environment variables are set correctly
3. **Photo upload fails**: Check Firebase Storage rules and bucket name
4. **Data not saving**: Verify Firestore rules and project configuration

### Deployment Status

Check deployment status at:
- GitHub Actions tab: Build and deployment logs
- GitHub Pages settings: Current deployment status
- Browser console: Runtime errors

### Environment Variables

If the site loads but Firebase features don't work:
1. Verify all `VITE_FIREBASE_*` secrets are set in GitHub
2. Check the browser console for configuration errors
3. Ensure Firebase project allows your domain

## 📞 Emergency Support

For urgent deployment issues during the Cyprus wildfire emergency:
1. Check this repository's Issues tab
2. Contact the project maintainers
3. Use the working version at any successfully deployed fork

## 🎯 Production Optimization

For production deployment:
- [ ] Enable Firebase Analytics (optional)
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring and alerts
- [ ] Review and tighten security rules
- [ ] Enable Firebase App Check for abuse prevention