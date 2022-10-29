import * as XLSX from 'xlsx';

export function generateDocument(rows: string[][]): Blob {
    const wb = XLSX.utils.book_new();

    wb.Props = {
        Title: 'nginx logs',
        CreatedDate: new Date(),
    };

    wb.SheetNames.push('logs');
    wb.Sheets['logs'] = XLSX.utils.aoa_to_sheet([rows]);

    return new Blob(
        [XLSX.write(wb, { type: "array", bookType: "xlsx" })],
        {type:"application/octet-stream"},
    );
}
