export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    let count = 0;
    
    // Get count from D1 Database (if configured)
    if (env.DB) {
      const result = await env.DB.prepare(`
        SELECT COUNT(*) as total FROM registrations
      `).first();
      count = result.total || 0;
    }
    
    // Fallback: Check for counter in KV storage (if configured)
    if (count === 0 && env.KV) {
      count = parseInt(await env.KV.get('registration_count') || '0');
    }
    
    return Response.json({ 
      success: true, 
      count: count
    });
    
  } catch (error) {
    console.error('Count error:', error);
    return Response.json({ 
      success: false, 
      error: 'Internal server error',
      count: 0
    }, { status: 500 });
  }
}
