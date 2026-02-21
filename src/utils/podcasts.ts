import { getPlaylistItems } from "@utils/youtubeApi";

export type PodcastItem = {
    id: string;
    slug: string;
    title: string;
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

export async function getPodcasts(
    playlistId: string,
    count = 20,
): Promise<PodcastItem[]> {
    let data = await getPlaylistItems(count, playlistId);

    let privateVidCount = 0;
    data?.items?.forEach((item) => {
        if (item.snippet.title === "Private video") privateVidCount++;
    });
    if (privateVidCount > 0) {
        data = await getPlaylistItems(count + privateVidCount, playlistId);
    }

    return (
        data?.items
            ?.map(
                (item): PodcastItem => ({
                    id: item.contentDetails.videoId,
                    slug: slugify(item.snippet.title),
                    title: item.snippet.title,
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
            )
            .filter((podcast) => podcast.title !== "Private video") ?? []
    );
}
