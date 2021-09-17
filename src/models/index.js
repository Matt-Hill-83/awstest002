// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DialogOrder, FrameOrder, Frame, Dialog, Critter, FrameSet } = initSchema(schema);

export {
  DialogOrder,
  FrameOrder,
  Frame,
  Dialog,
  Critter,
  FrameSet
};