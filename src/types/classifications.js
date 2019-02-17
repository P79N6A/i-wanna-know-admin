const CLASSIFICATIONS = `
  input ClassificationInput {
    name: String!
    description: String
    icon: String!
  }

  input ClassificationUpdateInput {
    _id: ID!
    name: String!
    description: String
    icon: String!
  }

  type Classification {
    _id: ID!
    name: String
    description: String
    icon: String
  }

  type Classifications {
    list: [Classification]
    total: Int!
  }
`;

module.exports = CLASSIFICATIONS;
