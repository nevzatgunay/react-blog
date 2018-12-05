import React from 'react';
import { Link } from 'react-router-dom';

import Article from '../Article';
import Banner from '../Banner';

const Welcome = () => {
  return (
    <div>
      <Banner
        backgroundImage="url(assets/img/bg-gift.jpg)"
        title="Latest Blog Posts"
        subTitle="Read and get updated on how we progress."
      />
      <main className="main-content bg-gray">
        <div className="row">
          <div className="col-12 col-lg-6 offset-lg-3">
            <Article />
            <hr />
            <Article />
            <nav className="flexbox mt-50 mb-50">
              <Link className="btn btn-white disabled" to="#foo">
                <i className="ti-arrow-left fs-9 mr-4" />
                Newer
              </Link>
              <Link className="btn btn-white" to="#foo">
                Older
                <i className="ti-arrow-right fs-9 ml-4" />
              </Link>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
