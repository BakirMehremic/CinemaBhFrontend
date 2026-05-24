export type NameIdPair = {
  name: string;
  id: number;
};

export type MessageResponse = {
  message: string;
};

export type MessageDataResponse<T> = {
  message: string;
  data: T;
};
