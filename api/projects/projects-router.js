// Write your "projects" router here!

const Projects = require('./projects-model');
const { validateProj } = require('../middleware/middleware');
const router = require('express').Router();

router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: `Project id ${id} could not be found `});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', validateProj, async (req, res) => {
  const project = req.body;

  try {
    const newProj = await Projects.insert(project);
    res.status(201).json(newProj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateProj, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const updateProj = await Projects.update(id, changes);
    if (project) {
      res.status(200).json(updateProj);
    } else {
      res.status(404).json({ message: `Project id ${id} could not be found` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'Project deleted' });
      } else {
        res.status(404).json({ message: `Project id ${id} could not be found` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: `No actions could be found for project with an id of ${id}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
