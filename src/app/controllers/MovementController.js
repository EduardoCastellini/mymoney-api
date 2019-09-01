import * as Yup from 'yup';

import Movement from '../models/Movement';
import User from '../models/User';

class MovementController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const movement = await Movement.findAll({
      where: { user_id: req.userId },
      order: ['created_at'],
      attributes: ['id', 'created_at', 'description', 'value', 'type'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(movement);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      value: Yup.number().required(),
      descryption: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade Fails!' });
    }

    const { type, value, description } = req.body;

    const movement = await Movement.create({
      type,
      value,
      description,
      user_id: req.userId,
    });

    return res.json(movement);
  }
}

export default new MovementController();
