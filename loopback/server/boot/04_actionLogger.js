'use strict';

module.exports = (app) => {
    console.log("ready looger",)


    app.remotes().before('**', async (ctx) => {
      const { accessToken } = ctx.req;
    //   console.log("ctx.req",ctx.req)
        let user;
      // ignore unauthenticated requests
      if (!accessToken) {
           user = {name:"Sin identificacion",email:"sin identifiacion"}
      }
    else{
         user = await accessToken.user.get();
        // console.log("userlit",user)
      }
      if(ctx.req._body){
          console.log("El body",ctx.req.body);
      }
      if(ctx.req._query){
          console.log("El query",ctx.req.query);
      }
      console.log(`accion realizada por ${user.username} ${user.email} =>${ctx.req.baseUrl}${ctx.req._parsedUrl.pathname}`);
    });
  };
  