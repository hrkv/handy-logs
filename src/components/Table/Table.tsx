import React from 'react';

import './Table.css';

interface ITableProps {
    rows: string[][] | null;
}

const Table: React.FC<ITableProps> = props => {
    const {rows} = props;

    if (!rows) {
        return null;
    }

    return (
        <div className="wrapper">
            <table className="table">
                <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {row.map((column, j) => (
                            <td className="cell" key={j}>
                                {column}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
