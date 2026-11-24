class Auth {
    // Temp array for storing users
    currentUsers = []

    register(name, email, password) {
        // Validate email address is an albany email address
        if (!email || !email.endsWith('albany.edu')) {
            return res.status(400).json({ error: 'Valid albany university email required' });
        }

        // Validate non-blank text
        if (name.strip() === '' || password.strip() === '') {
            return res.status(400).json({ error: 'Name and password are required.'});
        }

        // Check username against MongoDB (for now the currentUsers array)
        for (user in this.currentUsers) {
            // Check if a user exists under this name already
            if (user.name === name) {
                return res.status(400).json({ error: 'Name already exists.'});
            }
        }

        // Hash password

        // Else, insert the new user into the array
        newUser = {
            name: name,
            email: email,
            password: password
        }

        return res.status(200).json({ message: 'Verification challenge sent', email });
    }
}