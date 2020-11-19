<template>
  <div>

<router-view/>
    <div>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getUsers">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="addUser">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="userInfoList" style="width: 100%">
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="nickName" label="名字" width="180">
        </el-table-column>
        <el-table-column prop="passWord" label="密码" width="180">
        </el-table-column>
        <el-table-column prop="name" label="账号" width="180">
        </el-table-column>
        <!--第二步  开始进行修改和查询操作-->
        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button> -->

            <el-button type="info" @click="modifyUser(scope.row)"
              >修改</el-button
            >

            <el-button type="info" @click="deleteUser(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <!--编辑与增加的页面-->
      </el-table>
      <!--新增界面-->
      <el-dialog
        title="记录"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-modal="false"
      >
        <!-- class="demo-ruleForm login-container"   登录用户 -->
        <el-form
          :model="addFormData"
          :rules="rules2"
          ref="addFormData"
          label-width="0px"
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="addFormData.username"
              auto-complete="off"
              placeholder="账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="addFormData.password"
              auto-complete="off"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input
              type="name"
              v-model="addFormData.name"
              auto-complete="off"
              placeholder="昵称"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click.native="
              (dialogVisible = false),
                (addFormData = { id: '', username: '', password: '', name: '' })
            "
            >取 消</el-button
          >
          <el-button v-if="isView" type="primary" @click.native="addSubmit"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!--修改界面-->
      <!-- https://blog.csdn.net/ju__ju/article/details/100120624 确认密码等参考 -->
      <el-dialog
        title="修改"
        :visible.sync="dialogVisibleUp"
        width="50%"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addFormData"
          :rules="rules2"
          ref="addFormData"
          label-width="0px"
        >
          <el-form-item prop="name">
            <el-input
              type="text"
              v-model="addFormData.name"
              auto-complete="off"
              disabled="disabled"
              placeholder="账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="addFormData.password"
              auto-complete="off"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              type="username"
              v-model="addFormData.username"
              auto-complete="off"
              placeholder="昵称"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click.native="
              (dialogVisibleUp = false),
                (addFormData = { id: '', username: '', password: '', name: '' })
            "
            >取 消</el-button
          >
          <el-button v-if="isView" type="primary" @click.native="upDate"
            >确 定</el-button
          >
        </span>
      </el-dialog>
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