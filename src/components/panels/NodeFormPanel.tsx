import { useWorkflowStore } from '../../store/workflowStore';
import { StartNodeForm } from '../forms/StartNodeForm';
import { TaskNodeForm } from '../forms/TaskNodeForm';
import { ApprovalNodeForm } from '../forms/ApprovalNodeForm';
import { AutomatedStepNodeForm } from '../forms/AutomatedStepNodeForm';
import { EndNodeForm } from '../forms/EndNodeForm';
import {
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomatedStepNodeData,
  EndNodeData,
} from '../../types/workflow';

const NODE_COLORS: Record<string, string> = {
  start: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  task: 'text-blue-600 bg-blue-50 border-blue-200',
  approval: 'text-amber-600 bg-amber-50 border-amber-200',
  automated: 'text-violet-600 bg-violet-50 border-violet-200',
  end: 'text-rose-600 bg-rose-50 border-rose-200',
};

const NODE_LABELS: Record<string, string> = {
  start: 'Start Node',
  task: 'Task Node',
  approval: 'Approval Node',
  automated: 'Automated Step',
  end: 'End Node',
};

export function NodeFormPanel() {
  const { nodes, selectedNodeId, updateNodeData, deleteSelected } =
    useWorkflowStore();
  const node = nodes.find((n) => n.id === selectedNodeId);

  const handleChange = (field: string, value: any) => {
    if (!node) return;
    const updated: any = { [field]: value };
    if (field === 'title' || field === 'endMessage') {
      updated.label = value;
    }
    updateNodeData(node.id, updated);
  };

  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4v12M4 10h12"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">No node selected</p>
        <p className="text-xs text-gray-400 mt-1">
          Click a node on the canvas to edit it
        </p>
      </div>
    );
  }

  const nodeType = node.data.nodeType;
  const colorClass = NODE_COLORS[nodeType] || 'text-gray-600 bg-gray-50 border-gray-200';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div className={`text-xs font-bold px-3 py-1 rounded-full border ${colorClass} uppercase tracking-wider`}>
          {NODE_LABELS[nodeType]}
        </div>
        <button
          onClick={deleteSelected}
          className="text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors font-medium"
        >
          Delete
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4">
        {nodeType === 'start' && (
          <StartNodeForm data={node.data as StartNodeData} onChange={handleChange} />
        )}
        {nodeType === 'task' && (
          <TaskNodeForm data={node.data as TaskNodeData} onChange={handleChange} />
        )}
        {nodeType === 'approval' && (
          <ApprovalNodeForm data={node.data as ApprovalNodeData} onChange={handleChange} />
        )}
        {nodeType === 'automated' && (
          <AutomatedStepNodeForm
            data={node.data as AutomatedStepNodeData}
            onChange={handleChange}
          />
        )}
        {nodeType === 'end' && (
          <EndNodeForm data={node.data as EndNodeData} onChange={handleChange} />
        )}
      </div>
    </div>
  );
}
