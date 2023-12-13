import { z } from 'zod';

const isFutureDate = (date: string): boolean => {
  const dueDate = new Date(date);
  const currentDate = new Date();
  return dueDate > currentDate;
};
export type CurrentNavItemType = 'All' | 'In Progress' | 'Completed' | 'Add-Todo';

export type TodoType = {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
};

export const taskSchema = z.object({
  id: z.number().gt(0, 'must be greater than zero').optional(),
  title: z.string().min(3, 'must contain atleast 3 letter').max(100, 'should not contain 100 or more letter'),
  description: z
    .string()
    .min(10, 'must contain atleast 10 character')
    .max(250, 'should not conatin 250 or more character'),
  dueDate: z
    .string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Invalid format. Please use YYYY-MM-DD format',
    })
    .refine(isFutureDate, {
      message: 'must be a future date',
    }),
  status: z.enum(['Completed', 'Pending']),
});
