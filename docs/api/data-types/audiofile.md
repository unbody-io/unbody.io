---
title: AudioFile
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Data
  Types","route":"/docs/api/data-types"},{"title":"AudioFile","route":"/docs/api/data-types/audiofile"}]
---

# AudioFile

| Field | Type | Description |
| :-- | :-: | :-- |
| assetId | string | The asset ID of the file on audio platform. |
| blob | Blob | A base64 encoded string of the file. |
| duration | number | The duration of the audio file in seconds. |
| ext | string | The extension of the file. |
| files | Array<object> | The static media files associated with the audio file. |
| files.width | number | The width of the media file. |
| files.height | number | The height of the media file. |
| files.size | number | The size of the media file in bytes. |
| files.name | string | The name of the media file. |
| files.ext | string | The extension of the media file. |
| files.bitrate | number | The bitrate of the media file. |
| files.url | string | The URL of the media file. |
| hlsUrl | string | The URL to the HLS stream. |
| mimeType | string | The MIME type of the file. |
| order | number | The order of the object in a list. |
| originalName | string | The original name of the file. |
| path | Array<string> | The path to the file in the source. |
| pathString | string | The path to the file in the source as a string. |
| playbackId | string | The playback ID of the file on audio platform. |
| remoteId | string | The unique identifier in the source. |
| size | number | The size of the file in bytes. |
| sourceId | string | The source identifier. |
| url | string | Direct access URL. |
| autoSummary | string | A summary automatically generated from the transcript. |
| autoKeywords | Array<string> | Keywords automatically extracted from the transcript. |
| autoEntities | Array<string> | Entities automatically extracted from the transcript. |
| autoTopics | Array<string> | Topics automatically extracted from the transcript. |
| subtitles | Array<SubtitleFile> | The subtitles associated with the audio file. |
| document | Array<GoogleDoc | GoogleCalendarEvent | DiscordMessage> | The parent document of the audio file. |

[Overview](/docs/api/data-types/overview "Overview")[CsvRow](/docs/api/data-types/csvrow "CsvRow")