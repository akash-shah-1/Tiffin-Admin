import axios from 'axios';

const GRAPHQL_URL = 'http://localhost:4000/graphql';

export const graphqlClient = async (query: string, variables: any = {}) => {
    try {
        const token = localStorage.getItem('token');
        const headers: any = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post(GRAPHQL_URL, {
            query,
            variables,
        }, { headers });

        if (response.data.errors) {
            console.error('GraphQL Errors:', response.data.errors);
            throw new Error(response.data.errors[0].message);
        }

        return response.data.data;
    } catch (error: any) {
        console.error('GraphQL Request Error:', error);
        throw error;
    }
};
