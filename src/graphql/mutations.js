/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCritter = /* GraphQL */ `
  mutation CreateCritter(
    $input: CreateCritterInput!
    $condition: ModelCritterConditionInput
  ) {
    createCritter(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateCritter = /* GraphQL */ `
  mutation UpdateCritter(
    $input: UpdateCritterInput!
    $condition: ModelCritterConditionInput
  ) {
    updateCritter(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteCritter = /* GraphQL */ `
  mutation DeleteCritter(
    $input: DeleteCritterInput!
    $condition: ModelCritterConditionInput
  ) {
    deleteCritter(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createDialog = /* GraphQL */ `
  mutation CreateDialog(
    $input: CreateDialogInput!
    $condition: ModelDialogConditionInput
  ) {
    createDialog(input: $input, condition: $condition) {
      id
      text
      frameID
      name
      order
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Critter {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateDialog = /* GraphQL */ `
  mutation UpdateDialog(
    $input: UpdateDialogInput!
    $condition: ModelDialogConditionInput
  ) {
    updateDialog(input: $input, condition: $condition) {
      id
      text
      frameID
      name
      order
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Critter {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteDialog = /* GraphQL */ `
  mutation DeleteDialog(
    $input: DeleteDialogInput!
    $condition: ModelDialogConditionInput
  ) {
    deleteDialog(input: $input, condition: $condition) {
      id
      text
      frameID
      name
      order
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Critter {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const createFrame = /* GraphQL */ `
  mutation CreateFrame(
    $input: CreateFrameInput!
    $condition: ModelFrameConditionInput
  ) {
    createFrame(input: $input, condition: $condition) {
      id
      name
      framesetID
      order
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Dialogs {
        nextToken
        startedAt
      }
    }
  }
`;
export const updateFrame = /* GraphQL */ `
  mutation UpdateFrame(
    $input: UpdateFrameInput!
    $condition: ModelFrameConditionInput
  ) {
    updateFrame(input: $input, condition: $condition) {
      id
      name
      framesetID
      order
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Dialogs {
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteFrame = /* GraphQL */ `
  mutation DeleteFrame(
    $input: DeleteFrameInput!
    $condition: ModelFrameConditionInput
  ) {
    deleteFrame(input: $input, condition: $condition) {
      id
      name
      framesetID
      order
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Dialogs {
        nextToken
        startedAt
      }
    }
  }
`;
export const createFrameSet = /* GraphQL */ `
  mutation CreateFrameSet(
    $input: CreateFrameSetInput!
    $condition: ModelFrameSetConditionInput
  ) {
    createFrameSet(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Frames {
        nextToken
        startedAt
      }
    }
  }
`;
export const updateFrameSet = /* GraphQL */ `
  mutation UpdateFrameSet(
    $input: UpdateFrameSetInput!
    $condition: ModelFrameSetConditionInput
  ) {
    updateFrameSet(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Frames {
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteFrameSet = /* GraphQL */ `
  mutation DeleteFrameSet(
    $input: DeleteFrameSetInput!
    $condition: ModelFrameSetConditionInput
  ) {
    deleteFrameSet(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Frames {
        nextToken
        startedAt
      }
    }
  }
`;
