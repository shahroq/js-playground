export class PaginationDto {
  constructor(
    public page: number,
    public per_page: number,
    public offset: number
  ) {}
}

export class OrderByDto {
  constructor(
    public sort: string,
    public direction: "asc" | "desc"
  ) {}
}

export class FilterDto {
  constructor(public filters: Record<string, any> = {}) {}
}

export class SelectionDto {
  constructor(public fields?: string[]) {}
}

export class ExpansionDto {
  constructor(
    public include?: string[] // replace `string` with CollectionName if needed
  ) {}
}

// --- Normalized Query DTO ---
export class NormQueryDto {
  constructor(
    public pagination?: PaginationDto,
    public orderBy?: OrderByDto,
    public filters?: FilterDto,
    public selection?: SelectionDto,
    public expansion?: ExpansionDto
  ) {}
}

// --- Extend Express Request ---

declare global {
  namespace Express {
    interface Request {
      normQuery?: NormQueryDto;
    }
  }
}
