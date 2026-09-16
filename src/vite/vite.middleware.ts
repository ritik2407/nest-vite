import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

let manifest: any = null;
export const viteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isProd = process.env.NODE_ENV === 'production';

  // Attaching our template string helper directly to res.locals
  res.locals.vite = (entry: string) => {
    if (!isProd) {
      // Development Layout: Points to live running Vite server
      return `
          <script type="module" src="http://localhost:5173/@vite/client"></script>
          <script type="module" src="http://localhost:5173/${entry}"></script>
        `;
    } else {
      // Production Layout: Fetches mapped chunked assets
      if (!manifest) {
        const manifestPath = path.resolve(
          __dirname,
          '..',
          'public',
          '.vite',
          'manifest.json',
        );
        if (fs.existsSync(manifestPath)) {
          manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        }
      }

      const asset = manifest?.[entry];
      if (!asset) return '';

      let tags = `<script type="module" src="/${asset.file}"></script>`;
      if (asset.css) {
        asset.css.forEach((cssFile: string) => {
          tags += `<link rel="stylesheet" href="/${cssFile}">`;
        });
      }
      return tags;
    }
  };

  next();
};
