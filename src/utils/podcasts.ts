import { getAllPlaylistItems } from "@utils/youtubeApi";
import { fallbackPodcasts } from "./fallbackData";

export type PodcastItem = {
    id: string;
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
};

export type PodcastResult = {
    podcasts: PodcastItem[];
    isFallback: boolean;
};

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/['']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

const cache = new Map<string, Promise<PodcastResult>>();

export function getPodcasts(playlistId: string): Promise<PodcastResult> {
    const cached = cache.get(playlistId);
    if (cached) return cached;

    const promise = getAllPlaylistItems(playlistId)
        .then((items): PodcastResult => ({
            podcasts: items
                .filter((item) => item.snippet.title !== "Private video")
                .sort((a, b) => new Date(b.contentDetails.videoPublishedAt).getTime() - new Date(a.contentDetails.videoPublishedAt).getTime())
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
            isFallback: false,
        }))
        .catch((): PodcastResult => {
            console.log("YouTube API failed, using fallback podcast data");
            const sorted = [...fallbackPodcasts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
            return { podcasts: sorted, isFallback: true };
        });

    cache.set(playlistId, promise);
    return promise;
}
