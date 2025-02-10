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


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc'); 

const app = express();

app.use(express.json());
app.use(cors());


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nursing App API',
      version: '1.0.0',
      description: 'API documentation for the Nursing App',
    },
    servers: [
      {
        url: 'http://localhost:5000', // تأكدي إن المنفذ صحيح
      },
    ],
  },
  // تحديد الملفات التي تحتوي على التعليقات التوضيحية للـ API
  apis: ['./routes/*.js'], 
};



const swaggerSpec = swaggerJsdoc(swaggerOptions);

// استخدام Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/acceptRequests', acceptRequestRoutes);
app.use('/api/reviews', reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/nurses", nurseRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/subcategories', require('./routes/subCategoryRoutes'));
app.use('/api/nursedrafts', nurseDraftRoutes);


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

