import * as Yup from 'yup';

import Movement from '../models/Movement';

class MovementController {
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
