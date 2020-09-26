import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { Loader } from '../components';

export default {
  title: Loader.displayName,
  component: Loader,
  decorators: [withA11y],
};

export const Inline = () => <Loader active={true} />;
Inline.displayName = 'Inline';

export const CustomLoader = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => setActive((state) => !state)}>Trigger</button>

      <Loader fullPage={true} active={active}>
        Loading...
      </Loader>
    </>
  );
};
CustomLoader.displayName = 'Custom loader';

export const Fullpage = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => setActive((state) => !state)}>Trigger</button>

      <Loader fullPage={true} active={active} />
    </>
  );
};
Fullpage.displayName = 'Fullpage';
