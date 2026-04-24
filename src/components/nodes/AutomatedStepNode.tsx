import { Handle, Position, NodeProps } from 'reactflow';
import { AutomatedStepNodeData } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';

export function AutomatedStepNode({ id, data, selected }: NodeProps<AutomatedStepNodeData>) {
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
        className="!w-3 !h-3 !bg-violet-400 !border-2 !border-white"
      />
      <div
        className={`bg-white rounded-2xl px-4 py-3 min-w-[180px] shadow-lg border-2 transition-colors ${
          selected ? 'border-violet-500 shadow-violet-100' : 'border-violet-200 hover:border-violet-400'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" stroke="#7c3aed" strokeWidth="1.5" />
              <path d="M6 3v3l2 1" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">
            Automated
          </span>
        </div>
        <div className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
          {data.title || 'Automated Step'}
        </div>
        {data.actionId && (
          <div className="mt-1 inline-block bg-violet-50 text-violet-600 text-xs px-2 py-0.5 rounded-full font-mono">
            {data.actionId}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-violet-400 !border-2 !border-white"
      />
    </div>
  );
}
