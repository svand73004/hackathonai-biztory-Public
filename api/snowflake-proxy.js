export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { messages, stream, model } = req.body;

      const snowflakePat = process.env.SNOWFLAKE_PAT;

      if (!snowflakePat) {
        return res.status(500).json({ error: 'Snowflake Programmatic Access Token not configured.' });
      }

      const snowflakeApiUrl = "https://FMNIQAI-BIZTORY_PARTNER.snowflakecomputing.com/api/v2/databases/SBX_ROBERTPRETORIUS/schemas/HACKATHON/agents/KNOWELDGEMASTER:run";

      const response = await fetch(snowflakeApiUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${snowflakePat}`,
          "X-Snowflake-Authorization-Token-Type": "PROGRAMMATIC_ACCESS_TOKEN",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
          stream: stream,
          model: model || "openai-gpt-5",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Snowflake API error:", errorText);
        return res.status(response.status).json({ error: `Snowflake API error: ${errorText}` });
      }

      const data = await response.json();
      return res.status(200).json(data);

    } catch (error) {
      console.error('Proxy error:', error);
      return res.status(500).json({ error: 'Internal server error during proxy request.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
