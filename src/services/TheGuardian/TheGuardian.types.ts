export type TSearchGuardianRequest = {
  apiKey: string;
  searchParam?: string;
  from?: string;
  to?: string;
  category?: string;
};

export type TArticleGuardian = {
  id: string;
  type: string;
  sectionId:string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string; 
  isHosted: false;
  pillarId: string;
  pillarName: string;
};

export type TGuardianResponse = {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: TArticleGuardian[];
  };
};

export type TTopHeadlinesNewsApiOrgRequest = {
  apiKey: string;
  sources?: string;
};

export type TSourcesNewsApiOrgResponse = {
  status: string;
  sources: {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
  }[];
};
