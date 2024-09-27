const API_ENDPOINT = 'https://pokeapi.co/api/v2/';

const AI_AGENT_LIST = [
  // TODO: Need to update serverURL and token
  {
    id: "1",
    persona: "Me",
    relation: "Myself",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoicHJvZC1yb29tIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuUHVibGlzaFNvdXJjZXMiOltdLCJjYW5VcGRhdGVPd25NZXRhZGF0YSI6ZmFsc2UsImluZ3Jlc3NBZG1pbiI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsInJlY29yZGVyIjpmYWxzZSwiYWdlbnQiOmZhbHNlfSwic2lwIjp7ImFkbWluIjpmYWxzZSwiY2FsbCI6ZmFsc2V9LCJhdHRyaWJ1dGVzIjp7fSwibWV0YWRhdGEiOiIiLCJzaGEyNTYiOiIiLCJzdWIiOiJpZGVudGl0eSIsImlzcyI6IkFQSUxhRFhGWjZqY2ZnZCIsIm5iZiI6MTcyNzQ1NzM2NCwiZXhwIjoxNzI3NDc4OTY0fQ.u6PbicKL8582UTnWVtm7u6zRMlUr-SkLg55ZiXk-wKk",
  },
  {
    id: "2",
    persona: "Doctor",
    relation: "Family friend",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoicHJvZC1yb29tIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuUHVibGlzaFNvdXJjZXMiOltdLCJjYW5VcGRhdGVPd25NZXRhZGF0YSI6ZmFsc2UsImluZ3Jlc3NBZG1pbiI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsInJlY29yZGVyIjpmYWxzZSwiYWdlbnQiOmZhbHNlfSwic2lwIjp7ImFkbWluIjpmYWxzZSwiY2FsbCI6ZmFsc2V9LCJhdHRyaWJ1dGVzIjp7fSwibWV0YWRhdGEiOiIiLCJzaGEyNTYiOiIiLCJzdWIiOiJpZGVudGl0eSIsImlzcyI6IkFQSUxhRFhGWjZqY2ZnZCIsIm5iZiI6MTcyNzQ1NzM2NCwiZXhwIjoxNzI3NDc4OTY0fQ.u6PbicKL8582UTnWVtm7u6zRMlUr-SkLg55ZiXk-wKk",
  },
  {
    id: "3",
    persona: "Buddy",
    relation: "Childhood friend",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoicHJvZC1yb29tIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuUHVibGlzaFNvdXJjZXMiOltdLCJjYW5VcGRhdGVPd25NZXRhZGF0YSI6ZmFsc2UsImluZ3Jlc3NBZG1pbiI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsInJlY29yZGVyIjpmYWxzZSwiYWdlbnQiOmZhbHNlfSwic2lwIjp7ImFkbWluIjpmYWxzZSwiY2FsbCI6ZmFsc2V9LCJhdHRyaWJ1dGVzIjp7fSwibWV0YWRhdGEiOiIiLCJzaGEyNTYiOiIiLCJzdWIiOiJpZGVudGl0eSIsImlzcyI6IkFQSUxhRFhGWjZqY2ZnZCIsIm5iZiI6MTcyNzQ1NzM2NCwiZXhwIjoxNzI3NDc4OTY0fQ.u6PbicKL8582UTnWVtm7u6zRMlUr-SkLg55ZiXk-wKk",
  },
  {
    id: "4",
    persona: "Michael",
    relation: "Father",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoicHJvZC1yb29tIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuUHVibGlzaFNvdXJjZXMiOltdLCJjYW5VcGRhdGVPd25NZXRhZGF0YSI6ZmFsc2UsImluZ3Jlc3NBZG1pbiI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsInJlY29yZGVyIjpmYWxzZSwiYWdlbnQiOmZhbHNlfSwic2lwIjp7ImFkbWluIjpmYWxzZSwiY2FsbCI6ZmFsc2V9LCJhdHRyaWJ1dGVzIjp7fSwibWV0YWRhdGEiOiIiLCJzaGEyNTYiOiIiLCJzdWIiOiJpZGVudGl0eSIsImlzcyI6IkFQSUxhRFhGWjZqY2ZnZCIsIm5iZiI6MTcyNzQ1NzM2NCwiZXhwIjoxNzI3NDc4OTY0fQ.u6PbicKL8582UTnWVtm7u6zRMlUr-SkLg55ZiXk-wKk",
  },
  {
    id: "5",
    persona: "Game",
    relation: "bot",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoicHJvZC1yb29tIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuUHVibGlzaFNvdXJjZXMiOltdLCJjYW5VcGRhdGVPd25NZXRhZGF0YSI6ZmFsc2UsImluZ3Jlc3NBZG1pbiI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsInJlY29yZGVyIjpmYWxzZSwiYWdlbnQiOmZhbHNlfSwic2lwIjp7ImFkbWluIjpmYWxzZSwiY2FsbCI6ZmFsc2V9LCJhdHRyaWJ1dGVzIjp7fSwibWV0YWRhdGEiOiIiLCJzaGEyNTYiOiIiLCJzdWIiOiJpZGVudGl0eSIsImlzcyI6IkFQSUxhRFhGWjZqY2ZnZCIsIm5iZiI6MTcyNzQ1NzM2NCwiZXhwIjoxNzI3NDc4OTY0fQ.u6PbicKL8582UTnWVtm7u6zRMlUr-SkLg55ZiXk-wKk",
  },
  {
    id: "6",
    persona: "Assistant",
    relation: "bot",
    serverUrl : 'wss://prod-k9bgadix.livekit.cloud',
    imageSrc: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoicHJvZC1yb29tIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuUHVibGlzaFNvdXJjZXMiOltdLCJjYW5VcGRhdGVPd25NZXRhZGF0YSI6ZmFsc2UsImluZ3Jlc3NBZG1pbiI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsInJlY29yZGVyIjpmYWxzZSwiYWdlbnQiOmZhbHNlfSwic2lwIjp7ImFkbWluIjpmYWxzZSwiY2FsbCI6ZmFsc2V9LCJhdHRyaWJ1dGVzIjp7fSwibWV0YWRhdGEiOiIiLCJzaGEyNTYiOiIiLCJzdWIiOiJpZGVudGl0eSIsImlzcyI6IkFQSUxhRFhGWjZqY2ZnZCIsIm5iZiI6MTcyNzQ1NzM2NCwiZXhwIjoxNzI3NDc4OTY0fQ.u6PbicKL8582UTnWVtm7u6zRMlUr-SkLg55ZiXk-wKk",
  }
]

export {
  AI_AGENT_LIST,
  API_ENDPOINT
}
