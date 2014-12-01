<%@ WebHandler Language="C#" Class="GetList" %>

using System;
using System.Web;

public class GetList : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        int page = 0;
        if(context.Request.Form["page"] != null) int.TryParse(context.Request.Form["page"].ToString(), out page);
        if(page < 1) {
            context.Response.Write("{ \"err\": \"err\", \"msg\": \"无效的页数\" }");
            return;
        }
        // actions
        context.Response.Write("{ \"ok\": true, \"page\": { \"pagenum\": " + page + ", \"pagesize\": 15, \"totalnum\": 1500, \"totalpage\": 100 }, \"list\": [ ] }");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}