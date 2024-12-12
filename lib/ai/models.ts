// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o-mini',
    label: 'Philo Basic',
    apiIdentifier: 'gpt-4o-mini',
    description: 'For introductory philosophical discussions',
  },
  {
    id: 'gpt-4o',
    label: 'Philo Advanced',
    apiIdentifier: 'gpt-4o',
    description: 'For deep philosophical analysis and complex topics',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
