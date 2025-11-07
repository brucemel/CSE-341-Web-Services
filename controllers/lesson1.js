// controllers/lesson1.js
const mongodb = require('../config/database');

const getAllUsers = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const { ObjectId } = require('mongodb');
    
    const user = await db.collection('users').findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById
};
