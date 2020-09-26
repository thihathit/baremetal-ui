import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { NestedSelect } from '../components';

export default {
  title: NestedSelect.displayName,
  component: NestedSelect,
  decorators: [withA11y],
};

export const Default = () => (
  <>
    <NestedSelect
      defaultValue={{
        data: {
          label: 'N2 Ch1',
        },
        id: 'id-xxxx',
      }}
      options={[
        {
          data: {
            label: 'Item 1',
          },
          options: [
            {
              data: {
                label: 'N1 Ch1',
              },
            },
            {
              data: {
                label: 'N1 Ch2',
              },
              options: [
                {
                  data: {
                    label: 'N2 Ch1',
                  },
                  isDisabled: true,
                  id: 'id-xxxx',
                },
              ],
            },
          ],
        },
        {
          data: {
            label: 'Item 2',
          },
        },
      ]}
    />

    <style>{`
            .control {
                border: 1px solid #000;
                cursor: pointer;
            }
            .nested-select .children {
                padding-left: 10px;
            }
            .nested-select .label {
                cursor: pointer;
            }
            .nested-select .label:hover {
                background-color: #eee;
            }
            .nested-select .label .text {
                padding: 5px;
            }
            .nested-select .label.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        `}</style>
  </>
);
Default.displayName = 'Default';
