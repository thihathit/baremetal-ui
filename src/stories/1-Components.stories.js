import React from 'react';
import { withA11y } from '@storybook/addon-a11y'

import * as Components from '../components';

export default {
    title: 'Components',
    component: Components,
    decorators: [ withA11y ],
};

export const TableListBreakPoint = () => (
    <Components.TableListBreakPoint
        viewSwitchAt={500}

        caption={() => (
            <span>Leaderboard</span>
        )}
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
                name: () => (
                    <span>Fein</span>
                ),
            },
        ]}
    />
);
