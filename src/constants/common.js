const API_ENDPOINT = 'https://pokeapi.co/api/v2/';

const AI_AGENT_LIST = [
  // TODO: Need to update serverURL and token
  {
    id: "1",
    persona: "Me",
    relation: "Myself",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJTGFEWEZaNmpjZmdkIiwibmJmIjoxNzI3NDgwNDY4LCJleHAiOjE3Mjc1MDIwNjh9.LI3JghXizoZX9u93A4dfHXKzuM8ZsBsBYgCbHb5mavs",
  },
  {
    id: "2",
    persona: "Doctor",
    relation: "Family friend",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJTGFEWEZaNmpjZmdkIiwibmJmIjoxNzI3NDc2NTkwLCJleHAiOjE3Mjc0OTgxOTB9.tifvrsIbxc8UgQ3ORlcp02rO-hkCriyV-nK6jRfy_es",
  },
  {
    id: "3",
    persona: "Buddy",
    relation: "Childhood friend",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJTGFEWEZaNmpjZmdkIiwibmJmIjoxNzI3NDc2NTkwLCJleHAiOjE3Mjc0OTgxOTB9.tifvrsIbxc8UgQ3ORlcp02rO-hkCriyV-nK6jRfy_es",
  },
  {
    id: "4",
    persona: "Michael",
    relation: "Father",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJTGFEWEZaNmpjZmdkIiwibmJmIjoxNzI3NDc2NTkwLCJleHAiOjE3Mjc0OTgxOTB9.tifvrsIbxc8UgQ3ORlcp02rO-hkCriyV-nK6jRfy_es",
  },
  {
    id: "5",
    persona: "Game",
    relation: "bot",
    serverUrl : 'wss://projectx-5jd4vicb.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJVDRGdFF1QXhkb0tnIiwibmJmIjoxNzI3NDc4MTY3LCJleHAiOjE3Mjc0OTk3Njd9.gnyLK61357_MwhEtcbDVST_O5Wn542RylTxw-vq8r4A",
  },
  {
    id: "6",
    persona: "Assistant",
    relation: "bot",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoiYXNqLXJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5QdWJsaXNoU291cmNlcyI6W10sImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwiaW5ncmVzc0FkbWluIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwicmVjb3JkZXIiOmZhbHNlLCJhZ2VudCI6ZmFsc2V9LCJzaXAiOnsiYWRtaW4iOmZhbHNlLCJjYWxsIjpmYWxzZX0sImF0dHJpYnV0ZXMiOnt9LCJtZXRhZGF0YSI6IiIsInNoYTI1NiI6IiIsInN1YiI6ImlkZW50aXR5IiwiaXNzIjoiQVBJTGFEWEZaNmpjZmdkIiwibmJmIjoxNzI3NDc2NTkwLCJleHAiOjE3Mjc0OTgxOTB9.tifvrsIbxc8UgQ3ORlcp02rO-hkCriyV-nK6jRfy_es",
  }
]

export {
  AI_AGENT_LIST,
  API_ENDPOINT
}
