import { Router } from 'express';
import { CategoriesRepository } from './../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = categoriesRepository.findByName(name);

  if (category) {
    return response.status(400).json({ error: 'Category already exists' });
  }

  categoriesRepository.create({ name, description });

  return response.sendStatus(201);
});

export { categoriesRoutes };