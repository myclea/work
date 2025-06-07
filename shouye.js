// 从本地存储获取设备数据，如果没有则使用默认数据
const defaultDeviceData = [
    { id: 1, serialNo: '21060', status: '710290.62', type: '增加', rewardType: '' },
    { id: 2, serialNo: '11745', status: '789075.62', type: '增加', rewardType: '' },
    { id: 3, serialNo: '22275', status: '777330.62', type: '增加', rewardType: '' },
    { id: 4, serialNo: '22275', status: '755055.62', type: '增加', rewardType: '' },
    { id: 5, serialNo: '23490', status: '732780.62', type: '增加', rewardType: '' },
    { id: 6, serialNo: '21060', status: '709290.62', type: '增加', rewardType: '' },
    { id: 7, serialNo: '22275', status: '688230.62', type: '增加', rewardType: '' },
    { id: 8, serialNo: '23490', status: '665955.62', type: '增加', rewardType: '' },
    { id: 9, serialNo: '12345', status: '543210.00', type: '增加', rewardType: '' }
];

// 从本地存储中获取数据，如果没有则使用默认数据
let deviceData = [];

// DOM 元素
const tableBody = document.getElementById('tableBody');
const addItemBtn = document.getElementById('addItemBtn');
const itemModal = document.getElementById('itemModal');
const itemForm = document.getElementById('itemForm');
const modalTitle = document.getElementById('modalTitle');
const closeModal = itemModal.querySelector('.close');
const itemIdInput = document.getElementById('itemId');
const serialNoInput = document.getElementById('serialNo');
const statusInput = document.getElementById('status');
const typeInput = document.getElementById('deviceType');
const rewardTypeInput = document.getElementById('remark');

// 初始化函数 - 页面加载时调用
function initShouye() {
    console.log("首页初始化开始");
    
    // 先从本地存储中加载数据
    deviceData = loadDeviceDataFromStorage() || defaultDeviceData;
    
    // 刷新表格数据
    refreshTableData();
    
    // 添加事件监听器
    addEventListeners();
    
    console.log("首页初始化完成");
}

// 从本地存储中加载设备数据
function loadDeviceDataFromStorage() {
    try {
        console.log("尝试从本地存储加载数据");
        const storedData = localStorage.getItem('deviceData');
        if (storedData) {
            console.log("找到本地存储数据");
            const parsedData = JSON.parse(storedData);
            return parsedData;
        }
        console.log("未找到本地存储数据，使用默认数据");
        return null;
    } catch (error) {
        console.error('从本地存储加载数据失败:', error);
        return null;
    }
}

// 保存设备数据到本地存储
function saveDeviceDataToStorage() {
    try {
        localStorage.setItem('deviceData', JSON.stringify(deviceData));
        console.log('设备数据已保存到本地存储, 总条数:', deviceData.length);
    } catch (error) {
        console.error('保存数据到本地存储失败:', error);
    }
}

// 刷新表格数据
function refreshTableData() {
    console.log("刷新表格数据, 设备数量:", deviceData.length);
    // 清空表格
    tableBody.innerHTML = '';
    
    // 使用设备数据重新填充表格
    deviceData.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.serialNo}</td>
            <td>在线</td>
            <td><span class="type-badge type-add">${item.type}</span></td>
            <td><input type="text" class="reward-input" data-id="${item.id}" value="${item.rewardType || ''}"></td>
            <td>
                <button class="action-btn edit-btn" data-id="${item.id}">编辑</button>
                <button class="action-btn delete-btn" data-id="${item.id}">删除</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // 重新添加事件监听
    addRowEventListeners();
    
    // 添加奖励类型输入框的事件监听
    addRewardInputListeners();
}

// 为表格行添加事件监听
function addRowEventListeners() {
    // 添加编辑和删除按钮的事件监听
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    console.log(`找到 ${editButtons.length} 个编辑按钮和 ${deleteButtons.length} 个删除按钮`);
    
    editButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            console.log(`编辑按钮点击，ID: ${id}`);
            editItem(id);
        });
    });
    
    deleteButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            console.log(`删除按钮点击，ID: ${id}`);
            deleteItem(id);
        });
    });
}

// 为奖励类型输入框添加事件监听
function addRewardInputListeners() {
    const rewardInputs = document.querySelectorAll('.reward-input');
    
    rewardInputs.forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const newValue = this.value;
            
            // 更新设备数据
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

// 添加所有事件监听器
function addEventListeners() {
    console.log("正在添加事件监听器");
    
    // 新增设备按钮
    if (addItemBtn) {
        console.log("找到新增设备按钮，添加点击事件");
        addItemBtn.addEventListener('click', function() {
            console.log("新增设备按钮被点击");
            openAddModal();
        });
    } else {
        console.error("未找到新增设备按钮!");
    }
    
    // 关闭模态框按钮
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            console.log("关闭模态框按钮被点击");
            closeItemModal();
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === itemModal) {
            closeItemModal();
        }
    });
    
    // 表单提交事件
    if (itemForm) {
        itemForm.addEventListener('submit', function(e) {
            console.log("表单提交");
            handleFormSubmit(e);
        });
    }
    
    // 添加表格行事件监听
    addRowEventListeners();
}

// 打开添加设备模态框
function openAddModal() {
    console.log("打开新增设备模态框");
    modalTitle.textContent = '新增设备';
    itemIdInput.value = '';
    itemForm.reset();
    
    typeInput.value = '增加';
    rewardTypeInput.value = '激励广告';
    
    itemModal.style.display = 'block';
}

// 打开编辑设备模态框
function editItem(id) {
    console.log(`打开编辑模态框，ID: ${id}`);
    const item = deviceData.find(device => device.id === id);
    if (!item) {
        console.error(`未找到ID为 ${id} 的设备数据`);
        return;
    }
    
    modalTitle.textContent = '编辑设备';
    itemIdInput.value = item.id;
    serialNoInput.value = item.serialNo;
    statusInput.value = item.status;
    typeInput.value = item.type;
    rewardTypeInput.value = item.rewardType;
    
    itemModal.style.display = 'block';
}

// 删除设备
function deleteItem(id) {
    console.log(`删除设备，ID: ${id}`);
    if (confirm('确定要删除该设备吗？')) {
        // 更新数据数组
        deviceData = deviceData.filter(device => device.id !== id);
        // 更新本地存储
        saveDeviceDataToStorage();
        // 刷新表格
        refreshTableData();
        console.log(`设备 ID:${id} 已删除`);
    }
}

// 关闭模态框
function closeItemModal() {
    console.log("关闭模态框");
    itemModal.style.display = 'none';
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    console.log("处理表单提交");
    
    const nextId = deviceData.length > 0 ? Math.max(...deviceData.map(d => d.id)) + 1 : 1;
    const id = itemIdInput.value ? parseInt(itemIdInput.value) : nextId;
    const serialNo = serialNoInput.value;
    const status = statusInput.value;
    const type = typeInput.value;
    const rewardType = rewardTypeInput.value;
    
    // 检查是否已存在相同ID的设备
    const existingIndex = deviceData.findIndex(device => device.id === id);
    
    if (itemIdInput.value && existingIndex !== -1) {
        // 更新现有设备
        deviceData[existingIndex] = { id, serialNo, status, type, rewardType };
        console.log(`设备 ID:${id} 已更新`);
    } else if (!itemIdInput.value) {
        // 添加新设备，确保ID不重复
        const newDevice = { id, serialNo, status, type, rewardType };
        const isDuplicate = deviceData.some(device => 
            device.serialNo === serialNo && 
            device.status === status &&
            device.type === type &&
            device.rewardType === rewardType);
            
        if (!isDuplicate) {
            deviceData.push(newDevice);
            console.log(`新设备添加成功，ID:${id}`);
        } else {
            console.warn("检测到重复数据，跳过添加");
            alert("该设备已存在，请勿重复添加！");
            closeItemModal();
            return;
        }
    }
    
    // 保存到本地存储
    saveDeviceDataToStorage();
    // 刷新表格
    refreshTableData();
    
    closeItemModal();
}

// 确保DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM内容加载完成，初始化首页");
    // 不再每次自动清除数据，只在首次使用时清除一次
    // 如果需要重置数据，可以在浏览器控制台中手动调用 clearAllStorageAndReload() 函数
    // clearAllStorageAndReload();
    initShouye();
});

// 清除所有本地存储并重新加载默认数据的函数
// 如果需要重置数据，可以在控制台中调用 clearAllStorageAndReload()
function clearAllStorageAndReload() {
    console.log("清除所有本地存储数据并重新加载默认值");
    localStorage.removeItem('deviceData');
    localStorage.removeItem('userData');
    deviceData = [...defaultDeviceData];
    saveDeviceDataToStorage();
    refreshTableData();
} 