export type Id = number | string;

export type Column = {
  id: Id;
  name: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  name: string;
};
