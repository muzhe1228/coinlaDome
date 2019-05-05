// 房间类型
export enum roomType {
    "新手场" = 0,
    "中级场" = 1,
    "高级场" = 2
}

// 房间状态
export function roomStatus(num){
    if(num == 0){
        return "下注中"
    }else if(num == 1){
        return "封盘"
    }else if(num == 2 || num == 5){
        return "开奖中"
    }else if(num == 3 || num == 4){
        return "竞庄"
    }else if(num == 6){
        return "未开启"
    }else{
        return "下注中"
    }
}

// 房间倍数
export enum paySetting {
    "常规牛牛" = 0,
    "十倍牛牛" = 1
}
