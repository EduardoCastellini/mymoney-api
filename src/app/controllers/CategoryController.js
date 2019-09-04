import * as Yup from 'yup';

import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const category = await Category.findAll({
      where: { user_id: req.userId },
      order: ['created_at'],
      attributes: ['id', 'description'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(category);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade Fails!' });
    }

    const { description } = req.body;

    const category = await Category.create({
      description,
      user_id: req.userId,
    });

    return res.json(category);
  }

  async delete(req, res) {
    const category = await Category.findByPk(req.params.id);

    if (category.user_id !== req.userId) {
      res.status(401).json({
        error: "You don't have permission to cancel this Movement",
      });
    }

    await category.destroy();

    return res.json(category);
  }
}

export default new CategoryController();
