import { type PetReport, type InsertPetReport, type Stats } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for pet reports
// Since we're using Firebase directly from the frontend,
// this is mainly for future extensibility

export interface IStorage {
  // Pet report methods
  getPetReport(id: string): Promise<PetReport | undefined>;
  getAllPetReports(): Promise<PetReport[]>;
  createPetReport(report: InsertPetReport): Promise<PetReport>;
  updatePetReport(id: string, updates: Partial<PetReport>): Promise<PetReport | undefined>;
  deletePetReport(id: string): Promise<boolean>;
  
  // Statistics
  getStats(): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private petReports: Map<string, PetReport>;

  constructor() {
    this.petReports = new Map();
  }

  async getPetReport(id: string): Promise<PetReport | undefined> {
    return this.petReports.get(id);
  }

  async getAllPetReports(): Promise<PetReport[]> {
    return Array.from(this.petReports.values());
  }

  async createPetReport(insertReport: InsertPetReport): Promise<PetReport> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const report: PetReport = { 
      ...insertReport, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.petReports.set(id, report);
    return report;
  }

  async updatePetReport(id: string, updates: Partial<PetReport>): Promise<PetReport | undefined> {
    const report = this.petReports.get(id);
    if (!report) return undefined;
    
    const updatedReport = { 
      ...report, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    this.petReports.set(id, updatedReport);
    return updatedReport;
  }

  async deletePetReport(id: string): Promise<boolean> {
    return this.petReports.delete(id);
  }

  async getStats(): Promise<Stats> {
    const reports = await this.getAllPetReports();
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    return {
      missing: reports.filter(r => r.reportType === 'missing' && r.status === 'active').length,
      found: reports.filter(r => r.reportType === 'found' && r.status === 'active').length,
      recent: reports.filter(r => new Date(r.createdAt) >= twentyFourHoursAgo).length,
      reunited: reports.filter(r => r.status === 'reunited').length,
    };
  }
}

export const storage = new MemStorage();
