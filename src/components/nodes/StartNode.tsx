import { Handle, Position, NodeProps } from 'reactflow';
import { StartNodeData } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';

export function StartNode({ id, data, selected }: NodeProps<StartNodeData>) {
  const selectNode = useWorkflowStore((s) => s.selectNode);

  return (
    <div
      onClick={() => selectNode(id)}
      className={`relative cursor-pointer select-none transition-all duration-150 ${
        selected ? 'scale-105' : 'hover:scale-102'
      }`}
    >
      <div
        className={`bg-white rounded-2xl px-4 py-3 min-w-[160px] shadow-lg border-2 transition-colors ${
          selected ? 'border-emerald-500 shadow-emerald-100' : 'border-emerald-200 hover:border-emerald-400'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg width="10" height="10" fill="white" viewBox="0 0 12 12">
              <polygon points="3,1 11,6 3,11" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            Start
          </span>
        </div>
        <div className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
          {data.title || 'Start Workflow'}
        </div>
        {data.metadata && data.metadata.length > 0 && (
          <div className="mt-1 text-xs text-gray-400">
            {data.metadata.length} metadata field{data.metadata.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-white"
      />
    </div>
  );
}
