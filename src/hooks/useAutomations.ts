import { useState, useEffect } from 'react';
import { AutomationAction } from '../types/workflow';

export function useAutomations() {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/automations')
      .then((r) => r.json())
      .then((data) => {
        setActions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { actions, loading };
}
