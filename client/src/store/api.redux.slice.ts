import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../utils/config';
import { Doc } from '../utils/types';

// interface

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers) => {
    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    return result;
  },
  endpoints: (builder) => ({
    getDocs: builder.query<{ docs: Doc[] }, void>({
      query: () => '/docs',
    }),
    updateDocs: builder.mutation({
      query: (body) => ({
        url: '/update-docs',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useGetDocsQuery, useUpdateDocsMutation } = apiSlice;
export default apiSlice;
