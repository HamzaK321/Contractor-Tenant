const Pool = require('pg').Pool


// const pool = new Pool({
//   connectionString: 'postgresql://postgres:test123@localhost:5432/Contractors-Tenants',
// });

const pool = new Pool({
user: "postgres",
host: 'localhost',
database: "Contractors-Tenants",
password: "test123"
});


// Execute the CREATE TABLE statement when the server starts up
pool.query(`
  CREATE TABLE IF NOT EXISTS Contractors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tenant_id NUMBER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  )
`, (error, result) => {
  if (error) {
    console.error('Error executing CREATE TABLE statement:', error);
  } else {
    console.log('Contractors table created successfully');
    return result;
  }
});


const getContractors =  async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM Contractors');
  res.status(200).json({
    msg: "All Contractors data",
    data: rows[0]
  })
//   res.send(rows);
};

const getSingleContractor=  async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM Contractors WHERE id = $1', [id]);
  res.status(200).json({
    msg: "Contractor data fetched successfully",
    data: rows[0]
  })
//   res.send(rows[0]);
};


 const createContractor = async (req, res) => {
  const name = req.body;
  const { rows } = await pool.query(
    'INSERT INTO Contractors (name) VALUES ($1) RETURNING *',
   [ name ]
  );
  res.status(200).json({
    msg: "Contractor created successfully",
    data: rows[0]
  })
//   res.send(rows[0]);
};

const updateContractor = async (req, res) => {
  const { id } = req.params;
  const  name = req.body;
  const rows  = await pool.query(
    'UPDATE Contractors SET name = $1 WHERE id = $2 RETURNING *',
    [name, id] , (error, result) =>{
        if(error){
            console.log(error);
            throw error
        }
    }
  );
  res.status(200).json({
    msg: "Contractor updated successfully",
    data: result.rows[0]
  })
//   res.send(rows[0]);
};

const deleteContractor =  async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM Contractors WHERE id = $1', [id]);
  res.status(200).json({
    msg: "Contractor deleted successfully",
  })
//   res.send('Contractor deleted');
};


module.exports = {
    getContractors,
    getSingleContractor,
    createContractor,
    updateContractor,
    deleteContractor
}