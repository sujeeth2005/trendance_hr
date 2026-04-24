import { Handle, Position, NodeProps } from 'reactflow';
import { TaskNodeData } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';

export function TaskNode({ id, data, selected }: NodeProps<TaskNodeData>) {
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
        className="!w-3 !h-3 !bg-blue-400 !border-2 !border-white"
      />
      <div
        className={`bg-white rounded-2xl px-4 py-3 min-w-[180px] shadow-lg border-2 transition-colors ${
          selected ? 'border-blue-500 shadow-blue-100' : 'border-blue-200 hover:border-blue-400'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="10" height="10" rx="2" stroke="#3b82f6" strokeWidth="1.5" />
              <path d="M3.5 6h5M3.5 4h5M3.5 8h3" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
            Task
          </span>
        </div>
        <div className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
          {data.title || 'Untitled Task'}
        </div>
        {data.assignee && (
          <div className="flex items-center gap-1 mt-1">
            <div className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center text-xs font-bold text-blue-600">
              {data.assignee[0]?.toUpperCase()}
            </div>
            <span className="text-xs text-gray-500 truncate max-w-[120px]">{data.assignee}</span>
          </div>
        )}
        {data.dueDate && (
          <div className="text-xs text-gray-400 mt-1">📅 {data.dueDate}</div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-blue-400 !border-2 !border-white"
      />
    </div>
  );
}
