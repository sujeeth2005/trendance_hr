import { StartNodeData, KVPair } from '../../types/workflow';

interface Props {
  data: StartNodeData;
  onChange: (field: string, value: any) => void;
}

export function StartNodeForm({ data, onChange }: Props) {
  const addMeta = () => {
    const newMeta: KVPair = { id: crypto.randomUUID(), key: '', value: '' };
    onChange('metadata', [...(data.metadata || []), newMeta]);
  };

  const updateMeta = (id: string, field: 'key' | 'value', val: string) => {
    onChange(
      'metadata',
      (data.metadata || []).map((m) => (m.id === id ? { ...m, [field]: val } : m))
    );
  };

  const removeMeta = (id: string) => {
    onChange('metadata', (data.metadata || []).filter((m) => m.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Start Title
        </label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
          placeholder="e.g. Employee Onboarding"
          value={data.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Metadata
          </label>
          <button
            onClick={addMeta}
            className="text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-2 py-1 rounded-md font-medium transition-colors"
          >
            + Add
          </button>
        </div>
        {(data.metadata || []).map((m) => (
          <div key={m.id} className="flex gap-2 mb-2">
            <input
              className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="key"
              value={m.key}
              onChange={(e) => updateMeta(m.id, 'key', e.target.value)}
            />
            <input
              className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="value"
              value={m.value}
              onChange={(e) => updateMeta(m.id, 'value', e.target.value)}
            />
            <button
              onClick={() => removeMeta(m.id)}
              className="text-gray-300 hover:text-red-400 transition-colors px-1"
            >
              ✕
            </button>
          </div>
        ))}
        {(data.metadata || []).length === 0 && (
          <p className="text-xs text-gray-400 italic">No metadata fields added</p>
        )}
      </div>
    </div>
  );
}
