const USERS = `
  type User {
    _id: ID!
    id: String!
    name: String!
    followsNum: Int!
    followersNum: Int!
    likesNum: Int!
    collectionsNum: Int!
    infosNum: Int!
  }
`;

module.exports = USERS;
