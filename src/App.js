import React from 'react';
import { GeneralLayout } from 'layout';

import { FaceMask } from 'components'

const App = () => {
  // const [renderedComponentIndex, setRenderedComponentIndex] = React.useState(0);
  const views = [
    {
      iconName: 'MF',
      onIconClick: () => {
        window.location.href = 'https://ai-on-browser.netlify.app?i=0'
      },
      component: () => <div>redirect to body pix</div>
    },
    {
      iconName: 'RE',
      onIconClick: () => {
        window.location.href = 'https://ai-on-browser.netlify.app?i=1'
      },
      component: () => <div>redirect to emotion recognition</div>
    },
    {
      iconName:'FM',
      onIconClick: () => {},
      // component: () => <FaceMask />,
      component: () => <div>adasdas</div>
    }
  ]

  // const switchBetweenViews = () => {
  //   const Component = views[renderedComponentIndex].component;

  //   return <Component />;
  // };

  return <GeneralLayout views={views}><FaceMask /></GeneralLayout>;
};

export default App;
