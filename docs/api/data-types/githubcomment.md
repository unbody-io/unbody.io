---
title: GithubComment
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Data
  Types","route":"/docs/api/data-types"},{"title":"GithubComment","route":"/docs/api/data-types/githubcomment"}]
---

# GithubComment

| Field | Type | Description |
| :-- | :-: | :-- |
| author | object | Comment's author. |
| author.id | string | User's ID. |
| author.url | string | User's profile URL. |
| author.login | string | User's login name. |
| author.avatarUrl | string | User's avatar URL. |
| authorAssociation | string | Author's association with the repository. |
| createdAt | Date | The date the comment was created. |
| diffHunk | string | Diff hunk; Review comment only. |
| html | string | Comment's body in HTML format. |
| inReplyToId | string | The comment's remote ID that this comment is replying to. |
| inReplyToUrl | string | The URL of the comment that this comment is replying to. |
| modifiedAt | Date | The date the comment was last modified. |
| outdated | boolean | Whether the comment is outdated; Review comment only. |
| reactions | Array<object> | Comment's reactions. |
| reactions.key | string | The reaction type. |
| reactions.total | number | The total number of reactions. |
| refPath | string | File path; Review comment only. |
| remoteId | string | The unique identifier in the source. |
| sourceId | string | The source identifier. |
| subjectType | string | Comment's subject type; Review comment only. |
| text | string | Comment's body in plain text. |
| type | string | The type of the comment: issue\_comment, pull\_request\_review\_comment |
| url | string | Comment's URL. |
| autoSummary | string | A summary automatically generated based on the comment's content. |
| autoKeywords | Array<string> | Keywords automatically extracted from the comment's content. |
| autoEntities | Array<string> | Entities automatically extracted from the comment's content. |
| autoTopics | Array<string> | Topics automatically extracted from the comment's content. |
| thread | Array<GithubThread> | The thread associated with the comment. |

[DiscordMessage](/docs/api/data-types/discordmessage "DiscordMessage")[GithubThread](/docs/api/data-types/githubthread "GithubThread")