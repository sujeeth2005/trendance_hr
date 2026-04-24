import { ApprovalNodeData } from '../../types/workflow';

interface Props {
  data: ApprovalNodeData;
  onChange: (field: string, value: any) => void;
}

const ROLES = ['Manager', 'HRBP', 'Director', 'VP', 'CEO', 'Legal', 'Finance'];

export function ApprovalNodeForm({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Title
        </label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          placeholder="e.g. Manager Approval"
          value={data.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Approver Role
        </label>
        <select
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent bg-white"
          value={data.approverRole || ''}
          onChange={(e) => onChange('approverRole', e.target.value)}
        >
          <option value="">Select role...</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <input
          className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Or type custom role..."
          value={ROLES.includes(data.approverRole || '') ? '' : data.approverRole || ''}
          onChange={(e) => onChange('approverRole', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Auto-approve Threshold
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            max={100}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            placeholder="0 = disabled"
            value={data.autoApproveThreshold || 0}
            onChange={(e) => onChange('autoApproveThreshold', Number(e.target.value))}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Set to 0 to disable auto-approval
        </p>
      </div>
    </div>
  );
}
