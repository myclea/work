// 统计页面初始化
function initTongji() {
    // 当页面切换到统计页时渲染图表
    renderDeviceTypeChart();
    renderDeviceStatusChart();
    console.log("统计页面初始化完成");
}

// 从本地存储中获取设备数据
function getDeviceData() {
    try {
        const storedData = localStorage.getItem('deviceData');
        if (storedData) {
            return JSON.parse(storedData);
        }
        
        // 如果没有本地存储数据，返回默认数据
        return [
            { id: 1, serialNo: '21060', status: '710290.62', type: '增加', rewardType: '' },
            { id: 2, serialNo: '11745', status: '789075.62', type: '增加', rewardType: '' },
            { id: 3, serialNo: '22275', status: '777330.62', type: '增加', rewardType: '' },
            { id: 4, serialNo: '22275', status: '755055.62', type: '增加', rewardType: '' },
            { id: 5, serialNo: '23490', status: '732780.62', type: '增加', rewardType: '' },
            { id: 6, serialNo: '21060', status: '709290.62', type: '增加', rewardType: '' },
            { id: 7, serialNo: '22275', status: '688230.62', type: '增加', rewardType: '' },
            { id: 8, serialNo: '23490', status: '665955.62', type: '增加', rewardType: '' }
        ];
    } catch (error) {
        console.error('加载设备数据失败:', error);
        return [];
    }
}

// 渲染设备类型分布图表
function renderDeviceTypeChart() {
    const ctx = document.getElementById('deviceTypeChart').getContext('2d');
    
    // 统计各类型数量
    const deviceData = getDeviceData();
    const typeStats = getTypeStats(deviceData);
    
    const data = {
        labels: typeStats.labels,
        datasets: [{
            label: '设备类型分布',
            data: typeStats.data,
            backgroundColor: [
                'rgba(76, 175, 80, 0.6)',
                'rgba(255, 193, 7, 0.6)',
                'rgba(33, 150, 243, 0.6)'
            ],
            borderColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(255, 193, 7, 1)',
                'rgba(33, 150, 243, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    // 创建饼图
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '设备类型分布'
                }
            }
        },
    });
}

// 渲染设备状态统计图表
function renderDeviceStatusChart() {
    const ctx = document.getElementById('deviceStatusChart').getContext('2d');
    
    // 统计奖励类型分布
    const deviceData = getDeviceData();
    const rewardStats = getRewardStats(deviceData);
    
    const data = {
        labels: rewardStats.labels,
        datasets: [{
            label: '奖励类型分布',
            data: rewardStats.data,
            backgroundColor: 'rgba(102, 102, 102, 0.5)',
            borderColor: 'rgba(102, 102, 102, 1)',
            borderWidth: 1
        }]
    };
    
    // 创建柱状图
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '奖励类型统计'
                }
            }
        },
    });
}

// 从设备数据中统计类型分布
function getTypeStats(deviceData) {
    const typeCount = {};
    
    deviceData.forEach(device => {
        if (!typeCount[device.type]) {
            typeCount[device.type] = 0;
        }
        typeCount[device.type]++;
    });
    
    return {
        labels: Object.keys(typeCount),
        data: Object.values(typeCount)
    };
}

// 从设备数据中统计奖励类型分布
function getRewardStats(deviceData) {
    const rewardCount = {};
    
    deviceData.forEach(device => {
        if (!rewardCount[device.rewardType]) {
            rewardCount[device.rewardType] = 0;
        }
        rewardCount[device.rewardType]++;
    });
    
    return {
        labels: Object.keys(rewardCount),
        data: Object.values(rewardCount)
    };
}

// 当页面切换到统计页面时调用初始化
document.addEventListener('DOMContentLoaded', function() {
    // 此代码将在页面标签切换时由main.js处理调用
    console.log("统计页面JS加载完成");
}); 