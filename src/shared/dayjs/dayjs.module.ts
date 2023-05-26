import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DAY_JS_CLIENT } from './constant';
import { dayjs } from './dayjs.export';

@Module({})
export class DayjsModule {
  static forRoot(): DynamicModule {
    const dayJsProvider: Provider = {
      provide: DAY_JS_CLIENT,
      useValue: dayjs,
    };

    return {
      module: DayjsModule,
      providers: [dayJsProvider],
      exports: [dayJsProvider],
      global: true,
    };
  }
}
