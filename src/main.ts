import { Express, Request, Response } from 'express';
import { createNestApp } from './bootstrap';

let cachedServer: Express | undefined;

async function getServer(): Promise<Express> {
  if (cachedServer) return cachedServer;

  const { app } = await createNestApp({ enableShutdownHooks: false });
  await app.init();
  cachedServer = app.getHttpAdapter().getInstance() as Express;

  return cachedServer;
}

async function bootstrap() {
  const { app, configService } = await createNestApp();
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}

export default async function handler(request: Request, response: Response) {
  const server = await getServer();

  return server(request, response);
}

if (!process.env.VERCEL) {
  void bootstrap();
}
