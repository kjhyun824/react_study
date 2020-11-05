import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID MIRPPN5Fd40ogaYVEPhZHQAy9mGpAcGLQfyuXY0ip4E',
  },
});
