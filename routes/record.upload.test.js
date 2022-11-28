router.post('/upload', async(req, res, next) => {
  const { image, title,  } = req.body;
  await Record.create({ image, title })
  res.status(201).json({ message: 'Record created' })
  })