import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'

export const useGenericService = <T, TKey>(apiPrefix: string) => {
  return {
    getPagedList: (options: PagedAndSortedRequest) =>
      useApi(apiPrefix).getPaginated<T>('', options),

    getList: async (): Promise<T[]> => {
      const response = await useApi(apiPrefix).getList<T>('all', {})
      return response.items
    },

    getSingle: (id: TKey) => useApi(apiPrefix).get<T>(id as string),

    create: <TModel>(item: TModel) => useApi(apiPrefix).post<T>('', item),

    edit: <TModel>(id: TKey, item: TModel) => useApi(apiPrefix).put<T>(id as string, item),

    remove: (id: TKey) => useApi(apiPrefix).delete<boolean>(id as string),
  }
}
