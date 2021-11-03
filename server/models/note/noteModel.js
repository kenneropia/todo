const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  text: {
    type: String,
    maxlength: 75,
    minlength: 5,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'completed'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedAt: Date,
})

noteSchema.pre('save', async function (next) {
  this.createdAt = Date.now()
  next()
})

noteSchema.post('updateOne', async function (next) {
  delete this.createdAt
  this.updatedAt = Date.now()
  next()
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

noteSchema.statics.noteValidator = require('./noteValidator')

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
