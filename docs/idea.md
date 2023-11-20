
#### 1. tixwork-ui, 格式化设置

###### 1.1 接受format

idea 格式化和format不一致：打开.prettierrc文件，点击右键，Apply Prettier Style Rules 或者修改rule后，接受提示"Use code style base on Prettier for this project?"
 如果idea中格式化还报jsx/react-tag-spacing错误设置idea：Code Style -> HTML -> Other -> Spaces -> In empty tag

###### 1.2 双引号问题
<User title={"xxx"}> 格式化时变单引号：Editor=>Code Style=>HTML=>Other=>Generated quote marks=>Double



#### 2. tixwork-service 在idea的project view中出现多个目录

如果出现两个tixwork-service目录。一个是module group可以执行, 删除那个project view

```shell
find . -name "*.iml"|xargs rm -rf
```

###### 2.1 连续格式化，导致自定义换行删除
Editor --> General --> Smart Keys, 去掉勾选 Reformat again to remove custom line breaks
