# Yume API Standards

This document contains everything related to the API surface, transport, and request/response lifecycle.

## Transport Strategy

We use **Hono RPC**.
There are no handwritten API clients. The client application imports the server's router type and utilizes the `hc` client to get end-to-end typed requests and responses.

## REST Conventions

While Hono RPC abstracts the raw HTTP requests, the backend routes must still adhere to proper RESTful design principles.

- **Endpoint naming**: Plural nouns, `kebab-case`.
- **HTTP Status Codes**:
  - `200 OK`: Successful read or update.
  - `201 Created`: Successful resource creation.
  - `204 No Content`: Successful deletion.
  - `400 Bad Request`: Validation failure.
  - `401 Unauthorized`: Missing or invalid authentication.
  - `403 Forbidden`: Authenticated, but lacking permissions.
  - `404 Not Found`: Resource does not exist.
  - `500 Internal Server Error`: Unhandled exception.

Example:
```ts
GET /communities          // List communities
POST /communities         // Create a community
GET /communities/:id      // Get a specific community
PATCH /communities/:id    // Update a community
DELETE /communities/:id   // Delete a community
```

## Validation

All request validation (body, query, params) must use **Zod**.
The `packages/validation` package owns every Zod schema. The backend validates using these schemas, and the frontend imports the exact same schemas.

## Error Responses

Errors must follow a standardized format. Do not leak internal stack traces to the client.

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request payload.",
    "details": [ ...zod errors ]
  }
}
```

## Data Transfer Objects (DTOs)

The API should rarely return raw database entities. Instead, responses must be mapped to specific DTOs to strip sensitive information (like password hashes) and format fields appropriately for the client.

## Pagination & Filtering

- **Pagination**: Use cursor-based pagination for large datasets (e.g., feed, messages) and offset-based pagination only for small, static datasets.
- **Filtering**: Accept filter parameters via the query string, validated strictly by Zod.

## Versioning

We rely on API evolution. Rather than v1/v2, add new fields and deprecate old ones. If a breaking change is absolutely unavoidable, a new endpoint (e.g., `/v2/communities`) can be created.
