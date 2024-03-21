const database = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const Signup = async (req, res) => {
    const { FirstName, LastName, Email, Password, Phone } = req.body;

    if (!FirstName || !LastName || !Email || !Password || !Phone) {
        return res.json({ status: "error", error: "Please enter ALL information" });
    } else {
        database.query(`SELECT uEmail FROM user WHERE uEmail = ?`, [Email], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", error: "Database error" });
            }

            if (result.length > 0) {
                return res.json({ status: "error", error: "Email already exists" });
            } else {

                // Hash password before storing in the database
                //safety Reasons 
                //const hashedPassword = await bcrypt.hash(Password, 10);

                database.query(
                    `INSERT INTO user (firstN, lastN, uEmail, uPassword, uPhone) VALUES (?, ?, ?, ?, ?)`,
                    [FirstName, LastName, Email, Password, Phone],
                    (error, results) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).json({ status: "error", error: " Phone Number unvalid or Already exist" });
                        } else {
                            return res.json({ status: "success", success: "Successful" });
                        }
                    }
                );
            }
        });
    }
};

module.exports = Signup;