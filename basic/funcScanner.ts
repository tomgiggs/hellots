import * as  Loader from 'pomelo-loader';
import * as fs from "fs";
export function  loadRemoteServices(paths) {
    let res = {},
        item, m;
    for (let i = 0, l = paths.length; i < l; i++) {
        let path = paths[i];
        let namespace = path.split('/');
        try{
            let proxyName = namespace[namespace.length-2]
            m = Loader.load(path, {});
            if (m) {
                createNamespace(proxyName, res);
                for (let s in m) {
                    res[proxyName][s] = m[s];
                }
            }
        }catch (e) {
            console.log(e)
        }
    }

    return res;
}

export function  createNamespace(namespace, proxies) {
    proxies[namespace] = proxies[namespace] || {};
}

let proxies = [];
export function  findProxies(path) {
    var files = fs.readdirSync(path);
    if (files.length === 0) {
        console.warn('path is empty, path:' + path);
        return;
    }
    if (path.charAt(path.length - 1) !== '/') {
        path += '/';
    }
    var fp, fn, m, res = {};
    for (var i = 0, l = files.length; i < l; i++) {
        fn = files[i];
        fp = path + fn;
        if (fs.statSync(fp).isDirectory()) {
            findProxies(fp);
        }
        if (fs.statSync(fp).isDirectory() && fp.toLowerCase().indexOf("proxy") > -1) {
            proxies.push(fp);
        }
    }
    return proxies
}

export function  scan() {
    let proxiesFiles = findProxies("../../../app/servers/");
    console.log(proxiesFiles);
    let proxiesFuncs = loadRemoteServices(proxiesFiles);
    console.log(proxiesFuncs);

}
scan()