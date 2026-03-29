const mammoth = require("mammoth");
const fs = require("fs");
mammoth.extractRawText({path: "貳拾伍顧問服務合約.docx"})
    .then(function(result){
        fs.writeFileSync("contract_clean.txt", result.value, "utf8");
        console.log("Done");
    })
    .catch(console.error);
