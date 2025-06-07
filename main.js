// 页面导航处理
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有页面和导航项
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    
    // 初始化当前页面和导航
    let currentPage = 'shouye';
    
    // 导航点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage);
        });
    });
    
    // 切换页面函数
    function switchPage(pageName) {
        // 如果是当前页面，不做任何操作
        if (pageName === currentPage) return;
        
        // 隐藏所有页面，移除激活状态
        pages.forEach(page => page.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));
        
        // 显示目标页面，添加激活状态
        document.getElementById(pageName).classList.add('active');
        document.querySelector(`.nav-item[data-page="${pageName}"]`).classList.add('active');
        
        // 更新当前页面
        currentPage = pageName;
        
        // 如果切换到统计页面，初始化图表
        if (pageName === 'tongji' && typeof initTongji === 'function') {
            initTongji();
        }
        
        // 如果切换到我的页面，初始化个人信息
        if (pageName === 'wode' && typeof initWode === 'function') {
            initWode();
        }
        
        console.log(`已切换到${pageName}页面`);
    }
    
    // 初始化应用
    initApp();
});

// 应用初始化函数
function initApp() {
    // 首页初始化（默认页面）
    if (typeof initShouye === 'function') {
        initShouye();
    }
    
    console.log("应用初始化完成");
} 