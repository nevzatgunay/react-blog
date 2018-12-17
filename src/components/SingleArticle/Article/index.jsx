import React from 'react';
import PropTypes from 'prop-types';
import renderHtml from 'react-render-html';

const SingleArticle = ({ article }) => {
  return (
    <div>
      <header className="header header-inverse h-fullscreen pb-80" style={{ backgroundImage: `url(${article.imageUrl})` }} data-overlay={8}>
        <div className="container text-center">
          <div className="row h-full">
            <div className="col-12 col-lg-8 offset-lg-2 align-self-center">
              <p className="opacity-70">News</p>
              <br />
              <h1 className="display-4 hidden-sm-down">We&apos;ve just passed 1,000 customers!</h1>
              <h1 className="hidden-md-up">We&apos;ve just passed 1,000 customers!</h1>
              <br />
              <br />
              <p>
                <span className="opacity-70 mr-8">By</span>
                <a className="text-white" href="#foo">{article.user.name}</a>
              </p>
              <p>
                <img className="rounded-circle w-40" src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`} alt="..." />
              </p>
            </div>
            <div className="col-12 align-self-end text-center">
              <a className="scroll-down-1 scroll-down-inverse" href="#foo" data-scrollto="section-content">
                <span />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="section" id="section-content">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8 offset-lg-2">
                {
                  renderHtml(article.content)
                }
              </div>
            </div>
          </div>
        </div>
        <div className="section bt-1 bg-grey">
          <div className="container">
            <div className="row text-center">
              <div className="text-center p-5">
                COMMENTS HERE.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

SingleArticle.propTypes = {
  article: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })),
};

SingleArticle.defaultProps = {
  article: [],
};

export default SingleArticle;
