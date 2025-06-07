// 统计页面初始化
function initTongji() {
    // 当页面切换到统计页时渲染图表
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
            { id: 1, serialNo: '21060', status: '在线', type: '增加', rewardType: '' },
            { id: 2, serialNo: '11745', status: '在线', type: '增加', rewardType: '' },
            { id: 3, serialNo: '22275', status: '在线', type: '增加', rewardType: '' }
        ];
    } catch (error) {
        console.error('加载设备数据失败:', error);
        return [];
    }
}

// 渲染设备状态统计图表
function renderDeviceStatusChart() {
    const ctx = document.getElementById('deviceStatusChart').getContext('2d');
    
    // 统计设备状态分布
    const deviceData = getDeviceData();
    const statusStats = getStatusStats(deviceData);
    
    const data = {
        labels: statusStats.labels,
        datasets: [{
            label: '设备状态统计',
            data: statusStats.data,
            backgroundColor: [
                'rgba(76, 175, 80, 0.6)',  // 在线 - 绿色
                'rgba(244, 67, 54, 0.6)'   // 不在线 - 红色
            ],
            borderColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(244, 67, 54, 1)'
            ],
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
                    text: '设备状态统计'
                }
            }
        },
    });
}

// 从设备数据中统计状态分布
function getStatusStats(deviceData) {
    // 初始化状态计数对象，确保即使没有某种状态的设备也会显示
    const statusCount = {
        '在线': 0,
        '不在线': 0
    };
    
    deviceData.forEach(device => {
        // 对设备状态进行计数
        if (device.status === '在线' || device.status === '不在线') {
            statusCount[device.status]++;
        } else {
            // 如果是其他状态，默认归为不在线
            statusCount['不在线']++;
        }
    });
    
    return {
        labels: Object.keys(statusCount),
        data: Object.values(statusCount)
    };
}

// 当页面切换到统计页面时调用初始化
document.addEventListener('DOMContentLoaded', function() {
    // 此代码将在页面标签切换时由main.js处理调用
    console.log("统计页面JS加载完成");
}); 