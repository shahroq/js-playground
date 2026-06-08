/*
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { QueryDto } from '../query/query.dto';
import { NormQuery } from '../query/types';

// i need policy, and configService
@Injectable()
export class NormalizeQueryPipe implements PipeTransform {
  constructor(private readonly policy) {}
  // private readonly policies: any,
  //private readonly configService: ConfigService

  transform(value: QueryDto, metadata: ArgumentMetadata): NormQuery {
    console.log(value);
    console.log(metadata);
    console.log(this.policy);

    // use query-service to normalize it

    const normQuery = {
      pagination: {
        ...value,
        offset: 1,
      },
    } as NormQuery;

    return normQuery;
  }
}
*/
