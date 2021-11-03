const express = require('express')
const Note = require('../models/note/noteModel')
const protectRoute = require('../utils/protectRoute')

const router = express.Router()

router.get('/', protectRoute, async (req, res) => {
  let allNotes = Note.find({})
  const { sortBy, limit = 10 } = req.query

  allNotes = await allNotes.sort('-' + sortBy).limit(limit - 1)
  res.json({ data: { notes: allNotes } })
})

router.post('/', protectRoute, async (req, res) => {
  //text,id,user

  req.body.user = req.user.id
  console.log(req.body)
  const isUserValid = Note.noteValidator(req.body)

  const newNote = await Note.create(req.body)
  res.json({ data: { note: newNote } })
})

router.get('/:noteId', protectRoute, async (req, res) => {
  const { noteId = null } = req.params

  const { id: userId } = req.user

  const note = await Note.findOne({ id: noteId, user: userId })
  if (!note || note.length < 12) {
    return res.json({
      error: {
        status: 404,
        message: 'This note doesnt exist or has been deleted',
      },
    })
  }
  res.json({ data: { note } })
})

router.delete('/:noteId', protectRoute, async (req, res) => {
  const { noteId = null } = req.params

  const note = await Note.findByIdAndDelete(noteId)
  if (!note || note.length < 12) {
    return res.json({
      error: {
        status: 404,
        message: 'This note doesnt exist or has already been deleted',
      },
    })
  }
  res.json({ data: { note } })
})

module.exports = router
