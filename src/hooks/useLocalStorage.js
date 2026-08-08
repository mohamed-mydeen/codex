import { useEffect, useState } from 'react';
import { getAppData, saveAppData } from '../utils/storage';
export default function useLocalStorage() { const [data, setData] = useState(getAppData); useEffect(() => saveAppData(data), [data]); return [data, setData]; }
