import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { db } from '../../../lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const uid = (session.user as { id?: string }).id!;

  const row = await db.execute({ sql: 'SELECT * FROM qt_progress WHERE user_id = ?', args: [uid] });
  if (!row.rows[0]) return NextResponse.json({ completedDays: [], currentDay: 1, assessment: null });

  const r = row.rows[0];
  return NextResponse.json({
    completedDays: JSON.parse((r.completed_days as string) || '[]'),
    currentDay: r.current_day as number,
    assessment: r.assessment ? JSON.parse(r.assessment as string) : null,
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const uid = (session.user as { id?: string }).id!;

  const body = await req.json();
  const { assessment, completedDays, currentDay } = body;

  await db.execute({
    sql: `INSERT INTO qt_progress (user_id, assessment, completed_days, current_day, updated_at)
          VALUES (?, ?, ?, ?, datetime('now'))
          ON CONFLICT(user_id) DO UPDATE SET
            assessment = COALESCE(excluded.assessment, assessment),
            completed_days = COALESCE(excluded.completed_days, completed_days),
            current_day = COALESCE(excluded.current_day, current_day),
            updated_at = datetime('now')`,
    args: [uid, assessment ? JSON.stringify(assessment) : null, JSON.stringify(completedDays ?? []), currentDay ?? 1],
  });

  return NextResponse.json({ ok: true });
}
