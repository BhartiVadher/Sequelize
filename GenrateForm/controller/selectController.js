const { data1, data2, addData, deleteData } = require("../repository/selectRepository");

const records = async (req, res) => {
  try {
    const type = req.query.type;
    const field = req.query.field;

    console.log(type);
    console.log(field);

    const { id } = await data1({ field });

    console.log(id);

    const data = await data2({ id });

    let optionValue = [];

    data.forEach((element) => {
      optionValue.push(element.optionValue);
    });
    console.log(optionValue);

    let html = "";

    if (type == "radio" || type == "checkbox") {
      optionValue.forEach((element) => {
        html += `${element}:<input type="${type}" name="${element}" id="${element}"><br>`;
      });
    }

    if (type == "dropdown") {
      html += `<select name="${field}" id="${field}">`;

      optionValue.forEach((element) => {
        html += `<option value="${element}">${element}</option><br>`;
      });

      html += `</select>`;
    }

    res.render("form.ejs", { html });
  } catch (error) {
    console.log(error);
  }
};

const comboGenerate = async (req, res) => {
  try {
    const { selectValue } = req.body;
    const { option } = req.body;
    const data = await addData({ selectValue, option });
    console.log(data);
    return res.json({ data });
  } catch (error) {
    console.log(error.message);
  }
};

const dataDelete = async (req,res) => {
  console.log("dataDelete");
  try{
    const selectId = req.query.selectId;
    console.log(selectId,"selectId");
    const id = req.query.id;

    const valueDelete = await deleteData({selectId, id});
    console.log(valueDelete)
    // return res.json({valueDelete})
    res.end();
  } catch (error){
    console.log(error.message)
  }
}

// const comboGenerate = async (req,res)=>{
//   try{
//     const { selectValue,option } = req.body;
//     const insert = await selectMaster.create({
//       selectValue:selectValue,
//       optionMasters : option
//     },{
//       include : [optionMaster]
//     })
//     return res.json(insert);
//   }catch(error){
//     console.log(error.message);
//     return res.json({message: error});
//   }
// }

module.exports = { records, comboGenerate, dataDelete};
