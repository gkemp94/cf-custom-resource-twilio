import { ICreateEvent, IDeleteEvent, IUpdateEvent } from "./types";

import * as twilio from 'twilio';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const create = async (event: ICreateEvent) => {
  const { FriendlyName } = event.ResourceProperties;
  if (!FriendlyName) {
    throw new Error('Friendly Name Must Exist');
  }
  return await client.api.accounts.create({ friendlyName: FriendlyName });
}

export const update = async (_: IUpdateEvent) => {
  return {};
}

export const remove = async (event: IDeleteEvent) => {
  const { PhysicalResourceId } = event;
  return await client.api.accounts(PhysicalResourceId)
    .update({ status: 'closed' });
}


