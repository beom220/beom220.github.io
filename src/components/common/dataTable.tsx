import {Table} from "semantic-ui-react";

interface DataTableProps {
    data: any[];
    columns: string[];
    dataRow: string[];
}


export default function DataTable({columns, dataRow, data}: DataTableProps) {
    return (
        <>
            <Table compact celled padded size='large'>
                <Table.Header>
                    <Table.Row>
                        {columns.map((v, i) =>
                            <Table.HeaderCell key={i}>{v}</Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map((v: any, i) =>
                        <Table.Row key={i}>
                            {dataRow.map((row, index) =>
                                <Table.Cell key={index}>{String(v[row])}</Table.Cell>
                            )}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </>
    )
}