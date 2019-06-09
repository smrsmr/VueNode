<template>
  <div class="tree-content">
    <h1>tree</h1>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>

    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-click="handleClickChange"
      ref="tree"
    >
    </el-tree>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="8"
        ><el-input v-model="input1" placeholder="请输入内容"></el-input>
        +
      </el-col>
      <el-col :span="8"
        ><el-input v-model="input2" placeholder="请输入内容"></el-input
        >=</el-col
      >
      <el-col :span="8"
        ><el-input v-model="sum" placeholder="请输入内容"></el-input
      ></el-col>
    </el-row>
    <p>
      <el-tag
        v-for="tag in name"
        :key="tag.id"
        closable
        type="orange"
        @close="handleClose(tag)"
      >
        {{ tag.label }}
      </el-tag>
    </p>
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="searchValue"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchClick"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: "tree",
  data() {
    return {
      filterText: "",
      name: [],
      input: "",
      searchValue: "",
      input1: 0,
      input2: 0,
      data: [
        {
          id: 1,
          label: "个人员工",
          children: [
            {
              id: 2,
              label: "张三"
            },
            {
              id: 3,
              label: "李四"
            },
            {
              id: 4,
              label: "王五"
            },
            {
              id: 5,
              label: "吴六"
            }
          ]
        },
        {
          id: 6,
          label: "企业员工",
          children: [
            {
              id: 7,
              label: "顺为-小李"
            },
            {
              id: 8,
              label: "珠控-小王"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    sum() {
      return parseInt(this.input1) + parseInt(this.input2);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClickChange(data) {
      if (data.children) return;
      if (this._.includes(this.name, data)) return;
      this.name.push(data);
    },
    handleClose(tag) {
      this.name.splice(this.name.indexOf(tag), 1);
    },
    searchClick() {
      console.log(this.name);
    }
  }
};
</script>
<style lang="less">
.tree-content {
  padding-left: 20px;
}
.el-tag.el-tag--orange {
  background-color: orange;
  border-color: orange;
  color: white;
}
.el-tag {
  margin-right: 6px;
}
.el-icon-caret-right:before {
  content: "\e62c";
  font-size: 16px;
  font-family: iconfont !important;
}
.el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  content: "\e6d4";
}
.el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0);
  transform: rotate(0);
}
.el-input {
  width: 300px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input__inner:focus {
  outline: 0;
  border: 1px solid #dcdfe6;
}
.el-icon-search:before {
  content: "\e60f";
  font-size: 16px;
  font-family: iconfont !important;
}
</style>
