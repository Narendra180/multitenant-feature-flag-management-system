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

### pm2 start command:
pm2 start index.js --name "pm2 appname"

### Demo Video: 
https://drive.google.com/file/d/13Ymj7nVhyzY1eSA8dO2Agk7spmwko90m/view?usp=sharing

### Architechture:
There will be 3 roles in this multi tenant application.\
superadmin,
admin, 
user

* **superadmin** can only be logged in from https://root.narendrak.in/ and create, view organizations.
* **admin** can create, edit, delete feature flags for the organization he belongs to.
* **user** can check whether a feature flag is enabled or not.

## Test Credentials:

### Superadmin - https://root.narendrak.in/
**Email:** narendra.superadmin@gmail.com\
**Password:** 123456

### Organization 1 - https://coastal-aqua.narendrak.in/ 
**Admin User Credentials:**\
**Email**: narendra.coastalaqua.admin@gmail.com\
**Password**: 123456

**Regular User Credentials:**\
**Email:** narendra.coastalaqua.user@gmail.com\
**Password:** 123456

### Organization 2 - https://apex-elec.narendrak.in/
**Admin User Credentials:**\
**Email**: narendra.apexelec.admin@gmail.com\
**Password**: 123456

**Regular User Credentials:**\
**Email:** narendra.apexelec.user@gmail.com\
**Password:** 123456

### Organization 3 - https://urban-decor.narendrak.in/ 
**Admin User Credentials:**\
**Email**: narendra.urbandecor.admin@gmail.com\
**Password**: 123456

**Regular User Credentials:**\
**Email:**  narendra.urbandecor.user@gmail.com\
**Password:** 123456