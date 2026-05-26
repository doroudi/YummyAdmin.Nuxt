import loadMockHandlers from '../../mocks/load-handlers'
import { findMockHandler } from '../../mocks/registry'

export default defineEventHandler(
    async (event: any) => {
        const runtimeConfig = useRuntimeConfig()
        const mockMode = runtimeConfig.public.apiMock === true
        const path = event.path.replace(/^\/api\//, '')

        if (mockMode) {
            await loadMockHandlers()
            
            const handler =
                findMockHandler(
                    event.method,
                    path
                )

            if (!handler) {
                throw createError({
                    statusCode: 404,
                    statusMessage:
                        `No mock handler for ${event.method} ${path}`
                })
            }
            
            return await handler.handler(event, handler.params)
        }

        return await proxyToBackend(
            event,
            path
        )
    }
)

async function proxyToBackend(event: any, path: string) {
    // const runtimeConfig = useRuntimeConfig()
    const backendUrl = '' //runtimeConfig.public.apiBaseUrl

    if (!backendUrl) {
        throw createError({
            statusCode: 500,
            statusMessage: 'apiBaseUrl is not configured'
        })
    }

    const targetUrl = `${backendUrl}/api/${path}`

    const query = getQuery(event)

    let body: any = undefined

    if (
        !['GET', 'HEAD'].includes(event.method)
    ) {
        try {
            body = await readBody(event)
        } catch {
            body = undefined
        }
    }

    const headers: Record<string, string> = {}

    const headersToForward = [
        'authorization',
        'accept',
        'accept-language',
        'content-type',
        'cookie',
        'user-agent',
        'referer',
        'x-requested-with',
        'x-forwarded-for',
        'x-real-ip',
        'x-csrf-token',
        'x-api-key'
    ]

    for (const header of headersToForward) {
        const value = getRequestHeader(event, header)

        if (value) {
            headers[header] = value
        }
    }

    if (
        runtimeConfig.apiKey &&
        !headers['x-api-key']
    ) {
        headers['x-api-key'] =
            String(runtimeConfig.apiKey)
    }

    try {
        return await $fetch(targetUrl, {
            method: event.method,
            query,
            body,
            headers,
            timeout: 30000,
            retry: 0
        })
    } catch (error: any) {
        console.error(
            `❌ Proxy error: ${targetUrl}`,
            error
        )

        if (error?.response) {
            throw createError({
                statusCode:
                    error.response.status || 500,
                statusMessage:
                    error.response.statusText ||
                    'Backend error',
                data: error.response._data
            })
        }

        if (
            error?.message?.includes(
                'ECONNREFUSED'
            )
        ) {
            throw createError({
                statusCode: 503,
                statusMessage:
                    'Backend service unavailable'
            })
        }

        if (
            error?.message?.includes(
                'timeout'
            )
        ) {
            throw createError({
                statusCode: 504,
                statusMessage:
                    'Backend timeout'
            })
        }

        throw createError({
            statusCode: 500,
            statusMessage:
                error?.message || 'Proxy error'
        })
    }
}