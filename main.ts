import {
  MovieParamsSchema,
  MovieResponseSchema,
  UserParamsSchema,
  UserResponseSchema,
  UsersParamsSchema,
  UsersQuerySchema,
  UsersResponseSchema,
} from "./schema.ts";

import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

const usrsRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: UsersParamsSchema,
    query: UsersQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UsersResponseSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});

app.openapi(usrsRoute, (c) => {
  const { id } = c.req.valid("param");
  const { name, age } = c.req.valid("query");

  // Fetch user data based on id, name, and age

  return c.json({
    id: "123",
    name: "John Doe",
    age: 42,
  });
});

// Additional routes can be defined similarly

const movieRoute = createRoute(
  createRoute({
    method: "get",
    path: "/movie/{id}",
    request: { params: MovieParamsSchema },
    responses: {
      200: {
        content: { "application/json": { schema: MovieResponseSchema } },
        description: "Retrieve movie details",
      },
    },
  }),
);

// Movie endpoint
app.openapi(movieRoute, async (c) => {
  const { id } = c.req.valid("param");
  // Fetch movie data logic here
  return c.json({
    title: "The Shawshank Redemption",
    year: "1994",
    director: "Frank Darabont",
  });
});

const userRoute = createRoute({
  method: "get",
  path: "/user/{userId}",
  request: { params: UserParamsSchema },
  responses: {
    200: {
      content: { "application/json": { schema: UserResponseSchema } },
      description: "Retrieve user details",
    },
  },
});

// User endpoint
app.openapi(userRoute, async (c) => {
  const { userId } = c.req.valid("param");
  // Fetch user data logic here
  return c.json({
    userId: "123",
    name: "John Doe",
    email: "john.doe@example.com",
  });
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/docs", swaggerUI({ url: "/doc" }));

export default app;
