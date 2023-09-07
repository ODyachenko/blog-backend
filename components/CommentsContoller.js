import CommentsModel from '../models/Comments.js';

// Get comments list
export const getComments = async (req, res) => {
  try {
    const comments = await CommentsModel.find().populate('user').exec();

    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not get the comments',
    });
  }
};

export const createComments = async (req, res) => {
  try {
    const doc = new CommentsModel({
      text: req.body.text,
      user: req.userId,
    });

    const comment = await doc.save();
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not create comment',
    });
  }
};
