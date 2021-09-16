/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFrameSet = /* GraphQL */ `
  query GetFrameSet($id: ID!) {
    getFrameSet(id: $id) {
      id
      name
      description
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
export const listFrameSets = /* GraphQL */ `
  query ListFrameSets(
    $filter: ModelFrameSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFrameSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFrameSets = /* GraphQL */ `
  query SyncFrameSets(
    $filter: ModelFrameSetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFrameSets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getFrame = /* GraphQL */ `
  query GetFrame($id: ID!) {
    getFrame(id: $id) {
      id
      name
      frameSetID
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
export const listFrames = /* GraphQL */ `
  query ListFrames(
    $filter: ModelFrameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFrames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        frameSetID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFrames = /* GraphQL */ `
  query SyncFrames(
    $filter: ModelFrameFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFrames(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        frameSetID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDialog = /* GraphQL */ `
  query GetDialog($id: ID!) {
    getDialog(id: $id) {
      id
      text
      frameID
      critterID
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
export const listDialogs = /* GraphQL */ `
  query ListDialogs(
    $filter: ModelDialogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDialogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        frameID
        critterID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDialogs = /* GraphQL */ `
  query SyncDialogs(
    $filter: ModelDialogFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDialogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        text
        frameID
        critterID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCritter = /* GraphQL */ `
  query GetCritter($id: ID!) {
    getCritter(id: $id) {
      id
      name
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
export const listCritters = /* GraphQL */ `
  query ListCritters(
    $filter: ModelCritterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCritters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCritters = /* GraphQL */ `
  query SyncCritters(
    $filter: ModelCritterFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCritters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDialogCritters = /* GraphQL */ `
  query SyncDialogCritters(
    $filter: ModelDialogCritterFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDialogCritters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dialogID
        critterID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
