const db = require('../db');
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');

const columnNamesComplaint = [
    'customer_id',
    'date_time',
    'category',
    'subject',
    'description',
    'product',
    'status',
    'assigned_to',
    'priority',
    'attachments',
    'resolution',
    'resolution_date',
    'closed_date',
    'feedback',
    'rating',
    'channel',
  ];
  const columnNamesCostumer  = [
    'customer_id',
    'name',
    'phone',
    'email',
    'age',
    'gender',
  ];
  
  exports.insertComplaint = async (req, res) => {
    console.log('InsertComplaint is called');
    const { name, category, subject, description, product, priority, channel } = req.body;
  
    try {
      let customer_id;
  
      // Check if customer already exists by name
      const customerCheck = await db.query('SELECT customer_id FROM customer WHERE name = $1', [name]);
      if (customerCheck.rows.length > 0) {
        // Customer exists, use their ID
        customer_id = customerCheck.rows[0].customer_id;
      } else {
        // Customer doesn't exist, insert into "customer" table
        const { phone, email, age, gender } = req.body; // Assuming these fields are in the request body
        const customerInsertQuery = `
          INSERT INTO customer (name, phone, email, age, gender)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING customer_id`;
        const customerInsertValues = [name, phone, email, age, gender];
        const customerInsertResult = await db.query(customerInsertQuery, customerInsertValues);
  
        customer_id = customerInsertResult.rows[0].customer_id;
      }
  
      // Insert complaint into "complaint" table
      const valuesComplaint = [
        customer_id,
        new Date(),
        category,
        subject,
        description,
        product,
        'new', // Status is set to 'new' by default
        null, // assigned_to is initially null
        priority,
        null, // attachments might be added later
        null, // resolution might be added later
        null, // resolution_date will be null initially
        null, // closed_date will be null initially
        null, // feedback might be added later
        null, // rating might be added later
        channel,
      ];
      const placeholdersComplaint = valuesComplaint.map((_, index) => `$${index + 1}`).join(', ');
      const queryComplaint = `INSERT INTO complaint (${columnNamesComplaint.join(', ')}) VALUES (${placeholdersComplaint})`;
  
      await db.query(queryComplaint, valuesComplaint);
  
      return res.status(201).json({
        success: true,
        message: 'Complaint inserted successfully',
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  
exports.getComplaints = async (req, res) => {
    console.log("hahahaha ");
    try {
     query= `SELECT
  c.customer_id,
  c.name AS customer_name,
  com.complaint_id,
  CASE
    WHEN com.resolution = 'NaN' THEN ''
    ELSE com.resolution
  END AS resolution,
  com.${columnNamesComplaint.join(', com.')},
  TO_CHAR(com.date_time, 'YYYY-MM-DD HH24:MI:SS') AS complaint_date_time
FROM customer c
INNER JOIN complaint com ON c.customer_id = com.customer_id
`;
      
      const { rows } = await db.query(query);
      if (rows.length > 0) {
        console.log("First row:", rows[0]);
      }
      return res.status(200).json({
        success: true,
        complaints: rows,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  exports.DeleteComplaint = async (req, res) => {
    console.log("Delete complaint called");
    try {
      const { complaint_id } = req.body;
      const deleteQuery = "DELETE FROM COMPLAINT WHERE COMPLAINT_ID = $1";
      await db.query(deleteQuery, [complaint_id]);
  
      // // You might also want to delete related email records here using a similar query
      // const deleteRelatedEmailsQuery = "DELETE FROM EMAIL WHERE COMPLAINT_ID = $1";
      // await db.query(deleteRelatedEmailsQuery, [complaint_id]);
  
      res.status(200).json({ success: true, message: "Complaint deleted successfully" });
    
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Error deleting complaint" });
    }
  };
