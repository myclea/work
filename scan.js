// 扫一扫功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有的扫一扫按钮
    const scanButtons = document.querySelectorAll('.scan-button');
    
    // 为每个扫一扫按钮添加点击事件
    scanButtons.forEach(button => {
        button.addEventListener('click', handleScanButtonClick);
    });
    
    // 扫一扫按钮点击处理函数
    function handleScanButtonClick() {
        console.log('扫一扫按钮被点击');
        
        // 这里可以实现扫一扫的功能，例如调用摄像头API或者其他扫码功能
        // 在移动端环境中，可以调用原生的扫码功能
        
        // 模拟实现：显示一个提示框
        showScanningModal();
    }
    
    // 显示扫描中的模态框
    function showScanningModal() {
        // 检查是否已经存在模态框
        let scanModal = document.getElementById('scanModal');
        
        // 如果不存在，创建一个新的模态框
        if (!scanModal) {
            scanModal = document.createElement('div');
            scanModal.id = 'scanModal';
            scanModal.className = 'modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            const closeSpan = document.createElement('span');
            closeSpan.className = 'close';
            closeSpan.textContent = '×';
            closeSpan.addEventListener('click', () => {
                scanModal.style.display = 'none';
            });
            
            const title = document.createElement('h3');
            title.textContent = '扫码';
            
            const scanArea = document.createElement('div');
            scanArea.className = 'scan-area';
            scanArea.style.width = '100%';
            scanArea.style.height = '250px';
            scanArea.style.backgroundColor = '#f5f5f5';
            scanArea.style.display = 'flex';
            scanArea.style.alignItems = 'center';
            scanArea.style.justifyContent = 'center';
            scanArea.style.marginBottom = '20px';
            scanArea.style.position = 'relative';
            scanArea.style.overflow = 'hidden';
            scanArea.style.borderRadius = '4px';
            
            // 创建扫描动画
            const scanLine = document.createElement('div');
            scanLine.className = 'scan-line';
            scanLine.style.position = 'absolute';
            scanLine.style.width = '100%';
            scanLine.style.height = '2px';
            scanLine.style.backgroundColor = '#4a90e2';
            scanLine.style.top = '0';
            scanLine.style.boxShadow = '0 0 8px #4a90e2';
            scanLine.style.animation = 'scanning 2s linear infinite';
            
            // 添加动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes scanning {
                    0% { top: 0; }
                    50% { top: 250px; }
                    100% { top: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // 扫描提示文字
            const scanText = document.createElement('div');
            scanText.textContent = '正在扫描...';
            scanText.style.color = '#333';
            scanText.style.fontSize = '16px';
            scanText.style.fontWeight = '500';
            
            // 组装模态框
            scanArea.appendChild(scanLine);
            scanArea.appendChild(scanText);
            
            modalContent.appendChild(closeSpan);
            modalContent.appendChild(title);
            modalContent.appendChild(scanArea);
            
            scanModal.appendChild(modalContent);
            document.body.appendChild(scanModal);
            
            // 点击模态框外部关闭
            scanModal.addEventListener('click', (e) => {
                if (e.target === scanModal) {
                    scanModal.style.display = 'none';
                }
            });
        }
        
        // 显示模态框
        scanModal.style.display = 'block';
        
        // 模拟扫描过程（3秒后关闭模态框并显示结果）
        setTimeout(() => {
            scanModal.style.display = 'none';
            showScanResult();
        }, 3000);
    }
    
    // 显示扫描结果
    function showScanResult() {
        alert('扫描成功：已识别设备编号 TC-2023' + Math.floor(Math.random() * 10000));
    }
}); 