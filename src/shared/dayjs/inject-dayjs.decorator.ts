import { Inject } from '@nestjs/common';
import { DAY_JS_CLIENT } from './constant';

export const InjestDayJs = () => Inject(DAY_JS_CLIENT);
