<template>
  <div>
    <div>
      <el-row class="tac">
        <el-col :span="12">
          <h5>自定义颜色</h5>
          <el-menu
            default-active="$route.path"
            class="el-menu-vertical-demo"
            router 

            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>

   
  </div>
</template>

<script>
import { userList } from "../api/api";
import axios from "axios";
import qs from "qs";
export default {
  name: "home",
  data() {
    return {
      userInfoList: [],
      addFormReadOnly: true,
      dialogVisible: false,
      dialogVisibleUp: false,
      isView: true,
      addFormData: {
        id: "",
        username: "",
        password: "",
        name: ""
      },
      rules2: {
        cUsername: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        cPwd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      filters: {
        name: ""
      }
    };
  },
  mounted: function() {
    this.loadData();
  },

  methods: {
    loadData() {
      let param = { filter: this.filters.name };
      axios.get("/user/list", param).then(result => {
        var _data = result.data;
        this.userInfoList = _data;
      });
    },

    getUsers() {
      let param = { filter: this.filters.name };

      axios.get("/user?name=" + this.filters.name).then(result => {
        var _data = result.data;
        this.userInfoList = _data;
      });
    },
    addUser() {
      this.addFormData = {
        name: "",
        username: "",
        password: ""
      };
      this.isView = true;
      this.dialogVisible = true;
      //    this.addFormReadOnly = false;
    },
    checkDetail(rowData) {
      this.addFormData = Object.assign({}, rowData);
      this.isView = false;
      this.dialogVisible = true;

      //    this.addFormReadOnly = true;
    },
    modifyUser(rowData) {
      this.addFormData = Object.assign({}, rowData);
      this.isView = true;
      this.dialogVisibleUp = true;
      //    this.addFormReadOnly = false;
    },
    deleteUser(rowData) {
      this.$alert("是否删除这条记录", "信息删除", {
        confirmButtonText: "确定",
        callback: action => {
          var params = {
            userId: rowData.id
          };

          axios.delete("/user/" + rowData.id, params).then(result => {
            console.info(result);
            if (result.data.success) {
              this.$message({
                type: "info",
                message: `已删除`
              });
            } else {
              this.$message({
                type: "info",
                message: `删除失败`
              });
            }
            this.loadData();
          });
        }
      });
    },
    //增加一条记录
    addSubmit() {
      //先判断表单是否通过了判断
      this.$refs.addFormData.validate(valid => {
        //代表通过验证 ,将参数传回后台
        if (valid) {
          let param = Object.assign({}, this.addFormData);
          axios.post("/user", qs.stringify(param)).then(result => {
            if (result.data.success) {
              this.$message({
                type: "info",
                message: "添加成功"
              });
              this.loadData();
            } else {
              this.$message({
                type: "info",
                message: "添加失败"
              });
            }
            this.dialogVisible = false;
          });
        }
      });
    },

    //修改一条记录
    upDate() {
      //先判断表单是否通过了判断
      this.$refs.addFormData.validate(valid => {
        //代表通过验证 ,将参数传回后台
        if (valid) {
          let param = Object.assign({}, this.addFormData);
          axios.put("/user", qs.stringify(param)).then(result => {
            if (result.data.success) {
              this.$message({
                type: "info",
                message: "修改成功"
              });
              this.loadData();
            } else {
              this.$message({
                type: "info",
                message: "修改失败"
              });
            }
            this.dialogVisibleUp = false;
          });
        }
      });
    }
  }
};
</script>

<style>
body {
  background: #dfe9fb;
}
</style>