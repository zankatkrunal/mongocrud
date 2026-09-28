import express from "express";
import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGO_URI =
  "mongodb+srv://zankatkrunal33_db_user:oFupUloaK6W6LLnV@cluster0.s8xqova.mongodb.net/dmartstore";

const app = express();
const PORT = 3001;

app.use(express.json());

if (!MONGO_URI) {
    console.error("MongoDB URI is not defined. Please set the MONGO_URI environment variable.");
    process.exit(1);
}

mongoose.connect(MONGO_URI); 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

app.get("/products", async(req, res) => {
    try {
        const product = await Product.find();
        res.json({message: "Get all Product ",data: product});
    } catch (error) {
        res.status(400).json({message: "Error fetching product",error});

    }
});

app.post("/products", async (req, res) => {
    try {
        // const product = new Product(req.body);
        // await product.save();

        const product = await Product.create (req.body);

        res.status(201).json({message: "Product created",data: product});
    } catch (error) {
        res.status(400).json({message: "Error creating product",error});

    }
});
 
app.put("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
            });
        res.status(200).json({message: "Product updated",id: req.params.id,data: product});
    } catch (error) {
        res.status(400).json({message: "Error updating product",error});
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Product deleted",id: req.params.id});   
    } catch (error) {
        res.status(400).json({message: "Error deleting product",error});

    }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});







































// import express from "express";
// import mongoose from "mongoose";
// import dns from "node.dns"

// dns.setServers(["8.8.8.8","1.1.1.1"])

// const MONGO_URL ="mongodb+srv://zankatkrunal33_db_user:<35eCDWWqJowuErbq>@cluster0.s8xqova.mongodb.net/dmartstore";

// const app = express();
// app.use(express.json());

// const PORT = 3000;

// if (!MONGO_URI) {
//   console.error("MongoDB URI is not defined. Please set the MONGO_URI environment variable.");
//   process.exit(1);
// }

// mongoose.connect(MONGO_URI);

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     brand: {
//         type: String,
//         required: true,
//     },
// });

// const Product = mongoose.model("Product,productSchema");

// app.get("/products", (req, res) => {
//   res.json({message: "Get all products",});
// });


// app.post("/products", async (req, res) => {

//       try {
//         const products = await Product.create(req.body);
//         res.status(201).json({ message: "Product created",data:product });     
//     }
//     catch (error){
//         res.status(400).json({message:"Error creating product", error});
//     }
// });

// app.put("/products/:id", (req, res) => {
//   res.json({message: "Product updated",id: req.params.id,data: req.body, });
// });


// app.delete("/products/:id", (req, res) => {
//   res.json({message: "Product deleted",id: req.params.id,});
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });