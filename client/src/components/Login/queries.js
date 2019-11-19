import gql from "graphql-tag"
export const LOGIN_MUTATION = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`
