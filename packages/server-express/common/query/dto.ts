export class PaginationQueryDto {
  constructor(
    readonly page: number,
    readonly per_page: number,
    readonly offset: number
  ) {}
}

export class OrderByQueryDto {
  constructor(
    readonly sort: string,
    readonly direction: "asc" | "desc"
  ) {}
}

export class FilterQueryDto {
  constructor(readonly filters: Record<string, any> = {}) {}
}

export class SelectionQueryDto {
  constructor(readonly fields?: string[]) {}
}

export class ExpansionQueryDto {
  constructor(
    readonly include?: string[] // replace `string` with CollectionName if needed
  ) {}
}

// --- Normalized Query DTO For List End Points ---
export class NormQueryDtoList {
  constructor(
    readonly pagination?: PaginationQueryDto,
    readonly orderBy?: OrderByQueryDto,
    readonly filters?: FilterQueryDto,
    readonly selection?: SelectionQueryDto,
    readonly expansion?: ExpansionQueryDto
  ) {}
}

// --- Normalized Query DTO For Show End Points ---
export class NormQueryDtoShow {
  constructor(
    readonly selection?: SelectionQueryDto,
    readonly expansion?: ExpansionQueryDto
  ) {}
}

// --- Extend Express Request ---
declare global {
  namespace Express {
    interface Request {
      normQuery?: NormQueryDtoShow | NormQueryDtoList;
    }
  }
}
