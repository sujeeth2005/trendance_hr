import { AutomatedStepNodeData } from '../../types/workflow';
import { useAutomations } from '../../hooks/useAutomations';

interface Props {
  data: AutomatedStepNodeData;
  onChange: (field: string, value: any) => void;
}

export function AutomatedStepNodeForm({ data, onChange }: Props) {
  const { actions, loading } = useAutomations();
  const selectedAction = actions.find((a) => a.id === data.actionId);

  const handleActionChange = (actionId: string) => {
    onChange('actionId', actionId);
    onChange('actionParams', {});
  };

  const handleParamChange = (param: string, value: string) => {
    onChange('actionParams', { ...(data.actionParams || {}), [param]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Title
        </label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
          placeholder="e.g. Send Welcome Email"
          value={data.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Action
        </label>
        {loading ? (
          <div className="text-xs text-gray-400 py-2">Loading actions...</div>
        ) : (
          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent bg-white"
            value={data.actionId || ''}
            onChange={(e) => handleActionChange(e.target.value)}
          >
            <option value="">Select an action...</option>
            {actions.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAction && selectedAction.params.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Action Parameters
          </label>
          <div className="flex flex-col gap-2">
            {selectedAction.params.map((param) => (
              <div key={param}>
                <label className="block text-xs text-gray-400 mb-1 font-mono">
                  {param}
                </label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
                  placeholder={`Enter ${param}...`}
                  value={(data.actionParams || {})[param] || ''}
                  onChange={(e) => handleParamChange(param, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
