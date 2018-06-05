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
  }
`;

module.exports = CLASSIFICATIONS;
