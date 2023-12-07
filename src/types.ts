export type CurrentNavItemType = 'All' | 'In Progress' | 'Completed' | 'Add-Todo';

export type TodoType = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
};
