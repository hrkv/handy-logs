import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react';

import {NGINX_PARSER_OPTIONS} from "./constants/parserOptions";

import {parseString} from "./utilities/parseString";

import {Table} from "./components/Table/Table";
import {DownloadTable} from "./components/DownloadTable/DownloadTable";

import './App.css';

function App() {
    const [rows, setRows] = useState<string[][] | null>(null);

    const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.addEventListener('load', () => {
            setRows(reader.result
                ? (reader.result as string).split('\n').map(row => parseString(row, NGINX_PARSER_OPTIONS))
                : null
            );
        });

        reader.readAsText(file);
    }, []);

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Ubuntu+Mono" />

            <div className="app">
                <h1 className="header">
                    handy logs
                </h1>

                <div className="toolbar">
                    <label className="inputField">
                        <input
                            className="fileInput"
                            type="file"
                            onChange={handleFileChange}
                        />
                        Выбрать файл
                    </label>

                    <DownloadTable rows={rows} />
                </div>

                <div className="container">
                    <Table rows={rows} />
                </div>
            </div>
        </>
    );
}

export default App;
