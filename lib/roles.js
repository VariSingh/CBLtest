const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("labeler")
.readOwn("label")
.createOwn("label")
.updateOwn("label")
.deleteOwn("label")
.readAny("project")

 
ac.grant("reviewer")
.extend("labeler")
.updateAny("label")

ac.grant("team manager")
.extend("labeler")
.updateAny("user")
.createAny("user")
.readAny("user")

ac.grant("admin")
.extend("team manager")
.createOwn("project")
.updateAny("project")
.deleteAny("project")
.createOwn("object")
.updateAny("object")
.deleteAny("object")
.createOwn("subscription")
.updateAny("subscription")
.deleteAny("subscription")
.createOwn("membership")
.updateAny("membership")
.deleteAny("membership")
.readAny("dataset")
.createOwn("dataset")
.updateAny("dataset")
.deleteAny("dataset")
.createOwn("asset")
.updateAny("asset")
.deleteAny("asset")
 
return ac;
})();