# Dhiyo Assignment

## ExpressJS + GraphQL

**NOTE :** Passwords sent from the client are assumed to be encrypted.
If you want to encrypt the passwords on the server let me know.

`JWT` is used for authentication

Random generated tokens are used for reset token. Which are stored in the database for authentication and finding the user associated with the token. Token Expire time is also given for security.

File Upload is achieved by using [GraphQL multipart request specification](https://github.com/jaydenseric/graphql-multipart-request-spec)

For Uploading a file You have to use curl example is given below

```
curl localhost:9000/api \
  -F operations='{"query": "mutation ($file: Upload!) { singleUpload(file: $file) { filename } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@test.txt \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjFjZGZiMDg0N2JmMWQ5Y2MzNWMzOSIsImlhdCI6MTU5MjkyNzQwNCwiZXhwIjoxNTkzNzkxNDA0fQ.T5c0Iq5LNp7VVrHJ6oaeZ-PGZF2OaJQhCw1E9CnzqZ0"
```

For file upload to work You have to create a top level folder `uploadedFiles`
