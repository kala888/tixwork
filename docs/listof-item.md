### 使用Listof Item

listof 列表中哪些一个一个的小组件

#### 概念和对象



|                 |                                                                                                           |                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| auto            | 根据image的数量来自动展示未0，1，2，3图, 其中Image的数量遵循规则：如果有imageUrl，则判定为1图，否则拼接editorSuggestionImageList和imageList 这两个属性 | title，brief, displayTime                                                            |
| only-title      | auto模板，强制指定图片数量=0                                                                                         |                                                                                     |
| single-image    | auto模板，强制指定图片数量=1                                                                                         |                                                                                     |
| double-image    | auto模板，强制指定图片数量=2                                                                                         |                                                                                     |
| three-image     | auto模板，强制指定图片数量=3                                                                                         |                                                                                     |
| image-on-bottom | 类似auto，强制指定图片数量=1，但是图在下面                                                                                  |                                                                                     |
| waterfall       | 上面一张图，下面文字，左右两列                                                                                           | title, brief，imageUrl                                                               |
| user            | 左边头像，右边title和brief                                                                                        | title, brief, imageUrl                                                              |
| product         | 产品                                                                                                        | preTag = '', tags = [], brand, name, price，imageUrl                                 |
| card            | 卡片，作图，右边文字，下面一坨actionList，右上角有一个状态的角标                                                                     | imageUrl, title, brief, createTime, actionList, status                              |
| document        | Card的子类，支持文件查看和下载                                                                                         | imageUrl, title, brief, createTime, actionList = [], status, downloadUrl, linkToUrl |
