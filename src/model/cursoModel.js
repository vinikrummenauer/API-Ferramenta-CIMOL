const mysql=require("./mysqlConnect");
get=async()=>{
    return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
}

post= async (data)=>{
  sql="INSERT INTO curso"+
  " (nome, numero)"+
  " VALUE"+
  " ('"+data.nome+"', '"+data.numero+"')";
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK", insertId:result.insertId}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

put= async (data)=>{
  sql="INSERT INTO curso"+
  " ( set";
  if(data.nome){
    sql+=" nome="+data.nome+",";
  }
  if(data.numero){
    sql+=" numero="+data.numero+",";
  }
  if(data.logo){
    sql+=" logo="+data.logo+",";
  }

}

module.exports={get, post}