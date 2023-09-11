import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  const { sortBy, filter } = req.query;
  let tags = [];
  if (filter) {
    tags = filter.split(',').map((tag) => `#${tag}`);
  }
  const filterCondition = filter ? { tags: { $in: tags } } : {};

  try {
    const posts = await PostModel.find(filterCondition)
      .sort({ [sortBy]: 'desc' })
      .populate('user')
      .exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not get the articles',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      }
    )
      .populate('user')
      .exec()
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Article not found',
          });
        }
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Could not get the article',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not get the article',
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not create article',
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Article not found',
          });
        }
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Could not reamove the article',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not remove the article',
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not update the article',
    });
  }
};
