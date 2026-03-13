const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby4otrAbsFpiaslkhKbH4AaKDexT66LPwujp-AZJ8-N6MYsm1acgEoFX60Dg5AR5ZSAfA/exec';

async function lookupPollingStation(postcode: string): Promise<string> {
  try {
    const clean = postcode.replace(/\s/g, '').toUpperCase();
    const res = await fetch(
      `https://developers.democracyclub.org.uk/api/v1/postcode/${clean}/`
    );
    if (!res.ok) return '';
    const json = await res.json();
    const address =
      json?.polling_station?.station?.properties?.address || '';
    return address
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  } catch {
    return '';
  }
}

export async function submitRegistration({
  name,
  phone,
  postcode,
  messageType = 'sms',
}: {
  name: string;
  phone: string;
  postcode: string;
  messageType?: string;
}): Promise<{ success: boolean; error?: string }> {
  const addressSlug = await lookupPollingStation(postcode);
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        postcode: postcode.toUpperCase(),
        addressSlug,
        messageType,
      }),
    });
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
