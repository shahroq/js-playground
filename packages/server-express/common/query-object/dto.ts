export class PaginationDto {
  constructor(
    readonly page: number,
    readonly per_page: number,
    readonly offset: number
  ) {}
}

export class OrderByDto {
  constructor(
    readonly sort: string,
    readonly direction: "asc" | "desc"
  ) {}
}

export class FilterDto {
  constructor(readonly filters: Record<string, any> = {}) {}
}

export class SelectionDto {
  constructor(readonly fields?: string[]) {}
}

export class ExpansionDto {
  constructor(
    readonly include?: string[] // replace `string` with CollectionName if needed
  ) {}
}

// --- Normalized Query DTO For List End Points ---
export class NormQueryDtoList {
  constructor(
    readonly pagination?: PaginationDto,
    readonly orderBy?: OrderByDto,
    readonly filters?: FilterDto,
    readonly selection?: SelectionDto,
    readonly expansion?: ExpansionDto
  ) {}
}

// --- Normalized Query DTO For Show End Points ---
export class NormQueryDtoShow {
  constructor(
    readonly selection?: SelectionDto,
    readonly expansion?: ExpansionDto
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
