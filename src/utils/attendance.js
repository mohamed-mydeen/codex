export const uid = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
export const subjectRecords = (records, subjectId) => records.filter(r => r.subjectId === subjectId);
export const statsFor = (subjectId, records) => { const list = subjectRecords(records, subjectId); const attended = list.filter(r => r.status === 'present').length; const absent = list.filter(r => r.status === 'absent').length; const total = list.length; const percent = total ? (attended / total) * 100 : null; return { attended, absent, total, percent }; };
export const formatPercent = value => value == null ? 'No attendance recorded' : `${value.toFixed(1)}%`;
export const levelFor = percent => percent == null ? 'neutral' : percent >= 75 ? 'good' : percent >= 65 ? 'warn' : 'bad';
export const safety = (percent, required) => { if (percent == null) return ['No data', 'Mark your first class to see safety status.']; if (percent < required) return ['Critical', 'You need to attend more classes.']; if (percent - required < 5) return ['Warning', 'You are close to the minimum.']; return ['Safe', `You are safely above ${required}%.`]; };
export const todayKey = () => new Date().toLocaleDateString('en-US', { weekday: 'long' });
