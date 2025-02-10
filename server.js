const express = require("express");
require("dotenv").config();
const cors = require('cors');
const connectDB = require("./database");  
const userRoutes = require("./routes/userRoutes");
const nurseRoutes = require("./routes/nurseRoutes");
const requestRoutes = require('./routes/requestsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const acceptRequestRoutes = require('./routes/acceptRequestRoutes');
const nurseDraftRoutes = require('./routes/nurseDraftRoutes');
const app = express();

app.use(express.json());
app.use(cors());


connectDB();


app.use('/api/acceptRequests', acceptRequestRoutes);
app.use('/api/reviews', reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/nurses", nurseRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/subcategories', require('./routes/subCategoryRoutes'));
app.use('/api/nursedrafts', nurseDraftRoutes);



const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

