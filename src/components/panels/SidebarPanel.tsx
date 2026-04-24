import { NodeType } from '../../types/workflow';

interface NodeDef {
  type: NodeType;
  label: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const NODE_DEFS: NodeDef[] = [
  {
    type: 'start',
    label: 'Start',
    description: 'Entry point',
    color: 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50',
    icon: (
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <svg width="10" height="10" fill="white" viewBox="0 0 12 12">
          <polygon points="3,1 11,6 3,11" />
        </svg>
      </div>
    ),
  },
  {
    type: 'task',
    label: 'Task',
    description: 'Human task',
    color: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
    icon: (
      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="1" width="10" height="10" rx="2" stroke="#3b82f6" strokeWidth="1.5" />
          <path d="M3.5 6h5M3.5 4h5M3.5 8h3" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    type: 'approval',
    label: 'Approval',
    description: 'Needs sign-off',
    color: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50',
    icon: (
      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path d="M6 1L11 10H1L6 1Z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6 5v2M6 8.5v.5" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    type: 'automated',
    label: 'Automated',
    description: 'System action',
    color: 'border-violet-200 hover:border-violet-400 hover:bg-violet-50',
    icon: (
      <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4" stroke="#7c3aed" strokeWidth="1.5" />
          <path d="M6 3v3l2 1" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    type: 'end',
    label: 'End',
    description: 'Completion',
    color: 'border-rose-200 hover:border-rose-400 hover:bg-rose-50',
    icon: (
      <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
        <svg width="8" height="8" fill="white" viewBox="0 0 8 8">
          <rect x="1" y="1" width="6" height="6" rx="1" />
        </svg>
      </div>
    ),
  },
];

export function SidebarPanel() {
  const onDragStart = (e: React.DragEvent, nodeType: NodeType) => {
    e.dataTransfer.setData('application/reactflow-type', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" rx="1" fill="white" />
              <rect x="7" y="1" width="4" height="4" rx="1" fill="white" opacity="0.6" />
              <rect x="1" y="7" width="4" height="4" rx="1" fill="white" opacity="0.6" />
              <rect x="7" y="7" width="4" height="4" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <h1 className="text-sm font-bold text-gray-900">HR Workflow</h1>
        </div>
        <p className="text-xs text-gray-400">Designer</p>
      </div>

      <div className="px-3 py-3 flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-3">
          Drag to Canvas
        </p>
        <div className="flex flex-col gap-2">
          {NODE_DEFS.map((def) => (
            <div
              key={def.type}
              draggable
              onDragStart={(e) => onDragStart(e, def.type)}
              className={`flex items-center gap-3 p-2.5 rounded-xl border-2 bg-white cursor-grab active:cursor-grabbing transition-all duration-150 select-none ${def.color}`}
            >
              {def.icon}
              <div>
                <div className="text-xs font-semibold text-gray-700">{def.label}</div>
                <div className="text-xs text-gray-400">{def.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Drag nodes · Click to edit · Del to remove
        </p>
      </div>
    </div>
  );
}
