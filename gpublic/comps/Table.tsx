import type { ReactNode } from "react";

export type TableData<TRecord> = {
  title?: string;
  records: TRecord[];
  columns: {
    key: string;
    renderTh: () => ReactNode;
    renderTd: (record: TRecord) => ReactNode;
  }[];
};

type Props<TRecord> = {
  className?: string;
  data: TableData<TRecord>;
};

export function Table<TRecord>({ data, className }: Props<TRecord>) {
  if (!data) return <p>No data rovided</p>;

  const { title, columns, records } = data;

  const renderedHeader = columns.map((column, i) => (
    <th key={`${column.key}`}>{column.renderTh()}</th>
  ));

  const renderedRows = records.map((record, i) => {
    const renderedCells = columns.map((column, j) => (
      <td key={j}>{column.renderTd ? column.renderTd(record) : "-"}</td>
    ));
    return <tr key={i}>{renderedCells}</tr>;
  });

  return (
    <div className="overflow-x-auto">
      <table className={`table table-hover caption-bottom ${className}`}>
        {title && <caption>{title}</caption>}
        <thead>
          <tr>{renderedHeader}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
}
