---
title: SubtitleEntry
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Data
  Types","route":"/docs/api/data-types"},{"title":"SubtitleEntry","route":"/docs/api/data-types/subtitleentry"}]
---

# SubtitleEntry

| Field | Type | Description |
| :-- | :-: | :-- |
| end | string | The end time of the subtitle entry. |
| order | number | The order of the subtitle entry in a subtitle file. |
| remoteId | string | The unique identifier in the source. |
| sourceId | string | The source identifier. |
| start | string | The start time of the subtitle entry. |
| text | string | The entry's content in plain text. |
| document | Array<SubtitleFile> | The subtitle file the entry belongs to. |

[SpreadsheetDocument](/docs/api/data-types/spreadsheetdocument "SpreadsheetDocument")[SubtitleFile](/docs/api/data-types/subtitlefile "SubtitleFile")