const API_ENDPOINT = 'https://pokeapi.co/api/v2/';

const AI_AGENT_LIST = [
  // TODO: Need to update serverURL and token
  {
    id: '1',
    persona: 'Kurian',
    relation: 'Myself',
    serverUrl: 'wss://demo-app-llkt0pq2.livekit.cloud',
    imageSrc:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJaXRtQzU4elJFQ3o5IiwibmJmIjoxNzI3NDg0MTE0LCJleHAiOjE3Mjc1MDU3MTR9.ll2hN4k926oObH6HvfaUDMaw-A2sZH7M7ys4ec84jzo',
  },
  {
    id: '2',
    persona: 'Hari',
    relation: 'Best friend',
    serverUrl: 'wss://projectxbestfriend-jqitcff8.livekit.cloud',
    imageSrc:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJcFNUYTRZcEprRmRVIiwibmJmIjoxNzI3NDg0MTE0LCJleHAiOjE3Mjc1MDU3MTR9.OrvvYRxn5v8jY3btvO6tRcX0BcyCq3fFLNsr9pbkgDw',
  },
  {
    id: '5',
    persona: 'Game',
    relation: 'bot',
    serverUrl: 'wss://projectx-5jd4vicb.livekit.cloud',
    imageSrc:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJVDRGdFF1QXhkb0tnIiwibmJmIjoxNzI3NDg0MTE0LCJleHAiOjE3Mjc1MDU3MTR9.lu26TFnXm7JfgmjsRhTcGURyrLYnxHA14BorMy8Cyw0',
  },
  {
    id: '6',
    persona: 'Assistant',
    relation: 'bot',
    serverUrl: 'wss://projectx-2ef20wul.livekit.cloud',
    imageSrc:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJNHFDQlh0OEdjV3REIiwibmJmIjoxNzI3NDg0MTE0LCJleHAiOjE3Mjc1MDU3MTR9.SDtOGi9l1UFjzAZ0AoN_dVidmTT_TEYwXUxepM5QsQM',
  },
];

export { AI_AGENT_LIST, API_ENDPOINT };
