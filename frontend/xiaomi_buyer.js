const puppeteer = require('puppeteer');
/**
 * 小米抢购软件使用说明：
 * 录制可以使用Chrome插件puppeteer-recorder进行操作录制，插件地址
 * https://chrome.google.com/webstore/detail/djeegiggegleadkkbgopoonhjimgehda
 * 录制后将代码贴到下面即可
 * 使用时请修改用户账号信息和对应的物品连接
 * 依赖需要用到nodejs,使用nvm安装nodejs，nvm下载地址：
 * https://github-production-release-asset-2e65be.s3.amazonaws.com/24268127/f3defc70-9aa4-11e8-83e2-464480a185e4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201208%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201208T124457Z&X-Amz-Expires=300&X-Amz-Signature=dee657b1496f740fa0ea327945b3a97e3c4ee561f66c732c2e915b8dfc26a73f&X-Amz-SignedHeaders=host&actor_id=18348862&key_id=0&repo_id=24268127&response-content-disposition=attachment%3B%20filename%3Dnvm-setup.zip&response-content-type=application%2Foctet-stream
 * 
 * 配置国内源
 * nvm node_mirror https://npm.taobao.org/mirrors/node/
    nvm npm_mirror https://npm.taobao.org/mirrors/npm/
    nvm install 12
    nvm use 12
    切换到代码目录：
    npm install
 */
const config = {
    user: '111',
    password: '111',
    itemlink: 'https://www.mi.com/buy/detail?product_id=10000267',
    thetime: 1607436391 * 1000 
}

async function begin () {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1920,
            height: 1000
        }
    });
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation()
    await page.goto(config.itemlink)
    
    await page.setViewport({ width: 1440, height: 960 })
    //打开登录窗口
    await page.waitForSelector('.header > .site-topbar > .container > #J_siteUserInfo > .link:nth-child(1)')
    await page.click('.header > .site-topbar > .container > #J_siteUserInfo > .link:nth-child(1)')
    //同意用户协议
    await page.waitForSelector('.mi-popup__content > .mi-dialog__wrapper > .mi-dialog > .el-dialog__footer > .btn-primary')
    await page.click('.mi-popup__content > .mi-dialog__wrapper > .mi-dialog > .el-dialog__footer > .btn-primary')
    //输入用户信息
    await page.waitForSelector('#login-main-form #username')
    await page.click('#login-main-form #username')    
    await page.type('input[name="user"]', config.user.toString());
    await page.type('input[name="password"]', config.password);
    await page.click('#login-button');
   
    await navigationPromise
    await page.waitForNavigation()

    //滚动页面到购买按钮处    
    await page.evaluate(function () {
        window.scrollTo(0,2800)
    })
     //点击添加到购物车
    await page.waitForSelector('#app > div.mi-detail > div > div > div > div.product-box.container > div.product-con > div.btn-box > div.sale-btn > a')
    await page.click('#app > div.mi-detail > div > div > div > div.product-box.container > div.product-con > div.btn-box > div.sale-btn > a')
    
    await navigationPromise
    //提交订单并结算
    await page.waitForSelector('.page-main > .container > .buy-succ-box > .actions > .btn-primary')
    await page.click('.page-main > .container > .buy-succ-box > .actions > .btn-primary')
    
    await navigationPromise

}
begin();