<?php
    $page = isset($_GET["page"]) ? intval($_GET["page"], 10) : 1;
?>
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
        var pp = { pagenum: <?=$page ?> };
        var getList = function (page, obj) {    
            $.ajax({
                type: "post",
                url: "ajax/list.php",
                data: { page: page.pagenum },
                dataType: "Json",
                success: function (data) { 
                    if (data.err) { 
                        alert(data.msg);
                        return;
                    }
                    var o = obj || { a: 1, b: 2 };
                    makePage(data.page);
                }
            });
        };
        var makePage = function (page) { 
            if(page.totalpage <= 1) { 
                $(".acg").html(""); 
                return; 
            }
            $(".acg").pager({
                showPageNumber: 7, 
                pageNumber: page.pagenum, 
                pageSize: page.pagesize, 
                totalNumber: page.totalnum, 
                totalPage: page.totalpage, 
                url: "index.php?page=-y-",
                search: "&a=1",
                pageText: "第-y-页",
                showSpace: true,
                redirect: false,
                callback: getList
            });
        };
        getList(pp);
    });
</script>
</html>
