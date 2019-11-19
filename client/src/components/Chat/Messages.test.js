import React from "react"
import {MockedProvider} from "@apollo/react-testing"
import renderer from "react-test-renderer"
import Messages from "./Messages"
import {USERS} from "./queries"

const mocks = [
  {
    request: {
      query: USERS,
    },
    result: {
      data: {
        users: [
          ,
          {
            email: "d@email.com",
            messages: [
              {
                email: "d@email.com",
                message: "hello",
              },
            ],
          },
        ],
      },
    },
  },
]

it("renders without error", () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Messages />
    </MockedProvider>
  )
})
