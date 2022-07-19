const mysql=require("./mysqlConnect");
const jwt=require("jsonwebtoken");
 get=async()=>{
  //users=await mysql.query("SELECT *, (SELECT nome FROM pessoa WHERE id=u.pessoa_id_pessoa) as nome FROM usuario u");
  users=await mysql.query("SELECT p.nome, p.email, u.senha FROM usuario u JOIN pessoa p ON p.id_pessoa=u.pessoa_id_pessoa")
  return users;
}

login= async (data)=>{
   sql="SELECT p.id_pessoa as id, p.nome, p.email,"+
   " (SELECT COUNT(pessoa_id_pessoa) FROM professor WHERE pessoa_id_pessoa=p.id_pessoa) as professor,"+
   " (SELECT COUNT(pessoa_id_pessoa) FROM aluno WHERE pessoa_id_pessoa=p.id_pessoa) as aluno,"+
   " (SELECT COUNT(pessoa_id_pessoa) FROM administrador WHERE pessoa_id_pessoa=p.id_pessoa) as admin"+
   " FROM usuario u"+
   " JOIN pessoa p ON p.id_pessoa=u.pessoa_id_pessoa"+
   " WHERE p.email='"+data.email+"' AND u.senha='"+data.senha+"' ";
   const usuarios = await  mysql.query(sql);
   result=null;
   if(usuarios){
      if(usuarios.length>0){
         if(usuarios[0].id){
            const id=usuarios[0].id;
            var token = jwt.sign({id} , 'CIMOL', {expiresIn:3600}); 
            console.log("Fez login e gerou token!");
            result={ auth: true, token: token , user:usuarios[0]}
         }
      }      
   }
   if(!result){
      return {"status":"error", "message":"Falha ao realizar login!"}
   }
   return result;
}

verifyJWT=(token)=>{ 
  if (!token){
     resp= { auth: false, message: 'Token não informado.' }; 
  }
  
  jwt.verify(token, 'CIMOL', function(err, decoded) { 
     
     if (err){
        resp= { auth: false, message: 'Token inválido.' };
     }
     if(decoded){
        resp= {auth:true, idUser:decoded.id};
     }
  });
  return resp;
} 

module.exports={get, login, verifyJWT}