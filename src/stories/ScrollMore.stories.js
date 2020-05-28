import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y'

import { ScrollMore } from '../components';

export default {
    title: ScrollMore.displayName,
    component: ScrollMore,
    decorators: [ withA11y ],
};

export const Default = () => {
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
            <ScrollMore
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
            </ScrollMore>
        </div>
    )
};