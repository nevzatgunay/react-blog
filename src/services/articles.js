import Axios from 'axios';
import { validateAll } from 'indicative';
import config from '../config';

export default class ArticlesService {
  async getArticles() {
    const response = await Axios.get(`${config.apiUrl}/articles`);

    return response.data;
  }

  async getArticleCategories() {
    const response = await Axios.get(`${config.apiUrl}/categories`);

    return response.data.categories;
  }

  createArticle = async (data, token) => {
    if (!data.image) {
      return Promise.reject([{
        message: 'The image is required.',
      }]);
    }

    try {
      const rules = {
        title: 'required',
        image: 'required',
        content: 'required',
        category: 'required',
      };

      const messages = {
        required: 'The {{ field }} is required',
      };

      await validateAll(data, rules, messages);

      const image = await this.uploadToCloudinary(data.image);
      const response = await Axios.post(`${config.apiUrl}/articles`, {
        title: data.title,
        content: data.content,
        category_id: data.category,
        imageUrl: image.secure_url,
      }, {
        header: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      return response.data;
    } catch (errors) {
      if (errors.response) {
        return errors.response.data;
      }
    }
  }

  async uploadToCloudinary(image) {
    const form = new FormData();
    form.append('file', image);
    form.append('upload_preset', 'p2pean27');

    const response = await Axios.post('https://api.cloudinary.com/v1_1/de81xq46s/image/upload', form);
    console.log(response);
    return response.data;
  }
}
