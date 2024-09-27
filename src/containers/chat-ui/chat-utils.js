import { LocalParticipant } from "livekit-client";

function segmentToChatMessage(s, existingMessage, participant) {
  const msg = {
    message: s.final ? s.text : `${s.text} ...`,
    name: participant instanceof LocalParticipant ? 'You' : 'Agent',
    isSelf: participant instanceof LocalParticipant,
    timestamp: existingMessage?.timestamp ?? Date.now(),
  };
  return msg;
}

export {
  segmentToChatMessage
}