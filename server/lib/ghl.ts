/**
 * GoHighLevel (GHL) webhook helper.
 * Sends lead/contact data to GHL via webhook URL configured in env.
 */
export async function sendToGHL(data: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('[GHL] No GHL_WEBHOOK_URL configured, skipping webhook');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`[GHL] Webhook failed with status ${response.status}`);
    } else {
      console.log('[GHL] Webhook sent successfully');
    }
  } catch (error) {
    console.error('[GHL] Webhook error:', error);
  }
}
