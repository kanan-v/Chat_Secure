// Detailed security and privacy information
export const securityKnowledge = {
  encryption: {
    algorithm: "AES-256",
    keyGeneration: "Unique key pairs are generated for each user session",
    messageEncryption: "Messages are encrypted client-side before transmission",
    keyStorage: "Private keys never leave your device",
    process: [
      "Message is encrypted with recipient's public key",
      "Encrypted message is stored in database",
      "Only recipient's private key can decrypt the message",
      "Decryption happens locally on recipient's device"
    ]
  },
  privacy: {
    dataCollection: "We only collect essential data for message delivery",
    messageStorage: {
      duration: "Messages are stored encrypted",
      deletion: "Messages can be permanently deleted by sender",
      backup: "No plain-text backups are ever created"
    },
    userPrivacy: {
      metadata: "Minimal metadata is stored",
      tracking: "No third-party tracking or analytics",
      advertising: "No advertising or data sharing with third parties"
    }
  },
  compliance: {
    standards: [
      "End-to-end encryption",
      "Zero-knowledge architecture",
      "Perfect forward secrecy"
    ],
    bestPractices: [
      "Regular security audits",
      "Penetration testing",
      "Bug bounty program"
    ]
  }
};