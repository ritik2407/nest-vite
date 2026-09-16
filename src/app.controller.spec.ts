import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return backend data and props', () => {
      expect(appController.root()).toEqual({
        message: 'Hello from NestJS Backend!',
        user: {
          name: 'Ritik',
          role: 'Full Stack Developer',
        },
        stats: {
          uptime: '99.98%',
          requests: 12450,
        },
      });
    });
  });
});
