export interface StudentFormData {
  rank: number;
  examType: string;
  preferredCourses: string[];
  budgetRange: [number, number];
  preferredLocation: string;
  collegeType: string;
  hostelRequired: boolean;
}

export interface College {
  id: string;
  name: string;
  location: string;
  course: string;
  estimatedFees: string;
  ranking: number;
  rating: number;
  matchScore: number;
  matchReason: string;
  description: string;
  placementStats: {
    avgPackage: string;
    highestPackage: string;
    placementRate: string;
  };
  feeStructure: {
    tuition: string;
    hostel: string;
    other: string;
    total: string;
  };
  cutoffTrends: { year: string; cutoff: string }[];
  facilities: string[];
  eligibility: string;
  strengths: string[];
  budgetFit: string;
  rankSafety: string;
  type: "Government" | "Private";
}
