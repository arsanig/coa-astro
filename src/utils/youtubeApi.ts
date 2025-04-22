import { google } from "googleapis";
const youtubeApiKey = import.meta.env.YOUTUBE_API_KEY;
const youtube = google.youtube({ version: "v3", auth: youtubeApiKey });

type PlaylistItem = {
    items?: [
        {
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
        }
    ];
};

// missing return type interface
export const getPlaylistItems = async (
    maxResults: number,
    playlistId: string
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
    // error handle other statuses
    return data;
};
