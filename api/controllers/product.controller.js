const productModel = require("../models/product.model");
const slugify = require("slugify");
const fs =require("fs");
exports.createProduct = async (req, res) => {
  try {
    const {name, description, price, quantity, category, shipping } = req.fields;
    const { photo } = req.filees;
    if(!name || !description || !price || !quantity || !category || !shipping || !photo) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }
    const exist = await productModel.find({slug:slugify(name)});
    if(exist){
      return res.status(400).json({
        success: false,
        message: "Product Already exist"
      });
    }

    const product = new productModel({name, description, price, category, quantity, shipping, slug: slugify(name)});
    product.photo.data = fs.readFileSync(photo.path);
    product.photo.contentType = photo.type;
    await product.save();

    return res.status(200).json({
      success: true,
      product
    })
  } catch(err) {
    console.log("(createProduct)/ product.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const {name, description, price, quantity, category, shipping } = req.fields;
    const { photo } = req.filees;
    const id = req.params.id
    if(!name || !description || !price || !quantity || !category || !shipping || !photo || !id) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }
    const exist = await productModel.find({slug:slugify(name)});
    if(exist){
      return res.status(400).json({
        success: false,
        message: "Product Already exist"
      });
    }

    const product =  await productModel.findByIdAndUpdate({_id: id}, {name, description, price, category, quantity, shipping, slug: slugify(name)}, {new: rue});
    product.photo.data = fs.readFileSync(photo.path);
    product.photo.contentType = photo.type;
    await product.save();

    return res.status(200).json({
      success: true,
      product
    })
  } catch(err) {
    console.log("(updateProduct)/ product.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}

exports.getAllProduct = async (req, res) => {
  try {

    const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});

    return res.status(200).json({
      success: true,
      count: products.length,
      products
    })
  } catch(err) {
    console.log("(getAllProducts)/ product.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}

exports.getSingleProduct = async (req, res) => {
  try {
    const slug = req.params.slug;

    if(!slug) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }

    const product = await productModel.find({slug});

    return res.status(200).json({
      success: true,
      product
    })
  } catch(err) {
    console.log("(getSingleProduct)/ product.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}

exports.getProductPhoto = async (req, res) => {
  try {
    const id = req.params.id;

    if(!id) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }

    const product = await productModel.find({id}).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch(err) {
    console.log("(getProductPhoto)/ product.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {

    const id = req.params.id;
    
    if(!id) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }
    
    const product = await productModel.findByIdAndDelete({_id: id}).select("-photo");

    return res.status(200).json({
      success: true,
    })
  } catch(err) {
    console.log("(deleteProduct)/ product.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}