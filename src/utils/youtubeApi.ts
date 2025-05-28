import { google } from "googleapis";
const youtubeApiKey = import.meta.env.YOUTUBE_API_KEY;
const youtube = google.youtube({ version: "v3", auth: youtubeApiKey });

let youtubeRequestCount = 0;

type PlaylistItem = {
    items?: Array<{
        id: string;
        snippet: {
            title: string;
            thumbnails: {
                high: { url: string };
                maxres: { url: string };
            };
        };
        contentDetails: {
            videoId: string;
            videoPublishedAt: string;
        };
    }>;
    nextPageToken?: string;
};


export const getAllPlaylistItems = async (
    playlistId: string
): Promise<PlaylistItem> => {
    let allItems: PlaylistItem["items"] = [];
    let nextPageToken: string | undefined;

    do {
        youtubeRequestCount++;
        const res = await youtube.playlistItems.list({
            maxResults: 50,
            part: ["snippet", "contentDetails"],
            playlistId: playlistId,
            pageToken: nextPageToken,
        });

        if (res.status === 200) {
            const data = res.data as PlaylistItem;
            if (data.items) {
                allItems = allItems.concat(data.items);
            }
            nextPageToken = data.nextPageToken;
        } else {
            break;
        }
    } while (nextPageToken);

    return { items: allItems };
};