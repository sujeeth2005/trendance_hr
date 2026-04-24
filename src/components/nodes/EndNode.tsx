import { Handle, Position, NodeProps } from 'reactflow';
import { EndNodeData } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';

export function EndNode({ id, data, selected }: NodeProps<EndNodeData>) {
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
        className="!w-3 !h-3 !bg-rose-400 !border-2 !border-white"
      />
      <div
        className={`bg-white rounded-2xl px-4 py-3 min-w-[160px] shadow-lg border-2 transition-colors ${
          selected ? 'border-rose-500 shadow-rose-100' : 'border-rose-200 hover:border-rose-400'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center">
            <svg width="8" height="8" fill="white" viewBox="0 0 8 8">
              <rect x="1" y="1" width="6" height="6" rx="1" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
            End
          </span>
        </div>
        <div className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
          {data.endMessage || 'Workflow Complete'}
        </div>
        {data.showSummary && (
          <div className="text-xs text-rose-400 mt-1">📋 Summary enabled</div>
        )}
      </div>
    </div>
  );
}
