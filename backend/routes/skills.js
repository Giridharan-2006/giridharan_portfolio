const router = require('express').Router();
const Project = require('../models/Project');

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ msg: 'Wrong password' });
  next();
};

router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

router.post('/add', verifyPassword, async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

router.delete('/:id', verifyPassword, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;