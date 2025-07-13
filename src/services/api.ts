import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UsersResponse, UsersQueryParams } from '../types/user';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://tech-test.raintor.com/api/' 
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, UsersQueryParams>({
      query: ({ take, skip }) => `users/GetUsersList?take=${take}&skip=${skip}`,
      serializeQueryArgs: ({ queryArgs }) => {        
        return `${queryArgs.take}-${queryArgs.skip}`;
      },
      merge: (currentCache, newItems) => {        
        if (currentCache) {
          return {
            ...newItems,
            users: [...currentCache.users, ...newItems.users],
          };
        }
        return newItems;
      },
      forceRefetch: ({ currentArg, previousArg }) => {        
        return currentArg?.skip !== previousArg?.skip;
      },
    }),
  }),
});

export const { useGetUsersQuery } = api; 