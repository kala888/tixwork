export type BackendServiceSendProps = {
  method?: 'get' | 'post' | 'put';
  uri: string;
  params?: object;
  headers?: object;
  loading: any;
  asForm?: boolean;
  cache?: number;
};

export type HttpResponse = {
  xclass: string;
  xredirect: boolean;
  data: object;
  message: string;
  status: string;
  headers: object;
  success: boolean;
};
