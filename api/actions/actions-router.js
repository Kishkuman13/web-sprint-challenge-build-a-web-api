// Write your "actions" router here!

const router = require('express').Router();
const { validateAct } = require('../middleware/middleware');
const Actions = require('./actions-model');

router.get('/', (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: `Action id ${id} could not be found` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', validateAct, async (req, res) => {
  const action = req.body;

  try {
    const newAct = await Actions.insert(action);
    res.status(201).json(newAct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateAct, async (req, res) => {
  const { id } = req.params;
  const action = req.body;

  try {
    const updatedAct = await Actions.update(id, action);
    res.status(200).json(updatedAct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'Action deleted' });
      } else {
        res.status(404).json({ message: `Action id ${id} could not be found` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
