import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TableVirtuoso,
  TableComponents,
  TableVirtuosoProps,
} from 'react-virtuoso';

type Column<T> = {
  dataKey: keyof T;
  label: string;
  width?: number;
  numeric?: boolean;
};

type VirtualizedTableProps<T> = {
  columns: Column<T>[];
  onRowClick(item: T): void;
};

interface CustomTableRowProps extends React.ComponentProps<typeof TableRow> {
  onRowClick?: () => void;
}
const CustomTableRow: React.FC<CustomTableRowProps> = ({
  onRowClick,
  ...props
}) => {
  return <TableRow hover {...props} onClick={onRowClick} />;
};

function VirtuosoTableComponents<T>({
  onRowClick,
}: {
  onRowClick: (item: T) => void;
}): TableComponents<T> {
  return {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
      />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
    TableRow: (props) => (
      <CustomTableRow
        {...props}
        onRowClick={() => {
          onRowClick(props.item);
        }}
      />
    ),
  };
}

function FixedHeaderContent<T>({ columns }: { columns: Column<T>[] }) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={String(column.dataKey)}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function RowContent<T>({ row, columns }: { row: T; columns: Column<T>[] }) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={String(column.dataKey)}
          align={column.numeric ? 'right' : 'left'}
        >
          {row[column.dataKey] as React.ReactNode}
        </TableCell>
      ))}
    </>
  );
}

export const VirtualizedTable = <T,>({
  columns,
  data,
  onRowClick,
  ...props
}: TableVirtuosoProps<T, unknown> & VirtualizedTableProps<T>) => {
  return (
    <TableVirtuoso
      data={data}
      components={VirtuosoTableComponents<T>({
        onRowClick,
      })}
      fixedHeaderContent={() => <FixedHeaderContent columns={columns} />}
      itemContent={(_index, row) => <RowContent row={row} columns={columns} />}
      {...props}
    />
  );
};
