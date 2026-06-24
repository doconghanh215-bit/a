import Joi from 'joi';

export const createSongSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().positive().required(),
  releaseYear: Joi.number().min(1900).max(new Date().getFullYear()),
  description: Joi.string().max(1000),
  albumId: Joi.string()
});

export const updateSongSchema = Joi.object({
  title: Joi.string(),
  genre: Joi.string(),
  description: Joi.string().max(1000),
  releaseYear: Joi.number().min(1900).max(new Date().getFullYear())
});

export const searchSongSchema = Joi.object({
  query: Joi.string().required(),
  limit: Joi.number().default(20),
  offset: Joi.number().default(0)
});
