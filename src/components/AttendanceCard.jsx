import AttendanceProgress from './AttendanceProgress';
import { formatPercent } from '../utils/attendance';
export default function AttendanceCard({ title, percent, children }) { return <section className="hero card"><p>{title}</p><h1>{formatPercent(percent)}</h1><AttendanceProgress percent={percent}/>{children}</section>; }
