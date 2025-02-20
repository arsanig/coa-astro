import { google } from "googleapis";
const youtubeApiKey = import.meta.env.YOUTUBE_API_KEY;
const youtube = google.youtube({ version: "v3", auth: youtubeApiKey });

// can be moved out to schemas if use more of Youtube API
interface playlistItemsData {
    items?: [
        {
            kind: string;
            etag: string;
            id: string;
            contentDetails: {
                videoId: string;
                videoPublishedAt: string;
            };
        }
    ];
}

// missing return type interface
export const getPlaylistItems = async (
    maxResults: number,
    playlistId: string
): Promise<playlistItemsData> => {
    let data = {};
    const res = await youtube.playlistItems.list({
        maxResults: maxResults,
        part: ["contentDetails"],
        playlistId: playlistId,
    });
    if (res.status === 200) {
        data = res.data;
    }
    // error handle other statuses
    return data;
};
