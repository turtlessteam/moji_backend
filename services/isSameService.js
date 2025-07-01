const { getPublicUsersEmail } = require('../utils/getPublicUsersEmail');


async function checkUserEmailExists(email) {
    try {
    const exists = await getPublicUsersEmail(email);
    return exists; 
  } catch (err) {
    throw new Error('Failed to check user email');
  }
}

module.exports = { checkUserEmailExists };