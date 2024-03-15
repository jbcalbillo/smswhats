// config.js

// URL para enviar mensajes a través de Facebook Graph API
const facebookMessageURL = 'https://graph.facebook.com/v18.0/252165641309335/messages';

// Token Meta para la autorización
const metaToken = 'EAAM7PYBynNwBO9ZCJXQ7TsX5QXkxDF1rdvgKihVkPubPr3ch6W7c98ZBCzETVEX0jrsEh9xkX8QFZCBJXjZAkpZATofELwzaZBFXTRjegyuffPRuiACfsYJGfsapIDXGY3mI5SLWKT5evM9rmxPSq1QaIA862cOEYKm0eIYN1CIFQCZCv2njbxuz4oc7P5jQIPRq0Y4HbHQoBfAYZBxO';

// API Key para la autorización
const apiKey = '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';

// URL para solicitar completions a OpenAI Chat API
const openaiCompletionURL = 'https://api.openai.com/v1/chat/completions';

// TOKEN DE WEBHOOK
const VERIFY_TOKEN = 'simobot901';

// TOKEN DE WHATSAPP PARA WEBHOOK
const WHATSAPP_TOKEN = 'EAAM7PYBynNwBO9ZCJXQ7TsX5QXkxDF1rdvgKihVkPubPr3ch6W7c98ZBCzETVEX0jrsEh9xkX8QFZCBJXjZAkpZATofELwzaZBFXTRjegyuffPRuiACfsYJGfsapIDXGY3mI5SLWKT5evM9rmxPSq1QaIA862cOEYKm0eIYN1CIFQCZCv2njbxuz4oc7P5jQIPRq0Y4HbHQoBfAYZBxO';

// API Key WEBHOOK
const OPENAI_TOKEN = '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';

module.exports = { facebookMessageURL, metaToken, apiKey, openaiCompletionURL, VERIFY_TOKEN, WHATSAPP_TOKEN, OPENAI_TOKEN };

