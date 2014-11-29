<%@ WebHandler Language="C#" Class="GetList" %>

using System;
using System.Web;

public class GetList : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        int page = 0;
        if(context.Request.Form["page"] != null) int.TryParse(context.Request.Form["page"].ToString(), out page);
        if(page <= 0) {
            context.Response.Write("{ \"err\": \"err\", \"msg\": \"无效的页数\" }");
            return;
        }
        //action 
        int maxpagenum = 100;
        if (page > maxpagenum)
        {
            context.Response.Write("{ \"err\": \"err\", \"msg\": \"超过最大页数\" }");
            return;
        }
        context.Response.Write("{ \"ok\": \"ok\", \"page\": { \"pagenum\": \"" + page + "\", \"pagesize\": \"15\", \"totalnum\": \"1500\", \"totalpage\": \"" + maxpagenum + "\" }, \"list\": [ ] }");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}