import React, { useState } from 'react';
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
            style={{
                maxWidth: 1000,
                margin: '0 auto',
                // padding: 15,
                maxHeight: 400,
                backgroundColor: '#000',

                // required for component to attach 'scroll' event
                overflowY: 'auto'
            }}
            className="scrollable-wrapper"
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