import { Handle, Position, NodeProps } from 'reactflow';
import { ApprovalNodeData } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';

export function ApprovalNode({ id, data, selected }: NodeProps<ApprovalNodeData>) {
  const selectNode = useWorkflowStore((s) => s.selectNode);

  return (
    <div
      onClick={() => selectNode(id)}
      className={`cursor-pointer select-none transition-all duration-150 ${
        selected ? 'scale-105' : ''
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-amber-400 !border-2 !border-white"
      />
      <div
        className={`bg-white rounded-2xl px-4 py-3 min-w-[180px] shadow-lg border-2 transition-colors ${
          selected ? 'border-amber-500 shadow-amber-100' : 'border-amber-200 hover:border-amber-400'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L11 10H1L6 1Z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M6 5v2.5M6 8.5v.5" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
            Approval
          </span>
        </div>
        <div className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
          {data.title || 'Approval Step'}
        </div>
        {data.approverRole && (
          <div className="text-xs text-gray-500 mt-1">
            👤 {data.approverRole}
          </div>
        )}
        {data.autoApproveThreshold > 0 && (
          <div className="text-xs text-amber-500 mt-1">
            Auto-approve ≥ {data.autoApproveThreshold}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-amber-400 !border-2 !border-white"
      />
    </div>
  );
}
