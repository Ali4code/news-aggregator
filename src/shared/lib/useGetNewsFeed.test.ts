// This is a logic-focused test targeting the data combiner where possible.
// If this hook contains UI concerns, this test can be adjusted or removed.
import { describe, it, expect } from "vitest";
import { getAggregatedNews } from "@shared/lib/aggregator.util";
import { API_SOURCES } from "@shared/config/apiSources";

describe("integration: aggregator with minimal datasets", () => {
  it("returns empty array when no sources selected", () => {
    const preferences = { sources: [], categories: [], searchQuery: "" } as any;
    const result = getAggregatedNews({
      newsApiData: { articles: [] } as any,
      newYorkTimesData: { response: { docs: [] } } as any,
      guardianData: { response: { results: [] } } as any,
      preferences,
    });
    expect(result).toEqual([]);
  });

  it("includes only selected provider", () => {
    const preferences = { sources: [API_SOURCES.THE_NEWS_API_ORG.id], categories: [], searchQuery: "" } as any;
    const result = getAggregatedNews({
      newsApiData: { articles: [{ title: "only" }] } as any,
      newYorkTimesData: { response: { docs: [{ headline: { main: "ny" } }] } } as any,
      guardianData: { response: { results: [{ webTitle: "g" }] } } as any,
      preferences,
    });
    expect(result.map((a) => a.title)).toEqual(["only"]);
  });
});



