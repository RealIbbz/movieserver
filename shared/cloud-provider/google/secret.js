
// Imports the Secret Manager library
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

// Instantiates a client
const client = new SecretManagerServiceClient();
const project = process.env.PROJECT_ID

async function accessSecret(key) {
  const name = `projects/${project}/secrets/${key}/versions/latest`;
  const [version] = await client.accessSecretVersion({
    name: name,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString('utf8');
  return payload;
}


module.exports = {
    accessSecret
}
