import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  root() {
    return {
      message: 'Hello from NestJS Backend!',
      user: {
        name: 'Ritik',
        role: 'Full Stack Developer',
      },
      stats: {
        uptime: '99.98%',
        requests: 12450,
      },
    };
  }

  @Get('new')
  @Render('new')
  new() {
    return {
      message: 'Hello from NestJS Backend!',
      user: {
        name: 'Ritik',
        role: 'Full Stack Developer',
      },
      stats: {
        uptime: '99.98%',
        requests: 12450,
      },
    };
  }

  @Get('vue-test')
  // @Render('index')
  vueTest() {
    return {
      // _component: 'test',
      message: 'Rendered directly via _component in index.hbs!',
    };
  }
}
