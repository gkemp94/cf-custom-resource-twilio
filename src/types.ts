interface IBaseEvent {
  ResponseURL: string;
  StackId: string;
  RequestId: string;
  ResourceType: string;
  LogicalResourceId: string;
  PhysicalResourceId?: string;
  ResourceProperties?: {
    [index: string]: any
  }
}

export interface ICreateEvent extends IBaseEvent {
  RequestType: 'Create'
  
}

export interface IDeleteEvent extends IBaseEvent {
  RequestType: 'Delete',
  
}

export interface IUpdateEvent extends IBaseEvent {
  RequestType: 'Update'
  OldResourceProperties?: {
    [index: string]: any
  }
}

export interface IResponse {
  Status: 'SUCCESS' | 'FAILED';
  Reason?: string;
  PhysicalResourceId?: string;
  StackId: string;
  RequestId: string;
  LogicalResourceId: string;
  Data?: {
    accountSid: string;
    authToken: string;
    friendlyName: string;
  }
}
