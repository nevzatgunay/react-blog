import Axios from 'axios';
import config from '../config';

export default class ArticlesService {
  async getArticleCategories() {
    const response = await Axios.get(`${config.apiUrl}/categories`);

    return response.data.categories;
  }

  createArticle = async (data, token) => {
    const image = await this.uploadToCloudinary(data.image);
    try {
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
      console.log(errors);
      return errors.response.data;
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
