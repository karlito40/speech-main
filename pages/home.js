import React from 'react';
import FacadeLayout from '../components/layouts/FacadeLayout';
import * as scenes from '../components/scenes/home';

export default class extends FacadeLayout {
  renderBody() {
    return (
      <React.Fragment>
        {Object.values(scenes).map((Scene, i) => {
          return (<section className={`scene scene-${(i+1)}`} key={i}>
            <Scene/>
          </section>)
        })}
      </React.Fragment>
    );
  }

}
