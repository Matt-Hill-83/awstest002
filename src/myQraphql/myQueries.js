export const listFrameSets2 = /* GraphQL */ `
  query ListFrameSets(
    $filter: ModelFrameSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFrameSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        id
        Frames {
          items {
            Dialogs {
              items {
                Critter {
                  id
                  name
                }
                id
                text
                order
                _version
              }
            }
            id
            name
          }
        }
      }
    }
  }
`
