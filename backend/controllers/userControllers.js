import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const query = { email: new RegExp(req.query.search, 'i') }
    const users = await User.find(query);
    res.status(200);
    res.json({
      results: users.length,
      users: [...users],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201);
    res.send({
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200);
    res.json({
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200);
    res.json({
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const removeUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204);
    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

