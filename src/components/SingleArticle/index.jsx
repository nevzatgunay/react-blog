import React from 'react';
import Axios from 'axios';
import Article from './Article';
import config from '../../config';


class SingleArticleContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      article: null,
      loading: true,
    };
  }

  async componentWillMount() {
    let article = this.props.articles.find(
      article => article.slug === this.props.match.params.slug
    );

    if (article) {
      this.setState({
        article,
        loading: false,
      });
    } else {
      article = await this.props.getArticle(this.props.match.params.slug);

      this.setState({
        article,
        loading: false,
      });
    }
  }

  async getArticle(slug) {
    const response = await Axios.get(`${config.apiUrl}/article/${slug}`);
    return response.data.data;
  }

  render() {
    return (
      <div>
        {
          !this.state.loading && (
            <Article
              article={this.state.article}
            />
          )
        }
        {
          this.state.loading && (
            <p className="text-center">LOADING...</p>
          )
        }
      </div>
    );
  }
}

export default SingleArticleContainer;
