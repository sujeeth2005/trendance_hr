import { useState } from 'react';
import { SimulationResult } from '../types/workflow';

export function useSimulate() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulate = async (nodes: any[], edges: any[]) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      const data: SimulationResult = await res.json();
      setResult(data);
    } catch (e) {
      setError('Simulation request failed');
    } finally {
      setLoading(false);
    }
  };

  return { simulate, result, loading, error };
}
