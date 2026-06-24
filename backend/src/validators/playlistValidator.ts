import Joi from 'joi';

export const createPlaylistSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().max(500),
  visibility: Joi.string().valid('public', 'private', 'collaborative').default('private')
});

export const updatePlaylistSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().max(500),
  visibility: Joi.string().valid('public', 'private', 'collaborative')
});

export const addSongToPlaylistSchema = Joi.object({
  songId: Joi.string().required()
});
