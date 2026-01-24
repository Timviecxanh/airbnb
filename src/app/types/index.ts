export type TApiResponse<T> = {
  loading: boolean;
  data: T;
  error: string | null;
};
