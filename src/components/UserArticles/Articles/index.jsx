import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../Banner';
import Article from '../../Article';


const Articles = ({ articles, handlePagination, nextUrl, prevUrl, deleteArticle, editArticle }) => {
  return (
    <div>
      <Banner
        backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-gift.jpg)`}
        title="My Articles"
        subTitle="Here are the articles by you."
      />
      <main className="main-content bg-gray">
        <div className="row">
          <div className="col-12 col-lg-6 offset-lg-3">
            {
              articles && articles.map(article => (
                <div key={article.id}>
                  <Article article={article} />
                  <div className="text-center">
                    <button onClick={() => editArticle(article)} type="button" className="btn btn-info mr-5">Edit Article</button>
                    <button onClick={() => deleteArticle(article.id)} type="button" className="btn btn-danger">Delete Article</button>
                  </div>
                  <hr />
                </div>
              ))
            }
            <nav className="flexbox mt-50 mb-50">
              <a className={`btn btn-white${prevUrl ? '' : 'disable'}`} href="#" onClick={() => handlePagination(prevUrl)}>
                <i className="ti-arrow-left fs-9 ml-4" />
                Previous
              </a>
              <a className={`btn btn-white${nextUrl ? '' : 'disable'}`} href="#" onClick={() => handlePagination(nextUrl)}>
                Next
                <i className="ti-arrow-right fs-9 mr-4" />
              </a>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  handlePagination: PropTypes.func.isRequired,
  nextUrl: PropTypes.string,
  prevUrl: PropTypes.string,
  deleteArticle: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  articles: [],
  nextUrl: null,
  prevUrl: null,
};

export default Articles;
