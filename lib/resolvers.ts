type ID = number;

type TMessage = {
  id: ID;
  user: string;
  content: string;
};

const messages: TMessage[] = [];

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_: any, { user, content }: TMessage) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      return id;
    },
  },
};

export default resolvers;
