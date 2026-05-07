import { db } from "./connection";
import { organizationsTable, rolesTable } from "./schema";

async function createOrgs() {
  const testOrgs = [
    { name: "root", address: "root", subdomainName: "root" },
    { name: "Apex Electronics Wholesale", address: "12-3-45, Pogathota, Nellore, AP", subdomainName: "apex-elec" },
    { name: "Pragati Organic Farms", address: "Plot 88, Industrial Estate, Atmakur", subdomainName: "pragati-foods" },
    { name: "Blue Nile Textiles", address: "Weaver's Colony, Venkatagiri, AP", subdomainName: "bluenile" },
    { name: "Sri Krishna Hardware", address: "Trunk Road, Near VRC Center, Nellore", subdomainName: "sk-hardware" },
    { name: "Coastal Aqua Solutions", address: "Magunta Layout, Nellore, AP", subdomainName: "coastal-aqua" },
    { name: "Zenith Pharma Distributors", address: "Gandhi Nagar, Vijayawada, AP", subdomainName: "zenith-pharma" },
    { name: "Urban Decor Wholesale", address: "4th Lane, Mini Bypass Road, Nellore", subdomainName: "urban-decor" },
    { name: "Saffron Spice Exports", address: "Guntur Chilli Market Yard, Guntur", subdomainName: "saffron-spices" },
    { name: "Titan Industrial Tools", address: "Auto Nagar, Nellore, AP", subdomainName: "titan-tools" },
    { name: "Vedic Wellness Supplies", address: "Tirupati Main Road, Chittoor Dist", subdomainName: "vedic-well" },
  ];
  for (let orgObj of testOrgs) {
    await db.insert(organizationsTable)
      .values({
        ...orgObj
      })
  }
}

async function createRoles() {
  const roles = ["admin", "user"];
  const organizations = await db.select({ orgId: organizationsTable.id, subdomain: organizationsTable.subdomainName })
    .from(organizationsTable);
  const orgIdsArr = organizations.filter(obj => obj.subdomain !== "root");
  for (let orgObj of orgIdsArr) {
    for (let role of roles) {
      await db.insert(rolesTable)
        .values({
          role,
          organizationId: orgObj.orgId
        })
    }
  }
  await db.insert(rolesTable)
    .values({
      role: "superadmin",
      organizationId: (organizations.find(obj => obj.subdomain === "root"))!.orgId
    });
}

async function main() {
  await createOrgs();
  await createRoles();

  process.exit(0);
}

main();
