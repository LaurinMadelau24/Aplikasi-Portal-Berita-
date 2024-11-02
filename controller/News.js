const { truncate } = require('fs');
const { where } = require('sequelize');
const { Op } = require('sequelize');


//news model
const News = require('../model/main').News;
//category model
const Category = require('../model/main').Category;

//create news
exports.create = async (req, res) => {
  try {
    const { title, content, category_id } = req.body;
    if (!title || !content || !category_id) return res.status(400).send({ message: 'Set a title and content to create a News' });

    await News.create(req.body);
    res.status(200).send({ message: 'Your News has Been created' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error!' });
  }
};

//find all
exports.findAll = async (req, res) => {
  try {
    const news = await News.findAll({ include: { model: Category, as: 'category',
      attributes: ['id', 'category_name'],
     } });
    if (news.length == 0) return res.status(404).send({ message: 'No news exist' });

    res.status(200).send(news);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error!' });
  }
};

//get id
exports.findOneNews = async (req, res) => {
  try {
    const newsID = req.params.id;
    const news = await News.findOne({ where: { id: newsID }, include: { model: Category, as: 'category',
      attributes: ['id', 'category_name'],
     } });
    if (!news) return res.status(404).send({ message: 'not found' });

    res.status(200).send(news);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error!' });
  }
};

//update news
exports.update = async (req, res) => {
  try {
    const newsID = req.params.id;
    // find news
    const news = await News.findByPk(newsID);
    if (!news) return res.status(404).send({ message: 'not found' });

    //update news
    await News.update(req.body, { where: { id: newsID } });
    res.status(200).send({ message: 'News has been update' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error!' });
  }
};

//delete news
exports.deleteOne = async (req, res) => {
  try {
    const newsID = req.params.id;
    // find news
    const news = await News.findByPk(newsID);
    if (!news) return res.status(404).send({ message: 'not found' });

    //delete news
    await News.destroy({ where: { id: newsID } });
    res.status(200).send({ message: 'News has been Delete' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error!' });
  }
};

//get search
exports.SearchNews = async (req, res) => {
  try {
    const {keyword} = req.body;
    const news = await News.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } }, // title LIKE
          { content: { [Op.like]: `%${keyword}%` } }, // content LIKE
        ],
      }, include: { model: Category, as: 'category',
        attributes: ['id', 'category_name'],
       },
    });
    if (news.length == 0) return res.status(404).send({ message: 'No news exist' });
    // { title: { [op.iLike]: `%${title}%` } },
    // { content: { [op.iLike]: `%${content}%` } },
    res.status(200).send(news);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error!' });
  }
};

//delete all news
exports.deleteAll = async (req, res) => {
  try {
    //find all
    const news = await News.findAll({ where: {} });
    if (news.length == 0) return res.status(404).send({ message: 'No News exist' });

    await News.destroy({
      where: {},
      truncate: false,
    });
    res.status(200).send({ message: 'All News has been Delete' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error!' });
  }
};
