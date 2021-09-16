// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DialogCritter, Dialog, Critter, FrameSet, Frame } = initSchema(schema);

export {
  DialogCritter,
  Dialog,
  Critter,
  FrameSet,
  Frame
};