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
            name
            id
            Dialogs {
              items {
                id
                text
                Critter {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`
