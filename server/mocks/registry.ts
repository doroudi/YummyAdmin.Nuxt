type MockHandler = {
    method: string
    path: string
    pattern?: RegExp
    paramNames?: string[]
    handler: (event: any, params?: any) => any
}

class MockRegistry {
    private mockHandlers: MockHandler[] = []
    
    constructor() {
    }
    
    registerMockHandler(method: string, path: string, handler: any) {
        // Check if path has dynamic segments (contains :)
        if (path.includes(':')) {
            const paramNames: string[] = []
            const pattern = new RegExp(
                '^' + path.replace(/:[^/]+/g, (match) => {
                    paramNames.push(match.slice(1))
                    return '([^/]+)'
                }) + '$'
            )

            console.log(`☑️ ${method}:${path}, patter: ${pattern}, paramNames: ${paramNames}`)
            this.mockHandlers.push({ 
                method, 
                path, 
                handler,
                pattern,
                paramNames
            })
        } else {
            // Static path
            this.mockHandlers.push({ 
                method, 
                path, 
                handler
            })
        }
    }
    
   
    findMockHandler(method: string, fullPath: string) {
        // Clean the path
        let cleanPath = fullPath.split('?')[0]!
        cleanPath = cleanPath?.replace(/^\//, '')
        cleanPath = cleanPath?.replace(/\/$/, '')
        // cleanPath = cleanPath?.toLowerCase()

        let handler = this.mockHandlers.find(h => 
            h.method === method && h.path === cleanPath
        )
        
        if (handler) {
            return { handler: handler.handler, params: {} }
        }
        
        // Try pattern matching for dynamic routes
        for (const h of this.mockHandlers) {
            if (h.method !== method) continue
            if (!h.pattern) continue
            
            console.log("💚 ~ MockRegistry ~ findMockHandler ~ cleanPath:", cleanPath)
            const match = cleanPath.match(h.pattern)
            if (match) {
                const params: Record<string, string> = {}
                h.paramNames?.forEach((name, index) => {
                    params[name] = match[index + 1]!
                })
                return { handler: h.handler, params }
            }
        }
        
        console.log('❌ No handler found for:', method, cleanPath)
        return null
    }
    
    getHandlers() {
        return this.mockHandlers
    }
}

// Force a single instance using globalThis
const globalKey = '__MOCK_REGISTRY__'
if (!globalThis[globalKey]) {
    globalThis[globalKey] = new MockRegistry()
}

export const registry = globalThis[globalKey]
export const registerMockHandler = registry.registerMockHandler.bind(registry)
export const findMockHandler = registry.findMockHandler.bind(registry)
export const mockHandlers = registry.getHandlers()