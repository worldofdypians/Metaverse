import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { signOut } from "@aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

// Create minimal cache configuration to avoid initialization issues
const cache = new InMemoryCache();

async function GetCurrentSession() {
  try {
    const { tokens } = await fetchAuthSession();
    const idToken = tokens?.idToken?.toString();
    return idToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const awsGraphqlFetch = async (uri, options) => {
  const token = await GetCurrentSession();
  if (token) {
    options.headers.Authorization = token;
  }
  return fetch(uri, options);
};

const httpLink = new HttpLink({
  uri: "https://ewi6iwn4zfernbfps2b3ydppiy.appsync-api.eu-central-1.amazonaws.com/graphql",
  fetch: awsGraphqlFetch,
});

const logout = () => {
  signOut()
    .then(() => {})
    .catch(() => {});
};

const logoutLink = onError(({ networkError, graphQLErrors }) => {
  console.log("Global network error", networkError, graphQLErrors);

  function IsUnauthorizedToken(error) {
    return (
      error?.errorType === "UnauthorizedException" &&
      (error?.message === "Valid authorization header not provided." ||
        error?.message === "Unable to parse JWT token.")
    );
  }

  if (
    networkError &&
    networkError.statusCode === 401 &&
    graphQLErrors?.[0] &&
    IsUnauthorizedToken(graphQLErrors[0])
  ) {
    logout();
  }
});

// Create Apollo Client with minimal configuration
const client = new ApolloClient({
  cache,
  link: logoutLink.concat(httpLink),
});

export default client;
