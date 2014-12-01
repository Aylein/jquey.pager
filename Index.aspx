<%@ Page Language="C#" AutoEventWireup="true" Inherits="Index, App_Web_index.aspx.cdcab7d2" %>

<% 
    int page = 1;
    if (Request.QueryString["page"] != null) int.TryParse(Request.QueryString["page"].ToString(), out page);
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>index</title>
    <link href="style/style.css" rel="stylesheet" />
</head>
<body>
    <div class="acg"></div>
</body>
<script src="script/jquery-1.10.2.min.js"></script>
<script src="script/jquery.pager.min.js"></script>
<script type="text/javascript">
    $(function () {
        var p = 0;
        var pp = { pagenum: <%=page %> };
        var getList = function (page, obj) {    
            $.ajax({
                type: "post",
                url: "ajax/getlist.ashx",
                data: { page: page.pagenum },
                dataType: "Json",
                success: function (data) { 
                    if (data.err) { 
                        alert(data.msg);
                        return;
                    }
                    var o = obj || { a: 1, b: 2 };
                    //console.log(o);
                    makePage(data.page);
                }
            });
        };
        var makePage = function (page) { 
            if(page.totalpage <= 1) return;
            $(".acg").pager({
                showPageNumber: 12, 
                pageNumber: page.pagenum, 
                pageSize: page.pagesize, 
                totalNumber: page.totalnum, 
                totalPage: page.totalpage, 
                url: "index.aspx?page=-y-",
                redirect: false,
                //showTotal: true,
                //showTurnto: true,
                callbackPara: { a: page.pagenum + 1, b: page.totalpage },
                callback: getList
            });
        };
        getList(pp);
    });
</script>
</html>
