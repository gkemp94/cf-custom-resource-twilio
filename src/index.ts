import axios from 'axios';

import { IUpdateEvent, ICreateEvent, IDeleteEvent, IResponse } from './types';
import * as accounts from './accounts';

const response = (ResponseUrl: string, obj: IResponse) => {
  return axios.put(ResponseUrl, obj);
}

export const deploy = async (event: IUpdateEvent | ICreateEvent | IDeleteEvent) => {
  const { RequestType, ResponseURL } = event;
  const { StackId, RequestId, LogicalResourceId, PhysicalResourceId = 'NO_RESOURCE_CREATED' } = event;
  try {
    switch (RequestType) {
      case 'Create': {
        const { sid, authToken, friendlyName } = await accounts.create(event as ICreateEvent);
        return await response(ResponseURL, {
          Status: 'SUCCESS',
          StackId,
          RequestId,
          LogicalResourceId,
          PhysicalResourceId: sid,
          Data: {
            friendlyName,
            authToken: authToken,
            accountSid: sid,
          }
        })
      }
      case 'Update': {
        return await response(ResponseURL, {
          Status: 'SUCCESS',
          StackId,
          RequestId,
          LogicalResourceId,
          PhysicalResourceId,
        })
      }
      case 'Delete': {
        await accounts.remove(event as IDeleteEvent);
        return await response(ResponseURL, {
          Status: 'SUCCESS',
          StackId,
          RequestId,
          LogicalResourceId,
          PhysicalResourceId,
        })
      }
    }
  } catch (e) {
    return await response(ResponseURL, {
      Status: 'FAILED',
      Reason: e.message,
      StackId,
      RequestId,
      LogicalResourceId,
      PhysicalResourceId,
    })
  }
}
