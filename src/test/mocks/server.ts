import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// Mock API responses for CPAT training scenarios
const handlers = [
  // Mock progress tracking API
  http.get('/api/progress/:userId', ({ params }) => {
    return HttpResponse.json({
      userId: params.userId,
      completedModules: ['01-light-color-fundamentals'],
      currentModule: '02-therapeutic-mechanisms',
      certificateEligible: false,
      safetyAcknowledged: true,
      lastActivity: new Date().toISOString()
    })
  }),

  // Mock training module data
  http.get('/api/modules/:moduleId', ({ params }) => {
    return HttpResponse.json({
      id: params.moduleId,
      title: 'Test Training Module',
      content: 'Mock therapeutic training content',
      duration: 30,
      safetyNotes: ['Always prioritize patient safety', 'Follow clinical protocols'],
      completed: false
    })
  }),

  // Mock safety acknowledgment
  http.post('/api/safety/acknowledge', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      acknowledged: true,
      timestamp: new Date().toISOString(),
      userId: body.userId
    })
  }),

  // Mock certificate generation
  http.post('/api/certificate/generate', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      certificateId: 'cert-12345',
      recipientName: body.name,
      completionDate: new Date().toISOString(),
      downloadUrl: '/certificates/cert-12345.pdf'
    })
  }),

  // Mock CPAT scenarios for testing
  http.get('/api/scenarios', () => {
    return HttpResponse.json([
      {
        id: 'crisis-001',
        type: 'crisis',
        title: 'Acute Anxiety Response',
        description: 'Patient presenting with acute anxiety symptoms',
        severity: 'high',
        requiredProtocols: ['safety-assessment', 'de-escalation']
      },
      {
        id: 'routine-001',
        type: 'routine',
        title: 'Regular Check-in',
        description: 'Routine therapeutic check-in session',
        severity: 'low',
        requiredProtocols: ['progress-review']
      }
    ])
  }),

  // Mock error scenarios for testing
  http.get('/api/error-test', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }),

  // Mock therapeutic audio resources
  http.get('/api/audio/therapeutic/:frequency', ({ params }) => {
    return HttpResponse.arrayBuffer(new ArrayBuffer(1024), {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': '1024'
      }
    })
  })
]

export const server = setupServer(...handlers)