/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFrameSet = /* GraphQL */ `
  subscription OnCreateFrameSet {
    onCreateFrameSet {
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
export const onUpdateFrameSet = /* GraphQL */ `
  subscription OnUpdateFrameSet {
    onUpdateFrameSet {
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
export const onDeleteFrameSet = /* GraphQL */ `
  subscription OnDeleteFrameSet {
    onDeleteFrameSet {
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
export const onCreateFrame = /* GraphQL */ `
  subscription OnCreateFrame {
    onCreateFrame {
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
export const onUpdateFrame = /* GraphQL */ `
  subscription OnUpdateFrame {
    onUpdateFrame {
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
export const onDeleteFrame = /* GraphQL */ `
  subscription OnDeleteFrame {
    onDeleteFrame {
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
export const onCreateDialog = /* GraphQL */ `
  subscription OnCreateDialog {
    onCreateDialog {
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
export const onUpdateDialog = /* GraphQL */ `
  subscription OnUpdateDialog {
    onUpdateDialog {
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
export const onDeleteDialog = /* GraphQL */ `
  subscription OnDeleteDialog {
    onDeleteDialog {
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
export const onCreateCritter = /* GraphQL */ `
  subscription OnCreateCritter {
    onCreateCritter {
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
export const onUpdateCritter = /* GraphQL */ `
  subscription OnUpdateCritter {
    onUpdateCritter {
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
export const onDeleteCritter = /* GraphQL */ `
  subscription OnDeleteCritter {
    onDeleteCritter {
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
export const onCreateDialogCritter = /* GraphQL */ `
  subscription OnCreateDialogCritter {
    onCreateDialogCritter {
      id
      dialogID
      critterID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      dialog {
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
      critter {
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
export const onUpdateDialogCritter = /* GraphQL */ `
  subscription OnUpdateDialogCritter {
    onUpdateDialogCritter {
      id
      dialogID
      critterID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      dialog {
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
      critter {
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
export const onDeleteDialogCritter = /* GraphQL */ `
  subscription OnDeleteDialogCritter {
    onDeleteDialogCritter {
      id
      dialogID
      critterID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      dialog {
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
      critter {
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
