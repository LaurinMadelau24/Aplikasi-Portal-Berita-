const { truncate } = require('fs');
const { where } = require('sequelize');

//category model
const Category = require('../model/main').Category;


//create category
exports.create = async (req, res) => {
    try {
      const { category_name } = req.body;
      if (!category_name) return res.status(400).send({ message: 'Set a category  to create a Category' });
  
      await Category.create(req.body);

      res.status(200).send({ message: 'Your Category has Been created' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal server error!' });
    }
  };

  exports.findAll = async (req, res) => {
    try {
      const category = await Category.findAll({ where: {} });
      if (category.length == 0) return res.status(404).send({ message: 'No category exist' });
  
      res.status(200).send(category);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal server error!' });
    }
  };

  exports.findOneCategory = async (req, res) => {
    try {
      const categoryID = req.params.id;
      const category = await Category.findOne({ where: { id: categoryID } });
      if (!category) return res.status(404).send({ message: 'not found' });
  
      res.status(200).send(category);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal server error!' });
    }
  };

  exports.update = async (req, res) => {
    try {
      const categoryID = req.params.id;
      
      const category = await Category.findByPk(categoryID);
      if (!category) return res.status(404).send({ message: 'not found' });
  
      
      await Category.update(req.body, { where: { id: categoryID } });
      res.status(200).send({ message: 'Category has been update' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal server error!' });
    }
  };

  exports.deleteOne = async (req, res) => {
    try {
      const categoryID = req.params.id;
      // find category
      const category = await Category.findByPk(categoryID);
      if (!category) return res.status(404).send({ message: 'not found' });
  
      //delete category
      await Category.destroy({ where: { id: categoryID } });
      res.status(200).send({ message: 'category has been Delete' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal server error!' });
    }
  };