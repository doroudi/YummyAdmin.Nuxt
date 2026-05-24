import { glob } from 'glob'
import { join } from 'path'
import { pathToFileURL } from 'url'
import { register } from 'tsx/esm/api'

register({
  transform: true
})

export default async function loadMockHandlers() {
  const handlersDir = join(process.cwd(), 'server', 'mocks', 'handlers')
    
    const handlerFiles = await glob(`${handlersDir}/*.handler.ts`, { 
        cwd: process.cwd(),
        absolute: true 
    })
    
    for (const filePath of handlerFiles) {
        try {
            const fileUrl = pathToFileURL(filePath).href
            const handlerModule = await import(fileUrl)
        } catch (error) {
            console.error(`❌ Failed to load handler ${filePath}:`, error)
        }
    }
}