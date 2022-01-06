# 发布流程

## 发布准备

复制env_sample到.env并修改各个参数, 然后

```
npm install
```

## 发布合约

```
npx hardhat run scripts/deploy.js --network rinkeby
```

## 验证合约 (国内网络可能会超时，在服务器上验证过没问题)

```
npx hardhat verify --network rinkeby 合约地址
```


## mint

mint之前需要添加白名单，数量不需要18个0

```
npx hardhat run scripts/mint.js --network rinkeby
```

# 下面几个都是在合约上面操作
## 添加任务信息

需要传入task id和reward数量
```
addTaskInfo
```

## 获取任务信息

需要传入task id

```
getTaskInfo
```

## 确认完成任务

需要传入task id和认领人地址, 会验证task，如果数量小于等于0会报错，任务重复完成也会报错

```
confirmTask
```
