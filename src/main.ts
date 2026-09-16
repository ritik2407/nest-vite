import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { ViteViewInterceptor } from './vite/vite-view.interceptor';
import { viteMiddleware } from './vite/vite.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(viteMiddleware);

  app.useGlobalInterceptors(new ViteViewInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'index' });

  hbs.registerHelper('vite', function (entry: string, options: any) {
    return new hbs.SafeString(options.data.root.vite(entry));
  });

  hbs.registerHelper('json', function (context: any) {
    if (!context || typeof context !== 'object') {
      return new hbs.SafeString('{}');
    }
    const { settings, _locals, cache, body, layout, ...cleanData } = context;
    return new hbs.SafeString(JSON.stringify(cleanData));
  });

  await app.listen(3000);
}
bootstrap();
