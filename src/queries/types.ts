import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export type QueryOptions<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> = Partial<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
>;
