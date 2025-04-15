<template>
  <div class="employee-management">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? '编辑员工信息' : '添加新员工' }}</span>
          <div class="header-actions">
            <el-button v-if="isEdit" @click="handleBack">返回添加</el-button>
          </div>
        </div>
      </template>
      <el-form :model="employeeForm" label-width="120px" :rules="rules" ref="employeeForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="employeeForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="employeeForm.gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族" prop="ethnicity">
              <el-input v-model="employeeForm.ethnicity" placeholder="请输入民族"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="籍贯" prop="native_place">
              <el-input v-model="employeeForm.native_place" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" prop="birth_date">
              <el-date-picker v-model="employeeForm.birth_date" type="date" placeholder="请选择出生日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="参加工作时间" prop="work_start_date">
              <el-date-picker v-model="employeeForm.work_start_date" type="date" placeholder="请选择参加工作时间"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="来院时间" prop="hospital_start_date">
              <el-date-picker v-model="employeeForm.hospital_start_date" type="date" placeholder="请选择来院时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌" prop="political_status">
              <el-select v-model="employeeForm.political_status" placeholder="请选择政治面貌">
                <el-option label="中共党员" value="中共党员"></el-option>
                <el-option label="共青团员" value="共青团员"></el-option>
                <el-option label="群众" value="群众"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度" prop="education">
              <el-select v-model="employeeForm.education" placeholder="请选择文化程度">
                <el-option label="博士" value="博士"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="大专" value="大专"></el-option>
                <el-option label="中专" value="中专"></el-option>
                <el-option label="高中" value="高中"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="毕业院校及专业" prop="graduation">
              <el-input v-model="employeeForm.graduation" placeholder="请输入毕业院校及专业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业技术职务" prop="professional_title">
              <el-input v-model="employeeForm.professional_title" placeholder="请输入专业技术职务"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="身份证号" prop="id_card">
              <el-input v-model="employeeForm.id_card" placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在科室" prop="department">
              <el-input v-model="employeeForm.department" placeholder="请输入所在科室"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="聘用方式" prop="employment_type">
              <el-select v-model="employeeForm.employment_type" placeholder="请选择聘用方式">
                <el-option label="正式" value="正式"></el-option>
                <el-option label="临时" value="临时"></el-option>
                <el-option label="合同" value="合同"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="employeeForm.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同到期时间" prop="contract_end_date">
              <el-date-picker v-model="employeeForm.contract_end_date" type="date" placeholder="请选择合同到期时间"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="employeeForm.remarks" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">{{ isEdit ? '保存' : '添加' }}</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            accept=".xlsx,.xls"
            :on-change="handleFileChange"
          >
            <el-button type="primary">导入Excel</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="list-card">
      <template #header>
        <div class="card-header">
          <span>员工列表</span>
          <div class="search-container">
            <el-button type="primary" @click="handleExportExcel">导出Excel</el-button>
            <el-button type="primary" @click="showColumnDialog = true">显示控制</el-button>
            <el-input
              v-model="searchForm.name"
              placeholder="姓名"
              style="width: 120px"
              clearable
              @clear="handleSearch"
            />
            <el-select
              v-model="searchForm.gender"
              placeholder="性别"
              style="width: 100px"
              clearable
              @clear="handleSearch"
            >
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
            <el-input
              v-model="searchForm.department"
              placeholder="科室"
              style="width: 120px"
              clearable
              @clear="handleSearch"
            />
            <el-select
              v-model="searchForm.employment_type"
              placeholder="聘用方式"
              style="width: 120px"
              clearable
              @clear="handleSearch"
            >
              <el-option label="正式" value="正式"></el-option>
              <el-option label="临时" value="临时"></el-option>
              <el-option label="合同" value="合同"></el-option>
            </el-select>
            <el-select
              v-model="searchForm.education"
              placeholder="文化程度"
              style="width: 120px"
              clearable
              @clear="handleSearch"
            >
              <el-option label="博士" value="博士"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="中专" value="中专"></el-option>
              <el-option label="高中" value="高中"></el-option>
            </el-select>
            <el-input
              v-model="searchForm.professional_title"
              placeholder="专业技术职务"
              style="width: 150px"
              clearable
              @clear="handleSearch"
            />
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </div>
        </div>
      </template>
      <el-table 
        :data="employees" 
        style="width: 100%" 
        v-loading="loading"
        :key="tableKey"
        @selection-change="handleSelectionChange"
      >
        <el-table-column 
          v-for="col in visibleColumns" 
          :key="col.prop"
          :prop="col.prop" 
          :label="col.label" 
          :width="col.width"
          :fixed="col.fixed"
        ></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 字段显示控制对话框 -->
    <el-dialog
      title="显示控制"
      v-model="showColumnDialog"
      width="500px"
    >
      <div class="column-control-header">
        <el-checkbox
          v-model="isAllSelected"
          @change="handleSelectAll"
        >
          全选
        </el-checkbox>
      </div>
      <el-checkbox-group v-model="selectedColumns">
        <el-checkbox 
          v-for="col in allColumns" 
          :key="col.prop" 
          :label="col.prop"
        >
          {{ col.label }}
        </el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showColumnDialog = false">取消</el-button>
          <el-button type="primary" @click="handleColumnConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron');
import { debounce } from 'lodash';
const XLSX = window.require('xlsx');

export default {
  name: 'EmployeeManagement',
  data() {
    return {
      loading: false,
      isEdit: false,
      currentId: null,
      showColumnDialog: false,
      isAllSelected: false,
      tableKey: 0,
      selectedColumns: ['id', 'name', 'gender', 'department', 'employment_type'],
      allColumns: [
        { prop: 'id', label: '序号', width: '80' },
        { prop: 'name', label: '姓名', width: '100' },
        { prop: 'gender', label: '性别', width: '80' },
        { prop: 'ethnicity', label: '民族', width: '80' },
        { prop: 'native_place', label: '籍贯', width: '120' },
        { prop: 'birth_date', label: '出生日期', width: '120' },
        { prop: 'work_start_date', label: '参加工作时间', width: '120' },
        { prop: 'hospital_start_date', label: '来院时间', width: '120' },
        { prop: 'political_status', label: '政治面貌', width: '100' },
        { prop: 'education', label: '文化程度', width: '100' },
        { prop: 'graduation', label: '毕业院校及专业', width: '200' },
        { prop: 'professional_title', label: '专业技术职务', width: '150' },
        { prop: 'id_card', label: '身份证号', width: '180' },
        { prop: 'department', label: '所在科室', width: '120' },
        { prop: 'employment_type', label: '聘用方式', width: '100' },
        { prop: 'phone', label: '联系电话', width: '120' },
        { prop: 'contract_end_date', label: '合同到期时间', width: '120' }
      ],
      searchForm: {
        name: '',
        gender: '',
        department: '',
        employment_type: '',
        education: '',
        professional_title: ''
      },
      employeeForm: {
        name: '',
        gender: '',
        ethnicity: '',
        native_place: '',
        birth_date: '',
        work_start_date: '',
        hospital_start_date: '',
        political_status: '',
        education: '',
        graduation: '',
        professional_title: '',
        id_card: '',
        department: '',
        employment_type: '',
        phone: '',
        contract_end_date: '',
        remarks: ''
      },
      employees: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        id_card: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        phone: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    visibleColumns() {
      return this.allColumns.filter(col => this.selectedColumns.includes(col.prop));
    }
  },
  watch: {
    selectedColumns: {
      handler(newVal) {
        this.isAllSelected = newVal.length === this.allColumns.length;
      },
      deep: true
    }
  },
  created() {
    this.loadEmployees();
    this.debouncedSearch = debounce(this.handleSearch, 500);
    
    // 从本地存储加载之前保存的列选择
    const savedColumns = localStorage.getItem('selectedColumns');
    if (savedColumns) {
      this.selectedColumns = JSON.parse(savedColumns);
    }
  },
  methods: {
    loadEmployees() {
      this.loading = true;
      ipcRenderer.invoke('get-all-employees')
        .then(employees => {
          this.employees = employees;
        })
        .catch(err => {
          console.error('加载员工列表失败:', err);
          this.$message.error('加载员工列表失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSearch() {
      this.loading = true;
      const searchConditions = {};
      for (const [key, value] of Object.entries(this.searchForm)) {
        if (value) {
          searchConditions[key] = value;
        }
      }
      
      ipcRenderer.invoke('search-employees', searchConditions)
        .then(employees => {
          this.employees = employees;
          this.$message.success(`找到 ${employees.length} 条记录`);
        })
        .catch(err => {
          console.error('搜索员工失败:', err);
          this.$message.error('搜索员工失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetSearch() {
      this.searchForm = {
        name: '',
        gender: '',
        department: '',
        employment_type: '',
        education: '',
        professional_title: ''
      };
      this.loadEmployees();
    },
    handleSubmit() {
      this.$refs.employeeForm.validate((valid) => {
        if (valid) {
          // 格式化日期字段
          const formData = {
            ...this.employeeForm,
            birth_date: this.employeeForm.birth_date ? new Date(this.employeeForm.birth_date).toISOString().split('T')[0] : '',
            work_start_date: this.employeeForm.work_start_date ? new Date(this.employeeForm.work_start_date).toISOString().split('T')[0] : '',
            hospital_start_date: this.employeeForm.hospital_start_date ? new Date(this.employeeForm.hospital_start_date).toISOString().split('T')[0] : '',
            contract_end_date: this.employeeForm.contract_end_date ? new Date(this.employeeForm.contract_end_date).toISOString().split('T')[0] : ''
          };

          if (this.isEdit) {
            ipcRenderer.invoke('update-employee', this.currentId, formData)
              .then(() => {
                this.$message.success('更新成功');
                this.resetForm();
                this.loadEmployees();
              })
              .catch(err => {
                console.error('更新员工失败:', err);
                this.$message.error('更新员工失败');
              });
          } else {
            ipcRenderer.invoke('add-employee', formData)
              .then(() => {
                this.$message.success('添加成功');
                this.resetForm();
                this.loadEmployees();
              })
              .catch(err => {
                console.error('添加员工失败:', err);
                this.$message.error('添加员工失败');
              });
          }
        }
      });
    },
    handleEdit(row) {
      this.isEdit = true;
      this.currentId = row.id;
      // 处理日期字段
      const employeeData = {
        ...row,
        birth_date: row.birth_date ? new Date(row.birth_date) : '',
        work_start_date: row.work_start_date ? new Date(row.work_start_date) : '',
        hospital_start_date: row.hospital_start_date ? new Date(row.hospital_start_date) : '',
        contract_end_date: row.contract_end_date ? new Date(row.contract_end_date) : ''
      };
      this.employeeForm = employeeData;
    },
    handleDelete(id) {
      this.$confirm('确认删除该员工信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ipcRenderer.invoke('delete-employee', id)
          .then(() => {
            this.$message.success('删除成功');
            this.loadEmployees();
          })
          .catch(err => {
            console.error('删除员工失败:', err);
            this.$message.error('删除员工失败');
          });
      });
    },
    resetForm() {
      this.isEdit = false;
      this.currentId = null;
      this.$refs.employeeForm.resetFields();
      this.employeeForm = {
        name: '',
        gender: '',
        ethnicity: '',
        native_place: '',
        birth_date: '',
        work_start_date: '',
        hospital_start_date: '',
        political_status: '',
        education: '',
        graduation: '',
        professional_title: '',
        id_card: '',
        department: '',
        employment_type: '',
        phone: '',
        contract_end_date: '',
        remarks: ''
      };
    },
    handleBack() {
      this.isEdit = false;
      this.currentId = null;
      this.resetForm();
    },
    handleFileChange(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          // 验证表头
          const requiredHeaders = [
            '姓名', '性别', '民族', '籍贯', '出生日期', '参加工作时间',
            '来院时间', '政治面貌', '文化程度', '毕业院校及专业',
            '专业技术职务', '身份证号', '所在科室', '聘用方式', '联系电话',
            '合同到期时间'
          ];

          const headers = Object.keys(jsonData[0] || {});
          const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
          
          if (missingHeaders.length > 0) {
            this.$message.error(`缺少必要的表头: ${missingHeaders.join(', ')}`);
            return;
          }

          // 验证数据
          const validData = jsonData.filter(row => {
            return row['姓名'] && row['身份证号'] && 
                   /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(row['身份证号']);
          });

          if (validData.length !== jsonData.length) {
            this.$message.warning(`有 ${jsonData.length - validData.length} 条数据不符合要求，将被忽略`);
          }

          if (validData.length === 0) {
            this.$message.error('没有有效的数据可以导入');
            return;
          }

          // 转换数据格式
          const employees = validData.map(row => ({
            name: row['姓名'],
            gender: row['性别'],
            ethnicity: row['民族'],
            native_place: row['籍贯'],
            birth_date: row['出生日期'],
            work_start_date: row['参加工作时间'],
            hospital_start_date: row['来院时间'],
            political_status: row['政治面貌'],
            education: row['文化程度'],
            graduation: row['毕业院校及专业'],
            professional_title: row['专业技术职务'],
            id_card: row['身份证号'],
            department: row['所在科室'],
            employment_type: row['聘用方式'],
            phone: row['联系电话'],
            contract_end_date: row['合同到期时间'],
            remarks: row['备注'] || ''
          }));

          // 批量导入数据
          this.importEmployees(employees);
        } catch (error) {
          console.error('处理Excel文件失败:', error);
          this.$message.error('处理Excel文件失败');
        }
      };
      reader.readAsArrayBuffer(file.raw);
    },
    async importEmployees(employees) {
      this.loading = true;
      try {
        let successCount = 0;
        let failCount = 0;

        for (const employee of employees) {
          try {
            await ipcRenderer.invoke('add-employee', employee);
            successCount++;
          } catch (error) {
            console.error('导入员工失败:', error);
            failCount++;
          }
        }

        this.$message.success(`导入完成：成功 ${successCount} 条，失败 ${failCount} 条`);
        this.loadEmployees();
      } catch (error) {
        console.error('批量导入失败:', error);
        this.$message.error('批量导入失败');
      } finally {
        this.loading = false;
      }
    },
    async handleExportExcel() {
      try {
        // 创建工作簿
        const wb = XLSX.utils.book_new();
        
        // 准备数据
        const exportData = this.employees.map(emp => ({
          '姓名': emp.name,
          '性别': emp.gender,
          '民族': emp.ethnicity,
          '籍贯': emp.native_place,
          '出生日期': emp.birth_date,
          '参加工作时间': emp.work_start_date,
          '来院时间': emp.hospital_start_date,
          '政治面貌': emp.political_status,
          '文化程度': emp.education,
          '毕业院校及专业': emp.graduation,
          '专业技术职务': emp.professional_title,
          '身份证号': emp.id_card,
          '所在科室': emp.department,
          '聘用方式': emp.employment_type,
          '联系电话': emp.phone,
          '合同到期时间': emp.contract_end_date,
          '备注': emp.remarks
        }));

        // 创建工作表
        const ws = XLSX.utils.json_to_sheet(exportData);
        
        // 将工作表添加到工作簿
        XLSX.utils.book_append_sheet(wb, ws, "员工信息");

        // 将工作簿转换为二进制数据
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        // 发送数据到主进程
        const filePath = await ipcRenderer.invoke('save-excel-file', {
          buffer: excelBuffer,
          defaultPath: `员工信息_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`
        });

        if (filePath) {
          this.$message.success('导出成功');
        }
      } catch (error) {
        console.error('导出Excel失败:', error);
        this.$message.error('导出Excel失败');
      }
    },
    handleColumnConfirm() {
      // 保存选择的列到本地存储
      localStorage.setItem('selectedColumns', JSON.stringify(this.selectedColumns));
      this.showColumnDialog = false;
      // 强制表格重新渲染
      this.tableKey += 1;
    },
    handleSelectAll(val) {
      if (val) {
        this.selectedColumns = this.allColumns.map(col => col.prop);
      } else {
        this.selectedColumns = ['id', 'name', 'gender', 'department', 'employment_type'];
      }
    },
    handleSelectionChange() {
      // 空方法，用于处理表格选择变化事件
    }
  }
};
</script>

<style scoped>
.employee-management {
  padding: 20px;
}
.form-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-actions {
  display: flex;
  gap: 10px;
}
.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
}
.upload-demo {
  margin-left: 10px;
}
.column-control-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdfe6;
}
</style> 