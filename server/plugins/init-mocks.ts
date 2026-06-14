// Server plugin - runs at Nitro startup
// Load all mock handlers using dynamic imports to prevent tree-shaking

export default defineNitroPlugin(async () => {
  
  try {
    await Promise.all([
      import('../mocks/handlers/account.handler'),
      import('../mocks/handlers/brand.handler'),
      import('../mocks/handlers/category.handler'),
      // import('../mocks/handlers/chat.handlers'),
      import('../mocks/handlers/color.handler'),
      import('../mocks/handlers/customer.handler'),
      import('../mocks/handlers/notification.handler'),
      import('../mocks/handlers/order.handler'),
      import('../mocks/handlers/product.handler'),
      import('../mocks/handlers/profile.handler'),
      import('../mocks/handlers/report.handler'),
      import('../mocks/handlers/review.handler'),
      import('../mocks/handlers/todo.handler'),
    ])
    
    // Verify handlers are loaded
    const { mockHandlers } = await import('../mocks/registry')
    
    if (mockHandlers.length > 0) {
      const preview = mockHandlers.slice(0, 5).map((h: any) => `${h.method} ${h.path}`).join(', ')
    }
  } catch (error) {
    console.error('❌ Failed to load mock handlers:', error)
  }
})


