<template>
  <div>
    <h1>{{ name }}</h1>
    <ul>
      <li v-for="v in obj" :key="v">{{ v }}</li>
    </ul>
    <el-row>
      <el-button type="primary" @click="addObj">主要按钮</el-button>
    </el-row>
    <attrs-dom
      :aoo="aoo"
      :boo="boo"
      :coo="coo"
      :roo="roo"
      v-on:attrs2="getChild"
    ></attrs-dom>
    <el-table :data="tableData" style="width: 95%;margin: 10px auto;">
      <el-table-column prop="status" label="状态" width="120">
      </el-table-column>
      <el-table-column prop="theme" label="主题" width="300"> </el-table-column>
      <el-table-column prop="content" label="内容" width="300">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100"> </el-table-column>
      <el-table-column prop="date" label="添加时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="clickType(scope.row, scope.$index)"
            type="text"
            size="small"
          >
            {{ scope.row.codeText }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑内容" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="主题" :label-width="formLabelWidth">
          <el-input v-model="form.theme" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="公告" value="公告"></el-option>
            <el-option label="通知" value="通知"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/**
 * 简单来说： $attrs与 $listeners 是两个对象，
 * $attrs 里存放的是父组件中绑定的非 Props 属性，
 * $listeners里存放的是父组件中绑定的非原生事件。
 */
const attrsDom = () => import("./childs/attrs");
export default {
  components: {
    attrsDom
  },
  props: {
    roo: {
      type: String,
      default: function() {
        return "Node";
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        theme: "",
        content: "",
        type: "",
        date: ""
      },
      formLabelWidth: "120px",
      name: "我是子组件3",
      obj: {
        a: "smr"
      },
      aoo: "vue",
      boo: "react",
      coo: "angular",
      map: null,
      sta: {},
      tableData: [
        {
          status: "已发布",
          theme: "关于拍卖立项的通知",
          content: "这是一段内容...",
          type: "公告",
          typeCode: 1,
          codeText: "撤回",
          date: "2016-05-02"
        },
        {
          status: "已发布",
          theme: "关于拍卖立项的通知",
          content: "这是一段内容...",
          type: "公告",
          typeCode: 1,
          codeText: "撤回",
          date: "2016-05-02"
        },
        {
          status: "已撤回",
          theme: "关于拍卖立项的通知",
          content: "这是一段内容...",
          type: "公告",
          typeCode: 2,
          codeText: "编辑",
          date: "2016-05-11"
        },
        {
          status: "待发布",
          theme: "关于拍卖立项的通知",
          content: "这是一段内容...",
          type: "公告",
          typeCode: 3,
          codeText: "发布",
          date: "2016-05-02"
        }
      ]
    };
  },
  created() {
    this.map = new Map([
      [1, this.recallClick],
      [2, this.editClick],
      [3, this.pushClick]
    ]);
  },
  methods: {
    addObj() {
      // this.obj.b = "obj.b";
      this.$set(this.obj, "b", "obj.b");
      console.log(this.obj);
    },
    getChild(e) {
      console.log("success getValue");
      console.log(e);
    },
    clickType(row, index) {
      let fun = this.map.get(row.typeCode);
      fun(row, index);
    },
    //编辑
    editClick(row, index) {
      this.sta = { row, index };
      this.dialogFormVisible = true;
      let { theme, content, type, date } = this.tableData[index];
      this.form = { theme, content, type, date };
    },
    //撤回
    recallClick(row, index) {
      let { status, typeCode, codeText } = this.tableData[index];
      this.$alert("", "是否撤回?", {
        confirmButtonText: "撤回",
        center: true,
        callback: action => {
          if (action === "cancel") {
            this.$message("取消撤回");
            return;
          }
          status = "已撤回";
          typeCode = 2;
          codeText = "编辑";
          row.status = status;
          row.typeCode = typeCode;
          row.codeText = codeText;
          this.$message({
            message: "撤回成功",
            type: "success"
          });
        }
      });
      // console.log(row);
    },
    //发布
    pushClick(row, index) {
      let { status, typeCode, codeText } = this.tableData[index];
      this.$alert("", "是否发布?", {
        confirmButtonText: "发布",
        center: true,
        callback: action => {
          if (action === "cancel") {
            this.$message("取消发布");
            return;
          }
          status = "已发布";
          typeCode = 1;
          codeText = "撤回";
          row.status = status;
          row.typeCode = typeCode;
          row.codeText = codeText;
          this.$message({
            message: "发布成功",
            type: "success"
          });
        }
      });
      // console.log(row);
    },
    //保存
    save() {
      this.$message({
        message: "编辑成功",
        type: "success"
      });
      let { row, index } = this.sta;
      let { status, typeCode, codeText } = this.tableData[index];
      let { theme, content, type, date } = this.form;
      status = "待发布";
      typeCode = 3;
      codeText = "发布";
      row.status = status;
      row.typeCode = typeCode;
      row.codeText = codeText;
      row.theme = theme;
      row.content = content;
      row.type = type;
      row.date = date;
      this.dialogFormVisible = false;
      // console.log(this.form);
    },
    //取消
    cancel() {
      this.$message("取消保存");
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style lang="less" scoped></style>
