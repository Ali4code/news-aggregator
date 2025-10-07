import { describe, it, expect } from "vitest";
import { getAggregatedNews, normalizeArticles } from "@shared/lib/aggregator.util";
import { API_SOURCES } from "@shared/config/apiSources";

describe("normalizeArticles", () => {
  it("maps common fields from mixed providers", () => {
    const input = [
      // NewsAPI.org shape
      {
        title: "N1",
        description: "desc1",
        urlToImage: "http://img/1.jpg",
        publishedAt: "2024-01-02T00:00:00Z",
        url: "http://n1",
        source: { name: "newsapi" },
      },
      // NYTimes shape
      {
        headline: { main: "NY1" },
        abstract: "ny abstract",
        multimedia: [{ url: "images/2024/01/02/pic.jpg" }],
        pub_date: "2024-01-03T00:00:00Z",
        web_url: "http://ny1",
        source: "NYTimes",
      },
      // Guardian shape
      {
        webTitle: "G1",
        fields: {
          trailText: "g trail",
          thumbnail: "http://thumb/g1.jpg",
          firstPublicationDate: "2024-01-01T00:00:00Z",
          publication: "Guardian",
        },
        webUrl: "http://g1",
      },
    ];

    const normalized = normalizeArticles(input);
    expect(normalized).toHaveLength(3);
    expect(normalized[0]).toMatchObject({
      id: "N1",
      title: "N1",
      content: "desc1",
      image: "http://img/1.jpg",
      date: "2024-01-02T00:00:00Z",
      url: "http://n1",
      source: "newsapi",
    });
    expect(normalized[1]).toMatchObject({
      id: "NY1",
      title: "NY1",
      content: "ny abstract",
      image: "https://www.nytimes.com/images/2024/01/02/pic.jpg",
      date: "2024-01-03T00:00:00Z",
      url: "http://ny1",
      source: "NYTimes",
    });
    expect(normalized[2]).toMatchObject({
      id: "G1",
      title: "G1",
      content: "g trail",
      image: "http://thumb/g1.jpg",
      date: "2024-01-01T00:00:00Z",
      url: "http://g1",
      source: "Guardian",
    });
  });
});

describe("getAggregatedNews", () => {
  it("filters by selected sources and sorts by date desc", () => {
    const newsApiData = {
      status: "ok",
      totalResults: 1,
      articles: [
        { title: "A", description: "a", publishedAt: "2024-01-01T00:00:00Z" },
      ],
    } as unknown as import("@shared/api/newsApi/NewsApi.types").TNewsApiOrgResponse;

    const newYorkTimesData = {
      status: "OK",
      response: {
        docs: [
          { headline: { main: "B" }, abstract: "b", pub_date: "2024-01-03T00:00:00Z" },
        ],
      },
    } as unknown as import("@shared/api/nyTimes/NewYorkTimes.types").TNewYorTimesResponse;

    const guardianData = {
      response: {
        status: "ok",
        results: [
          {
            webTitle: "C",
            fields: { trailText: "c", firstPublicationDate: "2024-01-02T00:00:00Z" },
          },
        ],
      },
    } as unknown as import("@shared/api/theGuardian/TheGuardian.types").TGuardianResponse;

    const preferences = {
      sources: [API_SOURCES.NEW_YORK_TIMES.id, API_SOURCES.THE_GUARDIAN.id],
      categories: [],
      searchQuery: "",
    } as unknown as import("@entities/preferences/Preferences.types").TPreferences;

    const result = getAggregatedNews({
      newsApiData,
      newYorkTimesData,
      guardianData,
      preferences,
    });

    // Only NYTimes (B) and Guardian (C) should be included, sorted by date desc: B, C
    expect(result.map((r) => r.title)).toEqual(["B", "C"]);
  });
});


