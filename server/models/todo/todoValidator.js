const Joi = require('joi')

const schema = Joi.object({
  text: Joi.string().alphanum().min(5).max(75).required(),

  user: Joi.string()
    .pattern(new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i))
    .required(),
})

const noteValidator = (data) => {
  const res = Joi.assert(data, schema, { abortEarly: false })
  return { type: true }
}
module.exports = noteValidator
