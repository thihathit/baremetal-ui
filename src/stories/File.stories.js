import React, { useState, useRef } from 'react';
import { withA11y } from '@storybook/addon-a11y'

import { File } from '../components';

export default {
    title: File.displayName,
    component: File,
    decorators: [ withA11y ],
};

export const Default = () => (
    <File
        onChange={(files) => {
        }}
    />
)
Default.displayName = 'Default Template'


export const Custom = () => (
    <File
        multiple={true}

        onChange={(files) => {
        }}
    >
        {({files, open, input}) => (
            <fieldset>
                <legend>
                    <button onClick={open}>Choose</button>
                </legend>

                {files && Array.from(files).map((file, key) => (
                    <div
                        key={key}
                        style={{
                            backgroundColor: 'red',
                            color: '#fff',
                            padding: 2,
                            margin: 2,
                        }}
                    >
                        {file.name}
                    </div>
                ))}
            </fieldset>
        )}
    </File>
)
Custom.displayName = 'Custom Template'


export const Programmatic = () => {
    const Instance = useRef()
    const [selectedFiles, updateSelectedFiles] = useState(null)

    return (
        <>
            <div style={{ display: 'none' }}>
                <File
                    ref={Instance}
                    onChange={(files) => {
                        updateSelectedFiles(files)
                    }}
                />
            </div>

            <button
                onClick={() => {
                    if(Instance.current) {
                        Instance.current.open()
                    }
                }}
            >
                Choose
            </button>

            <button
                onClick={() => {
                    if(Instance.current) {
                        Instance.current.reset()
                    }
                }}
            >
                Clear
            </button>

            <div className="info">
                {selectedFiles && Array.from(selectedFiles).map((file, key) => (
                    <div key={key}>
                        {file.name}
                    </div>
                ))}
            </div>
        </>
    )
};
Programmatic.displayName = 'Programmatic Control: [EXPERIMENTAL]'