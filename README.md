jquey.pager
===========  
[糖炒栗子](http://weixin.0372.cn/awards.aspx)  
  
===========  
请不要吐槽英文水平 （四级都没过  
小的基于jquery分页插件 适用jquery 1.8以上版本  
适用IE8+以上版本 （理论支持IE6+版本 但是缺乏测试  
谷歌Opera蓝大人浏览器均无测试  
适用于不需要SEO优化的ajax加载列表分页使用  
代码有很多冗余 0 0~ 再努力一下其实可以写的更为简洁  
  
2014 - 12 - 11   
修改了同一个页面加载多个分页时 option 中 回调函数 相互污染覆盖的错误  
现在可以在同一个页面加载多个不同事件的分页了  
  
2014 - 12 - 13  
增加了分页按钮间间隔字符的设置  
现在可以通过设置以下来去顶是否在分页按钮之间显示一些相同的字符  
option.showSpace = false; 是否显示分隔符  
option.spaceTag = "span"; 加载分隔符的标签名  
option.spaceClass = "space"; 分隔符标签的 css 样式类  
option.spaceCharacter = " | "; 分隔符  
  
为各个 css 样式类设置了前缀 前缀为 "pager" + option.sign + option.classSet  
栗子  
如果设置了 option.sign = "in"; option.firstClass = "csp"; 则声称的第一页按钮 css 样式类为 pager_in_csp  
默认情况下则生成 pager_ao_page_first   
以此类推  
  
Options  
===========  
  
sign   
-- string ["ao"]  
-- 签名 会在生成标签时赋予主要的样式类用以标识页面上不同的分页控件 string 默认为 ao  
栗子：   
1. 不设置此属性时默认为 ao 生成的标签 class 均包含 pager_ao 样式类  
2. 设置为 c 时 生成的标签会包含 pager_c 样式类  
  
tag   
-- string ["a"]  
-- 标签名 生成的标签名 默认为 a 即不设置此属性时默认生成 a 标签  
其他标签下缺乏测试 生成 div 类块状标签时 可能需要更为复杂的样式 （浮动  
  
url   
-- string [""] -y-  
-- 链接 即点击分页标签要跳转链接的主要部分 有占位符 -y- 默认为空  
此链接中必须包含分页参数的选项 生成按钮标签时会循环替换此占位符为应该赋值的页码  
栗子：  
1. 普通架构下设置 url 为 “index.aspx?page=-y-” 则生成的连接为 “index.aspx?page=1" 和 “index.aspx?page=2" 等  
2. MVC架构下即设置 url 为 ”index/-y-“ 或 ”index/id_-y-“ 则生成的连接为 ”index/1“， ”index/2“ 和 ”index/id_1“，”index/id_2“ 等  
  
search   
-- string [""]  
-- 即get参数部分 此部分会原封不动加载url设置后 默认为空  
所以在传递值时 需要根据url参数和search参数中的写法 判断search的第一个字符为 & 或是 ?  
  
showSpace  
-- bool [false]  
-- 是否显示分隔符  
  
spaceTag  
-- string ["span"]  
-- 加载分隔符的标签名  
  
spaceClass  
-- string "space"  
-- 分隔符标签的 css 样式类  
此类名在加载后会被修改为 pager_[sign]_[spaceClass]  
  
spaceCharacter  
-- string [" | "]  
-- 分隔符  
  
showPageNumber   
-- number [5]  
-- 显示的分页按钮个数即显示有数字表明的按钮个数 默认为 5  
栗子：  
1. 设置为 1 时即显示分页按钮个数为1 即当前页页码  
2. 设置为 5 时 会生成 5 个页码按钮 如果是前五个位 则是 1 2 3 4 5 超过 3 时 即 2 3 4 5 6  
  
pageNumber   
-- number [1]  
-- 当前页页码 默认为 1  
  
pageSize   
-- number [0]  
-- 每页容量 即每页包含数据的数量 默认为 0  
  
totalPage   
-- number [1]  
-- 总页数 默认为 1  
  
totalNumber   
-- number [0]  
-- 数据总数 默认为 0  
  
关于页码加载的规律  
1. 由于显示的页码按钮有限 在不断点击后方的按钮时 会将当前页的页码置于中间/后靠后一个的位置  
栗子：  
    1. 当前页码为 6 显示按钮数量为 5 时 第 6 页的页码为 4 5 [6] 7 8  
    2. 当前页码为 6 显示按钮数量为 4 时 第 6 页的页码为 4 5 [6] 7  
    3. 当前页码为 7 显示按钮数量为 5 时 第 6 页的页码为 5 6 [7] 8 9  
    4. 当前页码为 7 显示按钮数量为 4 时 第 6 页的页码为 5 6 [7] 8  
2. 所有页码在生成时均由计算 pageNumber pageSize totalPage totalNumber 的值而来 所以请提供这 4 个参数的详细正确数值  
  
showFirst   
-- bool [ture]  
-- 是否显示第一页按钮 默认显示  
  
firstClass  
-- string ["page_first"]  
-- 第一页按钮的样式类名  
默认情况下 第一页 会带有 pager_[sign] 的类名和 page_first 类名 所以请编辑样式 使得 page_first 中的样式可以覆盖 pager_[sign] 类中的样式  
此类名在加载后会被修改为 pager_[sign]_[firstClass]  
  
firstText  
-- string ["<<"]  
-- 第一页按钮显示的文字 即默认生成的第一页按钮 innerText 值为 "<<"  
  
showPrevious  
-- bool [true]  
-- 是否显示上一页按钮 默认显示  
  
previousClass  
-- string ["page_previous"]  
-- 上一页按钮的样式类名  
默认情况下 上一页 会带有 pager_[sign] 的类名和 page_previous 类名 所以请编辑样式 使得 page_previous 中的样式可以覆盖 pager_[sign]   类中的样式  
此类名在加载后会被修改为 pager_[sign]_[previousClass]  
  
previousText   
-- string ["<"]  
-- 上一页按钮显示的文字 即默认生成的上一页按钮 innerText 值为 "<"  
  
showPage  
-- bol [true]  
-- 是否显示分页按钮 即此选项为false时 不生成显示页码的按钮  
  
pageClass  
-- string ["page_item"]  
-- 分页按钮的 css 类名  
默认情况下 按钮 会带有 pager_[sign] 的类名和 page_item 类名 所以请编辑样式 使得 page_item 中的样式可以覆盖 pager_[sign] 类中的样式  
此类名在加载后会被修改为 pager_[sign]_[pageClass]  
  
currentPageClass  
-- string ["page_current"]  
-- 当前页页码按钮样式 即当前被选中的页码样式  
改样式不影响 第一页 上一页 下一页 最后一页按钮 为当前选中页码时的样式  
此类名在加载后会被修改为 pager_[sign]_[currentPageClass]  
  
redirectCurrent  
-- bool [false]  
-- 当前页练级是否可以点击 即默认情况下 点击当前页页码按钮是不会出发点击事件和页面跳转的  
  
showTotal  
-- bool [false]  
-- 是否显示总页数  
  
totalClass  
-- string ["page_total"]  
-- 总页数 css 类  
此类名在加载后会被修改为 pager_[sign]_[totalClass]  
  
totalText  
-- string ["-y-/-Y-"] -y- -Y-  
-- 总页数部分显示的字符串 有占位符 -y- 会被替换为当前页页码 -Y- 会被替换为总页数  
  
showTurnto  
-- bool [false]  
-- 是否显示点击跳转至指定页码按钮部分  
  
turntoClass  
-- string ["page_turnto"]  
-- 点击跳转至指定页码部分 css 样式类  
此类名在加载后会被修改为 pager_[sign]_[turntoClass]  
  
turntoText  
-- string ["GO"]  
-- 点击跳转至指定页码部分 前方提示框显示的字符串  
  
turntoInputClass  
-- string ["page_turntoinput"]  
-- 点击跳转至指定页码部分 中间输入框 css 样式类  
此类名在加载后会被修改为 pager_[sign]_[turntoInputClass]  
  
turntoButtonClass  
-- string ["page_turntobt"]  
-- 点击跳转至指定页码部分 后方按钮 css 样式类  
此类名在加载后会被修改为 pager_[sign]_[turntoButtonClass]  
  
turntoButtonText  
-- string ["OK"]  
-- 点击跳转至指定页码部分 后方按钮显示的字符串  
  
showNext  
-- bool [true]  
-- 是否显示下一页按钮  
  
nextClass  
-- string ["page_next"]  
-- 下一页按钮 css 样式类  
此类名在加载后会被修改为 pager_[sign]_[nextClass]  
  
nextText  
-- string [">"]  
-- 下一页按钮 显示的字符串  
  
showLast  
-- bool [true]  
-- 是否显示最后一页按钮  
  
lastClass  
-- string ["page_last"]  
-- 最后一页按钮 css 样式类  
此类名在加载后会被修改为 pager_[sign]_[lastClass]  
  
lastText  
-- string [">>"]  
-- 最后一页按钮显示的字符串  
  
redirect  
-- bool [true]  
-- 点击是否跳转 即点击按钮后是否出发页面url变化  
该设置为 true 时 点击后触发回调函数 然后跳转页面  
为 false 时 点击后触发回调函数 并阻止默认时间跳转  
  
callbackPara  
-- object [{ }]  
-- 回调函数携带的参数 即需要在回调函数中使用某些值时 可以组合 Json 结构的 Object 对象传入回调函数第二个参数 供回调函数内部使用  
  
callback  
-- object function [function (page, obj) { }]  
-- 回调函数 带二参数  
第一参数返回当前的 分页信息 指在点击了按钮后 页面产生变化后的分页信息 而不是当前分页信息  
page 结构为 { pagenum: 1, pagesize: 20, totalnum: 40, totalpage: 2 }   
obj 格式为自定义传入  
    
    