const QUESTIONS = `
  input QuestionInput {
    title: String!
    content: String!
    preview: String
    classificationId: ID
  }

  type Question {
    _id: ID!
    title: String!
    content: String!
    preview: String
    user: User!
    classification: Classification
    like: Int!
    view: Int!
    userId: String!
    time: Float!
  }
`;

module.exports = QUESTIONS;
