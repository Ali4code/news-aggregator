export type TNewYorTimesRequest = {
  apiKey: string;
  searchParam?: string;
  from?: string;
  to?: string;
  category?: string;
};

export type TArticleNewYorkTimes = {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: {
    rank: 0;
    subtype: "xlarge";
    caption: null;
    credit: null;
    type: "image";
    url: string;
    height: 400;
    width: 600;
    legacy: {
      xlarge: string;
      xlargewidth: 600;
      xlargeheight: 400;
    };
    subType: "xlarge";
    crop_name: "articleLarge";
  }[];
};

export type TNewYorTimesResponse = {
  status: string;
  copyright: string;
  response: {
    docs: TArticleNewYorkTimes[];
  };
};
