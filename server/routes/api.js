require('../config/config');
const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const { User } = require('../models/user');
const { mongoose } = require('../db/mongoose');
const { authenticate } = require('../middleware/authenticate');

router.get('/users', (req, res) => {
  User.find(
    (e, users) => {
      res.send({ users }).send;
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});

// POST /users
router.post('/users', (req, res) => {
  let { email, password, firstName, lastName } = req.body;
  let body = { email, password, firstName, lastName };
  let user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login
router.post('/users/login', (req, res) => {
  let { email, password } = req.body;
  let body = { email, password };

  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

router.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send(`User: ${user.firstName} ${user.lastName} was deleted.`);
  });
});

router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

module.exports = router;
