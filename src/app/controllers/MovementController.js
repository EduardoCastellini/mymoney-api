import * as Yup from 'yup';

import Movement from '../models/Movement';
import Category from '../models/Category';

class MovementController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const movement = await Movement.findAll({
      where: { user_id: req.userId },
      order: ['created_at'],
      attributes: ['id', 'created_at', 'description', 'value', 'type'],
      include: [
        {
          model: Category,
          attributes: ['description'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(movement);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      value: Yup.number().required(),
      category_id: Yup.number().required(),
      descryption: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade Fails!' });
    }

    const type = req.body.type.toLowerCase();

    const { value, description, category_id } = req.body;

    const movement = await Movement.create({
      type,
      value,
      description,
      category_id,
      user_id: req.userId,
    });

    return res.json(movement);
  }

  async delete(req, res) {
    const movement = await Movement.findByPk(req.params.id);

    if (movement.user_id !== req.userId) {
      res.status(401).json({
        error: "You don't have permission to cancel this Movement",
      });
    }

    await movement.destroy();

    return res.json(movement);
  }
}

export default new MovementController();
