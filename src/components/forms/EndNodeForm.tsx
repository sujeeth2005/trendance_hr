import { EndNodeData } from '../../types/workflow';

interface Props {
  data: EndNodeData;
  onChange: (field: string, value: any) => void;
}

export function EndNodeForm({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          End Message
        </label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
          placeholder="e.g. Onboarding Complete!"
          value={data.endMessage || ''}
          onChange={(e) => onChange('endMessage', e.target.value)}
        />
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={!!data.showSummary}
              onChange={(e) => onChange('showSummary', e.target.checked)}
            />
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                data.showSummary ? 'bg-rose-500' : 'bg-gray-200'
              }`}
            />
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                data.showSummary ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">Show Summary</div>
            <div className="text-xs text-gray-400">
              Display a summary report at workflow completion
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
