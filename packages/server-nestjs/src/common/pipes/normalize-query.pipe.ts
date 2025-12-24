import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NormalizeQueryPipe implements PipeTransform {
  constructor(
    private readonly policies: any,
    //private readonly configService: ConfigService
  ) {
    //
  }
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    console.log(this.policies);

    // use query-service to normalize it

    const transformedValue = 'x';
    console.log(transformedValue);

    return transformedValue;
  }
}
