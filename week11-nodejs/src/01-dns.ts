import * as dns from "dns";

const domain = "yaho0.com";
dns.resolve(domain, (err, addresses) => {
  if (err) throw err;
  console.log(addresses);
});
