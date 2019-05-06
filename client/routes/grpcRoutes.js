// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

// gRPC client
const productProtoPath = path.join(__dirname, '..', '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;
const client = new productPackageDefinition.ProductService(
  'localhost:50051', grpc.credentials.createInsecure());
/*
Using an older version of gRPC?
(1) You won't need the @grpc/proto-loader package
(2) const productPackageDefinition = grpc.load(productProtoPath).product;
(3) const client = new productPackageDefinition.ProductService(
  'localhost:50051', grpc.credentials.createInsecure());
*/

// handlers
const listProducts = (req, res) => {
  client.listProducts({}, (err, result) => {
    res.json(result);
  });
};

// const readProduct = (req, res) => {};
// const createProduct = (req, res) => {};
// const updateProduct = (req, res) => {};
// const deleteProduct = (req, res) => {};

module.exports = {
  listProducts,
  // readProduct,
  // createProduct,
  // updateProduct,
  // deleteProduct,
};