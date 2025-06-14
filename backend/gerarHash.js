const bcrypt = require('bcrypt');

async function gerarHash() {
  const hash = await bcrypt.hash('Esmad', 10);
  console.log(hash);
}

gerarHash();
