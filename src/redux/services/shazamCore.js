import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        '133678d879msh2349064b6294745p15ec65jsn37ec51172cfe'
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => 'https://shazam-core.p.rapidapi.com/v1/charts/world',
    }),
    getSongsByGenre: builder.query({
      query: (genre) =>
        `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${genre}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) =>
        `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${songid}`,
    }),
    getRelatedSongs: builder.query({
      query: ({ songid }) =>
        `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) =>
        `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `https://shazam-core.p.rapidapi.com/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetSongsByGenreQuery,
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
