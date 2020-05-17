import React from 'react';
import * as Components from '../components';

export default {
    title: 'Components',
    component: Components,
};

export const TableListBreakPoint = () => (
    <Components.TableListBreakPoint
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
