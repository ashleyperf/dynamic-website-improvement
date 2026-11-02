import { createHash, randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { getDb } from '../../db/index.js'
import { readerProgress } from '../../db/schema.js'

export default async (request: Request) => {
  if (!['GET', 'PUT'].includes(request.method))
    return new Response('Method not allowed', { status: 405 })
  if (
    request.method === 'PUT' &&
    request.headers.get('origin') !== new URL(request.url).origin
  ) {
    return new Response('Forbidden', { status: 403 })
  }
  const cookie = request.headers
    .get('cookie')
    ?.match(/(?:^|;\s*)fsk_reader=([a-f0-9-]{36})(?:;|$)/)?.[1]
  const visitor = cookie || randomUUID()
  const id = createHash('sha256').update(visitor).digest('hex')
  const headers = new Headers({ 'Cache-Control': 'private, no-store' })
  if (!cookie)
    headers.set(
      'Set-Cookie',
      `fsk_reader=${visitor}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=31536000`,
    )
  try {
    const db = getDb()
    if (request.method === 'GET') {
      const [progress] = await db
        .select()
        .from(readerProgress)
        .where(eq(readerProgress.id, id))
        .limit(1)
      return Response.json(
        {
          quote: progress?.quoteChecks || [],
          studio: progress?.studioChecks || [],
        },
        { headers },
      )
    }
    if (Number(request.headers.get('content-length')) > 1024)
      return new Response('Too large', { status: 413 })
    const body = await request.json().catch(() => null)
    if (
      !body ||
      !['quote', 'studio'].includes(body.group) ||
      !Array.isArray(body.checks) ||
      body.checks.length !== 6 ||
      !body.checks.every((v: unknown) => typeof v === 'boolean')
    ) {
      return Response.json(
        { error: 'Datos de avance inválidos.' },
        { status: 400, headers },
      )
    }
    const values =
      body.group === 'quote'
        ? { quoteChecks: body.checks as boolean[] }
        : { studioChecks: body.checks as boolean[] }
    await db
      .insert(readerProgress)
      .values({ id, ...values })
      .onConflictDoUpdate({
        target: readerProgress.id,
        set: { ...values, updatedAt: new Date() },
      })
    return Response.json({ saved: true }, { headers })
  } catch {
    return Response.json(
      { error: 'No se pudo guardar el avance. Inténtalo de nuevo.' },
      { status: 503, headers },
    )
  }
}
