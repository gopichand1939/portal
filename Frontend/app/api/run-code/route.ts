import { NextRequest, NextResponse } from 'next/server'

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, stdin = '' } = body as { code?: string; stdin?: string }
    if (typeof code !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid code' }, { status: 400 })
    }
    const res = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'python',
        version: '3.10.0',
        files: [{ content: code }],
        stdin: typeof stdin === 'string' ? stdin : '',
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: 'Execution service error', detail: text },
        { status: 502 }
      )
    }
    const data = await res.json()
    return NextResponse.json({
      stdout: data.run?.stdout ?? '',
      stderr: data.run?.stderr ?? '',
    })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Execution failed' },
      { status: 500 }
    )
  }
}
