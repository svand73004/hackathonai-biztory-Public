import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'snowflake-proxy-plugin',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/snowflake-proxy' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });

              req.on('end', async () => {
                try {
                  const { messages, stream, model } = JSON.parse(body);
                  const snowflakePat = env.SNOWFLAKE_PAT;

                  if (!snowflakePat) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Snowflake Programmatic Access Token not configured in .env' }));
                    return;
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

                  const data = await response.json();
                  res.statusCode = response.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                } catch (error) {
                  console.error('Local Proxy Error:', error);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Internal server error during local proxy request.' }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
  };
});
