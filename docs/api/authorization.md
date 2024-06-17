---
title: Authorization
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Authorization","route":"/docs/api/authorization"}]
---

# Authorization

Unbody makes it easy for you to handle your content through APIs but we also care for your security. Therefore, to securely interact with Unbody's GraphQL API, you need to include your project ID and API key in the request headers.

You can generate your API key from the Unbody Dashboard in `project settings/ developer settings`. Once you have your API key, you can use it to authenticate your requests to the Unbody API. Additionally, you need to specify the project ID to which you want to send the request.

You can do so using the `Authorization` and `X-Project-Id` headers, respectively. The examples given below demonstrate how to set these headers in different environments.

CurlUnbody TypeScript ClientJavaScript

```
# Authorized call to Unbody using CURL
curl -X POST \\
-H "Authorization: Bearer <API_KEY>" \\
-H "X-Project-Id: <PROJECT_ID>" \\
-H "Content-Type: application/json" \\
-d '{
  "query": "{ Your GraphQL query here }"
}' \\
<https://graphql.unbody.io>
```

### Important Notes

ℹ️

Do not forget to replace `<API_KEY>` with your personal API key generated in the Unbody Dashboard.

ℹ️

You must also replace `<PROJECT_ID>` with your specific project ID.

ℹ️

As a security measure, you must ensure to securely store your API key and never expose it in client-side code. You must use environment variables or server-side code to handle it safely.

[Tutorials](/docs/tutorials "Tutorials")[Search](/docs/api/search "Search")