export type Id = number | string;

export type Column = {
  id: Id;
  name: string;
  tasks?: Task[];
};

export type Task = {
  id?: Id;
  columnId: Id;
  name: string;
};
