export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface KVPair {
  id: string;
  key: string;
  value: string;
}

export interface BaseNodeData {
  nodeType: NodeType;
  label: string;
}

export interface StartNodeData extends BaseNodeData {
  nodeType: 'start';
  title: string;
  metadata: KVPair[];
}

export interface TaskNodeData extends BaseNodeData {
  nodeType: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: KVPair[];
}

export interface ApprovalNodeData extends BaseNodeData {
  nodeType: 'approval';
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedStepNodeData extends BaseNodeData {
  nodeType: 'automated';
  title: string;
  actionId: string;
  actionParams: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  nodeType: 'end';
  endMessage: string;
  showSummary: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationStep {
  step: number;
  nodeId: string;
  label: string;
  status: 'completed' | 'failed' | 'skipped';
  message: string;
}

export interface SimulationResult {
  success: boolean;
  steps: SimulationStep[];
  errors?: string[];
}
