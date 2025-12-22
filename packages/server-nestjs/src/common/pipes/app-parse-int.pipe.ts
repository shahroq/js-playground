import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AppParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const transformedValue = parseInt(value, 10);
    if (isNaN(transformedValue))
      throw new BadRequestException(
        `Validation failed. ${value} is not an integer.`,
      );

    return transformedValue;
  }
}
