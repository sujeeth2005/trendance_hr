import { TaskNodeData, KVPair } from '../../types/workflow';

interface Props {
  data: TaskNodeData;
  onChange: (field: string, value: any) => void;
}

export function TaskNodeForm({ data, onChange }: Props) {
  const addField = () => {
    const newField: KVPair = { id: crypto.randomUUID(), key: '', value: '' };
    onChange('customFields', [...(data.customFields || []), newField]);
  };

  const updateField = (id: string, field: 'key' | 'value', val: string) => {
    onChange(
      'customFields',
      (data.customFields || []).map((f) => (f.id === id ? { ...f, [field]: val } : f))
    );
  };

  const removeField = (id: string) => {
    onChange('customFields', (data.customFields || []).filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          placeholder="e.g. Collect Documents"
          value={data.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Description
        </label>
        <textarea
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
          placeholder="Describe what this task involves..."
          value={data.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Assignee
        </label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          placeholder="e.g. HR Manager"
          value={data.assignee || ''}
          onChange={(e) => onChange('assignee', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Due Date
        </label>
        <input
          type="date"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          value={data.dueDate || ''}
          onChange={(e) => onChange('dueDate', e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Custom Fields
          </label>
          <button
            onClick={addField}
            className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md font-medium transition-colors"
          >
            + Add
          </button>
        </div>
        {(data.customFields || []).map((f) => (
          <div key={f.id} className="flex gap-2 mb-2">
            <input
              className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="field"
              value={f.key}
              onChange={(e) => updateField(f.id, 'key', e.target.value)}
            />
            <input
              className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="value"
              value={f.value}
              onChange={(e) => updateField(f.id, 'value', e.target.value)}
            />
            <button
              onClick={() => removeField(f.id)}
              className="text-gray-300 hover:text-red-400 transition-colors px-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
