import React, {FormEvent, useCallback, useState} from 'react';

import {NGINX_PARSER_OPTIONS} from "./constants/parserOptions";

import {parseString} from "./utilities/parseString";

import Table from "./components/Table/Table";

import './App.css';

function App() {
    const [rows, setRows] = useState<string[][] | null>(null);

    const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.target as HTMLFormElement);
        const inputData = formData.get('logs') as string;

        setRows(inputData
            ? inputData.split('\n').map(row => parseString(row, NGINX_PARSER_OPTIONS))
            : null
        );
        e.preventDefault();
    }, [setRows]);

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Ubuntu+Mono" />

            <div className="app">
                <h1 className="header">
                    handy logs
                </h1>

                <div className="container">
                    <form
                        className="form"
                        onSubmit={handleFormSubmit}
                    >
                        <textarea
                            className="textarea"
                            name="logs"
                            placeholder="paste logs"
                            rows={8}
                        />

                        <button
                            className="submit"
                            type="submit"
                        >
                            ~ parse
                        </button>
                    </form>

                    <Table rows={rows} />
                </div>
            </div>
        </>
    );
}

export default App;
