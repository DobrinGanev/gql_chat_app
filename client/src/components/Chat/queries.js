import gql from "graphql-tag"
export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      email
      message
    }
  }
`

export const USERS = gql`
  {
    users {
      email
      messages {
        message
      }
    }
  }
`
export const MESSAGE_SENT_SUB = gql`
  subscription {
    messageSent {
      message
      email
    }
  }
`
