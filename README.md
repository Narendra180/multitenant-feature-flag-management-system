## Steps to run the project.

1. Clone the repository.
2. Run 'npm install' in the project root.
3. Add environment variables.
* **Command to generate ARGON2_PEPPER.**\
``openssl rand -hex 32``
* command to generate ES512 key pair:\
Generate the Private Key:\
``openssl ecparam -genkey -name secp521r1 -noout -out es512-private.pem``\
Generate the Public Key:\
``openssl ec -in es512-private.pem -pubout -out es512-public.pem``\
**command to print key in terminal, so that it can stored in env:**\
``awk '{printf "%s\\n", $0}' ecdsa2_key\``
Generate two pairs of keys for below variables.
ACCESS_TOKEN_JWT_PUBLIC_KEY
ACCESS_TOKEN_JWT_PRIVATE_KEY
REFRESH_TOKEN_JWT_PUBLIC_KEY
REFRESH_TOKEN_JWT_PRIVATE_KEY
4. Created database and run drizzle migrate in project root.
``npm run drizzle:migrate``
5. Run seed script (which will create roles, 10 test organizations and a root organization).\
``npm run drizzle:seed-data``
6. Run the command ``npm run dev`` to run the project.
