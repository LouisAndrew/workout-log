export type TemplatesTable = {
  name: string;
  exercises: string[]; // ref to exercise-id
  'template-id': string;
  color?: string
};

export type UserDataTable = {
  name: string;
  templates: string[]; // ref to template-id
  logs: string[]; // ref to log-id
  settings: any; // JSON object
};

export type ExerciseTable = {
  name: string;
  'exercise-id': string;
  reps: string; // range
  sets: string;
  tags: string[]
};

export type ExerciseLogTableItem = {
  'template-id': string;
  date: number; // timestamp
  'exercise-id': string; // ref to exercise id
  logs: string; // JSON object
};
