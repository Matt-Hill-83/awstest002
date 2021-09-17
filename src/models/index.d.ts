import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type DialogOrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FrameOrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FrameMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DialogMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CritterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FrameSetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class DialogOrder {
  readonly id: string;
  readonly order?: string;
  readonly ordering?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<DialogOrder, DialogOrderMetaData>);
  static copyOf(source: DialogOrder, mutator: (draft: MutableModel<DialogOrder, DialogOrderMetaData>) => MutableModel<DialogOrder, DialogOrderMetaData> | void): DialogOrder;
}

export declare class FrameOrder {
  readonly id: string;
  readonly order?: string;
  readonly Frame?: Frame;
  readonly ordering?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FrameOrder, FrameOrderMetaData>);
  static copyOf(source: FrameOrder, mutator: (draft: MutableModel<FrameOrder, FrameOrderMetaData>) => MutableModel<FrameOrder, FrameOrderMetaData> | void): FrameOrder;
}

export declare class Frame {
  readonly id: string;
  readonly name?: string;
  readonly framesetID?: string;
  readonly Dialogs?: (Dialog | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Frame, FrameMetaData>);
  static copyOf(source: Frame, mutator: (draft: MutableModel<Frame, FrameMetaData>) => MutableModel<Frame, FrameMetaData> | void): Frame;
}

export declare class Dialog {
  readonly id: string;
  readonly text?: string;
  readonly frameID?: string;
  readonly Critter?: Critter;
  readonly name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Dialog, DialogMetaData>);
  static copyOf(source: Dialog, mutator: (draft: MutableModel<Dialog, DialogMetaData>) => MutableModel<Dialog, DialogMetaData> | void): Dialog;
}

export declare class Critter {
  readonly id: string;
  readonly name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Critter, CritterMetaData>);
  static copyOf(source: Critter, mutator: (draft: MutableModel<Critter, CritterMetaData>) => MutableModel<Critter, CritterMetaData> | void): Critter;
}

export declare class FrameSet {
  readonly id: string;
  readonly name?: string;
  readonly Frames?: (Frame | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FrameSet, FrameSetMetaData>);
  static copyOf(source: FrameSet, mutator: (draft: MutableModel<FrameSet, FrameSetMetaData>) => MutableModel<FrameSet, FrameSetMetaData> | void): FrameSet;
}