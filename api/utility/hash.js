import bcrypt from 'bcryptjs';


/**
 * Create a hash password
 */
export const hashPassword = (password) => {

    // salt generate
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;

}

/**
 * User Login Password Verify
 */
export const passwordVerify = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}