import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { join } from 'path';

import resolvers from './lib/resolvers';

const app = express();

const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8',
);

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.get('/test', (req, res) => {
  res.send({ its: 'working' });
});

app.listen(5000, () => {
  console.log('⚡️[server]: Server is running at http://localhost:5000');
});
