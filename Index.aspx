<%@ page language="C#" autoeventwireup="true" inherits="Index, App_Web_index.aspx.cdcab7d2" %>
<% 
    int page = 1;
    if (Request.QueryString["page"] != null) int.TryParse(Request.QueryString["page"].ToString(), out page);
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>index</title>
    <style type="text/css">
        a { text-decoration:none; }
        a:hover { text-decoration:none; }
        .pager_ao { margin-left:15px; display: inline-block; border: 1px solid #CCC; color:#CCC; padding: 4px; font-size: 12px;text-align: center; }
        .page_first:hover { background-color: #CCC; color: #FFF; }
        .page_previous:hover { background-color: #CCC; color: #FFF; }
        .page_item:hover { background-color: #CCC; color: #FFF; }
        .page_next:hover { background-color: #CCC; color: #FFF; }
        .page_last:hover { background-color: #CCC; color: #FFF; }
        .page_current { background-color: #CCC; color:#FFF; }
        .page_first { width: 40px; }
        .page_previous { width: 40px; }
        .page_total { border: 0px; font-size:14px; }
        .page_next { width: 40px; }
        .page_last { width: 40px; }
        .page_item { width: 30px; }
    </style>
</head>
<body>
    <div class="acg"></div>
</body>
<script src="script/jquery-1.10.2.min.js"></script>
<script src="script/jquery.pager.min.js"></script>
<script type="text/javascript">
    $(function () {
        var o = { a: 1, b: 2 };
        var pp = { pagenum: <%=page %> };
        var getList = function (page) {    
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
                    makePage(data.page);
                }
            });
        };
        var makePage = function (page) { 
            $(".acg").pager({
                showPageNumber: 12, 
                pageNumber: page.pagenum, 
                pageSize: page.pagesize, 
                totalNumber: page.totalnum, 
                totalPage: page.totalpage, 
                url: "index.aspx?page=-y-",
                redirect: false,
                showTotal: true,
                showTurnto: true,
                callbackPara: o,
                callback: getList
            });
        };
        getList(pp);
    });
</script>
</html>
