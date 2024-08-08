import { z } from "@hono/zod-openapi";

const UsersParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "123",
    }),
});

const UsersQuerySchema = z.object({
  name: z.string().openapi({
    example: "John Doe",
  }),
  age: z.string().openapi({
    example: "42",
  }).optional(),
});

const UsersResponseSchema = z
  .object({
    id: z.string().openapi({ example: "123" }),
    name: z.string().openapi({ example: "John Doe" }),
    age: z.number().openapi({ example: 42 }),
  })
  .openapi("User");

// Additional schemas for other endpoints can be defined similarly

const MovieParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: { name: "id", in: "path" },
      example: "tt0111161",
    }),
});

const MovieResponseSchema = z
  .object({
    title: z.string().openapi({ example: "The Shawshank Redemption" }),
    year: z.string().openapi({ example: "1994" }),
    director: z.string().openapi({ example: "Frank Darabont" }),
  })
  .openapi("Movie");

const UserParamsSchema = z.object({
  userId: z.string().openapi({
    param: { name: "userId", in: "path" },
    example: "123",
  }),
});

const UserResponseSchema = z
  .object({
    userId: z.string().openapi({ example: "123" }),
    name: z.string().openapi({ example: "John Doe" }),
    email: z.string().openapi({ example: "john.doe@example.com" }),
  })
  .openapi("User");

export {
  UsersParamsSchema,
  UsersQuerySchema,
  UsersResponseSchema,
  MovieParamsSchema,
  MovieResponseSchema,
  UserParamsSchema,
  UserResponseSchema,
};
