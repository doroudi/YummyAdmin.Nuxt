import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'

// class GenericService<T, TKey> {
//   private apiPrefix: string
//   constructor(prefix: any) {
//     this.apiPrefix = prefix
//   }

//   async getPagedList(
//     options: PagedAndSortedRequest,
//   ): Promise<PaginatedList<T>> {
//     const response = useApi(this.apiPrefix).getPaginated<T>('', options)
//     return response
//   }

//   async getList(): Promise<T[]> {
//     const response = await useApi(this.apiPrefix).getList<T>('all', {})
//     return response.items
//   }

//   async getSingle(id: TKey): Promise<T> {
//     return await useApi(this.apiPrefix).get<T>(`${id}`)
//   }

//   async create<TModel>(item: TModel): Promise<T> {
//     return await useApi(this.apiPrefix).post<T>('', item)
//   }

//   async edit(id: TKey, item: T): Promise<T> {
//     return await useApi(this.apiPrefix).put<T>(`${id}`, item)
//   }

//   async delete(id: TKey): Promise<boolean> {
//     return await useApi(this.apiPrefix).delete<boolean>(`${id}`)
//   }
// }
// export default GenericService


export const useGenericService = <T, TKey>(apiPrefix: string) => {
  return {
    getPagedList: (options: PagedAndSortedRequest) =>
      useApi(apiPrefix).getPaginated<T>('', options),

    getList: async (): Promise<T[]> => {
      const response = await useApi(apiPrefix).getList<T>('all', {})
      return response.items
    },

    getSingle: (id: TKey) => useApi(apiPrefix).get<T>(`${id}`),

    create: <TModel>(item: TModel) => useApi(apiPrefix).post<T>('', item),

    edit: (id: TKey, item: T) => useApi(apiPrefix).put<T>(`${id}`, item),

    remove: (id: TKey) => useApi(apiPrefix).delete<boolean>(`${id}`),
  }
}