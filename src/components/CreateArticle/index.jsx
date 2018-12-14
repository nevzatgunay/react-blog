import React from 'react';
import PropTypes from 'prop-types';
import CreateArticleForm from './CreateArticleForm';

class CreateArticle extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      image: null,
      content: '',
      category: '',
      errors: [],
      categories: [],
      editing: false,
      article: null,
    };
  }

  async componentWillMount() {
    const categories = await this.props.getArticleCategories();

    if (this.props.match.params.slug) {
      const article = this.props.article.find(articleInArray =>
        articleInArray.slug === this.props.match.params.slug);
      this.setState({
        editing: true,
        article,
        categories,
        title: article.title,
        category: article.category_id,
        content: article.content,
      });
    } else {
      this.setState({
        categories,
      });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await this.props.createArticle(this.state, this.props.token);
      this.props.history.push('/');
    } catch (errors) {
      this.setState({
        errors,
      });
    }
  }

  updateArticle = async (event) => {
    event.preventDefault();
    try {
      await this.props.updateArticle({
        title: this.state.title,
        image: this.state.image,
        content: this.state.content,
        category: this.state.category,
      }, this.state.article, this.props.token);

      this.props.history.push('/');
    } catch (errors) {
      this.setState({ errors });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,
    });
  }

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        editing={this.state.editing}
        article={this.state.article}
        title={this.state.title}
        content={this.state.content}
        category={this.state.category}
        updateArticle={this.updateArticle}
      />
    );
  }
}

CreateArticle.propType = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  updateArticle: PropTypes.func.isRequired,
};

export default CreateArticle;
