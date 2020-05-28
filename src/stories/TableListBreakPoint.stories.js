import React from 'react';
import { withA11y } from '@storybook/addon-a11y'

import { TableListBreakPoint } from '../components';

export default {
    title: TableListBreakPoint.displayName,
    component: TableListBreakPoint,
    decorators: [ withA11y ],
};

export const StaticProps = () => (
    <TableListBreakPoint
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
);
StaticProps.displayName = 'Static Props'

export const FunctionalProps = () => (
    <TableListBreakPoint
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
);
FunctionalProps.displayName = 'Functional Props'
