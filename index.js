import express from "express";

const app = express();

// to make app understand json
app.use(express.json());

// ? product list
let productList = [
  {
    id: 1,
    name: "Bread",
    price: 100,
  },
];

// ? get product list
app.get("/product/list", (req, res) => {
  return res.status(200).send({ message: "success", productList });
});

// ?add product
app.post("/product/add", (req, res) => {
  const newProduct = req.body;

  productList.push(newProduct);

  return res.status(200).send({ message: "Product is added successfully." });
});

// ? get product detail by id
app.get("/product/detail/:id", (req, res) => {
  const productId = Number(req.params.id);

  const product = productList.find((item) => {
    return item.id === productId;
  });

  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  return res.status(200).send({ message: "success", productDetail: product });
});

// ? delete product
app.delete("/product/delete/:id", (req, res) => {
  // extract product id from req.params and convert to number type
  const productId = Number(req.params.id);

  // find product using product id
  const product = productList.find((item) => {
    return item.id === productId;
  });

  // if not product, throw error
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // delete product
  const newProductList = productList.filter((item) => {
    return item.id !== productId;
  });

  productList = structuredClone(newProductList);

  // send res
  return res.status(200).send({ message: "Product is deleted successfully." });
});

// ? edit a product
app.put("/product/edit/:id", (req, res) => {
  // extract product id from req.params and convert to number type
  const productId = +req.params.id;

  // find  product using product id
  const product = productList.find((item) => {
    return item.id === productId;
  });

  // if not product, throw error
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // extract new values from req.body
  const newValues = req.body;

  // edit product
  const newProductList = productList.map((item) => {
    if (item.id === productId) {
      return { ...item, ...newValues };
    }

    return item;
  });

  productList = structuredClone(newProductList);

  // send res
  return res.status(200).send({ message: "Product is edited successfully." });
});

// ? network port and server
const PORT = 8001;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
