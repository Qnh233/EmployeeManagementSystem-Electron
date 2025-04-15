const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

// 获取数据库文件路径
let dbPath;
if (process.env.NODE_ENV === 'development') {
  dbPath = path.join(app.getPath('userData'), 'hrms.db');
} else {
  // 在生产环境中，数据库文件应该放在用户数据目录
  dbPath = path.join(app.getPath('userData'), 'hrms.db');
}

// 创建数据库连接
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('数据库连接错误:', err);
  } else {
    console.log('成功连接到数据库:', dbPath);
  }
});

// 初始化数据库表
function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        gender TEXT,
        ethnicity TEXT,
        native_place TEXT,
        birth_date TEXT,
        work_start_date TEXT,
        hospital_start_date TEXT,
        political_status TEXT,
        education TEXT,
        graduation TEXT,
        professional_title TEXT,
        id_card TEXT,
        department TEXT,
        employment_type TEXT,
        phone TEXT,
        contract_end_date TEXT,
        remarks TEXT,
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('创建表错误:', err);
      } else {
        console.log('表创建成功或已存在');
      }
    });
  });
}

// 添加员工
function addEmployee(employee) {
  return new Promise((resolve, reject) => {
    const employeeData = {
      name: employee.name || '',
      gender: employee.gender || '',
      ethnicity: employee.ethnicity || '',
      native_place: employee.native_place || '',
      birth_date: employee.birth_date || '',
      work_start_date: employee.work_start_date || '',
      hospital_start_date: employee.hospital_start_date || '',
      political_status: employee.political_status || '',
      education: employee.education || '',
      graduation: employee.graduation || '',
      professional_title: employee.professional_title || '',
      id_card: employee.id_card || '',
      department: employee.department || '',
      employment_type: employee.employment_type || '',
      phone: employee.phone || '',
      contract_end_date: employee.contract_end_date || '',
      remarks: employee.remarks || ''
    };

    const stmt = db.prepare(`
      INSERT INTO employees (
        name, gender, ethnicity, native_place, birth_date, work_start_date,
        hospital_start_date, political_status, education, graduation,
        professional_title, id_card, department, employment_type, phone,
        contract_end_date, remarks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      employeeData.name,
      employeeData.gender,
      employeeData.ethnicity,
      employeeData.native_place,
      employeeData.birth_date,
      employeeData.work_start_date,
      employeeData.hospital_start_date,
      employeeData.political_status,
      employeeData.education,
      employeeData.graduation,
      employeeData.professional_title,
      employeeData.id_card,
      employeeData.department,
      employeeData.employment_type,
      employeeData.phone,
      employeeData.contract_end_date,
      employeeData.remarks,
      function(err) {
        if (err) {
          console.error('添加员工错误:', err);
          reject(err);
        } else {
          console.log('添加员工成功，ID:', this.lastID);
          resolve(this.lastID);
        }
      }
    );
    stmt.finalize();
  });
}

// 删除员工
function deleteEmployee(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM employees WHERE id = ?', id, function(err) {
      if (err) {
        console.error('删除员工错误:', err);
        reject(err);
      } else {
        console.log('删除员工成功，影响行数:', this.changes);
        resolve(this.changes);
      }
    });
  });
}

// 获取所有员工
function getAllEmployees() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM employees ORDER BY create_time DESC', (err, rows) => {
      if (err) {
        console.error('获取员工列表错误:', err);
        reject(err);
      } else {
        console.log('获取员工列表成功，数量:', rows.length);
        resolve(rows);
      }
    });
  });
}

// 更新员工信息
function updateEmployee(id, employee) {
  return new Promise((resolve, reject) => {
    const employeeData = {
      name: employee.name || '',
      gender: employee.gender || '',
      ethnicity: employee.ethnicity || '',
      native_place: employee.native_place || '',
      birth_date: employee.birth_date || '',
      work_start_date: employee.work_start_date || '',
      hospital_start_date: employee.hospital_start_date || '',
      political_status: employee.political_status || '',
      education: employee.education || '',
      graduation: employee.graduation || '',
      professional_title: employee.professional_title || '',
      id_card: employee.id_card || '',
      department: employee.department || '',
      employment_type: employee.employment_type || '',
      phone: employee.phone || '',
      contract_end_date: employee.contract_end_date || '',
      remarks: employee.remarks || ''
    };

    const stmt = db.prepare(`
      UPDATE employees SET
        name = ?, gender = ?, ethnicity = ?, native_place = ?, birth_date = ?,
        work_start_date = ?, hospital_start_date = ?, political_status = ?,
        education = ?, graduation = ?, professional_title = ?, id_card = ?,
        department = ?, employment_type = ?, phone = ?, contract_end_date = ?,
        remarks = ?
      WHERE id = ?
    `);
    
    stmt.run(
      employeeData.name,
      employeeData.gender,
      employeeData.ethnicity,
      employeeData.native_place,
      employeeData.birth_date,
      employeeData.work_start_date,
      employeeData.hospital_start_date,
      employeeData.political_status,
      employeeData.education,
      employeeData.graduation,
      employeeData.professional_title,
      employeeData.id_card,
      employeeData.department,
      employeeData.employment_type,
      employeeData.phone,
      employeeData.contract_end_date,
      employeeData.remarks,
      id,
      function(err) {
        if (err) {
          console.error('更新员工错误:', err);
          reject(err);
        } else {
          console.log('更新员工成功，ID:', id);
          resolve(this.changes);
        }
      }
    );
    stmt.finalize();
  });
}

// 根据条件查询员工
function searchEmployees(conditions) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM employees WHERE 1=1';
    const params = [];

    if (conditions.name) {
      query += ' AND name LIKE ?';
      params.push(`%${conditions.name}%`);
    }
    if (conditions.gender) {
      query += ' AND gender = ?';
      params.push(conditions.gender);
    }
    if (conditions.department) {
      query += ' AND department LIKE ?';
      params.push(`%${conditions.department}%`);
    }
    if (conditions.employment_type) {
      query += ' AND employment_type = ?';
      params.push(conditions.employment_type);
    }
    if (conditions.education) {
      query += ' AND education = ?';
      params.push(conditions.education);
    }
    if (conditions.professional_title) {
      query += ' AND professional_title LIKE ?';
      params.push(`%${conditions.professional_title}%`);
    }

    query += ' ORDER BY create_time DESC';

    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('查询员工错误:', err);
        reject(err);
      } else {
        // 确保返回的数据是可序列化的
        const serializableRows = rows.map(row => ({
          ...row,
          birth_date: row.birth_date || '',
          work_start_date: row.work_start_date || '',
          hospital_start_date: row.hospital_start_date || '',
          contract_end_date: row.contract_end_date || ''
        }));
        console.log('查询员工成功，数量:', serializableRows.length);
        resolve(serializableRows);
      }
    });
  });
}

// 初始化数据库
initDatabase();

module.exports = {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
  searchEmployees
}; 