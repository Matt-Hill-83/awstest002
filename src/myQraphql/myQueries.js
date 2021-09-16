export const listFrameSets2 = /* GraphQL */ `
  query ListFrameSets(
    $filter: ModelFrameSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFrameSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Frames {
          items {
            name
            id
            Dialogs {
              items {
                text
                id
                Critter {
                  name
                  id
                }
              }
            }
          }
        }
        name
        id
      }
    }
  }
`
