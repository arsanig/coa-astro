import { google } from "googleapis";
const youtubeApiKey = import.meta.env.YOUTUBE_API_KEY;
const youtube = google.youtube({ version: "v3", auth: youtubeApiKey });

export type PlaylistItemEntry = {
    id: string;
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            high: { url: string };
            maxres: { url: string };
        };
    };
    contentDetails: {
        videoId: string;
        videoPublishedAt: string;
    };
};

type PlaylistItem = {
    items?: PlaylistItemEntry[];
};

export const getPlaylistItems = async (
    maxResults: number,
    playlistId: string,
): Promise<PlaylistItem> => {
    let data = {};
    const res = await youtube.playlistItems.list({
        maxResults: maxResults,
        part: ["snippet", "contentDetails"],
        playlistId: playlistId,
    });
    if (res.status === 200) {
        data = res.data;
    }
    return data;
};

export const getAllPlaylistItems = async (
    playlistId: string,
): Promise<PlaylistItemEntry[]> => {
    const allItems: PlaylistItemEntry[] = [];
    let pageToken: string | undefined;

    do {
        const res = await youtube.playlistItems.list({
            maxResults: 50,
            part: ["snippet", "contentDetails"],
            playlistId: playlistId,
            pageToken: pageToken,
        });

        if (res.status === 200 && res.data.items) {
            allItems.push(...(res.data.items as PlaylistItemEntry[]));
            pageToken = res.data.nextPageToken ?? undefined;
        } else {
            break;
        }
    } while (pageToken);

    return allItems;
};
