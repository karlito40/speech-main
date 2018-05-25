import React from 'react';
import FacadeLayout from '../components/layouts/FacadeLayout';
import PresentationalScene from '../components/scenes/home/PresentationalScene';
import ProfileScene from '../components/scenes/home/ProfileScene';
import DiscoverScene from '../components/scenes/home/DiscoverScene';
import css from '../styles/pages/home';

export default class extends FacadeLayout {
  renderBody() {
    return (
      <React.Fragment>
        <section className="scene scene-1">
          <PresentationalScene />
        </section>
        <section className="scene scene-2">
          <ProfileScene />
        </section>
        <section className="scene scene-3">
          <DiscoverScene />
        </section>
        <section className="scene scene-4">
          <i className="ico fi flaticon-heart-shape"></i>
          <h2>100% gratuit</h2>
        </section>

        <style jsx global>{css}</style>
      </React.Fragment>
    );
  }

}
