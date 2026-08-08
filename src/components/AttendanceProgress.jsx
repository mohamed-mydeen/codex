import { levelFor } from '../utils/attendance';
export default function AttendanceProgress({ percent }) { const width = percent == null ? 0 : Math.min(100, percent); return <div className="progress" aria-label="Attendance progress"><span className={levelFor(percent)} style={{ width: `${width}%` }} /></div>; }
