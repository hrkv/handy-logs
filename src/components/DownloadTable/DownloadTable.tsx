import React, {useEffect, useState} from 'react';

import {generateDocument} from "./utilities/generateDocument";

import './DownloadTable.css';

interface IDownloadTableProps {
    rows: string[][] | null;
}

export const DownloadTable: React.FC<IDownloadTableProps> = ({rows}) => {
    const [link, setLink] = useState<string>();

    useEffect(() => {
        if (!rows) {
            return;
        }

        setLink(URL.createObjectURL(generateDocument(rows)));
    }, [rows]);

    return (
        <a className="DownloadTable" download="handy-logs.xslx" href={link || ""}>
            Скачать <span className="DownloadTable__format">XLSX</span> таблицу
        </a>
    );
}
