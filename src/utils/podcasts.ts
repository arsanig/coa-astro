import { getAllPlaylistItems } from "@utils/youtubeApi";

export type PodcastItem = {
    id: string;
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
};

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/['']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

const cache = new Map<string, Promise<PodcastItem[]>>();

export function getPodcasts(playlistId: string): Promise<PodcastItem[]> {
    const cached = cache.get(playlistId);
    if (cached) return cached;

    const promise = getAllPlaylistItems(playlistId).then((items) =>
        items
            .filter((item) => item.snippet.title !== "Private video")
            .map(
                (item): PodcastItem => ({
                    id: item.contentDetails.videoId,
                    slug: slugify(item.snippet.title),
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail:
                        item.snippet.thumbnails.maxres?.url ||
                        item.snippet.thumbnails.high?.url,
                    publishedAt: new Date(
                        item.contentDetails.videoPublishedAt,
                    ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                }),
            ),
    );

    cache.set(playlistId, promise);
    return promise;
}
