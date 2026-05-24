import type { PaginatedList } from "~/models/PagedListResult";
import type { ListResult } from "~/models/ListResult";
import type { PagedAndSortedRequest } from "~/models/PagedAndSortedRequest";

export const useApi = (urlSlug: string) => {
  // const auth = useAuth();
  // const config = useRuntimeConfig();

  // Default base URL - can be set in runtime config
  const baseURL = `/api/${urlSlug}`;

  const getHeaders = () => ({
    // ...(auth.token.value ? { Authorization: `Bearer ${auth.token.value}` } : {})
  });

  const handleError = (error: any) => {
    if (error.response?.status === 401) {
      // auth.logout();
      
    }
    throw error;
  };

  // Core fetch method that works with useAsyncData
  const baseFetch = async <T>(
    url: string,
    options: any = {}
  ): Promise<T> => {
    const headers = {
      ...options.headers,
      ...getHeaders(),
    };

    try {
      return await $fetch<T>(url, {
        baseURL,
        ...options,
        headers,
      });
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  // Async data wrapper for automatic loading/error states
  const useAsyncFetch = <T>(
    url: string,
    options: any = {},
    immediate = true
  ) => {
    return useAsyncData<T>(
      `${options.method || 'GET'}:${url}`,
      () => baseFetch<T>(url, options),
      { immediate, ...options.asyncDataOptions }
    );
  };

  return {
    // Core methods (direct promises)
    get: <T>(url: string, params?: any) =>
      baseFetch<T>(url, { method: "GET", params }),

    getList: <T>(url: string, params: any): Promise<ListResult<T>> =>
      baseFetch<ListResult<T>>(url, { method: "GET", params }),

    getPaginated: <T>(
      url: string,
      options: PagedAndSortedRequest
    ): Promise<PaginatedList<T>> =>
      baseFetch<PaginatedList<T>>(url, {
        method: "GET",
        params: removeDefaultOptions(options)
      }),

    query: <T>(url: string, params?: any): Promise<T> =>
      baseFetch<T>(url, { method: "GET", params }),

    post: <T>(url: string, data?: any): Promise<T> =>
      baseFetch<T>(url, { method: "POST", body: data }),

    put: <T>(url: string, data?: any): Promise<T> =>
      baseFetch<T>(url, { method: "PUT", body: data }),

    delete: <T>(url: string): Promise<T> =>
      baseFetch<T>(url, { method: "DELETE" }),

    getBlobFile: (url: string, params?: any) =>
      baseFetch<Blob>(url, {
        method: "GET",
        params,
        responseType: 'blob'
      }),

    postFile: async (url: string, params: { files: any[] }) => {
      const formData = new FormData();
      params.files.forEach((file) => {
        formData.append('files', file);
      });
      return baseFetch(url, {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },

    // Async data methods (for use in setup/composables)
    useAsyncGet: <T>(url: string, params?: any, immediate = true) =>
      useAsyncFetch<T>(url, { method: "GET", params }, immediate),

    useAsyncGetList: <T>(url: string, params: any, immediate = true) =>
      useAsyncFetch<ListResult<T>>(url, { method: "GET", params }, immediate),

    useAsyncGetPaginated: <T>(
      url: string,
      options: PagedAndSortedRequest,
      immediate = true
    ) =>
      useAsyncFetch<PaginatedList<T>>(
        url,
        { method: "GET", params: removeDefaultOptions(options) },
        immediate
      ),

    useAsyncPost: <T>(url: string, data?: any, immediate = false) =>
      useAsyncFetch<T>(url, { method: "POST", body: data }, immediate),

    useAsyncPut: <T>(url: string, data?: any, immediate = false) =>
      useAsyncFetch<T>(url, { method: "PUT", body: data }, immediate),

    useAsyncDelete: <T>(url: string, immediate = false) =>
      useAsyncFetch<T>(url, { method: "DELETE" }, immediate),
  };
};

// Helper function to remove default options
function removeDefaultOptions(options: PagedAndSortedRequest): Partial<PagedAndSortedRequest> {
  const result: Partial<PagedAndSortedRequest> = {};

  // Define default values
  const defaults: Partial<PagedAndSortedRequest> = {
    page: 1,
    pageSize: 10,
    sorting: '',
  };

  for (const prop of Object.keys(options) as (keyof PagedAndSortedRequest)[]) {
    const value = options[prop];
    const defaultValue = defaults[prop];

    // Skip if value matches default or is null/empty
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      (defaultValue !== undefined && value === defaultValue)
    ) {
      continue;
    }

    // Skip internal/UI properties
    if (['pageCount', 'onUpdatePageSize', 'showSizePicker', 'pageSizes'].includes(prop)) {
      continue;
    }

    result[prop] = value;
  }

  return result;
}

// Optional: Create a composable for using API with auto-refresh on auth change
// export const useApiWithRefresh = () => {
//   const api = useApi();
//   const auth = useAuth();

//   const refreshableFetch = async <T>(
//     fetchFn: () => Promise<T>
//   ): Promise<T> => {
//     try {
//       return await fetchFn();
//     } catch (error: any) {
//       if (error.response?.status === 401 && auth.token.value) {
//         await auth.refreshToken();
//         return await fetchFn();
//       }
//       throw error;
//     }
//   };

//   return {
//     ...api,
//     get: <T>(url: string, params?: any) =>
//       refreshableFetch(() => api.get<T>(url, params)),
//     post: <T>(url: string, data?: any) =>
//       refreshableFetch(() => api.post<T>(url, data)),
//     put: <T>(url: string, data?: any) =>
//       refreshableFetch(() => api.put<T>(url, data)),
//     delete: <T>(url: string) =>
//       refreshableFetch(() => api.delete<T>(url)),
//   };
// };