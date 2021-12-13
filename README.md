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

```
npx hardhat run scripts/mint.js --network rinkeby
```
