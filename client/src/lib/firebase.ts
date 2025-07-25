import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PetReport, InsertPetReport, Stats } from '@shared/schema';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBv15j9DyPJW1dEuW0BCHOSucRqqQ988i0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cypruspetsfinder.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://cypruspetsfinder-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cypruspetsfinder",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cypruspetsfinder.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "758035903846",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:758035903846:web:50fbc079fe8ca10ad1c4a7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4LWWD4W3F1"
};

// Initialize Firebase app (check if already initialized to avoid duplicate app error)
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error: any) {
  if (error.code === 'app/duplicate-app') {
    // App already initialized, get the existing instance
    app = initializeApp(firebaseConfig, 'secondary');
  } else {
    throw error;
  }
}

export const db = getFirestore(app);
export const storage = getStorage(app);

// Collection references
const petReportsCollection = collection(db, 'petReports');

export const uploadPetPhoto = async (file: File): Promise<string> => {
  const timestamp = Date.now();
  const storageRef = ref(storage, `pet-photos/${timestamp}-${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const createPetReport = async (data: InsertPetReport, photoFile?: File): Promise<string> => {
  const now = new Date().toISOString();
  let photoUrl = '';
  
  if (photoFile) {
    photoUrl = await uploadPetPhoto(photoFile);
  }
  
  const reportData = {
    ...data,
    photoUrl,
    createdAt: now,
    updatedAt: now,
  };
  
  const docRef = await addDoc(petReportsCollection, reportData);
  return docRef.id;
};

export const getPetReports = async (reportType?: 'missing' | 'found'): Promise<PetReport[]> => {
  let q = query(petReportsCollection, orderBy('createdAt', 'desc'));
  
  if (reportType) {
    q = query(petReportsCollection, where('reportType', '==', reportType), orderBy('createdAt', 'desc'));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as PetReport));
};

export const getRecentPetReports = async (limitCount: number = 10): Promise<PetReport[]> => {
  const q = query(petReportsCollection, orderBy('createdAt', 'desc'), limit(limitCount));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as PetReport));
};

export const updatePetStatus = async (petId: string, status: 'active' | 'reunited'): Promise<void> => {
  const petDoc = doc(db, 'petReports', petId);
  await updateDoc(petDoc, {
    status,
    updatedAt: new Date().toISOString()
  });
};

export const getStats = async (): Promise<Stats> => {
  const allReports = await getPetReports();
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  const missing = allReports.filter(r => r.reportType === 'missing' && r.status === 'active').length;
  const found = allReports.filter(r => r.reportType === 'found' && r.status === 'active').length;
  const recent = allReports.filter(r => new Date(r.createdAt) >= twentyFourHoursAgo).length;
  const reunited = allReports.filter(r => r.status === 'reunited').length;
  
  return { missing, found, recent, reunited };
};

export const searchPetReports = async (
  reportType: 'missing' | 'found',
  filters: {
    search?: string;
    petType?: string;
    location?: string;
    dateRange?: string;
  }
): Promise<PetReport[]> => {
  let reports = await getPetReports(reportType);
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    reports = reports.filter(report => 
      report.petName?.toLowerCase().includes(searchLower) ||
      report.breed?.toLowerCase().includes(searchLower) ||
      report.location.toLowerCase().includes(searchLower) ||
      report.description?.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.petType && filters.petType !== 'all') {
    reports = reports.filter(report => report.petType === filters.petType);
  }
  
  if (filters.location && filters.location !== 'all') {
    reports = reports.filter(report => 
      report.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  
  if (filters.dateRange && filters.dateRange !== 'all') {
    const now = new Date();
    let cutoffDate: Date;
    
    switch (filters.dateRange) {
      case 'today':
        cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(0);
    }
    
    reports = reports.filter(report => new Date(report.createdAt) >= cutoffDate);
  }
  
  return reports.filter(report => report.status === 'active');
};
