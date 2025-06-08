/**
 * 设备管理系统 - 首页JS
 * 负责设备列表的展示、添加、编辑和删除功能
 */

// ----------------- 1. 数据模型与初始化 -----------------

// 默认设备数据
const defaultDeviceData = [
    { id: 1, serialNo: '21060', status: '在线', type: '增加', rewardType: '激励广告' },
    { id: 2, serialNo: '11745', status: '在线', type: '增加', rewardType: '激励广告' },
    { id: 3, serialNo: '22275', status: '在线', type: '增加', rewardType: '激励广告' }
];

// 设备数据存储
let deviceData = [];

// ----------------- 2. DOM元素获取 -----------------

// 获取表格和按钮元素
const tableBody = document.getElementById('tableBody');
const addItemBtn = document.getElementById('addItemBtn');

// 获取模态框相关元素
const itemModal = document.getElementById('itemModal');
const itemForm = document.getElementById('itemForm');
const modalTitle = document.getElementById('modalTitle');
const closeModal = itemModal.querySelector('.close');

// 获取表单输入元素
const itemIdInput = document.getElementById('itemId');
const serialNoInput = document.getElementById('serialNo');
const statusInput = document.getElementById('status');
const typeInput = document.getElementById('deviceType');
const rewardTypeInput = document.getElementById('remark');

// ----------------- 3. 数据持久化函数 -----------------

/**
 * 从本地存储加载设备数据
 * @returns {Array} 设备数据数组或null
 */
function loadDeviceDataFromStorage() {
    try {
        const storedData = localStorage.getItem('deviceData');
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.error('从本地存储加载数据失败:', error);
        return null;
    }
}

/**
 * 保存设备数据到本地存储
 */
function saveDeviceDataToStorage() {
    try {
        localStorage.setItem('deviceData', JSON.stringify(deviceData));
        console.log('数据已保存，共', deviceData.length, '条记录');
    } catch (error) {
        console.error('保存数据到本地存储失败:', error);
    }
}

// ----------------- 4. 表格渲染函数 -----------------

/**
 * 刷新表格数据显示
 */
function refreshTableData() {
    // 清空表格
    tableBody.innerHTML = '';
    
    // 如果没有数据，显示空状态
    if (deviceData.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="5" class="empty-state">
                暂无设备数据
            </td>
        `;
        tableBody.appendChild(emptyRow);
    } else {
        // 遍历数据并创建表格行
        deviceData.forEach(item => {
            const row = document.createElement('tr');
            
            // 设置行内容
            row.innerHTML = `
                <td>${item.serialNo}</td>
                <td>${item.status}</td>
                <td><span class="type-badge type-add">${item.type}</span></td>
                <td><input type="text" class="reward-input" data-id="${item.id}" value="${item.rewardType || ''}"></td>
                <td>
                    <button class="action-btn delete-btn" data-id="${item.id}">删除</button>
                </td>
            `;
            
            // 添加到表格
            tableBody.appendChild(row);
        });
    }
    
    // 添加行事件监听
    addRowEventListeners();
    
    // 添加奖励类型输入框事件监听
    addRewardInputListeners();
}

// ----------------- 5. 事件监听器 -----------------

/**
 * 为表格行添加事件监听
 */
function addRowEventListeners() {
    // 删除按钮事件监听
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            deleteItem(id);
        });
    });
}

/**
 * 为奖励类型输入框添加事件监听
 */
function addRewardInputListeners() {
    document.querySelectorAll('.reward-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const newValue = this.value;
            
            // 找到设备并更新奖励类型
            const itemIndex = deviceData.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                deviceData[itemIndex].rewardType = newValue;
                // 保存到本地存储
                saveDeviceDataToStorage();
                console.log(`设备 ID:${id} 的奖励类型已更新为: ${newValue}`);
            }
        });
    });
}

/**
 * 添加所有事件监听器
 */
function addEventListeners() {
    console.log('添加事件监听器');
    
    // 新增设备按钮
    addItemBtn.addEventListener('click', function() {
        openAddModal();
    });
    
    // 关闭模态框按钮
    closeModal.addEventListener('click', function() {
        closeItemModal();
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === itemModal) {
            closeItemModal();
        }
    });
    
    // 表单提交事件
    itemForm.addEventListener('submit', function(e) {
        handleFormSubmit(e);
    });
    
    // 扫一扫按钮点击事件
    const scanButton = document.querySelector('.scan-button');
    if (scanButton) {
        scanButton.addEventListener('click', function() {
            alert('扫一扫功能暂未实现');
        });
    }
}

// ----------------- 6. 模态框操作函数 -----------------

/**
 * 打开添加设备模态框
 */
function openAddModal() {
    console.log('打开添加设备模态框');
    
    // 设置模态框标题
    modalTitle.textContent = '新增设备';
    
    // 重置表单
    itemIdInput.value = '';
    itemForm.reset();
    
    // 设置默认值
    typeInput.value = '增加';
    statusInput.value = '在线';
    rewardTypeInput.value = '';
    
    // 显示模态框
    itemModal.style.display = 'block';
}

/**
 * 打开编辑设备模态框
 * @param {number} id 设备ID
 */
function editItem(id) {
    console.log(`打开编辑设备模态框，ID: ${id}`);
    
    // 查找设备数据
    const item = deviceData.find(device => device.id === id);
    if (!item) {
        console.error(`未找到ID为 ${id} 的设备`);
        return;
    }
    
    // 设置模态框标题
    modalTitle.textContent = '编辑设备';
    
    // 填充表单数据
    itemIdInput.value = item.id;
    serialNoInput.value = item.serialNo;
    statusInput.value = item.status;
    typeInput.value = item.type;
    rewardTypeInput.value = item.rewardType || '';
    
    // 显示模态框
    itemModal.style.display = 'block';
}

/**
 * 关闭模态框
 */
function closeItemModal() {
    console.log('关闭模态框');
    itemModal.style.display = 'none';
}

// ----------------- 7. 数据操作函数 -----------------

/**
 * 处理表单提交
 * @param {Event} e 表单提交事件
 */
function handleFormSubmit(e) {
    e.preventDefault();
    console.log('处理表单提交');
    
    // 获取表单数据
    const nextId = deviceData.length > 0 ? Math.max(...deviceData.map(d => d.id)) + 1 : 1;
    const id = itemIdInput.value ? parseInt(itemIdInput.value) : nextId;
    const serialNo = serialNoInput.value;
    const status = statusInput.value;
    const type = typeInput.value;
    const rewardType = rewardTypeInput.value;
    
    // 检查必填字段
    if (!serialNo) {
        alert('请输入序列号');
        return;
    }
    
    // 检查是否是编辑现有设备
    const existingIndex = deviceData.findIndex(device => device.id === id);
    
    if (itemIdInput.value && existingIndex !== -1) {
        // 更新现有设备
        deviceData[existingIndex] = { id, serialNo, status, type, rewardType };
        console.log(`更新设备数据，ID: ${id}`);
    } else {
        // 检查序列号是否重复
        const isSerialNoExists = deviceData.some(device => device.serialNo === serialNo);
        
        if (isSerialNoExists) {
            alert('该序列号已存在，请使用其他序列号！');
            return;
        }
        
        // 添加新设备
        const newDevice = { id, serialNo, status, type, rewardType };
        deviceData.push(newDevice);
        console.log(`新增设备数据，ID: ${id}，序列号: ${serialNo}`);
    }
    
    // 保存到本地存储
    saveDeviceDataToStorage();
    
    // 刷新表格
    refreshTableData();
    
    // 关闭模态框
    closeItemModal();
}

/**
 * 删除设备
 * @param {number} id 设备ID
 */
function deleteItem(id) {
    console.log(`准备删除设备，ID: ${id}`);
    
    if (confirm('确定要删除该设备吗？')) {
        // 更新数据数组
        deviceData = deviceData.filter(device => device.id !== id);
        
        // 更新本地存储
        saveDeviceDataToStorage();
        
        // 刷新表格
        refreshTableData();
        
        console.log(`设备已删除，ID: ${id}`);
    }
}

/**
 * 重置数据到默认值
 */
function resetData() {
    console.log('重置数据到默认值');
    
    localStorage.removeItem('deviceData');
    deviceData = JSON.parse(JSON.stringify(defaultDeviceData));
    saveDeviceDataToStorage();
    refreshTableData();
    
    alert('数据已重置！');
}

// 为方便测试，添加全局重置函数
window.resetData = resetData;

// ----------------- 8. 初始化函数 -----------------

/**
 * 首页初始化函数
 */
function initShouye() {
    console.log('首页初始化开始');
    
    // 步骤1: 从本地存储加载数据，如果没有则使用默认数据
    deviceData = loadDeviceDataFromStorage() || defaultDeviceData;
    console.log(`加载了 ${deviceData.length} 条设备数据`);
    
    // 步骤2: 刷新表格数据
    refreshTableData();
    
    // 步骤3: 添加事件监听器
    addEventListeners();
    
    console.log('首页初始化完成');
}

// 注意：initShouye函数会在main.js中被调用，不需要重复添加事件监听器
// document.addEventListener('DOMContentLoaded', initShouye); 