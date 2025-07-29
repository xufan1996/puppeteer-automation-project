import { install } from '@puppeteer/browsers';
import path from 'path';
import os from 'os';
import fs from 'fs';

const installChrome = async () => {
  try {
    console.log('开始下载Chrome浏览器...');
    
    const platform = os.platform();
    let browserPlatform;
    
    if (platform === 'win32') {
      browserPlatform = 'win64';
    } else if (platform === 'darwin') {
      browserPlatform = 'mac';
    } else {
      browserPlatform = 'linux';
    }
    
    const cacheDir = path.join(os.homedir(), '.cache', 'puppeteer');
    
    // 确保缓存目录存在
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    
    const result = await install({
      browser: 'chrome',
      buildId: '116.0.5793.0',
      platform: browserPlatform,
      cacheDir: cacheDir
    });
    
    console.log('Chrome浏览器下载完成!');
    console.log('安装路径:', result.executablePath);
    
    return result;
  } catch (error) {
    console.error('下载Chrome浏览器失败:', error);
    throw error;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  installChrome().catch(console.error);
}

export { installChrome };