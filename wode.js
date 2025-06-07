// 用户数据对象，可以从本地存储中获取
const defaultUserData = {
    name: '刘明泽',
    inviteCode: '0',
    avatar: 'https://via.placeholder.com/80',
    phone: '13800138000',
    email: 'user@example.com',
    balance: '3942.00',            // 账号余额
    totalIncome: '257300.00',      // 累计收入
    withdrawable: '3942.00'        // 可提现金额
};

// 从本地存储中获取用户数据，如果没有则使用默认数据
let userData = loadUserDataFromStorage() || defaultUserData;

// DOM 元素
const userName = document.getElementById('userName');
const userAvatar = document.getElementById('userAvatar');
const inviteCode = document.getElementById('inviteCode');
const userEditModal = document.getElementById('userEditModal');
const userEditForm = document.getElementById('userEditForm');
const editName = document.getElementById('editName');
const editInviteCode = document.getElementById('editInviteCode');
const editPhone = document.getElementById('editPhone');
const editEmail = document.getElementById('editEmail');
const previewAvatar = document.getElementById('previewAvatar');
const avatarUpload = document.getElementById('avatarUpload');
const closeEditModal = userEditModal.querySelector('.close');

// 余额相关元素
const balanceAmount = document.querySelector('.amount');
const totalIncomeValue = document.querySelector('.account-details .account-detail-item:first-child .detail-value');
const withdrawableValue = document.querySelector('.account-details .account-detail-item:last-child .detail-value');

// 初始化函数 - 页面加载时调用
function initWode() {
    console.log("我的页面初始化开始");
    // 加载用户数据
    loadUserData();
    setupEventListeners();
    setupBalanceEditListeners();
    console.log("我的页面初始化完成");
}

// 从本地存储中加载用户数据
function loadUserDataFromStorage() {
    try {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            return JSON.parse(storedData);
        }
        return null;
    } catch (error) {
        console.error('从本地存储加载用户数据失败:', error);
        return null;
    }
}

// 保存用户数据到本地存储
function saveUserDataToStorage() {
    try {
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('用户数据已保存到本地存储');
    } catch (error) {
        console.error('保存用户数据到本地存储失败:', error);
    }
}

// 加载用户数据到页面
function loadUserData() {
    userName.textContent = userData.name;
    userAvatar.src = userData.avatar;
    inviteCode.textContent = userData.inviteCode;
    
    // 加载余额数据
    balanceAmount.textContent = userData.balance;
    totalIncomeValue.textContent = `¥ ${userData.totalIncome}`;
    withdrawableValue.textContent = `¥ ${userData.withdrawable}`;
}

// 设置余额相关的编辑事件监听器
function setupBalanceEditListeners() {
    // 账号余额点击编辑
    balanceAmount.addEventListener('click', function() {
        const currentValue = this.textContent;
        const input = document.createElement('input');
        input.type = 'number';
        input.step = '0.01';
        input.value = currentValue;
        input.style.width = '120px';
        input.style.fontSize = '24px';
        input.style.border = '1px solid #4a90e2';
        input.style.borderRadius = '4px';
        input.style.padding = '2px 5px';
        
        this.textContent = '';
        this.appendChild(input);
        input.focus();
        
        // 失去焦点时保存
        input.addEventListener('blur', function() {
            const newValue = parseFloat(this.value).toFixed(2);
            balanceAmount.textContent = newValue;
            userData.balance = newValue;
            userData.withdrawable = newValue; // 同步更新可提现金额
            withdrawableValue.textContent = `¥ ${newValue}`;
            saveUserDataToStorage();
        });
        
        // 回车键保存
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    });
    
    // 累计收入点击编辑
    totalIncomeValue.addEventListener('click', function() {
        const currentValue = userData.totalIncome;
        const input = document.createElement('input');
        input.type = 'number';
        input.step = '0.01';
        input.value = currentValue;
        input.style.width = '100px';
        input.style.fontSize = '16px';
        input.style.border = '1px solid #4a90e2';
        input.style.borderRadius = '4px';
        input.style.padding = '2px 5px';
        
        this.textContent = '';
        this.appendChild(input);
        input.focus();
        
        // 失去焦点时保存
        input.addEventListener('blur', function() {
            const newValue = parseFloat(this.value).toFixed(2);
            totalIncomeValue.textContent = `¥ ${newValue}`;
            userData.totalIncome = newValue;
            saveUserDataToStorage();
        });
        
        // 回车键保存
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    });
    
    // 可提现金额点击编辑
    withdrawableValue.addEventListener('click', function() {
        const currentValue = userData.withdrawable;
        const input = document.createElement('input');
        input.type = 'number';
        input.step = '0.01';
        input.value = currentValue;
        input.style.width = '100px';
        input.style.fontSize = '16px';
        input.style.border = '1px solid #4a90e2';
        input.style.borderRadius = '4px';
        input.style.padding = '2px 5px';
        
        this.textContent = '';
        this.appendChild(input);
        input.focus();
        
        // 失去焦点时保存
        input.addEventListener('blur', function() {
            const newValue = parseFloat(this.value).toFixed(2);
            withdrawableValue.textContent = `¥ ${newValue}`;
            userData.withdrawable = newValue;
            userData.balance = newValue; // 同步更新账号余额
            balanceAmount.textContent = newValue;
            saveUserDataToStorage();
        });
        
        // 回车键保存
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 点击用户资料区域打开编辑模态框
    const userProfileContainer = document.querySelector('.user-profile-container');
    userProfileContainer.addEventListener('click', openUserEditModal);
    
    // 关闭模态框
    closeEditModal.addEventListener('click', closeUserEditModal);
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === userEditModal) {
            closeUserEditModal();
        }
    });
    
    // 头像上传预览
    avatarUpload.addEventListener('change', handleAvatarUpload);
    
    // 表单提交事件
    userEditForm.addEventListener('submit', handleUserFormSubmit);
    
    // 设置提现按钮点击事件
    const withdrawButton = document.querySelector('.withdraw-button');
    if (withdrawButton) {
        withdrawButton.addEventListener('click', function() {
            alert('提现功能暂未开放');
        });
    }
    
    // 设置功能按钮点击事件
    const featureButtons = document.querySelectorAll('.feature-button');
    featureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 阻止事件冒泡，防止触发userProfileContainer的点击事件
            e.stopPropagation();
            const featureName = this.querySelector('.feature-name').textContent;
            alert(`${featureName}功能暂未开放`);
        });
    });
    
    // 设置工具项点击事件
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('click', function() {
            const toolName = this.querySelector('.tool-name').textContent;
            alert(`${toolName}功能暂未开放`);
        });
    });
}

// 打开用户编辑模态框
function openUserEditModal() {
    // 填充表单数据
    editName.value = userData.name;
    editInviteCode.value = userData.inviteCode;
    editPhone.value = userData.phone || '';
    editEmail.value = userData.email || '';
    previewAvatar.src = userData.avatar;
    
    userEditModal.style.display = 'block';
}

// 关闭模态框
function closeUserEditModal() {
    userEditModal.style.display = 'none';
}

// 处理头像上传预览
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        alert('请选择图片文件');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        previewAvatar.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 处理用户表单提交
function handleUserFormSubmit(e) {
    e.preventDefault();
    
    // 更新用户数据
    userData.name = editName.value;
    userData.inviteCode = editInviteCode.value;
    userData.phone = editPhone.value;
    userData.email = editEmail.value;
    userData.avatar = previewAvatar.src; // 如果有新上传的图片，已在预览时更新
    
    // 保存到本地存储
    saveUserDataToStorage();
    
    // 更新页面显示
    loadUserData();
    
    // 关闭模态框
    closeUserEditModal();
    
    console.log("用户资料已更新");
    alert("保存成功！");
}

// 当页面加载后初始化我的页面
document.addEventListener('DOMContentLoaded', function() {
    // 此代码将在页面标签切换时由main.js处理调用
    console.log("我的页面JS加载完成");
}); 