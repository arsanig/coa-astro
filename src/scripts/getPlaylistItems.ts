// const youtubeApiKey = import.meta.env.YOUTUBE_API_KEY;
// const shortsPlaylistId = import.meta.env.COA_SHORTS_PLAYLIST_ID;

// // interface playlistItems {
// //     kind: string;
// //     etag: string;
// //     nextPageToken: string;
// //     items?: [
// //         {
// //             kind: string;
// //             etag: string;
// //             id: string;
// //             contentDetails: {
// //                 videoId: string;
// //                 videoPublishedAt: string;
// //             };
// //         }
// //     ];
// //     pageInfo: {
// //         totalResults: number;
// //         resultsPerPage: number;
// //     };
// // }

// export const getPlaylistItems = async (maxResults: number) => {
//     // error handle if playlistId or maxResults
//     const res = await fetch(
//         `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=${maxResults}&playlistId=${shortsPlaylistId}&key=${youtubeApiKey}`
//     ).then((res) => res.json());

//     return res;
// };
