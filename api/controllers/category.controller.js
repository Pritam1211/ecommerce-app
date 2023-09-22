const categoryModel = require("../models/category.model");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    if(!name) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }
    const exist = await categoryModel.find({name});
    if(exist && exist.lengh>0){
      return res.status(400).json({
        success: false,
        message: "Category Already exist"
      });
    }

    const category = await new categoryModel({name, slug: slugify(name)}).save();

    return res.status(200).json({
      success: true,
      category
    })
  } catch(err) {
    console.log("(createCategory)/ category.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const name = req.body.name;
    const id = req.params.id;
    if(!name || !id) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }
    const exist = await categoryModel.find({name});
    if(exist && exist.lengh>0){
      return res.status(400).json({
        success: false,
        message: "Category Already exist"
      });
    }

    const category = await categoryModel.findByIdAndUpdate({_id: id}, {name, slug: slugify(name)}, {new:true});

    return res.status(200).json({
      success: true,
      category
    })
  } catch(err) {
    console.log("(updateCategory)/ category.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}

exports.getAllCategory = async (req, res) => {
  try {

    const category = await categoryModel.find({});

    return res.status(200).json({
      success: true,
      categories: category
    })
  } catch(err) {
    console.log("(getAllCategory)/ category.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}

exports.getSingleCategory = async (req, res) => {
  try {
    const slug = req.params.slug;

    if(!slug) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }

    const category = await categoryModel.find({slug});

    return res.status(200).json({
      success: true,
      category
    })
  } catch(err) {
    console.log("(getSingleCategory)/ category.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}


exports.deleteCategory = async (req, res) => {
  try {

    const id = req.params.id;
    
    if(!id) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }
    
    const category = await categoryModel.findByIdAndDelete({_id: id});

    return res.status(200).json({
      success: true,
    })
  } catch(err) {
    console.log("(deleteCategory)/ category.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}