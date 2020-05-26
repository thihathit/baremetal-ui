import React, { useState, useRef, useEffect } from 'react';
import { withA11y } from '@storybook/addon-a11y'

import * as Components from '../components';

export default {
    title: 'Components',
    component: Components,
    decorators: [ withA11y ],
};

export const TableListBreakPoint = () => (
    <>
        <h2>Static Props</h2>
        <Components.TableListBreakPoint
            viewSwitchAt={500}

            caption="Leaderboard"

            thead={{
                rank: 'Rank',
                name: "Name",
            }}

            data={[
                {
                    rank: 1,
                    name: 'John',
                },
                {
                    rank: 2,
                    name: 'Van',
                },
                {
                    rank: 3,
                    name: 'Fein',
                },
            ]}
        />

        <hr/>

        <h2>Functional Props</h2>
        <Components.TableListBreakPoint
            viewSwitchAt={500}

            caption={(listView) => <span>Leaderboard</span>}

            thead={(listView) => ({
                rank: 'Rank',
                name: "Name",
            })}

            data={(listView) => [
                {
                    rank: () => 1,
                    name: () => <span>John</span>
                },
                {
                    rank: () => 2,
                    name: () => <span>Van</span>
                },
                {
                    rank: () => 3,
                    name: () => <span>Fein</span>
                },
            ]}
        />
    </>
);

export const LoadMore = () => {
    const [Contents, updateContents] = useState([
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
        'Item',
    ])

    const loadMore = () => {
        updateContents((state) => [
            ...state,
            'Item'
        ])
    }

    return (
        <div
            className="scrollable-wrapper"
            tabindex="0"
            style={{
                maxWidth: 1000,
                margin: '0 auto',
                // padding: 15,
                maxHeight: 400,
                backgroundColor: '#000',

                // required for component to attach 'scroll' event
                overflowY: 'auto'
            }}
        >
            <Components.LoadMore
                distance={30}
                onLoad={loadMore}
            >
                <div
                    style={{
                        borderBottom: '30px solid yellow',
                        maxWidth: '80%',
                        margin: '0 auto',
                    }}
                >
                        {Contents.map((content, index) =>
                            <div
                                style={{
                                    margin: '3px 0',
                                    color: '#fff',
                                    backgroundColor: 'rgba(252,70,70,0.7)',
                                }}
                                key={index}
                            >
                                {content} {index + 1}
                            </div>
                        )}
                </div>
            </Components.LoadMore>
        </div>
    )
};

export const File = () => {
    const Instance = useRef()
    const [selectedFiles, updateSelectedFiles] = useState(null)

    return (
        <>
            <section>
                <h2>Default Template</h2>

                <Components.File
                    onChange={(files) => {
                    }}
                />
            </section>

            <hr/>

            <section>
                <h2>Custom Template</h2>

                <Components.File
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
                </Components.File>
            </section>

            <hr/>

            <section>
                <h2>Programmatic Control: [EXPERIMENTAL]</h2>

                <div style={{ display: 'none' }}>
                    <Components.File
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
            </section>
        </>
    )
};