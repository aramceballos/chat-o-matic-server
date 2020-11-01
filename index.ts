import { ApolloServer, gql, PubSub } from 'apollo-server';

const pubsub = new PubSub();

interface IMessage {
  id: number;
  user: string;
  content: string;
}

const messages: IMessage[] = [];

const typeDefs = gql`
  type Message {
    id: ID!
    user: String!
    content: String!
  }
  type Query {
    messages: [Message!]
  }
  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }
  type Subscription {
    messages: [Message!]
  }
`;

const MESSAGE_ADDED = 'MESSAGE_ADDED';

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_parent: any, { user, content }: IMessage) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      pubsub.publish(MESSAGE_ADDED, { messages: messages });
      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ port }: any) => {
  console.log(`Server on http://localhost:${port}/`);
});
