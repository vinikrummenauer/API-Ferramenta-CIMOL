const userModel=require("../model/userModel");

exports.get= async (headers)=>{
  auth=userModel.verifyJWT(headers['x-access-token']);
  users={};
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await userModel.get()
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.login= async (body)=>{
  return await userModel.login(body)
}