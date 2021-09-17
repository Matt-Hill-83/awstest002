// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Critter, Dialog, Frame, FrameSet } = initSchema(schema);

export {
  Critter,
  Dialog,
  Frame,
  FrameSet
};