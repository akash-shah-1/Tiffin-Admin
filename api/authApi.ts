import { graphqlClient } from './graphqlClient';

export const authApi = {
  login: async (email: string, password: string) => {
    const mutation = `
      mutation Login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
          accessToken
          user {
            _id
            name
            email
            type
          }
        }
      }
    `;
    const data = await graphqlClient(mutation, { email, password });
    return {
      token: data.login.accessToken,
      user: {
        id: data.login.user._id,
        name: data.login.user.name,
        email: data.login.user.email,
        type: data.login.user.type,
      }
    };
  }
};
