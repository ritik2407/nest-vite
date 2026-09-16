import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { RENDER_METADATA } from '@nestjs/common/constants';

@Injectable()
export class ViteViewInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    // Check if the handler already has @Render('...') decorator
    const handler = context.getHandler();
    const hasRenderDecorator = !!Reflect.getMetadata(RENDER_METADATA, handler);

    return next.handle().pipe(
      switchMap((data) => {
        // If handler already uses @Render or response is already sent, pass through
        if (hasRenderDecorator || res.headersSent) {
          return of(data);
        }

        // Only handle object/data returns
        if (typeof data !== 'object' || data === null) {
          return of(data);
        }

        // Only auto-render index.hbs if _component is explicitly returned
        const hasComponent = '_component' in data && !!data._component;

        // Check if request is asking for HTML (browser document request)
        const acceptsHtml = req.accepts('html');
        const isExplicitJson =
          req.headers.accept?.startsWith('application/json') ||
          req.xhr ||
          req.headers['x-requested-with'] === 'XMLHttpRequest';

        if (hasComponent && acceptsHtml && !isExplicitJson) {
          return from(
            new Promise((resolve, reject) => {
              res.render('index', data, (err, html) => {
                if (err) {
                  return reject(err);
                }
                res.type('html').send(html);
                resolve(undefined);
              });
            }),
          );
        }

        // Return standard JSON if no @Render and no _component
        return of(data);
      }),
    );
  }
}
