const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll()
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
   where: {
    id: req.params.id
   },
   include: [
    {
      model: [Product],
      
    }
   ]
  })
  .then(productData => {
    if (!productData) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.json(productData);

  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
 
});

router.post('/', (req, res) => {
  Category.create({ body })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update({ body })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

  });


router.delete('/:id', (req, res) => {
  Category.destroy({ body })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err);
  res.status(500).json(err);
});

module.exports = router;
