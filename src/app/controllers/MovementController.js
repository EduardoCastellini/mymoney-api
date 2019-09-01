import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';

class MovementController {
  async store(req, res) {
    return req;
  }
}

export default new MovementController();
